
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
    constructor() {
        for (let type of buildingTypes) {
            this[type] = 0;
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
}


export { BuildingLevels };