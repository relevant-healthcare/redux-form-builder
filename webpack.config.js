var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}