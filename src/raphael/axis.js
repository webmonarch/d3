d3.raphael.axis = function() {
    var scale = d3.scale.linear(),
        orient = "bottom",
        tickMajorSize = 6,
        tickMinorSize = 6,
        tickEndSize = 6,
        tickPadding = 3,
        tickArguments_ = [10],
        tickValues = null,
        tickFormat_,
        tickSubdivide = 0;

    // todo: work-around because we don't have groups
    var top = 0,
        left = 0;

    // todo: work-around because we don't have stylesheet
    var classPrefix = "";

    // todo: figure out if we can refactor to reuse code

    function axis(selection) {

        selection.each(function() {
            var g = selection.root.select("");

            // Ticks, or domain values for ordinal scales.
            var ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain()) : tickValues,
                tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

            // Major ticks.
            var tick = g.selectAll("g").data(ticks, String),
                tickEnter = tick.enter().append("path")
                    .classed(classPrefix + "path", true)
//                tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
//                tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
//                tickUpdate = d3.transition(tick).style("opacity", 1),
//                tickTransform;

            var text = tick.append("text")
                .attr("text", tickFormat );

            // Domain.
            var range = d3_scaleRange(scale),
                path = g.selectAll(".domain").data([0]),
                pathEnter = path.enter().append("path")
                    .classed(classPrefix + "pathdomain", true)
//                pathEnter = path.enter().append("path").attr("class", "domain")
//                pathUpdate = d3.transition(path);

            // Stash a snapshot of the new scale, and retrieve the old snapshot.
            var scale1 = scale.copy(),
                scale0 = this.__chart__ || scale1;
            this.__chart__ = scale1;

            switch (orient) {
                case "top": {
                    tick.attr("path", function(d) { return d3_raphael_pathArrayToString([["M", [left + scale1(d), top]],["l", [0, -tickMajorSize]]]); });
                    text.attr("x", function(d) { return scale1(d) + left + (scale1.rangeBand? scale1.rangeBand() / 2.0 : 0); })
                        .attr("y", top- 7 ) // todo add dy support to raphael
                        .attr("text-anchor", "middle")
//                    path.attr("path", "M" + (-tickEndSize + left) + "," + (range[0] + top) + "h" + tickEndSize + "v" + (range[1] + top) + "h" + -tickEndSize)
                    path.attr("path", "M" + (range[0] + left) + "," + (-tickEndSize + top) + "v" + tickEndSize + "H" + (range[1] + left) + "v" + -tickEndSize)

                    break;
                }

                case "left": {
                    tick.attr("path", function(d) { return d3_raphael_pathArrayToString([["M", [left, scale1(d) + top]],["l", [-tickMajorSize,0]]]); });
                    path.attr("path", "M" + (-tickEndSize + left) + "," + (range[0] + top) + "h" + tickEndSize + "V" + (range[1] + top) + "h" + -tickEndSize)
                    text.attr("x", left - 5)
                        .attr("y", function(d) { return scale1(d) + top + (scale1.rangeBand? scale1.rangeBand() / 2.0 : 0); })
                        .attr("text-anchor", "end")

                    break;
                }

                default: {
                    throw "Unsupported " + orient;
                }
            }

//            // For quantitative scales:
//            // - enter new ticks from the old scale
//            // - exit old ticks to the new scale
//            if (scale.ticks) {
//                tickEnter.call(tickTransform, scale0);
//                tickUpdate.call(tickTransform, scale1);
//                tickExit.call(tickTransform, scale1);
//                subtickEnter.call(tickTransform, scale0);
//                subtickUpdate.call(tickTransform, scale1);
//                subtickExit.call(tickTransform, scale1);
//            }
//
//            // For ordinal scales:
//            // - any entering ticks are undefined in the old scale
//            // - any exiting ticks are undefined in the new scale
//            // Therefore, we only need to transition updating ticks.
//            else {
//                var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
//                tickEnter.call(tickTransform, x);
//                tickUpdate.call(tickTransform, x);
//            }




//            tick.attr("path", function(d) { return d3_raphael_pathArrayToString(
//                [["M", [left, scale(d) + top]],["l", [-6,0]]]
//            ); });
//
//            tick.append("text")
//                .attr("x", left - 2)
//                .attr("y", function(d) { return scale(d) + top + scale.rangeBand() / 2; })
//                .attr("text-anchor", "end")
//                .attr("text", function(d) { return d;} )
//
//            var range = d3_scaleRange(scale);
//            console.log(range);
//            g.select("rect")
//                .append("path")
//                .attr("path", d3_raphael_pathArrayToString([["M", [left, range[0] + top]],["L",[left, range[1] + top]]]))
        })
    }

    axis.scale = function(x) {
        if (!arguments.length) return scale;
        scale = x;
        return axis;
    };

    axis.orient = function(x) {
        if (!arguments.length) return orient;
        orient = x;
        return axis;
    };

    axis.tickSize = function(x, y, z) {
        if (!arguments.length) return tickMajorSize;
        var n = arguments.length - 1;
        tickMajorSize = +x;
        tickMinorSize = n > 1 ? +y : tickMajorSize;
        tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
        return axis;
    };

    axis.top = function(val) {
        if(typeof val === "undefined")
            return top;
        else
            top = val;

        return this;
    }

    axis.left = function(val) {
        if(typeof val === "undefined")
            return left;
        else
            left = val;

        return this;
    }

    axis.classPrefix = function(val) {
        if(typeof val === "undefined")
            return classPrefix;
        else
            classPrefix = val;

        return this;
    }

    return axis;
};