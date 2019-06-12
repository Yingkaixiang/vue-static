const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
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
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.join(__dirname, "src"),
      "@components": path.join(__dirname, "src/components"),
    },
  },
  devServer: {
    // 如果不设置为 true
    // whistle 会报错 invalid host header
    disableHostCheck: true,
    host: "0.0.0.0",
  },
};
