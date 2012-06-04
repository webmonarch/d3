var d3_raphael_transitionPrototype = [];

/**
 * Specifies an attribute to be animated.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Selections#wiki-attr">d3.selection.attr()</a>
 * @param {String} name property name
 * @param value property value
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#attr
 */
d3_raphael_transitionPrototype.attr = d3_transitionPrototype.attr;

d3_raphael_transitionPrototype.attrTween = function(name, tween) {
    function attrTween(d, i) {
        var f = tween.call(this, d, i, this.attr(name));
        return f === d3_transitionRemove
            ? (this.attr(name, null), null)
            : f && function(t) { this.attr(name, f(t)); };
    }

    return this.tween('attr.' + name, attrTween);
};

/**
 * Specifies an amount of time to delay before transitioning.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Transition#wiki-delay">transition.delay()</a>
 * @param value delay in ms
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#delay
 */
d3_raphael_transitionPrototype.delay = d3_transitionPrototype.duration;

/**
 * Specifies a duration for the transition.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Transition#wiki-duration">transition.duration()</a>
 * @param value length in ms
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#duration
 */
d3_raphael_transitionPrototype.duration = d3_transitionPrototype.duration;

/**
 * Specifies a transition easing function.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Transition#wiki-ease">transition.ease()</a>
 * @param value string or function
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#ease
 */
d3_raphael_transitionPrototype.duration = d3_transitionPrototype.duration;

/**
 * Sets the text content when the transition begins.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Selections#wiki-text">d3.selection.text()</a>
 * @param value property value
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#text
 */
d3_raphael_transitionPrototype.text = d3_raphael_selectionPrototype.text;

/**
 * Removes elements after transitions are completed.
 *
 * @see <a href="https://github.com/mbostock/d3/wiki/Transition#wiki-remove">transition.remove()</a>
 * @return {D3RaphaelTransitionSelection} this
 *
 * @function
 * @name D3RaphaelTransitionSelection#remove
 */
d3_raphael_transitionPrototype.remove = d3_transitionPrototype.remove;

d3_raphael_transitionPrototype.style = throw_raphael_not_supported;
d3_raphael_transitionPrototype.styleTween = throw_raphael_not_supported;
d3_raphael_transitionPrototype.select = throw_raphael_not_supported;
d3_raphael_transitionPrototype.selectAll = throw_raphael_not_supported;

