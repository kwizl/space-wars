'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'js/main.js'
  },
  module: {
    rules: [
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
};
