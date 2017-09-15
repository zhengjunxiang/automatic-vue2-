/*eslint-disable*/
const Path = require('path');
var utils = require('./utils')
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CommonConfig = require('./webpack.base.js');
const conf = require('../config');

// add hot-reload related code to entry chunks
Object.keys(CommonConfig.entry).forEach(function (name) {
  CommonConfig.entry[name] = ['./build/dev-client'].concat(CommonConfig.entry[name])
})

const config = Merge(CommonConfig, {
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
