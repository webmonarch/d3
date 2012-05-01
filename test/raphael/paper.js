require("./env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.raphael");

suite.addBatch({
    "Initialize" : {
        topic: new Raphael(document, 300, 300),

        "Paper": function(paper) {
            paper.rect(1,1,10,10);

            d3.raphael(paper)
        },

        "Paper is null": {},
    },

    "Methods:": {
        topic: function() {
            var paper = new Raphael(document, 300, 300);

            rect1 = paper.rect(0,0,10,20);
            rect2 = paper.rect(0,20,10,40);

            data = [5,10,20,40]; // to be used below

            return d3.raphael(paper);
        },

        "Select/SelectAll": {
            "select('rect') finds 1": function(d3_paper) {
                var selection = d3_paper.select("rect");

                assert.selectionSize(selection, 1, 1);
            },

            "selectAll('rect') finds 2": function(d3_paper) {
                var selection = d3_paper.selectAll("rect");

                assert.selectionSize(selection, 1, 2);
            },

            "selectAll('circle') finds 0": function(d3_paper) {
                var selection = d3_paper.selectAll("circle");

                assert.selectionSize(selection, 1, 0);
            },
        },

        "Attr": {
            topic: function(d3_paper) {
                return d3_paper.selectAll("rect");
            },

            "attr: width constant": function(selection) {
                selection.attr("width", 300);

                assert.equal(rect1.attr("width"), 300);
                assert.equal(rect2.attr("width"), 300);
            },

            "attr: width function": function(selection) {
                var widths = [10, 20];
                selection.attr("width", function(d,i) { return widths[i]; } )

                assert.equal(rect1.attr("width"), 10);
                assert.equal(rect2.attr("width"), 20);
            }
        },

        "Data:": {
            topic: function(d3_paper) {
                return d3_paper.selectAll("rect");
            },

            "Update:": {
                topic: function(selection, d3_paper) {
                    return selection.data(data);
                },

                "selection is 4": function(update_selection) {
                    assert.selectionSize(update_selection, 1, 4);

                    assert.isNotNull(update_selection[0][0]);
                    assert.isNotNull(update_selection[0][1]);
                    assert.isNull(update_selection[0][2]);
                    assert.isNull(update_selection[0][3]);
                },

                "attr: width function": function(update_selection) {
                    update_selection.attr("width", function(d, i) { return d; });

                    assert.equal(rect1.attr("width"), 5);
                    assert.equal(rect2.attr("width"), 10);
                },
            },

            "Enter:": {
                topic: function(selection) {
                    return selection.data(data).enter();
                },

                "selection is 4": function(enter_selection) {
                    assert.selectionSize(enter_selection, 1, 4);

                    assert.isNull(enter_selection[0][0])
                    assert.isNull(enter_selection[0][1])
                    assert.isNotNull(enter_selection[0][2])
                    assert.isNotNull(enter_selection[0][3])
                },

                "append: rect": function(enter_selection) {
                    var appended_selection = enter_selection.append("rect");

                    assert.isNull(appended_selection[0][0]);
                    assert.isNull(appended_selection[0][1]);
                    assert.isNotNull(appended_selection[0][2]);
                    assert.isNotNull(appended_selection[0][3]);
                },

                "append: rect; attr width data": function(enter_selection) {
                    var appended_selection = enter_selection.append("rect");
                    appended_selection.attr("width", function(d) { return d; });

                    assert.equal(appended_selection[0][2].attr("width"), 20);
                    assert.equal(appended_selection[0][3].attr("width"), 40);
                },
            }
        }
    },

    "Todo!!!": {
        "enter().append updates update selection": function() {},
        "append to root": function() {},
        "append on regular selections": function() {},
        "throw on unsupported primitive": function() {},
        "attr path and d are alias": function() {},
        "custom attributes": function() {},
        "root of root and subselection": function() {},
        "datum": function() {},
        "axis": function() {},
        "css class support": function() {},
    }
});

suite.export(module);
