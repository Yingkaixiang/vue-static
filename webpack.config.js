const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      use: ["vue-loader"]
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    }, {
      test: /\.(css|less)$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        'less-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    // 如果不设置为 true
    // whistle 会报错 invalid host header
    disableHostCheck: true
  }
}