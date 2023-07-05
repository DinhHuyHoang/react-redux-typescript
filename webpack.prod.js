const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { distPath, entryFilePath } = require('./config');

module.exports = function webpackProdConfig(env) {
  return merge(common(env), {
    output: {
      path: distPath,
      publicPath: '',
      filename: '[name].[fullhash].bundle.js',
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  });
};
