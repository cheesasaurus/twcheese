const assert = require('assert');

describe('external library initializer', function() {

    it('should force modules to window', function() {
        initLibsToWindow();
        assert.equal(69, window.ExampleLib.nice());        
    });

});


function initLibsToWindow() {
    (function() {
        // thwart environment sniffing
        let define, exports, module;

        // begin library using UMD ///////////////////////////////////////
        //
        (function(root, factory) {
            if (typeof define === 'function' && define.amd) {
                throw new Error('unwanted: AMD module instead of window');
            } else if (typeof exports === 'object') {
                throw new Error('unwanted: CommonJS module instead of window');
            } else if (typeof module === 'object' && module.exports) {
                throw new Error('unwanted: Node module instead of window');
            } else {
                root.ExampleLib = factory();
            }
        })(this, function() {
            return {
                nice: () => 69
            };
        });
        //
        // end library using UMD /////////////////////////////////////////

    }).call(window);
}