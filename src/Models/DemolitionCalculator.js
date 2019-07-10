
let catAmounts = [0, 2, 6, 10, 15, 21, 28, 36, 45, 56, 68, 82, 98, 115, 136, 159, 185, 215, 248, 286, 328, 376, 430, 490, 558, 634, 720, 815, 922, 1041, 1175, 1175];
let catAmountsChurch = [0, 400, 500, 600, 600];
let ramAmounts = [0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219];
let invulnerable = ['church_f', 'hide'];


function whichSiegeLookup(buildingType) {
    switch (buildingType) {
        case 'wall':    return ramAmounts;
        case 'church':  return catAmountsChurch;
        // todo: check if watchtower uses something special
        default:        return catAmounts;
    }
}


class DemolitionCalculator {

    /**
     * @param {BuildingLevels} buildingLevels
     * @return {{oneShotScouted:object, oneShotUpgraded:object}} mappings of how many siege units to demolish buildings
     *     example: {
     *         oneShotScouted: {
     *             barracks: 23, // 23 catapults to demolish the scouted barracks level in one shot
     *             wall: 42 // 42 rams to demolish the scouted wall level in one shot
     *         },
     *         oneShotUpgraded: {
     *             barracks: 69, // 69 catapults to demolish the scouted barracks level, +1 upgrade, in one shot
     *             wall: 1337 // 1337 rams to demolish the scouted wall level, +1 upgrade, in one shot
     *         }
     *     }
     *  
     */
    suggestSiegeUnits(buildingLevels) {
        let demoScouted = {};
        let demoBuffer = {};

        function assignDemolition(buildingType) {
            if (invulnerable.includes(buildingType)) {
                demoScouted[buildingType] = 'NA';
                demoBuffer[buildingType] = 'NA';
                return;
            }

            let level = buildingLevels[buildingType];
            if (level === '?') {
                demoScouted[buildingType] = '?';
                demoBuffer[buildingType] = '?';
                return;
            }

            let siegeAmounts = whichSiegeLookup(buildingType);

            demoScouted[buildingType] = siegeAmounts[level];
            let bufferLevel = buildingLevels.canUpgrade(buildingType) ? level + 1 : level;
            demoBuffer[buildingType] = siegeAmounts[bufferLevel];
        }

        for (let buildingType in buildingLevels) {
            assignDemolition(buildingType);
        }

        return {
            oneShotScouted: demoScouted,
            oneShotUpgraded: demoBuffer
        };
    }

}


export { DemolitionCalculator };