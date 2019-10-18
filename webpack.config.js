const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/server.js'),
  ],
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ]
  }
}
