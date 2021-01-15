import { ImageSrc } from '/twcheese/conf/ImageSrc.js';


class BattleReportCondensed {
    constructor() {
        this.subject = null; // string
        this.attackIcons = null; // AttackIcons
        this.attackerName = null; // string
        this.attackerNobleDied = false; // boolean
        this.attackerVillage = null; // Village
        this.buildingLevels = null; // BuildingLevels
        this.defenderName = null; // string
        this.defenderVillage = null; // Village
        this.defenderSurvivors = null; // TroopCounts
        this.dotColor = null; // string
        this.haulStatus = BattleReportCondensed.HAUL_STATUS_UNKNOWN;
        this.isForwarded = false; // string
        this.loyalty = null; // {after:number}
        this.note = null; // string
        this.reportId = null; // int
        this.resources = null; // Resources
        this.strTimeReceived = null; // string
        this.timeLaunched = null; // TwCheeseDate
        this.wasAttackFeint = false; // boolean
    }

    /**
     * were the defender's troops all killed?
     * @return {boolean}
     */
    wasDefenderCleared() {
        return this.defenderSurvivors && this.defenderSurvivors.isZero();
    }

    haulStatusIconSrc() {
        if (this.haulStatus === BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
            throw Error(`There's no icon.... that's why the status is unknown!`);
        }
        if (this.haulStatus === BattleReportCondensed.HAUL_STATUS_FULL) {
            return ImageSrc.haulFull;
        }
        return ImageSrc.haulPartial;
    }

    /**
     * @param {{x:number, y:number}} village
     * @return number
     */
    defenderDistance(village) {
        if (!this.defenderVillage) {
            return '?';
        }
        return Math.round(this.defenderVillage.distanceTo(village) * 100) / 100;
    }

}
BattleReportCondensed.HAUL_STATUS_UNKNOWN = -1;
BattleReportCondensed.HAUL_STATUS_PARTIAL = 0;
BattleReportCondensed.HAUL_STATUS_FULL = 1;


export { BattleReportCondensed };