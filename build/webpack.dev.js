/*eslint-disable*/
const Path = require('path');
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CommonConfig = require('./webpack.base.js');
const PORT = 9000;

const config = function(env) {
  return Merge(CommonConfig, {
    entry: [
      'webpack-dev-server/client?http://192.168.170.140:' + PORT,
      'webpack/hot/only-dev-server',
      Path.resolve(__dirname, '../src/app.js')
    ],
    devtool: '#eval-source-map',
    output: {
      filename: '[name].js',
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify('development')}
      }),
      new FriendlyErrorsPlugin()
    ],
    devServer: {
      hot: true,
      port: PORT,
      host: '192.168.170.140',
      open: true,
      historyApiFallback: true,
      stats: {chunks: false, color: true, modules: false},
      publicPath: "/",
      contentBase: Path.resolve(__dirname, 'dist'),
      overlay: {warnings: true, errors: true},
      openPage: ''
    }
  })
}

module.exports = config;
