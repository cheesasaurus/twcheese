
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

let troopOrder = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob', 'militia'];


class TroopCounts {
    constructor() {
        this.spear = 0;
        this.sword = 0;
        this.axe = 0;
        this.archer = 0;
        this.spy = 0;
        this.light = 0;
        this.marcher = 0;
        this.heavy = 0;
        this.ram = 0;
        this.catapult = 0;
        this.knight = 0;
        this.snob = 0;
        this.militia = 0;
    }

    isZero() {
        for (let count of Object.values(this)) {
            if (count !== 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param {TroopCounts} subtrahend
     * @return {TroopCounts} difference
     */
    subtract(subtrahend) {
        let difference = new TroopCounts();
        for (let [unitType, count] of Object.entries(this)) {
            difference[unitType] = count - subtrahend[unitType];
        }
        return difference;
    }

    toArray() {
        return troopOrder.map(unitType => this[unitType]);
    }

    static fromArray(array) {
        let troops = new TroopCounts();
        array.forEach((count, i) => {
            troops[troopOrder[i]] = count;
        });
        return troops;
    }
}


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


export { TroopCounts, calcTroopPopulation };