const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

const { resolve } = require("./util");

const baseConfig = require("./webpack.base.config");

console.log("---------- 服务端配置 ----------");
console.log(`当前环境：${process.env.NODE_ENV}`);

module.exports = merge(baseConfig, {
  mode: "production",
  target: "node",
  entry: resolve("../src/entry/entry-server.js"),
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2",
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      "process.env.VUE_ENV": "server",
    }),
    new VueSSRServerPlugin(),
  ],
});
