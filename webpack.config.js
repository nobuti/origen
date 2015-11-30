var path = require('path'),
    webpack = require("webpack"),
    assets_path = path.join('assets', 'javascripts'),
    public_path = path.join('public', 'javascripts');

module.exports = {
  entry: './assets/javascripts/application.js',
  output: {
    filename: 'application.js',
    path: path.resolve(public_path)
  },
  resolve: {
    extensions: ['', '.js'],
    root: path.resolve(assets_path)
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ]
};
