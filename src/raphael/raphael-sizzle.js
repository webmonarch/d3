// Prefer Sizzle, if available
if (typeof Sizzle === "function") {

    // lookup to translate dom nodes to raphael objs
    var d3_raphael_obj_from_dom = function(domElems, d3_paper) {
        // don't do a paper.getById for every elem because that's n^2.
        // traverse the linked list ourselves. still m+n, but oh well.

        var elemCount = domElems.length;

        // but first build an index of ids we're looking for
        var domElemIndex = {};
        for (var i = -1; ++i < elemCount;) {
            var domElem = domElems[i];
            domElemIndex[domElem.raphaelid] = true;
        }

        var raphaelElems = [];
        var bot = d3_paper.paper.bottom;
        while (bot && (raphaelElems.length < elemCount)) {
            if (domElemIndex[bot.id]) {
                raphaelElems.push(bot);
            }
            bot = bot.next;
        }
        return raphaelElems;
    };

    // override root functions
    D3RaphaelRoot.prototype.select = function(s) {
        return d3_raphael_selection([d3_raphael_obj_from_dom(Sizzle(s, this.paper.canvas)[0], this)], this);
    };
    D3RaphaelRoot.prototype.selectAll = function(s) {
        return d3_raphael_selection([d3_raphael_obj_from_dom(Sizzle.uniqueSort(Sizzle(s, this.paper.canvas)), this)], this);
    };

}

