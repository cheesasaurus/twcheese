import { TroopCounts, TroopCalculator, troopTypes } from '/twcheese/src/Models/Troops.js';
import { Resources } from '/twcheese/src/Models/Resources.js';


class BattleReport {
    constructor() {
        this.attacker = null;
        this.attackerLosses = null;
        this.attackerQuantity = null;
        this.attackerSurvivors = null;
        this.attackerVillage = null;
        this.battleTime = null;
        this.buildingLevels = null;
        this.catDamage = null;
        this.defender = null;
        this.defenderLosses = null;
        this.defenderQuantity = null;
        this.defenderSurvivors = null;
        this.defenderVillage = null;
        this.dot = null;
        this.espionageLevel = null;
        this.haul = null;
        this.loyalty = null;
        this.luck = null;
        this.morale = null;
        this.ramDamage = null;
        this.reportId = null;
        this.resources = null;
        this.unitsInTransit = null;
        this.unitsOutside = null;
    }

    /**
     * @param {number} worldSpeed
     * @param {number} unitSpeed
     * @return {{launchTime:TwCheeseDate, returnTime:TwCheeseDate}}
     */
    calcTimingInfo(worldSpeed, unitSpeed) {
        let distance = this.attackerVillage.distanceTo(this.defenderVillage);
        let travelDuration = this.attackerQuantity.travelDuration(distance, 'attack', worldSpeed, unitSpeed);
        return {
            launchTime: this.battleTime.subMilliseconds(travelDuration),
            returnTime: this.battleTime.addMilliseconds(travelDuration)
        };
    }

    /**
     * @return {{buildings:number, troops:number, idle:number}}
     */
    calcPopulation() {
        if (this.espionageLevel < 2) {
            throw Error('not enough information to determine population');
        }
        let buildingPop = this.buildingLevels.populationUsed();
        let troopPop = this.defenderQuantity.populationUsed();
        if (this.unitsOutside) {
            troopPop += this.unitsOutside.populationUsed();
        }
        return {
            buildings: buildingPop,
            troops: troopPop,
            idle: this.buildingLevels.populationCap() - buildingPop - troopPop
        };
    }

    /**
     * @param {Number} haulBonus the extra % bonus haul from flags, events, etc.  Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidScouted(haulBonus = 0) {
        if (this.espionageLevel < 1) {
            throw Error('not enough information');
        }
        return this.calcRaidUnits(this.resources.sum(), haulBonus);
    }

    /**
     * @param {Village|{x:number, y:number}} home
     * @param {TwCheeseDate} timeNow the current time
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidPredicted(home, timeNow, gameSpeed, unitSpeed, haulBonus = 0) {
        if (this.espionageLevel < 2) {
            throw Error('not enough information');
        }

        var maxLoot = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();

        function capRes(amount) {
            return Math.min(amount, maxLoot);
        }

        /*==== calculate production rates ====*/
        let hourlyProduction = {};
        for (let resType of Resources.TYPES) {
            hourlyProduction[resType] = this.buildingLevels.resourceProductionHourly(resType, gameSpeed);
        }

        /*==== add resources produced between the current time and the time of the report*/
        var hoursElapsed = (timeNow - this.battleTime) / 3600000;
        let resourcesProducedSinceReport = new Resources(
            hourlyProduction.wood * hoursElapsed,
            hourlyProduction.stone * hoursElapsed,
            hourlyProduction.iron * hoursElapsed,
        );
        let resourcesNow = this.resources.add(resourcesProducedSinceReport);

        /*==== calculate travel times (in hours) ====*/
        var travelHours = {};
        for (let troopType of troopTypes) {
            let travelDuration = TroopCalculator.travelDuration(troopType, this.defenderVillage.distanceTo(home), gameSpeed, unitSpeed);
            travelHours[troopType] = travelDuration / 3600;
        }

        /*==== add resources produced during travel ====*/
        var totalResources = {};
        for (let troopType of troopTypes) {
            let resourcesProducedDuringTravel = new Resources(
                hourlyProduction.wood * travelHours[troopType],
                hourlyProduction.stone * travelHours[troopType],
                hourlyProduction.iron * travelHours[troopType],
            );
            let totalRes = resourcesNow.add(resourcesProducedDuringTravel);
            totalResources[troopType] = capRes(totalRes.wood) + capRes(totalRes.stone) + capRes(totalRes.iron);
        }

        /*==== calculate units to take resources ====*/
        let troopCounts = new TroopCounts();
        for (let troopType of troopTypes) {
            troopCounts[troopType] = TroopCalculator.countToCarry(troopType, totalResources[troopType], haulBonus);
        }
        return troopCounts;
    }

    /**
     * @param {number} period the number of hours that resources have been accumulating
     * @param {number} gameSpeed
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidPeriodic(period, gameSpeed, haulBonus = 0) {
        /*==== calculate maximum of each resource hauled ====*/
        var maxHaul = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();

        /*==== calculate production rates ====*/
        var production = new Array(0, 0, 0);
        for (let [i, resType] of [[0, 'wood'], [1, 'stone'], [2, 'iron']]) {
            production[i] = this.buildingLevels.resourceProductionHourly(resType, gameSpeed);
        }

        /*==== calculate resources produced */
        var resources = new Array(0, 0, 0);
        for (let i = 0; i < 3; i++) {
            resources[i] = period * production[i];
            if (resources[i] > maxHaul)
                resources[i] = maxHaul;
        }
        var totalResources = resources[0] + resources[1] + resources[2];
        return this.calcRaidUnits(totalResources, haulBonus);
    }

    /**
     * @param {number} resources the total resources to be raided
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidUnits(resources, haulBonus = 0) {
        let troopCounts = new TroopCounts();
        for (let troopType of troopTypes) {
            troopCounts[troopType] = TroopCalculator.countToCarry(troopType, resources, haulBonus);
        }
        return troopCounts;
    }

}


export { BattleReport };