require('ignore-styles');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require("babel-polyfill");

require('asset-require-hook')({
  extensions: ['.png', '.jpg', '.gif'],
  name: '/assets/[hash].[ext]',
});

require('./server');
