const path = require("path");
const merge = require("webpack-merge");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "./src/entry-client.js"),
  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.(js|vue)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/,
      // },
      // {
      //   test: /\.(css|less)$/,
      //   exclude: /src\/global.less/,
      //   use: [
      //     "vue-style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName: "[local]_[hash:base64:8]",
      //       },
      //     },
      //     "less-loader",
      //     "postcss-loader",
      //   ],
      // },
      // {
      //   test: /src\/global.less/,
      //   use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      // },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new VueSSRClientPlugin()],
  // devServer: {
  //   // 如果不设置为 true
  //   // whistle 会报错 invalid host header
  //   disableHostCheck: true,
  //   host: "0.0.0.0",
  // },
});
