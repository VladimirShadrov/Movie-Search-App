const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false,
  output: {
    filename: devMode ? 'main.js' : 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: devMode ? false : true,
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'index.css' : 'index.[hash].css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 2020,
    open: true,
    client: {
      logging: 'error',
      overlay: false,
    },
    hot: false,
    historyApiFallback: true,
  },
};
