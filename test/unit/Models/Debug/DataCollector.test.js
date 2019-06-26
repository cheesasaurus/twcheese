import { DataCollector } from '/twcheese/src/Models/Debug/DataCollector.js';
const assert = require('assert');

let dc = new DataCollector({});

describe('DataCollector.censorCsrfInString', function() {

    it('should censor h param in url query string', function() {
        let original = 'action=do_it&h=c84bd46&extra=69';
        assert.equal('action=do_it&h=CENSORED&extra=69', dc.censorCsrfInString(original));
    });

    it('should censor h param at end of url query string', function() {
        let original = 'action=do_it&h=c84bd46';
        assert.equal('action=do_it&h=CENSORED', dc.censorCsrfInString(original));
    });

    it('should censor h param at start of url query string', function() {
        let original = 'game.php?h=c84bd46&action=do_it';
        assert.equal('game.php?h=CENSORED&action=do_it', dc.censorCsrfInString(original));
    });

    it('should censor h param in url query string, html', function() {
        let original = 'action=do_it&amp;h=c84bd46&amp;extra=69';
        assert.equal('action=do_it&amp;h=CENSORED&amp;extra=69', dc.censorCsrfInString(original));
    });

    it('should censor h param at end of url query string, html', function() {
        let original = 'action=do_it&amp;h=c84bd46';
        assert.equal('action=do_it&amp;h=CENSORED', dc.censorCsrfInString(original));
    });

    it('should censor h param at start of url query string, html', function() {
        let original = 'game.php?h=c84bd46&amp;action=do_it';
        assert.equal('game.php?h=CENSORED&amp;action=do_it', dc.censorCsrfInString(original));
    });

    it('should censor inline script defining csrf_token, html', function() {
        let original = `var csrf_token = 'c84bd46';`;
        assert.equal(`var csrf_token = 'CENSORED';`, dc.censorCsrfInString(original));
    });

    it('should censor inline script defining csrf prop, html', function() {
        let original = `screen=","csrf":"c84bd46","world`;
        assert.equal(`screen=","csrf":"CENSORED","world`, dc.censorCsrfInString(original));
    });

});

describe('DataCollector.scrub', function() {

    it('should censor csrf prop shallow', function() {
        let original = {
            market: 'en',
            csrf: 'c84bd46',
            world: 'en69'
        };
        let expected = {
            market: 'en',
            csrf: 'CENSORED',
            world: 'en69'
        };
        assert.deepEqual(expected, dc.scrub(original));
    });

    it('should censor csrf prop deep', function() {
        let original = {
            market: 'en',
            larry: {
                moe: 'curly',
                csrf: 'c84bd46',
            }
        };
        let expected = {
            market: 'en',
            larry: {
                moe: 'curly',
                csrf: 'CENSORED',
            }
        };
        assert.deepEqual(expected, dc.scrub(original));
    });

    it('should censor birthdate prop shallow', function() {
        let original = {
            name: 'cheesasaurus',
            birthdate: '1969-06-09',
            points: 9001
        };
        let expected = {
            name: 'cheesasaurus',
            birthdate: 'CENSORED',
            points: 9001
        };
        assert.deepEqual(expected, dc.scrub(original));
    });

    it('should censor birthdate prop deep', function() {
        let original = {
            market: 'en',
            player: {
                name: 'cheesasaurus',
                birthdate: '1969-06-09'
            }
        };
        let expected = {
            market: 'en',
            player: {
                name: 'cheesasaurus',
                birthdate: 'CENSORED'
            }
        };
        assert.deepEqual(expected, dc.scrub(original));
    });

});