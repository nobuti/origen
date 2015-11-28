var defineComponent = require("flight/lib/component");

module.exports = defineComponent(Foo);

function Foo() {
  "use strict";

  this.attributes({
    "option": "fucking option"
  });

  this.after("initialize", function() {
    console.log(this.attr.option);
  });
}
