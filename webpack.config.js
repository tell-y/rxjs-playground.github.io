var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor : ['rxjs']
  },
  devtool : '#source-map',
  output: {
    path: path.join(__dirname,"public"),
    filename: '[name].js',
    publicPath : "http://localhost:8080/assets"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },{
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },{
          loader: 'json-loader',
          test: /\.json$/
        } ]
  },
  node: {
      fs: 'empty',
      module: 'empty',
      net: 'empty',
      tls: "empty"
  },
  plugins: [
  ],
  externals: {
    codemirror: 'CodeMirror'
  },
  devServer : {
    contentBase  : path.resolve(__dirname, "src"),
  }

};
