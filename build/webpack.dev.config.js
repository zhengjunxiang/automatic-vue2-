/*eslint-disable*/
const Path = require('path');
const utils = require('./utils');
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BaseConfig = require('./webpack.base.config');
const conf = require('../config');

function resolve (dir) {
  return Path.join(__dirname, '..', dir)
}

const config = Merge(BaseConfig, {
  entry: {
    main: [
      'babel-polyfill',
      'event-source-polyfill',
      'webpack-hot-middleware/client?noInfo=true',
      resolve('src/app.js')
    ]
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: conf.dev.cssSourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  output: {
    path: conf.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? conf.build.assetsPublicPath
      : conf.dev.assetsPublicPath
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': conf.dev.env
    }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = config;
