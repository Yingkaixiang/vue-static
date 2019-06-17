const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const webpack = require("webpack");
const MFS = require("memory-fs");
const { devMiddleware, hotMiddleware } = require("koa-webpack-middleware");

const clientConfig = require("../build/webpack.client.config");
const serverConfig = require("../build/webpack.server.config");

function setupDevServer(app, templatePath, cb) {
  let template;
  let bundle;
  let clientManifest;
  let ready;

  let readyPromise = new Promise(resolve => {
    ready = resolve;
  });

  // 监听模板修改
  template = fs.readFileSync(templatePath, "utf-8");
  chokidar.watch(templatePath).on("change", () => {
    template = fs.readFileSync(templatePath, "utf-8");
  });

  // 开启客户端热更新相关配置
  clientConfig.entry.app = [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    path.resolve(__dirname, "../src/entry-client.js"),
  ];
  clientConfig.output.filename = "[name].js";
  clientConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  // 开启本地开发服务器
  const clientCompiler = webpack(clientConfig);
  const webpackDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });
  const webpackHotMiddleware = hotMiddleware(clientCompiler, {
    heartbeat: 5000,
  });
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
  clientCompiler.hooks.done.tap("clientManifestDone", stats => {
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;

    const clientManifestStr = readFile(
      webpackDevMiddleware.fileSystem,
      "vue-ssr-client-manifest.json",
    );
    clientManifest = JSON.parse(clientManifestStr);
    update();
  });

  // 监听并更新 server bundle
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.errors.length) return;

    const bundleStr = readFile(mfs, "vue-ssr-server-bundle.json");
    bundle = JSON.parse(bundleStr);
    update();
  });

  function update() {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, {
        template,
        clientManifest,
      });
    }
  }

  return readyPromise;
}

function readFile(fs, file) {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), "utf-8");
  } catch (err) {
    throw err;
  }
}

module.exports = setupDevServer;
