d3.raphael = function(paper) {
    return new D3RaphaelRoot(paper);
};

function throw_raphael_not_supported() {
    throw "Not Supported!";
};
