const path = require("path");
const merge = require("webpack-merge");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: path.resolve(__dirname, "./src/entry-client.js"),
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /src\/global.less/,
        use: [
          "vue-style-loader",
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
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
    ],
  },
});
