const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");

const routes = require("./routes");

const app = new Koa();
const router = new Router();

app.use(logger());

routes(router, app);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
