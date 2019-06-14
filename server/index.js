const Koa = require("koa");
const serve = require("koa-static");
const { createBundleRenderer } = require("vue-server-renderer");
const webpack = require("webpack");
const MFS = require("memory-fs");

const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const serverConfig = require("../webpack.server.config.js");

const app = new Koa();
app.use(serve("."));

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
});

const serverCompiler = webpack(serverConfig);
const mfs = new MFS();
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  if (stats.errors.length) return;
  console.log("update");
});

app.use(async ctx => {
  const html = await renderer.renderToString({});
  ctx.body = html;
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
