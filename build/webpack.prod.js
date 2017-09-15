/*eslint-disable*/
const Path = require('path');
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const WebpackChunkHash = require("webpack-chunk-hash");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonConfig = require('./webpack.base.js');
const conf = require('../config');
const utils = require('./utils');

const config = function(env) {
  return Merge(CommonConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: conf.build.productionSourceMap,
        extract: true
      })
    },
    stats: {
      modules: false, errors: true, warnings: false, chunks: false
    },
    // devtool: 'source-map',
    plugins: [
      new Webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new Webpack.DefinePlugin({
        'process.env': conf.build.env
      }),
      new Webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: true,
        comments: false
      }),
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:8].css')
      }),
      new Webpack.NoEmitOnErrorsPlugin(),
      // 生成稳定的模块ID，稳定chunkhash
      new Webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new Webpack.optimize.CommonsChunkPlugin({
        // 由于它们之间没有更常见的模块，我们最终只会包含在清单文件中的运行时代码
        name: 'manifest',
        minChunks: Infinity,
        filename: 'manifest.js'
      })
    ]
  })
}

module.exports = config;
