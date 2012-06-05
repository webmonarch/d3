
// manual selector
function d3_raphael_selector(s, d3_paper, first) {
    var found = [];

    var selectorParts = s.split('.');

    // get elem type if supplied
    var type = null;
    if (selectorParts[0] === '') {
        // either selectorParts is [''] meaning it was a blank string, or
        // it starts with '' which means we started with a dot. either way
        // discard the first element and things resolve.
        selectorParts.shift();
    } else {
        // first element is actually a string, meaning it's a type selector.
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
        if (requiredClasses.length > 0) {
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

