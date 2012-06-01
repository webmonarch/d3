
// manual selector
function d3_raphael_selector(s, d3_paper, first) {
    var found = [];

    var selectorParts = s.split('.');

    // get elem type if supplied
    var type = null;
    if (selectorParts[0] === '') {
        if (selectorParts.length === 1) {
            selectorParts = []; // blank string was passed
        } else {
            selectorParts.shift(); // starts with dot; discard empty string
        }
    } else {
        type = selectorParts.shift();
    }

    // rename for clarity; above code leaves requiredClasses
    var requiredClasses = selectorParts;

    // check function
    var isMatch = function(el) {
        // check type if necessary
        if (type && (el.type !== type)) {
            return false;
        }

        // check classes if necessary
        var classAttribute = el.node.getAttribute('class');
        var elClassIndex = {};
        if (classAttribute) {
            var elClasses = classAttribute.split(' ');
            for (var i = -1, m = elClasses.length; ++i < m;)
            {
                elClassIndex[elClasses[i]] = true;
            }
        }

        for (var i = -1, m = requiredClasses.length; ++i < m;) {
            if (!elClassIndex[requiredClasses[i]]) {
                return false;
            }
        }

        return true;
    };

    // actually check
    d3_paper.forEach(function(el) {
        if(isMatch(el)) {
            found.push(el);

            return !first; // break forEach for first only requests
        }
    })

    return found;
};

