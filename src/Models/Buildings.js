
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


class BuildingLevels {
    constructor(fill = 0) {
        for (let type of buildingTypes) {
            this[type] = fill;
        }
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


export { BuildingLevels };