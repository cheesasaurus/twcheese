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
        let actual = parseArrival('Jul 08, 2019  19:36:07:906', 'en');
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

    it('should handle en format with leading tab', function() {
        let actual = parseArrival("\tJul 08, 2019  19:36:07:906", 'en');
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

    it('should handle en format with leading spaces', function() {
        let actual = parseArrival("    Jul 08, 2019  19:36:07:906", 'en');
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

    it('should handle en format with millis disabled', function() {
        let actual = parseArrival('Jul 08, 2019  19:36:07', 'en');
        let expected = {
            year: 2019,
            month: 6,
            date: 8,
            hours: 19,
            minutes: 36,
            seconds: 7,
            millis: 0
        };
        assertServerTime(expected, actual);
    });

    it('should handle cz format', function() {
        let actual = parseArrival('10.07.19 04:43:15:967', 'cz');
        let expected = {
            year: 2019,
            month: 6,
            date: 10,
            hours: 4,
            minutes: 43,
            seconds: 15,
            millis: 967
        };
        assertServerTime(expected, actual);
    });

    it('should handle cz format with leading tab', function() {
        let actual = parseArrival("\t10.07.19 04:43:15:967", 'cz');
        let expected = {
            year: 2019,
            month: 6,
            date: 10,
            hours: 4,
            minutes: 43,
            seconds: 15,
            millis: 967
        };
        assertServerTime(expected, actual);
    });

    it('should handle cz format with leading spaces', function() {
        let actual = parseArrival("    10.07.19 04:43:15:967", 'cz');
        let expected = {
            year: 2019,
            month: 6,
            date: 10,
            hours: 4,
            minutes: 43,
            seconds: 15,
            millis: 967
        };
        assertServerTime(expected, actual);
    });

    it('should handle cz format with millis disabled', function() {
        let actual = parseArrival('10.07.19 04:43:15', 'cz');
        let expected = {
            year: 2019,
            month: 6,
            date: 10,
            hours: 4,
            minutes: 43,
            seconds: 15,
            millis: 0
        };
        assertServerTime(expected, actual);
    });

    it('should handle pt format', function() {
        let actual = parseArrival('09/jul/2019 (20:03:15):895', 'pt');
        let expected = {
            year: 2019,
            month: 6,
            date: 9,
            hours: 20,
            minutes: 3,
            seconds: 15,
            millis: 895
        };
        assertServerTime(expected, actual);
    });

    it('should handle pt format with leading tab', function() {
        let actual = parseArrival("\t09/jul/2019 (20:03:15):895", 'pt');
        let expected = {
            year: 2019,
            month: 6,
            date: 9,
            hours: 20,
            minutes: 3,
            seconds: 15,
            millis: 895
        };
        assertServerTime(expected, actual);
    });

    it('should handle pt format with leading spaces', function() {
        let actual = parseArrival("    09/jul/2019 (20:03:15):895", 'pt');
        let expected = {
            year: 2019,
            month: 6,
            date: 9,
            hours: 20,
            minutes: 3,
            seconds: 15,
            millis: 895
        };
        assertServerTime(expected, actual);
    });

    it('should handle pt format with millis disabled', function() {
        let actual = parseArrival('09/jul/2019 (20:03:15)', 'pt');
        let expected = {
            year: 2019,
            month: 6,
            date: 9,
            hours: 20,
            minutes: 3,
            seconds: 15,
            millis: 0
        };
        assertServerTime(expected, actual);
    });

    it('should handle br format', function() {
        let actual = parseArrival('mai 20, 2020  11:54:33:503', 'br');
        let expected = {
            year: 2020,
            month: 4,
            date: 20,
            hours: 11,
            minutes: 54,
            seconds: 33,
            millis: 503
        };
        assertServerTime(expected, actual);
    });

    it('should handle br format with leading tab', function() {
        let actual = parseArrival("\tmai 20, 2020  11:54:33:503", 'br');
        let expected = {
            year: 2020,
            month: 4,
            date: 20,
            hours: 11,
            minutes: 54,
            seconds: 33,
            millis: 503
        };
        assertServerTime(expected, actual);
    });

    it('should handle br format with leading spaces', function() {
        let actual = parseArrival("    mai 20, 2020  11:54:33:503", 'br');
        let expected = {
            year: 2020,
            month: 4,
            date: 20,
            hours: 11,
            minutes: 54,
            seconds: 33,
            millis: 503
        };
        assertServerTime(expected, actual);
    });

    it('should handle br format with millis disabled', function() {
        let actual = parseArrival('mai 20, 2020  11:54:33', 'br');
        let expected = {
            year: 2020,
            month: 4,
            date: 20,
            hours: 11,
            minutes: 54,
            seconds: 33,
            millis: 0
        };
        assertServerTime(expected, actual);
    });

});