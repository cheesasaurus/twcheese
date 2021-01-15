import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';
import { ScavengeTroopsAssigner } from '/twcheese/src/Models/ScavengeTroopsAssigner.js';
import { troopUtil, TroopCounts } from '/twcheese/src/Models/Troops.js';
const assert = require('chai').assert;
const fs = require('fs');

let optionBasesCode = fs.readFileSync(`test/data/html/scavenge/scavenge-option-bases-code`).toString();
let optionBases = JSON.parse(optionBasesCode);
let options = new Map([
    [1, new ScavengeOption(optionBases[1])],
    [2, new ScavengeOption(optionBases[2])],
    [3, new ScavengeOption(optionBases[3])],
    [4, new ScavengeOption(optionBases[4])],
]);

let sendableTroopTypes = ['spear', 'sword', 'axe', 'light', 'heavy', 'knight'];
let assigner = new ScavengeTroopsAssigner(options, sendableTroopTypes, troopUtil);


describe('ScavengeTroopsAssigner.adjustAvailableTroopCounts', function() {

    afterEach(function resetPreferences() {
        assigner.preferences.reset();
    });

    it(`should remove troop types that aren't wanted to scavenge with`, function() {
        assigner.preferences.troops.spear.maySend = false;

        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        available = assigner.adjustAvailableTroopCounts(available);
        assert.equal(0, available.spear);
        assert.equal(100, available.sword);
    });

    it(`should subtract reserved troops`, function() {
        assigner.preferences.troops.spear.reserved = 25;

        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        available = assigner.adjustAvailableTroopCounts(available);
        assert.equal(75, available.spear);
        assert.equal(100, available.sword);
    });

    it(`should not result in negative troop counts`, function() {
        assigner.preferences.troops.spear.reserved = 200;

        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        available = assigner.adjustAvailableTroopCounts(available);
        assert.equal(0, available.spear);
        assert.equal(100, available.sword);
    });

});


describe('ScavengeTroopsAssigner.adjustUsableOptionIds', function() {

    afterEach(function resetPreferences() {
        assigner.preferences.reset();
    });

    it(`should remove options that aren't wanted to be used`, function() {
        assigner.preferences.setOptionAllowed(1, false);
        let usableOptionIds = [1, 2, 3];
        assert.deepEqual([2, 3], assigner.adjustUsableOptionIds(usableOptionIds));
    });

});


describe('ScavengeTroopsAssigner.areTroopsSufficient', function() {

    it('should handle not enough 1-pop troops', function() {
        let available = new TroopCounts();
        available.spear = 9;
        assert.isFalse(assigner.areTroopsSufficient(available));
    });

    it('should handle enough 1-pop troops', function() {
        let available = new TroopCounts();
        available.spear = 10;
        assert.isTrue(assigner.areTroopsSufficient(available));
    });

    it('should handle not enough multi-pop troops', function() {
        let available = new TroopCounts();
        available.light = 2;
        assert.isFalse(assigner.areTroopsSufficient(available));
    });

    it('should handle enough multi-pop troops', function() {
        let available = new TroopCounts();
        available.light = 3;
        assert.isTrue(assigner.areTroopsSufficient(available));
    });

});


describe('ScavengeTroopsAssigner.chunkTroopsToHaul', function() {

    it('should handle buffed haul capacity', function() {
        let available = new TroopCounts();
        available.spear = 100;

        let factor = 1.1;
        let targetCapacity = 50*25 * factor;
        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, factor);
        assert.equal(50, assigned.spear);
    });

    it('should split troops in same chunk evenly', function() {
        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        let targetCapacity = 20*25 + 20*15;

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, 1);
        assert.equal(20, assigned.spear);
        assert.equal(20, assigned.sword);
    });

    it('should split troops in same chunk evenly, by troop count ratio', function() {
        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 200;

        let targetCapacity = 20*25 + 40*15;

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, 1);
        assert.equal(20, assigned.spear);
        assert.equal(40, assigned.sword);
    });

    it('should assign offense troops first', function() {
        let available = new TroopCounts();
        available.spear = 500;
        available.sword = 500;
        available.axe = 100;
        available.light = 100;

        let targetCapacity = 1*25 + 1*15 + 100*10 + 100*80;

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, 1);
        assert.equal(1, assigned.spear);
        assert.equal(1, assigned.sword);
        assert.equal(100, assigned.axe);
        assert.equal(100, assigned.light);
    });

    it('should not assign negative counts in later chunks when earlier chunks go over targetCapacity', function() {
        let available = new TroopCounts();
        available.spear = 1122;
        available.sword = 903;
        available.axe = 3590;
        available.light = 2023;
        available.heavy = 511;

        let targetCapacity = 16771;
        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, 1);
        assigned.each(function(troopType, count) {
            assert.isAtLeast(count, 0, `${troopType} count should not be negative`);
        });
    });

});


describe('ScavengeTroopsAssigner.assignTroopsForSanePerson', function() {
    it('should max-out duration of biggest options first', function() {
        let available = new TroopCounts();
        available.spear = 200;

        let usableOptionIds = [1, 2, 3, 4];

        let assignedByOption = assigner.assignTroopsForSanePerson(usableOptionIds, available, 1.0);

        assert.equal(89, assignedByOption.get(4).spear);
        assert.equal(111, assignedByOption.get(3).spear);
        assert.equal(0, assignedByOption.get(2).spear);
        assert.equal(0, assignedByOption.get(1).spear);
    });

    it('should ignore not-usable options', function() {
        let available = new TroopCounts();
        available.spear = 200;

        let usableOptionIds = [1, 2, 3]; // option#4 not usable

        let assignedByOption = assigner.assignTroopsForSanePerson(usableOptionIds, available, 1.0);

        assert.equal(0, assignedByOption.get(4).spear);
        assert.equal(134, assignedByOption.get(3).spear);
        assert.equal(66, assignedByOption.get(2).spear);
        assert.equal(0, assignedByOption.get(1).spear);
    });
});


describe('ScavengeTroopsAssigner.assignTroopsForAddict', function() {

    it('should have similar duration across all options', function() {
        let available = new TroopCounts();
        available.spear = 200;

        let usableOptionIds = [1, 2, 3, 4];

        let assignedByOption = assigner.assignTroopsForAddict(usableOptionIds, available, 1.0);

        assert.equal(15, assignedByOption.get(4).spear);
        assert.equal(23, assignedByOption.get(3).spear);
        assert.equal(46, assignedByOption.get(2).spear);
        assert.equal(115, assignedByOption.get(1).spear);
    });

    it('should ignore not-usable options', function() {
        let available = new TroopCounts();
        available.spear = 200;

        let usableOptionIds = [1, 2, 4]; // option#3 not usable

        let assignedByOption = assigner.assignTroopsForAddict(usableOptionIds, available, 1.0);

        assert.equal(17, assignedByOption.get(4).spear);
        assert.equal(0, assignedByOption.get(3).spear);
        assert.equal(52, assignedByOption.get(2).spear);
        assert.equal(130, assignedByOption.get(1).spear);
    });

    it('should not exceed target time too much when excess troops available', function() {
        let available = new TroopCounts();
        available.spear = 20000;

        let usableOptionIds = [1, 2, 3, 4];

        let assignedByOption = assigner.assignTroopsForAddict(usableOptionIds, available, 1.0);

        assert.equal(89, assignedByOption.get(4).spear);
        assert.equal(134, assignedByOption.get(3).spear);
        assert.equal(268, assignedByOption.get(2).spear);
        assert.equal(671, assignedByOption.get(1).spear);
    });

    it('should ignore not-usable options when excess troops available', function() {
        let available = new TroopCounts();
        available.spear = 20000;

        let usableOptionIds = [1, 2, 4]; // option#3 not usable

        let assignedByOption = assigner.assignTroopsForAddict(usableOptionIds, available, 1.0);

        assert.equal(89, assignedByOption.get(4).spear);
        assert.equal(0, assignedByOption.get(3).spear);
        assert.equal(268, assignedByOption.get(2).spear);
        assert.equal(671, assignedByOption.get(1).spear);
    });

});