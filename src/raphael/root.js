// todo: make selector format more better
var D3RaphaelRoot = function(paper) {
    this.paper = paper;
};

D3RaphaelRoot.prototype.select = function(type) {
    return d3_raphael_selection([d3_raphael_type_selector(type, this, true)], this)
};

D3RaphaelRoot.prototype.selectAll = function(type) {
    return d3_raphael_selection([d3_raphael_type_selector(type, this, false)], this)
};


var d3_raphael_paperShapes = ["circle", "ellipse", "rect", "text", "path"];
var d3_raphael_paperDelegateMethods = d3_raphael_paperShapes.concat(["forEach"]);

function d3_raphael_rootToPaperDelegate(method_name) {
    return function() { return this.paper[method_name].apply(this.paper, arguments); }
};

for(var i = 0; i < d3_raphael_paperDelegateMethods.length; i++) {
    var method_name = d3_raphael_paperDelegateMethods[i];
    D3RaphaelRoot.prototype[method_name] = d3_raphael_rootToPaperDelegate(method_name);
};