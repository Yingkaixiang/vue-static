const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            // 压缩 html
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
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[ext]?[hash]",
        },
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
              "less-loader",
              "postcss-loader",
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
    hints: isProd ? "error" : "warning",
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
