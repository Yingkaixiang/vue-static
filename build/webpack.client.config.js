const webpack = require("webpack");
const merge = require("webpack-merge");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const { resolve } = require("./util");

const baseConfig = require("./webpack.base.config");

const isProd = process.env.NODE_ENV === "production";

console.log("---------- 客户端配置 ----------");
console.log(`当前环境：${process.env.NODE_ENV}`);

const plugins = [
  new VueSSRClientPlugin(),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
    "process.env.VUE_ENV": "'client'",
  }),
];

module.exports = merge(baseConfig, {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "cheap-eval-source-map",
  entry: {
    app: resolve("../src/entry/entry-client.js"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
  plugins,
});
