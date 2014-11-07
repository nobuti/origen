'use strict';

var _ = require('underscore');
var $ = require("jquery");

var logUnderscoreVersion = function() {
  console.log(_.VERSION);
}

var changeBackground = function() {
  $('<span>LOL</span>').appendTo('body');
  $('body').css({backgroundColor: '#99cc00'});
  console.log("pooo!");
}

module.exports = {
  logUnderscoreVersion: logUnderscoreVersion,
  changeBackground: changeBackground
}