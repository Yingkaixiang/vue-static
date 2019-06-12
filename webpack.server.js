const path = require("path");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "./src/entry-server.js"),
  output: {
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
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
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new VueSSRServerPlugin(),
  ],
});
