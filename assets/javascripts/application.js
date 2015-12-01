var $ = require('jquery');
var hljs = require('highlight.js');
console.log(hljs);

var foo = require('./components/foo');

$(function(){
  foo.attachTo("body");

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
