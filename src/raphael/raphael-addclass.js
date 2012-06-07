if(typeof Raphael !== "undefined") {
    // Inspiration (and code copied): http://strongriley.github.com/d3/ex/calendar.html (-ewebb 120430)

// From: http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript#quickIDX1
    function d3_raphael_getCSSRule(ruleName, deleteFlag) {                     // Return requested style obejct
        ruleName = ruleName.toLowerCase();                          // Convert test string to lower case.
        if (document.styleSheets) {                                 // If browser can play with stylesheets
            for (var i = 0; i < document.styleSheets.length; i++) { // For each stylesheet
                var styleSheet = document.styleSheets[i];           // Get the current Stylesheet
                var ii = 0;                                         // Initialize subCounter.
                var cssRule = false;                                // Initialize cssRule.
                do {                                                    // For each rule in stylesheet
                    if (styleSheet.cssRules) {                      // Browser uses cssRules?
                        cssRule = styleSheet.cssRules[ii];          // Yes --Mozilla Style
                    } else {                                        // Browser usses rules?
                        cssRule = styleSheet.rules[ii];             // Yes IE style.
                    }                                               // End IE check.
                    if (cssRule) {                                  // If we found a rule...
                        if (cssRule.selectorText.toLowerCase() == ruleName) { //  match ruleName?
                            if (deleteFlag == 'delete') {               // Yes.  Are we deleteing?
                                if (styleSheet.cssRules) {              // Yes, deleting...
                                    styleSheet.deleteRule(ii);          // Delete rule, Moz Style
                                } else {                                // Still deleting.
                                    styleSheet.removeRule(ii);          // Delete rule IE style.
                                }                                       // End IE check.
                                return true;                            // return true, class deleted.
                            } else {                                    // found and not deleting.
                                return cssRule;                         // return the style object.
                            }                                           // End delete Check
                        }                                               // End found rule name
                    }                                                   // end found cssRule
                    ii++;                                               // Increment sub-counter
                } while (cssRule)                                       // end While loop
            }                                                           // end For loop
        }                                                               // end styleSheet ability check
        return false;                                                   // we found NOTHING!
    }                                                                   // end getCSSRule

    function d3_raphael_getCSSAttributes(selector) {
        var rules = d3_raphael_getCSSRule(selector),
            attributes = {};
        if (!rules) return false;
        rules = rules.style.cssText.split(';');
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i].split(':');
            if (rule[0] !== undefined && rule[1] !== undefined)
                var key = rule[0].replace(' ',''),
                    value = rule[1].replace(' ','');
            attributes[key] = value;
        }
        return attributes;
    }

    function d3_raphael_addClassesToClassName(className, addClass) {
        // adapted from jQuery addClass()
        var addClasses = addClass.split(' ');

        var setClass = ' ' + className + ' ';
        for (var i = -1, m = addClasses.length; ++i < m;) {
            if (!~setClass.indexOf(' ' + addClasses[i] + ' ')) {
                setClass += addClasses[i] + ' ';
            }
        }
        return setClass.slice(1, -1);
    }

    Raphael.st.addClass = function(addClass, parentSelector) {
        //Simple set Attribute class if SVG
        if (Raphael.svg) {
            for (var i = 0; i < this.length; i++) {
                this[i].addClass(addClass)
            };
        }
        //For IE
        else {
            var sel = '.' + addClass;
            sel = parentSelector ? parentSelector + ' ' + sel : sel;
            var attributes = d3_raphael_getCSSAttributes(sel);
            for (var i = 0; i < this.length; i++) {
                this[i].attr(attributes);
                this[i].node.className = d3_raphael_addClassesToClassName(this[i].node.className, addClass);
            }
        }
    }

    Raphael.el.addClass = function(addClass, parentSelector) {
        //easily add class
        if (Raphael.svg) {
            var cssClass = this.node.getAttribute('class') !== null ? this.node.getAttribute('class') + ' ' + addClass : addClass;
            this.node.setAttribute('class', cssClass);
        }
        //must extract CSS requirements
        else {
            var sel = '.' + addClass;
            sel = parentSelector ? parentSelector + ' ' + sel : sel;

            var attributes = d3_raphael_getCSSAttributes(sel);
            this.attr(attributes);
            this.node.className = d3_raphael_addClassesToClassName(this.node.className, addClass);
        }
    }
}
