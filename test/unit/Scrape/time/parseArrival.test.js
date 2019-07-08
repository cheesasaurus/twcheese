import { parseArrival } from '/twcheese/src/Scrape/time.js';
const assert = require('assert');


/**
 * @param {object} expected 
 * @param {TwCheeseDate} actual 
 */
function assertServerTime(expected, actual) {
    assert.equal(expected.year, actual.getServerYear());
    assert.equal(expected.month, actual.getServerMonth());
    assert.equal(expected.date, actual.getServerDate());
    assert.equal(expected.hours, actual.getServerHours());
    assert.equal(expected.minutes, actual.getServerMinutes());
    assert.equal(expected.seconds, actual.getServerSeconds());
    assert.equal(expected.millis, actual.getServerMilliseconds());
}


describe('parseArrival', function() {

    it('should handle en format', function() {
        let actual = parseArrival('Jul 08, 2019  19:36:07:906');
        let expected = {
            year: 2019,
            month: 6,
            date: 8,
            hours: 19,
            minutes: 36,
            seconds: 7,
            millis: 906
        };
        assertServerTime(expected, actual);
    });

    xit('should handle pt format', function() {
        // todo
    });

});