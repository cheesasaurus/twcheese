import { scrapeResources } from '/twcheese/src/Scrape/res.js';
import { domSample } from '/twcheese/test/util.js';
const assert = require('assert');


describe('scrapeResources', function() {

    it('should handle every kind of resource shown', function() {
        let actual = scrapeResources(domSample('res/haul-all'));
        assert(actual.equals({wood: 27, stone: 20, iron: 33}));
    });

    it('should handle no wood shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-timber'));
        assert(actual.equals({wood: 0, stone: 20, iron: 33}));
    });

    it('should handle no clay shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-clay'));
        assert(actual.equals({wood: 28, stone: 0, iron: 24}));
    });

    it('should handle no iron shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-iron'));
        assert(actual.equals({wood: 27, stone: 20, iron: 0}));
    });
    
    it('should handle no resources of any kind shown', function() {
        let actual = scrapeResources(domSample('res/haul-nothing'));
        assert(actual.equals({wood: 0, stone: 0, iron: 0}));
    });

    it('should handle thousands separators', function() {
        let actual = scrapeResources(domSample('res/haul-thousands'));
        assert(actual.equals({wood: 2342, stone: 1337, iron: 6969}));
    });

});
