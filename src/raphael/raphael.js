/**
 * Initializes and creates the root {@link D3RaphaelSelection} for the specified
 * Raphael Paper.
 *
 * @see <a href="http://raphaeljs.com/reference.html#Raphael">Raphael</a>
 * @see <a href="http://raphaeljs.com/reference.html#Paper">Raphael.Paper</a>
 *
 * @param {Raphael.Paper} paper
 * @return {D3RaphaelSelection} a selection of the root Raphael.canvas element
 */
d3.raphael = function(paper) {
    var root = new D3RaphaelRoot(paper);

    return d3_raphael_selection([[root.paper]], root)
};

