const Koa = require("koa");
const { createBundleRenderer } = require("vue-server-renderer");

const serverBundle = require("../dist/vue-ssr-server-bundle.json");

const app = new Koa();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
});

app.use(async ctx => {
  const html = await renderer.renderToString({});
  ctx.body = html;
});

app.listen(3000);
