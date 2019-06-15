const Koa = require("koa");
const serve = require("koa-static");
const { createBundleRenderer } = require("vue-server-renderer");
const webpack = require("webpack");
const MFS = require("memory-fs");
const fs = require("fs");
const path = require("path");

const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const serverConfig = require("../build/webpack.server.config.js");

const app = new Koa();
app.use(serve("."));

// 获取 html 模板
const templatePath = resolve("../src/index.template.html");
const template = fs.readFileSync(templatePath, "utf-8");

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

const serverCompiler = webpack(serverConfig);
const mfs = new MFS();
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  if (stats.errors.length) return;
});

async function render() {
  const html = await renderer.renderToString({
    title: "vue static",
    meta: "",
  });
  return html;
}

app.use(async ctx => {
  const html = await render();
  ctx.body = html;
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}
