/*eslint-disable*/
const Path = require('path');
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const WebpackChunkHash = require("webpack-chunk-hash");
const InlineManifestWebpackPlugin  = require("inline-manifest-webpack-plugin");
const CommonConfig = require('./webpack.base.js');

const config = function(env) {
  return Merge(CommonConfig, {
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
        'process.env': {'NODE_ENV': JSON.stringify('production')}
      }),
      new Webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: true,
        comments: false
      }),
      new Webpack.NoEmitOnErrorsPlugin(),
      // 生成稳定的模块ID，稳定chunkhash
      new Webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new InlineManifestWebpackPlugin({name: 'webpackManifest'}),
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
