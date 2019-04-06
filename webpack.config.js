const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src')
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath);
}

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  return {
    entry: srcPathExtend('index.js'),
    output: {
      path: settings.distPath,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
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
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: isDevMode
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [require('autoprefixer')()],
                  sourceMap: isDevMode
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevMode
                }
              }
            ]
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/'
            }
          }
        },
        {
          test: /\.(ttf|eof|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              output: 'fonts/[name].[ext]'
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      port: 8081,
      writeToDisk: true
    },
    devtool: isDevMode ? 'cheap-module-eval-source-map' : false,
    mode: process.env.NODE_ENV || 'development',
    plugins: [
      extractPlugin,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin({
        verbose: true
      }),
      new Dotenv({
        path: './.env',
        safe: false
      })
    ]
  };
};
