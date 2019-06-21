const Mock = require("mockjs");

module.exports = Mock.mock({
  banner: [
    Mock.Random.image("375x375"),
    Mock.Random.image("600x100"),
    Mock.Random.image("200x700"),
    Mock.Random.image("1000x1000"),
    Mock.Random.image("20x20"),
  ],
  name: "应开翔",
});
