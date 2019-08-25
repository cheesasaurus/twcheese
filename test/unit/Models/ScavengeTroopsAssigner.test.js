import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';
import { ScavengeTroopsAssigner } from '/twcheese/src/Models/ScavengeTroopsAssigner.js';
import { troopUtil, TroopCounts } from '/twcheese/src/Models/Troops.js';
const assert = require('assert');
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


describe('ScavengeTroopsAssigner.chunkTroopsToHaul', function() {

    it('should handle buffed haul capacity', function() {
        let available = new TroopCounts();
        available.spear = 100;

        let factor = 1.1;
        let targetCapacity = 50*25 * factor;
        let allowedTroopTypes = ['spear'];
        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, allowedTroopTypes, factor);
        assert.equal(50, assigned.spear);
    });

    it('should split troops in same chunk evenly', function() {
        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        let targetCapacity = 20*25 + 20*15;
        let allowedTroopTypes = ['spear', 'sword'];

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, allowedTroopTypes, 1);
        assert.equal(20, assigned.spear);
        assert.equal(20, assigned.sword);
    });

    it('should split troops in same chunk evenly, by troop count ratio', function() {
        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 200;

        let targetCapacity = 20*25 + 40*15;
        let allowedTroopTypes = ['spear', 'sword'];

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, allowedTroopTypes, 1);
        assert.equal(20, assigned.spear);
        assert.equal(40, assigned.sword);
    });

    it('should only assign allowed troop types', function() {
        let available = new TroopCounts();
        available.spear = 100;
        available.sword = 100;

        let targetCapacity = 50*25;
        let allowedTroopTypes = ['spear'];

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, allowedTroopTypes, 1);
        assert.equal(50, assigned.spear);
        assert.equal(0, assigned.sword);
    });

    it('should assign offense troops first', function() {
        let available = new TroopCounts();
        available.spear = 500;
        available.sword = 500;
        available.axe = 100;
        available.light = 100;

        let targetCapacity = 1*25 + 1*15 + 100*10 + 100*80;
        let allowedTroopTypes = ['spear', 'sword', 'axe', 'light'];

        let assigned = assigner.chunkTroopsToHaul(targetCapacity, available, allowedTroopTypes, 1);
        assert.equal(1, assigned.spear);
        assert.equal(1, assigned.sword);
        assert.equal(100, assigned.axe);
        assert.equal(100, assigned.light);
    });

});


describe('ScavengeTroopsAssigner.assignTroopsForSanePerson', function() {
    it('should do something', function() {
        // todo
    });
});


describe('ScavengeTroopsAssigner.assignTroopsForAddict', function() {
    it('should do something', function() {
        // todo
    });
});