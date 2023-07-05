const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { srcPath, rootPath, publicPath, distPath, appName, entryFilePath } = require('./config');

module.exports = (env) => {
  const mode = process.env.NODE_ENV;
  const envPath = path.resolve(rootPath, `.env.${mode}`);

  console.log(`Running environment: .env.${mode}`);

  return {
    mode,
    target: 'web',
    entry: {
      client: entryFilePath,
      vendor: ['react', 'react-dom'],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new Dotenv({
        path: envPath,
        safe: true,
        allowEmptyValues: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css',
        chunkFilename: '[id].[fullhash].css',
      }),
      new CopyPlugin({
        patterns: [{ from: publicPath, to: distPath }],
      }),
      new HtmlWebpackPlugin({ title: appName, template: path.resolve(srcPath, 'index.ejs') }),
    ],
    performance: { hints: false },
    stats: 'minimal',
    watchOptions: {
      ignored: ['**/node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 700000,
                fallback: 'file-loader',
                name: '[md5:hash].[ext]',
                outputPath: 'assets/images',
                publicPath: 'assets',
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@root': path.resolve(rootPath, './src'),
        '@redux': path.resolve(rootPath, './src/redux'),
        '@assets': path.resolve(rootPath, './src/assets'),
        '@scss': path.resolve(rootPath, './src/assets/scss'),
        '@components': path.resolve(rootPath, './src/components'),
        '@containers': path.resolve(rootPath, './src/containers'),
      },
    },
    externals: {},
  };
};
