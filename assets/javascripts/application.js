var $ = require('jquery');
var hljs = require('highlight.js');

var foo = require('./components/foo');

$(function(){
  foo.attachTo("body");

  hljs.initHighlightingOnLoad();
});
