const { render, renderDev } = require("./render");
const mock = require("./mock");

module.exports = (router, app) => {
  router.get("/site/create/:id", async ctx => {
    const { id } = ctx.params;
    // 通过 id 获取对应站点数据
    const html = await render({ title: `自定义站点：${id}` });
    // 上传静态 html
    console.log("上传 html 成功");
    console.log(html);
    ctx.body = "同步直出成功";
  });

  router.get("/", async ctx => {
    const html = await renderDev(app, { title: "vue static", state: mock });
    ctx.body = html;
  });

  router.get("/success", async ctx => {
    ctx.body = "成功";
  });
};
