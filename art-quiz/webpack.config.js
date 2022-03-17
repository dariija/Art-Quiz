const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {LoaderOptionsPlugin} = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpeg|jpg|gif|mp3|ogg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.ttf$/,
          type: 'asset/resource'
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        }
    ]
  },
  devServer: {
      port: 4200
  },

};