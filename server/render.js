// 渲染服务

const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");

const { resolve } = require("./util");
const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const setupDevServer = require("../build/setup-dev-server");

const templatePath = resolve("../src/index.template.html");
const template = fs.readFileSync(templatePath, "utf-8");

let renderer = createRenderer(serverBundle, {
  template,
  clientManifest,
});

function createRenderer(bundle, options) {
  const opt = Object.assign(options, {
    runInNewContext: false,
  });
  return createBundleRenderer(bundle, opt);
}

async function render(data) {
  return await renderer.renderToString(data);
}

async function renderDev(app, data) {
  await setupDevServer(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
  return await render(data);
}

exports.render = render;
exports.renderDev = renderDev;
