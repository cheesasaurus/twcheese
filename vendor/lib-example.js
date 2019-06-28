/*!
 * this is just an example of a library
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        throw new Error('unwanted: AMD module instead of window');
    } else if (typeof exports === 'object') {
        throw new Error('unwanted: CommonJS module instead of window');
    } else if (typeof module === 'object' && module.exports) {
        throw new Error('unwanted: Node module instead of window');
    } else {
        root.twcheeseExampleLib = factory();
    }
})(this, function() {
    return {
        nice: () => 69
    };
});