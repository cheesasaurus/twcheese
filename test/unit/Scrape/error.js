import { scrapeErrorMessage } from '/twcheese/src/Scrape/error.js';
import { domSample } from '/twcheese/test/util.js';
const assert = require('assert');

describe('scrapeErrorMessage', function() {

    it('should return text from error message', function() {
        let actual = scrapeErrorMessage(domSample('error/content-only-error'));
        assert.equal('The command has expired', actual);
    });

    it('should return null when no error message', function() {
        let actual = scrapeErrorMessage(domSample('error/content-has-no-error'));
        assert.equal(null, actual);
    });

});