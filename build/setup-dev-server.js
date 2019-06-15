const webpack = require("webpack");
const MFS = require("memory-fs");
const path = require("path");
const chokidar = require("chokidar");
const fs = require("fs");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const clientConfig = require("../build/webpack.client.config");
const serverConfig = require("../build/webpack.server.config");

let bundle;
let template;
let clientManifest;

function readFile(fs, file) {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), "utf-8");
  } catch (err) {
    throw err;
  }
}

function setupDevServer(app, templatePath, cb) {
  let ready;
  const readyPromise = new Promise(r => {
    ready = r;
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

  template = fs.readFileSync(templatePath, "utf-8");
  chokidar.watch(templatePath).on("change", () => {
    template = fs.readFileSync(templatePath, "utf-8");
    console.log("index.html template updated.");
    update();
  });

  // 更改客户端配置文件配合热更新
  clientConfig.entry.app = [
    "webpack-hot-middleware/client",
    clientConfig.entry.app,
  ];
  clientConfig.output.filename = "[name].js";
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  // client bundle 构建
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });
  app.use(devMiddleware);
  // 完成编译
  clientCompiler.hooks.done.tap("clientManifestDone", stats => {
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;

    const clientManifestStr = readFile(
      devMiddleware.fileSystem,
      "vue-ssr-client-manifest.json",
    );
    clientManifest = JSON.parse(clientManifestStr);
    update();
  });

  app.use(
    webpackHotMiddleware(clientCompiler, {
      heartbeat: 5000,
    }),
  );

  // server bundle 构建
  // 监听源代码变更并重新构建 server bundle
  // 使用内存读写代替磁盘提升开发速度
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

  return readyPromise;
}

module.exports = setupDevServer;
