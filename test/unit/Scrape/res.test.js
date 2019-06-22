import { scrapeResources } from '/twcheese/src/Scrape/res.js';
import { domSample } from '/twcheese/test/util.js';
const assert = require('assert');


describe('scrapeResources', function() {

    it('should handle every kind of resource shown', function() {
        let actual = scrapeResources(domSample('res/haul-all'));
        assert(actual.equals({timber: 27, clay: 20, iron: 33}));
    });

    it('should handle no timber shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-timber'));
        assert(actual.equals({timber: 0, clay: 20, iron: 33}));
    });

    it('should handle no clay shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-clay'));
        assert(actual.equals({timber: 28, clay: 0, iron: 24}));
    });

    it('should handle no iron shown', function() {
        let actual = scrapeResources(domSample('res/haul-no-iron'));
        assert(actual.equals({timber: 27, clay: 20, iron: 0}));
    });
    
    it('should handle no resources of any kind shown', function() {
        let actual = scrapeResources(domSample('res/haul-nothing'));
        assert(actual.equals({timber: 0, clay: 0, iron: 0}));
    });

    it('should handle thousands separators', function() {
        let actual = scrapeResources(domSample('res/haul-thousands'));
        assert(actual.equals({timber: 2342, clay: 1337, iron: 6969}));
    });

});
