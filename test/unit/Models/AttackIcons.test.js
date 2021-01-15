import { TroopCounts } from '/twcheese/src/Models/Troops.js';
import { AttackIcons } from '/twcheese/src/Models/AttackIcons.js';
const assert = require('assert');


function iconDescriptionsInclude(attackIcons, text) {
    let icons = attackIcons.getIcons();
    for (let icon of icons) {
        if (icon.description.includes(text)) {
            return true;
        }
    }
    return false;
}


describe('AttackIcons', function() {

    it('should have no icons if no troops', function() {
        let troopCounts = new TroopCounts();
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert.equal(0, attackIcons.getIcons().length);
    });

    it('should indicate contains noble', function() {
        let troopCounts = new TroopCounts();
        troopCounts.snob = 1;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Nobleman'));
    });

    it('should indicate contains scouts', function() {
        let troopCounts = new TroopCounts();
        troopCounts.spy = 1;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Scouts'));
    });

    it('should indicate contains paladin', function() {
        let troopCounts = new TroopCounts();
        troopCounts.knight = 1;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Paladin'));
    });

    it('should indicate small attack when 1 troop', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 1;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Small attack'));
    });

    it('should indicate small attack when 1000 troops', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 500;
        troopCounts.light = 500;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Small attack'));
    });

    it('should indicate medium attack when 1001 troops', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 500;
        troopCounts.light = 501;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Medium attack'));
    });

    it('should indicate medium attack when 5000 troops', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 2500;
        troopCounts.light = 2500;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Medium attack'));
    });

    it('should indicate large attack when 5001 troops', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 2501;
        troopCounts.light = 2500;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Large attack'));
    });

    it('should indicate large attack when 100k troops', function() {
        let troopCounts = new TroopCounts();
        troopCounts.axe = 5e4;
        troopCounts.light = 5e4;
        let attackIcons = AttackIcons.fromTroopCounts(troopCounts);
        assert(iconDescriptionsInclude(attackIcons, 'Large attack'));
    });

});

