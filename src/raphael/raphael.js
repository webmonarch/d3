d3.raphael = function(paper) {
    var root = new D3RaphaelRoot(paper);

    return d3_raphael_selection([[root.paper]], root)
};

