import { Resources } from '/twcheese/src/Models/Resources.js';

import { cfg } from '/twcheese/conf/Buildings.js';
// todo: model a single Building
// todo: hotswap configs (e.g. after loading from interface.php?func=get_building_info)

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


function resProductionHourly(level, gameSpeed) {
    if (level === 0) {
        return gameSpeed * 5;
    }
    return gameSpeed * 30 * (1.163118 ** (level - 1));
}


class BuildingLevels {
    constructor(fill = 0) {
        for (let type of buildingTypes) {
            this[type] = fill;
        }
    }

    populationUsed() {
        let pop = 0;
        for (let [buildingType, b] of Object.entries(cfg)) {
            let level = this[buildingType];
            if (level > 0) {
                pop += Math.round(b.pop * b.popFactor ** (level - 1));
            }            
        }
        return pop;
    }

    populationCap() {
        return Math.round(240 * 1.172103 ** (this.farm - 1));
    }

    resourceCap() {
        return Math.round(1000 * 1.2294934 ** (this.storage - 1));
    }
    
    resourceProductionHourly(gameSpeed = 1) {
        return new Resources(
            resProductionHourly(this.wood, gameSpeed),
            resProductionHourly(this.stone, gameSpeed),
            resProductionHourly(this.iron, gameSpeed)
        );
    }

    hideableResources() {
        if (this.hide === 0) {
            return 0;
        }
        return Math.round(112.4859 * 1.3335 ** this.hide);
    }

    canUpgrade(buildingType) {
        let alreadyMaxed = this[buildingType] >= cfg[buildingType].maxLevel;        
        return !alreadyMaxed && this.areRequirementsMet(buildingType);
    }

    areRequirementsMet(buildingType) {
        let reqs = cfg[buildingType].req;
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


export { BuildingLevels, buildingTypes };