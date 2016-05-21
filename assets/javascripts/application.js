var $ = require('jquery');

var foo = require('./components/foo');

$(function(){
  foo.attachTo("body");

  hljs.initHighlightingOnLoad();
});
