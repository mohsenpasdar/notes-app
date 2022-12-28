const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    create: path.resolve(__dirname, 'src/create.js'),
    edit: path.resolve(__dirname, 'src/edit.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name]-bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
    open: true,
  },
  devtool: 'source-map'
};