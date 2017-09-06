/*eslint-disable*/
const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const vueLoaderConfig = require('./vue-loader.conf');
// 根据NODE_ENV来启用

function resolve (dir) {
  return Path.join(__dirname, '..', dir)
}

const config = {
  entry: {
    main: resolve('src/app.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: resolve('dist'),
    chunkFilename: "js/[name].[chunkhash:8].js",
    publicPath: "/"
  },
  module: {
    noParse: function(content) {
      return /jquery|lodash|moment/.test(content);
    },
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }, {
        test: /iview.src.*?js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules')]
      }, {
        test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
        use: ['url-loader?limit=10000&name=[name].[ext]&outputPath=assets/images/']
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: ['url-loader?limit=30000&name=[name].[ext]&outputPath=assets/fonts/']
      }
    ]
  },
  resolve: {
    modules: ['node_modules', resolve('src')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'moment': 'moment/min/moment-with-locales.min.js',
      '@': resolve('src')
    },
    extensions: ['.js', '.vue']
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      title: '自动下单系统',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new Webpack.optimize.ModuleConcatenationPlugin()
  ]
}

module.exports = config;
