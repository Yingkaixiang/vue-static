const webpack = require("webpack");
const merge = require("webpack-merge");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

const { resolve } = require("./util");

const baseConfig = require("./webpack.base.config");

const isProd = process.env.NODE_ENV === "production";
const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin;

const plugins = [
  new VueSSRClientPlugin(),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
    "process.env.VUE_ENV": "client",
  }),
];
if (!isProd) {
  plugins.push(new BundleAnalyzerPlugin());
}

// TODO
// 1. 多入口打包
module.exports = merge(baseConfig, {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "cheap-eval-source-map",
  entry: {
    app: resolve("../src/entry/entry-client.js"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
      },
    },
    runtimeChunk: true,
  },
  plugins,
});
