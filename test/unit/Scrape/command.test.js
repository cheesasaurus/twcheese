import { Command } from '/twcheese/src/Models/Command.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';

const fs = require('fs');
const assert = require('assert');


function domSample(filename) {
    let html = fs.readFileSync(`test/data/html/${filename}`).toString();
    return jQuery.parseHTML(html.trim());
}

function assertCommand(actual, propsExpected) {
    assert(actual instanceof Command);
    assert.deepEqual(propsExpected, actual);
}


describe('scrapeCommand', function() {

    it('should handle attack to player', function() {
        let actual = scrapeCommand(domSample('attack-to-player'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 18, 56, 8, 775),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

    it('should handle attack to playerless', function() {
        let actual = scrapeCommand(domSample('attack-to-playerless'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 17, 15, 59, 375),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });    

    it('should handle attack return with haul', function() {
        let actual = scrapeCommand(domSample('attack-return-with-haul'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 18, 5, 33, 52, 0),
            timber: 14,
            clay: 16,
            iron: 2,
            haulCapacity: 80
        });
    });

    it('should handle attack return without haul', function() {
        let actual = scrapeCommand(domSample('attack-return-without-haul'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 18, 31, 42, 0),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

    it('should handle support to player', function() {
        let actual = scrapeCommand(domSample('support-to-player'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 19, 3, 28, 595),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

    it('should handle support to playerless', function() {
        let actual = scrapeCommand(domSample('support-to-playerless'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 19, 12, 53, 99),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

    it('should handle support return from barb'); // todo: get a sample

    it('should handle support return from player'); // todo: get a sample

    it('should handle attack cancelled', function() {
        let actual = scrapeCommand(domSample('attack-cancelled'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 18, 9, 50, 5),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

    it('should handle support cancelled', function() {
        let actual = scrapeCommand(domSample('support-cancelled'));
        assertCommand(actual, {
            arrival: TwCheeseDate.newServerDate(2019, 5, 17, 18, 8, 29, 99),
            timber: 0,
            clay: 0,
            iron: 0,
            haulCapacity: 0
        });
    });

});