
let troopPop = {
    spear: 1,
    sword: 1,
    axe: 1,
    archer: 1,
    spy: 2,
    light: 4,
    marcher: 5,
    heavy: 6,
    ram: 5,
    catapult: 8,
    knight: 10,
    snob: 100,
    militia: 0
};


/**
 * @param {TroopCounts} troops
 * @return {int}
 */
function calcTroopPopulation(troops) {
    let pop = 0;
    for (let [unitType, count] of Object.entries(troops)) {
        if (typeof troopPop[unitType] === 'undefined') {
            console.warn(`Couldn't determine troop population for ${unitType}`);
            continue;
        }
        pop += troopPop[unitType] * count;
    }
    return pop;
}


export { calcTroopPopulation };