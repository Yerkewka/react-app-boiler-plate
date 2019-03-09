const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    writeToDisk: true
  },
  devtool: 'cheap-module-eval-source-map',
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin()
  ]
};
