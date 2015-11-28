var express = require('express');
var compress = require('compression');
var basicAuth = require('basic-auth');
var app = express();

// Authentication module with custom authentication method.
var auth = function (req, res, next) {
  'use strict';

  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === 'please' && user.pass === 'frozen') {
    return next();
  } else {
    return unauthorized(res);
  }
};

app.disable("x-powered-by");

app.use(auth);
app.use(compress());
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);
