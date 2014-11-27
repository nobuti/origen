var express = require('express');

// export as module to run the server from grunt
var app = module.exports = express();
var path = require('path');
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.get('/:page', function(req, res, next) {
  var page = req.params.page;
  res.render(page);
});

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  return next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      error: err.status
  });
});

// Set server port. We are using grunt to run the server.
// Uncomment this line if you don't.
//app.listen(port);