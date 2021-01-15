import { troopConfig } from '/twcheese/src/Util/Config.js';

let troopTypes = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob', 'militia'];


function troopPop(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.pop;
}


function travelMinutes(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.speed;
}


function troopCarry(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.carry;
}


class TroopCounts {
    constructor() {
        for (let type of troopTypes) {
            this[type] = 0;
        }
    }

    clone() {
        return Object.assign(new TroopCounts(), this);
    }

    filter(allowedTroopTypes) {
        let counts = new TroopCounts();
        for (let type of troopTypes) {
            if (allowedTroopTypes.includes(type)) {
                counts[type] = this[type];
            }
        }
        return counts;
    }

    isZero() {        
        for (let count of Object.values(this)) {
            if (count !== 0) {
                return false;
            }
        }
        return true;
    }

    sum() {
        let sum = 0;
        for (let count of Object.values(this)) {
            sum += count;
        }
        return sum;
    }

    /**
     * @param {function} doSomething - receives two params: troopType and count
     */
    each(doSomething) {
        for (let type of troopTypes) {
            let count = this[type];
            doSomething(type, count);
        }
    }

    carryCapacity() {
        let capacity = 0;
        for (let type of troopTypes) {
            capacity += this[type] * troopCarry(type);
        }
        return capacity;
    }

    populationUsed() {
        return troopTypes.reduce((sum, type) => sum + troopPop(type) * this[type], 0);
    }

    travelDuration(distance, role = 'attack') {
        let minutesPerField = this.travelMinutesPerField(role);
        return calcTravelDuration(minutesPerField, distance);
    }

    travelMinutesPerField(role = 'attack') {
        if (role === 'support' && this.knight > 0) {
            return travelMinutes('knight');
        }

        let relevantMinutes = troopTypes
            .filter(type => this[type] > 0)
            .map(type => travelMinutes(type));

        return Math.max(...relevantMinutes);
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

    /**
     * get new TroopCounts, like this one but with any negative counts set to 0
     */
    zeroNegatives() {
        let troopCounts = new TroopCounts();
        for (let [troopType, count] of Object.entries(this)) {
            troopCounts[troopType] = Math.max(0, count);
        }
        return troopCounts;
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
 *	@return	{{spear:number, sword:number, ...}} milliseconds
 */
function calcTravelDurations(distance) {
    let travelTimes = {};
    for (let type of troopTypes) {
        travelTimes[type] = calcTravelDuration(travelMinutes(type), distance);
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


let troopUtil = {

    troopTypesOnWorld() {
        return window.game_data.units;
    },

    existsOnWorld(troopType) {
        return typeof troopConfig.get(troopType) !== 'undefined';
    },

    /** 
     * @param {string} troopType
     * @param {number} resourceAmount     
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {number} how many troops does it take to carry all the resources
     */
    countToCarry(troopType, resourceAmount, haulBonus = 0) {
        let haulPerUnit = troopCarry(troopType) * (100 + haulBonus) / 100;
        let troopCount = resourceAmount / haulPerUnit;
        return Math.round(10 * troopCount) / 10;
    },

    carryCapacity(troopType, factor = 1.0) {
        return troopCarry(troopType) * factor;
    },

    /**
     * @param {string} troopType
     * @param {number} distance
     * @return {number} milliseconds to travel
     */
    travelDuration(troopType, distance) {
        return calcTravelDuration(travelMinutes(troopType), distance);
    }

};


export { TroopCounts, calcTravelDurations, troopUtil, troopTypes };