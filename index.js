var express = require('express');

// export as module to run the server from grunt
var app = module.exports = express();
var path = require('path');
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

// Set server port. We are using grunt to run the server.
// Uncomment this line if you don't.
//app.listen(port);