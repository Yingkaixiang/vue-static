const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const { createBundleRenderer } = require("vue-server-renderer");

const setupDevServer = require("../build/setup-dev-server");
const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const templatePath = resolve("../src/index.template.html");

const template = fs.readFileSync(templatePath, "utf-8");
let renderer = createRenderer(serverBundle, {
  template,
  clientManifest,
});

const app = new Koa();
const router = new Router();

router.get("/", async ctx => {
  await setupDevServer(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
  await render(ctx);
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

async function render(ctx) {
  const start = Date.now();
  const html = await renderer.renderToString({
    title: "vue-static",
  });
  const duration = Date.now() - start;
  ctx.body = html;
  console.log(`whole request: ${duration} ms`);
}

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

function createRenderer(bundle, options) {
  const opt = Object.assign(options, {
    runInNewContext: false,
  });
  return createBundleRenderer(bundle, opt);
}
