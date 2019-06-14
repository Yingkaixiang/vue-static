const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  devtool: isProd ? "source-map" : "cheap-eval-source-map",
  output: {
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /src\/global.less/,
        use: [
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
        ],
      },
      {
        test: /src\/global.less/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin({})],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.join(__dirname, "src"),
      "@components": path.join(__dirname, "src/components"),
    },
  },
};
