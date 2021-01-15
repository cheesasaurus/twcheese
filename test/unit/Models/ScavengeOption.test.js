import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';
const assert = require('assert');
const fs = require('fs');

let optionBasesCode = fs.readFileSync(`test/data/html/scavenge/scavenge-option-bases-code`).toString();
let optionBases = JSON.parse(optionBasesCode);
let option1 = new ScavengeOption(optionBases[1]);
let option2 = new ScavengeOption(optionBases[2]);


describe('ScavengeOption.calcDurationSeconds', function() {

    // option 1 ////////////////////////////////////////////////

    it('should be correct for option1, 10 spears', function() {
        // 10 spears - 0:28:39
        assert.equal(28*60 + 39, option1.calcDurationSeconds(10*25));
    });

    it('should be correct for option1, 100 spears', function() {
        // 100 spears - 0:43:23
        assert.equal(43*60 + 23, option1.calcDurationSeconds(100*25));
    });

    it('should be correct for option1, 1000 spears', function() {
        // 1000 spears - 2:40:25
        assert.equal(2*3600 + 40*60 + 25, option1.calcDurationSeconds(1000*25));
    });

    // option 2 ///////////////////////////////////////////////////

    it('should be correct for option2, 10 spears', function() {
        // 10 spears - 0:31:23
        assert.equal(31*60 + 23, option2.calcDurationSeconds(10*25));
    });

    it('should be correct for option2, 100 spears', function() {
        // 100 spears - 1:04:59
        assert.equal(1*3600 + 4*60 + 59, option2.calcDurationSeconds(100*25));
    });

    it('should be correct for option2, 1000 spears', function() {
        // 1000 spears - 5:31:55
        assert.equal(5*3600 + 31*60 + 55, option2.calcDurationSeconds(1000*25));
    });

});


describe('ScavengeOption.calcTargetCapacity', function() {

    it('should be correct for option1, 60 minutes', function() {
        assert.equal(5357, option1.calcTargetCapacity(60 * 60));
    });

    it('should be correct for option1, 120 minutes', function() {
        assert.equal(16771, option1.calcTargetCapacity(120 * 60));
    });

    it('should be correct for option1, 180 minutes', function() {
        assert.equal(29097, option1.calcTargetCapacity(180 * 60));
    });

});