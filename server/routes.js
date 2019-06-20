const axios = require("axios");

const { render, renderDev } = require("./render");

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
    const { data } = await axios({
      url: "https://pokeapi.co/api/v2/pokemon/ditto/",
    });
    const html = await renderDev(app, { title: "vue static", state: data });
    ctx.body = html;
  });

  router.get("/success", async ctx => {
    ctx.body = "成功";
  });
};
