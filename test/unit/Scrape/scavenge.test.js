import {
    wrappedCode,
    findScavengeScreenJsCode,
    findScavengeScreenParamCode,
    parseScavengeScreenParamCode,
    findVillageCode,
    scrapeScavengeData,
    scrapeScavengeModels,
    scrapeAvailableTroopCounts,
    scrapeUsableOptionIds
} from '/twcheese/src/Scrape/scavenge.js';

import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';
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


describe('findVillageCode', function() {

    it('should work', function() {
        let jsCode = fs.readFileSync(`test/data/html/scavenge/scavenge-screen-js-code`).toString();
        let expected = fs.readFileSync(`test/data/html/scavenge/village-code`).toString();
        assert.equal(expected, findVillageCode(jsCode));
    });

});


describe('scrapeScavengeData', function() {

    it('should work', function() {
        let content = domSample('scavenge/content-is-scavenging-screen');
        let data = scrapeScavengeData(content);

        assert.equal('Lackadaisical Looters', data.optionsConfig[1].name);

        assert.equal('Spear fighter', data.troops.spear.name);

        assert.equal(200, data.village.options[1].scavenging_squad.unit_counts.spear);
    });

});


describe('scrapeScavengeModels', function() {

    it('should work', function() {
        let content = domSample('scavenge/content-is-scavenging-screen');
        let models = scrapeScavengeModels(content);
        
        assert(models.options instanceof Map);
        assert(models.options.get(1) instanceof ScavengeOption);
        assert.equal(10, models.options.get(1).getLootPercent());
        assert.equal(25, models.options.get(2).getLootPercent());
        assert.equal(50, models.options.get(3).getLootPercent());
        assert.equal(75, models.options.get(4).getLootPercent());

        assert.deepEqual(['spear', 'sword', 'axe', 'light', 'heavy', 'knight'], models.sendableTroopTypes);

        assert.equal(1, models.haulFactor);
    });

});


describe('scrapeAvailableTroopCounts', function() {

    it('should work', function() {
        let content = domSample('scavenge/content-is-scavenging-screen');

        let troopCounts = scrapeAvailableTroopCounts(content);
        assert.equal(0, troopCounts.spear);
        assert.equal(9, troopCounts.sword);
        assert.equal(0, troopCounts.axe);
        assert.equal(0, troopCounts.spy);
        assert.equal(6, troopCounts.light);
        assert.equal(0, troopCounts.heavy);
        assert.equal(1, troopCounts.knight);
    });

});


describe('scrapeUsableOptionIds', function() {

    it('should handle all usable', function() {
        let content = domSample('scavenge/scavenging-screen-all-unlocked-all-usable');
        assert.deepEqual([1, 2, 3, 4], scrapeUsableOptionIds(content));
    });

    it('should handle all unlocked, with none usable', function() {
        let content = domSample('scavenge/scavenging-screen-all-unlocked-none-usable');
        assert.deepEqual([], scrapeUsableOptionIds(content));
    });

    it('should handle all unlocked, with only first usable', function() {
        let content = domSample('scavenge/scavenging-screen-all-unlocked-only-first-usable');
        assert.deepEqual([1], scrapeUsableOptionIds(content));
    });

    it('should handle all unlocked, with only second usable', function() {
        let content = domSample('scavenge/scavenging-screen-all-unlocked-only-second-usable');
        assert.deepEqual([2], scrapeUsableOptionIds(content));
    });

    it('should handle all unlocked, with only first not usable', function() {
        let content = domSample('scavenge/scavenging-screen-all-unlocked-first-not-usable');
        assert.deepEqual([2, 3, 4], scrapeUsableOptionIds(content));
    });    

});
