import { Resources } from '/twcheese/src/Models/Resources.js';
import { gameConfig, buildingConfig } from '/twcheese/src/Util/Config.js';

 // todo: request devs make additional info available via interface.php, so this won't be necessary
import { cfg } from '/twcheese/conf/Buildings.js';

/**
 * Building		Index
 * hq:			0
 * barracks:	1
 * stable:		2
 * workshop:	3
 * church:		4
 * church_f:	5
 * academy:		6
 * smithy:		7
 * rally:		8
 * statue:		9
 * market:		10
 * timber:		11
 * clay:		12
 * iron:		13
 * farm:		14
 * warehouse:	15
 * hiding:		16
 * wall:		17
 */
let buildingTypes = [
    'main',
    'barracks',
    'stable',
    'garage',
    'church',
    'church_f',
    'snob',
    'smith',
    'place',
    'statue',
    'market',
    'wood',
    'stone',
    'iron',
    'farm',
    'storage',
    'hide',
    'wall',
    'watchtower'
];

function maxLevel(buildingType) {
    let building = buildingConfig.get(buildingType);
    if (typeof building === 'undefined') {
        return 0;
    }
    return building.max_level;
}


function resProductionHourly(level) {
    if (level === 0) {
        return gameConfig.get('speed') * 5;
    }
    return gameConfig.get('speed') * 30 * (1.163118 ** (level - 1));
}


function popUsed(buildingType, level) {
    let building = buildingConfig.get(buildingType);
    if (typeof building === 'undefined') {
        return 0;
    }
    return Math.round(building.pop * building.pop_factor ** (level - 1));
}


function requiredBuildingLevels(buildingType) {
    // The config from interface.php is missing building requirements.
    // So use own config.
    let building = cfg[buildingType];
    if (typeof building === 'undefined') {
        return [];
    }
    return building.req;
}


class BuildingLevels {
    constructor(fill = 0) {
        for (let type of buildingTypes) {
            this[type] = fill;
        }
    }

    populationUsed() {
        let pop = 0;
        for (let buildingType of buildingTypes) {
            let level = this[buildingType];
            pop += popUsed(buildingType, level);
        }
        return pop;
    }

    populationCap() {
        return Math.round(240 * 1.172103 ** (this.farm - 1));
    }

    resourceCap() {
        return Math.round(1000 * 1.2294934 ** (this.storage - 1));
    }
    
    resourceProductionHourly() {
        return new Resources(
            resProductionHourly(this.wood),
            resProductionHourly(this.stone),
            resProductionHourly(this.iron)
        );
    }

    hideableResources() {
        if (this.hide === 0) {
            return 0;
        }
        return Math.round(112.4859 * 1.3335 ** this.hide);
    }

    canUpgrade(buildingType) {
        let alreadyMaxed = this[buildingType] >= maxLevel(buildingType);
        return !alreadyMaxed && this.areRequirementsMet(buildingType);
    }

    areRequirementsMet(buildingType) {
        let reqs = requiredBuildingLevels(buildingType);
        for (let [reqType, reqLevel] of Object.entries(reqs)) {
            if (reqLevel > this[reqType]) {
                return false;
            }
        }
        return true;
    }

    toArray() {
        return buildingTypes.map(type => this[type]);
    }

    static fromArray(array) {
        let levels = new BuildingLevels();
        array.forEach((level, i) => {
            levels[buildingTypes[i]] = level;
        });
        return levels;
    }

    static typeAt(index) {
        return buildingTypes[index];
    }
}


let buildingUtil = {
    buildingTypesOnWorld() {
        return buildingTypes.filter(type => this.typeExistsOnWorld(type));
    },

    typeExistsOnWorld(buildingType) {
        return typeof buildingConfig.get(buildingType) !== 'undefined';
    },
};


export { BuildingLevels, buildingUtil };