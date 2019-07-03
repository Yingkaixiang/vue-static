/*
 * @Description: 基础配置
 * @Author: 应开翔
 * @Date: 2019-06-16 16:36:34
 * @LastEditTime: 2019-07-03 20:44:38
 * @LastEditors: 应开翔
 */

const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const { resolve } = require("./util");

const isProd = process.env.NODE_ENV === "production";

console.log("---------- 基础配置 ----------");
console.log(`当前环境：${process.env.NODE_ENV}`);

module.exports = {
  // TODO
  // 1. 多入口使用 [name]/[name].[chunkhas].js
  // 2. 添加 cache-loader
  // 3. 添加 eslint-loader
  context: resolve("../src"),
  output: {
    path: resolve("../dist/"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("../src"),
      "@components": resolve("../src/components"),
    },
  },
  module: {
    rules: [
      // 关闭 require.ensure 因为这不是语言标准
      // 使用 import() 引入异步组件
      { parser: { requireEnsure: false } },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[ext]?[hash]",
            },
          },
          {
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-pngquant")({
                  quality: "80",
                }),
                require("imagemin-mozjpeg")({
                  progressive: true,
                  arithmetic: false,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /src\/global.less/,
        use: isProd
          ? [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[local]_[hash:base64:8]",
                },
              },
              "postcss-loader",
              "less-loader",
            ]
          : [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[local]_[hash:base64:8]",
                },
              },
              "postcss-loader",
              "less-loader",
            ],
      },
      {
        test: /src\/global.less/,
        use: isProd
          ? [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "less-loader",
              "postcss-loader",
            ]
          : ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin({})],
  },
  performance: {
    hints: isProd ? "error" : false,
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
};
