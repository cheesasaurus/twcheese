import { BuildingLevels } from '/twcheese/src/Models/Buildings.js';
const assert = require('assert');

describe('BuildingLevels.hideableResources', function() {

    it('should hide nothing with hiding place level 0', function() {
        let buildingLevels = new BuildingLevels();
        buildingLevels.hide = 0;
        assert.equal(0, buildingLevels.hideableResources());
    });

    it('should hide 150 with hiding place level 1', function() {
        let buildingLevels = new BuildingLevels();
        buildingLevels.hide = 1;
        assert.equal(150, buildingLevels.hideableResources());
    });

    it('should hide 200 with hiding place level 2', function() {
        let buildingLevels = new BuildingLevels();
        buildingLevels.hide = 2;
        assert.equal(200, buildingLevels.hideableResources());
    });

    it('should hide 2000 with hiding place level 10', function() {
        let buildingLevels = new BuildingLevels();
        buildingLevels.hide = 10;
        assert.equal(2000, buildingLevels.hideableResources());
    });

});