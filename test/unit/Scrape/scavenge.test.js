import { wrappedCode, findScavengeScreenJsCode, findScavengeScreenParamCode, parseScavengeScreenParamCode } from '/twcheese/src/Scrape/scavenge.js';
import { domSample } from '/twcheese/test/util.js';
const assert = require('assert');
const fs = require('fs');



describe('wrappedCode', function() {
    
    it('should return code wrapped in parens', function() {
        let code = 'bob (joe (sally) sue) jimmy john';
        let openingParenIndex;

        openingParenIndex = 4;
        assert.equal('(joe (sally) sue)', wrappedCode(code, openingParenIndex, '(', ')'));

        openingParenIndex = 9;
        assert.equal('(sally)', wrappedCode(code, openingParenIndex, '(', ')'));
    });


    it('should return code wrapped in curly brackets', function() {
        let code = 'bob {joe {sally} sue} jimmy john';
        let openingParenIndex;

        openingParenIndex = 4;
        assert.equal('{joe {sally} sue}', wrappedCode(code, openingParenIndex, '{', '}'));

        openingParenIndex = 9;
        assert.equal('{sally}', wrappedCode(code, openingParenIndex, '{', '}'));
    });

});


describe('findScavengeScreenJsCode', function() {

    it('should work', function() {
        let content = domSample('scavenge/content-is-scavenging-screen');
        let expected = fs.readFileSync(`test/data/html/scavenge/scavenge-screen-js-code`).toString();
        assert.equal(expected.trim(), findScavengeScreenJsCode(content).trim());
    });

});


describe('findScavengeScreenParamCode', function() {

    it('should work', function() {
        let jsCode = fs.readFileSync(`test/data/html/scavenge/scavenge-screen-js-code`).toString();
        let expected = fs.readFileSync(`test/data/html/scavenge/scavenge-screen-param-code`).toString();
        assert.equal(expected, findScavengeScreenParamCode(jsCode));
    });

});


describe('parseScavengeScreenParamCode', function() {

    it('should work', function() {
        let code = fs.readFileSync(`test/data/html/scavenge/scavenge-screen-param-code`).toString();
        let data = parseScavengeScreenParamCode(code);

        assert.equal('Lackadaisical Looters', data.optionsConfig[1].name);
        assert.equal('Humble Haulers', data.optionsConfig[2].name);
        assert.equal('Clever Collectors', data.optionsConfig[3].name);
        assert.equal('Great Gatherers', data.optionsConfig[4].name);

        assert.equal('Spear fighter', data.troops.spear.name);
        assert.equal('Swordsman', data.troops.sword.name);
    });

});