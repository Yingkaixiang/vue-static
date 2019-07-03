const merge = require("webpack-merge");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

const { resolve } = require("./util");
const baseConfig = require("./webpack.base.config");

const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin;

console.log("---------- 打包分析配置 ----------");
console.log(`当前环境：${process.env.NODE_ENV}`);

module.exports = () => {
  return merge(baseConfig, {
    mode: "production",
    entry: {
      app: resolve("../src/entry/entry-client.js"),
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: true,
    },
    plugins: [new BundleAnalyzerPlugin()],
  });
};
