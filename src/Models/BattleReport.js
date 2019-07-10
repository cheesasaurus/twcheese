
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

}


export { BattleReport };