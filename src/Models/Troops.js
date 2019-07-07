
let troopTypes = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob', 'militia'];

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

let travelMinutes = {
    spear: 18,
    sword: 22,
    axe: 18,
    archer: 18,
    spy: 9,
    light: 10,
    marcher: 10,
    heavy: 11,
    ram: 30,
    catapult: 30,
    knight: 10,
    snob: 35,
    militia: 0
}


class TroopCounts {
    constructor() {
        for (let type of troopTypes) {
            this[type] = 0;
        }
    }

    isZero() {
        for (let count of Object.values(this)) {
            if (count !== 0) {
                return false;
            }
        }
        return true;
    }

    populationUsed() {
        return troopTypes.reduce((sum, type) => sum + troopPop[type] * this[type], 0);
    }

    travelDuration(distance, role = 'attack', worldSpeed = 1, unitSpeed = 1) {
        let minutesPerField = this.travelMinutesPerField(role, worldSpeed, unitSpeed);
        return calcTravelDuration(minutesPerField, distance);
    }

    travelMinutesPerField(role = 'attack', worldSpeed = 1, unitSpeed = 1) {
        let t = 1 / worldSpeed / unitSpeed;

        if (role === 'support' && this.knight > 0) {
            return t * travelMinutes.knight;
        }

        let relevantMinutes = troopTypes
            .filter(type => this[type] > 0)
            .map(type => travelMinutes[type]);

        return t * Math.max(...relevantMinutes);
    }

    /**
     * @param {TroopCounts} subtrahend
     * @return {TroopCounts} difference
     */
    subtract(subtrahend) {
        let difference = new TroopCounts();
        for (let [troopType, count] of Object.entries(this)) {
            difference[troopType] = count - subtrahend[troopType];
        }
        return difference;
    }

    toArray() {
        return troopTypes.map(type => this[type]);
    }

    static fromArray(array) {
        let troops = new TroopCounts();
        array.forEach((count, i) => {
            troops[troopTypes[i]] = count;
        });
        return troops;
    }
}


/**
 *	@param {number} distance
 *	@param {number} worldSpeed
 *	@param {number} unitSpeed
 *	@return	{{spear:number, sword:number, ...}} milliseconds
 */
function calcTravelDurations(distance, worldSpeed, unitSpeed) {
    let t = 1 / worldSpeed / unitSpeed;

    let travelTimes = {};
    for (let type of troopTypes) {
        travelTimes[type] = calcTravelDuration(t * travelMinutes[type], distance);
    }
    return travelTimes;
};


function calcTravelDuration(minutesPerField, distance) {
    // The game rounds travel duration to the nearest second.
    // The milliseconds part of the scheduled arrival is NOT some fraction of travel seconds.
    // But rather, copied from the clock when the server started processing the request to travel.
    //
    // e.g. The clock says its 12:30:00.123.
    // The server processes a request for troops to travel somewhere that takes them 10 minutes to reach.
    // The scheduled arrival will be 12:40:00.123
    return Math.round(distance * minutesPerField * 60) * 1000;
}


export { TroopCounts, calcTravelDurations, troopTypes };