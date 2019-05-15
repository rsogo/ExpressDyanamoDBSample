const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './app.js',
  },
  target: 'node',
  // https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
  externals: [nodeExternals()],
  plugins: [
    //new CleanWebpackPlugin(['build'])
    // 設定 https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build']
    })
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      // Loads the javacript into html template provided.
      // Entry point is set below in HtmlWebPackPlugin in Plugins 
      test: /\.html$/,
      use: [{loader: "html-loader"}]
    }]
  }
};
