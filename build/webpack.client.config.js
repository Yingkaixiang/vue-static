const merge = require("webpack-merge");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "../src/entry-client.js"),
  plugins: [
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
  // devServer: {
  //   // 如果不设置为 true
  //   // whistle 会报错 invalid host header
  //   disableHostCheck: true,
  //   host: "0.0.0.0",
  // },
});
