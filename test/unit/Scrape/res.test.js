import { scrapeResources } from '../../../src/Scrape/res.js';
const fs = require('fs');
const assert = require('assert');

// init dom and jquery
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = window;
global.document = document;
global.jQuery = require('jquery')(window);
global.$ = jQuery;


function domSample(filename) {
    let html = fs.readFileSync(`test/data/html/${filename}`).toString();
    return jQuery.parseHTML(html);
}


describe('scrapeResources', function() {

    it('should handle every kind of resource shown', function() {
        let actual = scrapeResources(domSample('haul-all'));
        assert.deepEqual({timber: 27, clay: 20, iron: 33}, actual);
    });

    it('should handle no timber shown', function() {
        let actual = scrapeResources(domSample('haul-no-timber'));
        assert.deepEqual({timber: 0, clay: 20, iron: 33}, actual);
    });

    it('should handle no clay shown', function() {
        let actual = scrapeResources(domSample('haul-no-clay'));
        assert.deepEqual({timber: 28, clay: 0, iron: 24}, actual);
    });

    it('should handle no iron shown', function() {
        let actual = scrapeResources(domSample('haul-no-iron'));
        assert.deepEqual({timber: 27, clay: 20, iron: 0}, actual);
    });
    
    it('should handle no resources of any kind shown', function() {
        let actual = scrapeResources(domSample('haul-nothing'));
        assert.deepEqual({timber: 0, clay: 0, iron: 0}, actual);
    });

    it('should handle thousands separators', function() {
        let actual = scrapeResources(domSample('haul-thousands'));
        assert.deepEqual({timber: 2342, clay: 1337, iron: 6969}, actual);
    });

});
