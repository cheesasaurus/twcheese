import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';
import { ScavengeTroopsAssigner } from '/twcheese/src/Models/ScavengeTroopsAssigner.js';
import { troopUtil } from '/twcheese/src/Models/Troops.js';
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
    it('should do something', function() {
        // todo
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