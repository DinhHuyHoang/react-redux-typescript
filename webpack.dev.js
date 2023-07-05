const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { distPath, entryFilePath } = require('./config');

module.exports = function webpackDevConfig(env) {
  return merge(common(env), {
    output: {
      path: distPath,
      publicPath: '',
      filename: '[name].[fullhash].bundle.js',
      clean: true,
    },
    devtool: 'inline-source-map',
    cache: false,
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true, // optional, but you must not set both hot and liveReload to true
      liveReload: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
        webSocketURL: 'ws://0.0.0.0:3000',
        webSocketTransport: 'ws',
      },
      webSocketServer: 'ws',
    },
  });
};
