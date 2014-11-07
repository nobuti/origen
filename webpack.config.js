module.exports = {
  entry: {
    app: './javascripts/app.js',
    minimizr: './node_modules/modernizr.js'
  } 
  output: {
    path: './public/javascripts',
    filename: '[name].bundle.js'
  }
};