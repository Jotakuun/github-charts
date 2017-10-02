var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/main"
  ],

  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    publicPath: "http://localhost:3000/build/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
        })
      }
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.css']
  }

}

module.exports = config;