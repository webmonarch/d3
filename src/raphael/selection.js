var d3_raphael_selection = function(groups, d3_raphael_root) {
    d3_arraySubclass(groups, d3_raphael_selectionPrototype);
    groups.root = d3_raphael_root;

    return groups;
};

var d3_raphael_selectionPrototype = [];

// todo: see if it is possible to generalize this method from the almost identical one in d3
d3_raphael_selectionPrototype.data = function(value, key) {
    var i = -1,
        n = this.length,
        group,
        node;

    // If no value is specified, return the first value.
    if (!arguments.length) {
        value = new Array(n = (group = this[0]).length);
        while (++i < n) {
            if (node = group[i]) {
                value[i] = node.__data__;
            }
        }
        return value;
    }

    function bind(group, groupData) {
        var i,
            n = group.length,
            m = groupData.length,
            n0 = Math.min(n, m),
            n1 = Math.max(n, m),
            updateNodes = [],
            enterNodes = [],
            exitNodes = [],
            node,
            nodeData;

        if (key) {
            var nodeByKeyValue = new d3_Map,
                keyValues = [],
                keyValue,
                j = groupData.length;

            for (i = -1; ++i < n;) {
                keyValue = key.call(node = group[i], node.__data__, i);
                if (nodeByKeyValue.has(keyValue)) {
                    exitNodes[j++] = node; // duplicate key
                } else {
                    nodeByKeyValue.set(keyValue, node);
                }
                keyValues.push(keyValue);
            }

            for (i = -1; ++i < m;) {
                keyValue = key.call(groupData, nodeData = groupData[i], i)
                if (nodeByKeyValue.has(keyValue)) {
                    updateNodes[i] = node = nodeByKeyValue.get(keyValue);
                    node.__data__ = nodeData;
                    enterNodes[i] = exitNodes[i] = null;
                } else {
                    enterNodes[i] = d3_selection_dataNode(nodeData);
                    updateNodes[i] = exitNodes[i] = null;
                }
                nodeByKeyValue.remove(keyValue);
            }

            for (i = -1; ++i < n;) {
                if (nodeByKeyValue.has(keyValues[i])) {
                    exitNodes[i] = group[i];
                }
            }
        } else {
            for (i = -1; ++i < n0;) {
                node = group[i];
                nodeData = groupData[i];
                if (node) {
                    node.__data__ = nodeData;
                    updateNodes[i] = node;
                    enterNodes[i] = exitNodes[i] = null;
                } else {
                    enterNodes[i] = d3_selection_dataNode(nodeData);
                    updateNodes[i] = exitNodes[i] = null;
                }
            }
            for (; i < m; ++i) {
                enterNodes[i] = d3_selection_dataNode(groupData[i]);
                updateNodes[i] = exitNodes[i] = null;
            }
            for (; i < n1; ++i) {
                exitNodes[i] = group[i];
                enterNodes[i] = updateNodes[i] = null;
            }
        }

        enterNodes.update
            = updateNodes;

        enterNodes.parentNode
            = updateNodes.parentNode
            = exitNodes.parentNode
            = group.parentNode;

        enter.push(enterNodes);
        update.push(updateNodes);
        exit.push(exitNodes);
    }

    var enter = d3_raphael_enterSelection([], this.root),
        update = d3_raphael_selection([], this.root),
        exit = d3_raphael_selection([], this.root);

    if (typeof value === "function") {
        while (++i < n) {
            bind(group = this[i], value.call(group, group.parentNode.__data__, i));
        }
    } else {
        while (++i < n) {
            bind(group = this[i], value);
        }
    }

    update.enter = function() { return enter; };
    update.exit = function() { return exit; };
    return update;
};

d3_raphael_selectionPrototype.append = function(type) {
    var groups = [],
        group,
        nodeData;

    for(var j = 0; j < this.length; j++) {
        groups.push((group = []));

        for(var i = 0; i < this[j].length; i++) {
            if((nodeData = this[j][i])) {
                var newNode = this.root.create(type);

                if("__data__" in nodeData)
                    newNode.__data__ = nodeData.__data__;

                group.push(newNode);
            } else {
                group.push(null);
            }
        }
    }

    return d3_raphael_selection(groups, this.root);
}

d3_raphael_selectionPrototype.attr = function(name, value) {
    var valueF = (typeof value === "function") ? value : function() { return value; };
    this.each(function() {
        var value = valueF.apply(this, arguments);

        switch(name) {
            case "class":
                this.addClass(value);
                break;
            default:
                this.attr(name, value);
        }

    });

    return this;
};

d3_raphael_selectionPrototype.classed = function(name, add) {
    var addF = d3_raphael_functify(add);

    this.each(function() {
        if(addF.apply(this, arguments))
            this.addClass(name);
        else
            throw_raphael_not_supported();
    })

    return this;
}

d3_raphael_selectionPrototype.select = function(type, f) {
    return this.root.select(type, f);
};

d3_raphael_selectionPrototype.selectAll = function(type, f) {
    return this.root.selectAll(type, f);
};


d3_raphael_selectionPrototype.each = d3_selectionPrototype.each;
d3_raphael_selectionPrototype.empty = d3_selectionPrototype.empty;
d3_raphael_selectionPrototype.node = d3_selectionPrototype.node;
d3_raphael_selectionPrototype.property = d3_selectionPrototype.property;
d3_raphael_selectionPrototype.call = d3_selectionPrototype.call;
d3_raphael_selectionPrototype.datum = d3_selectionPrototype.datum;

d3_raphael_selectionPrototype.style = throw_raphael_not_supported;
d3_raphael_selectionPrototype.text = throw_raphael_not_supported;
d3_raphael_selectionPrototype.html = throw_raphael_not_supported;
d3_raphael_selectionPrototype.insert = throw_raphael_not_supported;
d3_raphael_selectionPrototype.filter = throw_raphael_not_supported;
d3_raphael_selectionPrototype.sort = throw_raphael_not_supported;
d3_raphael_selectionPrototype.order = throw_raphael_not_supported;
d3_raphael_selectionPrototype.on = throw_raphael_not_supported;
d3_raphael_selectionPrototype.transition = throw_raphael_not_supported;
