const Koa = require("koa");
const serve = require("koa-static");
const { createBundleRenderer } = require("vue-server-renderer");

const fs = require("fs");
const path = require("path");

const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const setupDevServer = require("../build/setup-dev-server");

const app = new Koa();
app.use(serve("."));

const isProd = process.env.NODE_ENV === "production";

// 获取 html 模板
const templatePath = resolve("../src/index.template.html");
const template = fs.readFileSync(templatePath, "utf-8");

let renderer;

renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

async function render() {
  const html = await renderer.renderToString({
    title: "vue static",
    meta: "",
  });
  return html;
}

app.use(
  isProd
    ? async ctx => {
        const html = await render();
        ctx.body = html;
      }
    : async ctx => {
        await setupDevServer(app, templatePath, (bundle, options) => {
          const op = Object.assign(
            {
              runInNewContext: false,
            },
            options,
          );
          renderer = createBundleRenderer(bundle, op);
        });
        const html = await render();
        ctx.body = html;
      },
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}
