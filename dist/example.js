(function() {
    let script = '/src/ToolSetup/example.js';

    if (typeof window.TwCheese === 'undefined') {
        window.TwCheese = {
            ROOT: 'https://cheesasaurus.github.io/twcheese',
            scripts: [],
            actions: {},
            prepareScript: function(script, onready) {
                let module = document.createElement('script');
                module.type = 'module';
                module.onload = () => {
                    console.log('loaded module successfully');
                    this.scripts.push(script);
                    onready();
                }
                module.src = this.ROOT + script;
                document.head.appendChild(module);
            }
        };
    }

    if (!TwCheese.scripts.includes(script)) {
        // compiled from https://cheesasaurus.github.io/twcheese/src/ToolSetup/example.js
        !function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);let r=new class{describeEven(){return"Even Steven"}describeOdd(){return"Odd Todd"}};window.TwCheese.actions.exampleEven=function(){alert(r.describeEven())},window.TwCheese.actions.exampleOdd=function(){alert(r.describeOdd())}}]);

        TwCheese.scripts.push(script);
    }

    if (game_data.player.id % 2 === 0) {
        TwCheese.actions.exampleEven();
    } else {
        TwCheese.actions.exampleOdd();
    }
})();