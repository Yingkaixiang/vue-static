import Koa from 'koa';
import { createBundleRenderer } from 'vue-server-renderer';

import serverBundle from '../dist/vue-ssr-server-bundle.json';

const app = new Koa();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
});

app.use(async ctx => {
  const html = await renderer.renderToString({});
  ctx.body = html;
});

app.listen(3000);
