const path = require("path");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const webpack = require("webpack");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  target: "node",
  entry: path.resolve(__dirname, "../src/entry-server.js"),
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2",
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      "process.env.VUE_ENV": '"server"',
    }),
    new VueSSRServerPlugin(),
  ],
});
