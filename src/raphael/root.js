/**
 * A d3 container for the Raphael paper, with delegate helpers to Raphael and select/selectAll functionality.
 *
 * @param paper
 * @constructor
 * @version Internal; Subject to change
 * @private
 */
var D3RaphaelRoot = function(paper) {
    d3_raphael_addCustomAttributes(paper);
    this.paper = paper;
};

/**
 * Performs a select on the elements in the Raphael paper.
 *
 * @param {String} raphael selector string; supports primitive type name and css classes.
 * @return {D3RaphaelSelection}
 * @private
 * @version Internal; Subject to change
 */
D3RaphaelRoot.prototype.select = function(s) {
    return d3_raphael_selection([d3_raphael_selector(s, this, true)], this)
};

/**
 * Performs a selectAll on the elements in the Raphael paper.
 *
 * @param {String} raphael selector string; supports primitive type name and css classes.
 * @return {D3RaphaelSelection}
 * @private
 */
D3RaphaelRoot.prototype.selectAll = function(s) {
    return d3_raphael_selection([d3_raphael_selector(s, this, false)], this)
};

/**
 * Creates a Raphael paper primitive object.
 *
 * @param {String} type type name
 * @return {*}
 * @private
 */
D3RaphaelRoot.prototype.create = function(type) {
    if(d3_raphael_paperShapes.indexOf(type) < 0)
        throw "Unsupported shape: " + type;

    return this[type]();
};

/**
 * Raphael primitives supported by d34raphael. <br />
 * Currently: <code>["circle", "ellipse", "rect", "text", "path"]</code>
 *
 * @type {Array}
 * @constant
 */
var d3_raphael_paperShapes = ["circle", "ellipse", "rect", "text", "path"];
var d3_raphael_paperDelegateMethods = d3_raphael_paperShapes.concat(["forEach"]);

function d3_raphael_rootToPaperDelegate(method_name) {
    return function() { return this.paper[method_name].apply(this.paper, arguments); }
};

for(var i = 0; i < d3_raphael_paperDelegateMethods.length; i++) {
    var method_name = d3_raphael_paperDelegateMethods[i];

    D3RaphaelRoot.prototype[method_name] = d3_raphael_rootToPaperDelegate(method_name);
};
