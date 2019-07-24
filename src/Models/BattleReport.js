import { TroopCounts, troopUtil, troopTypes } from '/twcheese/src/Models/Troops.js';
import { DemolitionCalculator } from '/twcheese/src/Models/DemolitionCalculator.js';


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
        this.dotColor = null;
        this.espionageLevel = null;
        this.haul = null;
        this.loyalty = null; // {before:number, after:number}
        this.luck = null;
        this.morale = null;
        this.ramDamage = null;
        this.reportId = null;
        this.resources = null;
        this.unitsInTransit = null;
        this.unitsOutside = null;
    }

    /**
     * @return {{launchTime:TwCheeseDate, returnTime:TwCheeseDate}}
     */
    calcTimingInfo() {
        let distance = this.attackerVillage.distanceTo(this.defenderVillage);
        let travelDuration = this.attackerQuantity.travelDuration(distance, 'attack');
        return {
            launchTime: this.battleTime.subMilliseconds(travelDuration),
            returnTime: this.battleTime.addMilliseconds(travelDuration).startOfSecond()
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
     * @param {{x:number, y:number}} home
     * @param {TwCheeseDate} timeNow the current time
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidPredicted(home, timeNow, haulBonus = 0) {
        if (this.espionageLevel < 2) {
            throw Error('not enough information');
        }
        let distance = this.defenderVillage.distanceTo(home);
        let maxLoot = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();
        let hourlyProduction = this.buildingLevels.resourceProductionHourly();

        let hoursSinceReport = (timeNow - this.battleTime) / 3600000;
        let resourcesProducedSinceReport = hourlyProduction.multiply(hoursSinceReport);
        let resourcesNow = this.resources.add(resourcesProducedSinceReport);

        let troopCounts = new TroopCounts();
        for (let troopType of troopTypes) {
            let travelDuration = troopUtil.travelDuration(troopType, distance);
            let travelHours = travelDuration / 3600000;
            let resourcesProducedDuringTravel = hourlyProduction.multiply(travelHours);
            let resourcesAtArrival = resourcesNow.add(resourcesProducedDuringTravel).cap(maxLoot);
            troopCounts[troopType] = troopUtil.countToCarry(troopType, resourcesAtArrival.sum(), haulBonus);
        }
        return troopCounts;
    }

    /**
     * @param {number} periodHours the number of hours that resources have been accumulating
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
     */
    calcRaidPeriodic(periodHours, haulBonus = 0) {
        let resourcesProduced = this.buildingLevels.resourceProductionHourly().multiply(periodHours);
        let maxLoot = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();
        let totalResources = resourcesProduced.cap(maxLoot).sum();
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
            troopCounts[troopType] = troopUtil.countToCarry(troopType, resources, haulBonus);
        }
        return troopCounts;
    }

    /**
     * was the attack likely just a distraction?
     * @return {boolean}
     */
    wasAttackFeint() {
        let troops = this.attackerQuantity;
        return troops.snob === 0 && troops.populationUsed() <= 130;
    }

    /**
     * were the defender's troops all killed?
     * @return {boolean}
     */
    wasDefenderCleared() {
        return this.defenderSurvivors && this.defenderSurvivors.isZero();
    }

    /**
     * @return {{oneShotScouted:object, oneShotUpgraded:object}} mappings of how many siege units to demolish buildings
     */
    suggestSiegeUnits() {
        if (this.espionageLevel < 2) {
            throw Error('not enough information');
        }
        return (new DemolitionCalculator()).suggestSiegeUnits(this.buildingLevels);
    }

}


export { BattleReport };