require("../env");

window.SVGAngle = function() {}; // dummy to short-circuit to SVG
require("../../lib/raphael/raphael");
Raphael = window.Raphael

var assert = require("assert");

assert.selectionSize = function(selection, l, w) {
    assert.lengthOf(selection, 1);
    assert.lengthOf(selection[0], w);
}