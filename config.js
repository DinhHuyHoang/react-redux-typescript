const path = require('path');

const appName = 'chat demo';
const version = '1.0.0';
const rootPath = __dirname;
const publicPath = path.join(rootPath, 'public');
const srcPath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');
const assetsPath = path.resolve('dist', './assets');
const entryFilePath = path.resolve(srcPath, 'index.tsx');

module.exports = {
  appName,
  version,
  rootPath,
  assetsPath,
  srcPath,
  distPath,
  entryFilePath,
  publicPath,
};
