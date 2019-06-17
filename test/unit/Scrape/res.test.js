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
    it('should handle no clay', function() {
        let actual = scrapeResources(domSample('haul-no-clay'));
        assert.deepEqual({timber: 28, clay: 0, iron: 24}, actual);
    });
});
