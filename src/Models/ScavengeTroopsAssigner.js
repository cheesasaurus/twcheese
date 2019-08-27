import { TroopCounts } from '/twcheese/src/Models/Troops.js';
import { ScavengeTroopsAssignerPreferences } from '/twcheese/src/Models/ScavengeTroopsAssignerPreferences.js';

class ScavengeTroopsAssigner {

    /**
     * @param {Map<number, ScavengeOption>} options 
     * @param {string[]} sendableTroopsTypes
     * @param troopUtil
     */
    constructor(options, sendableTroopTypes, troopUtil) {
        this.options = options;
        this.sendableTroopTypes = sendableTroopTypes;
        this.troopUtil = troopUtil;
        this.preferences = new ScavengeTroopsAssignerPreferences(sendableTroopTypes);
    }

    /**
     * @return TroopCounts
     */
    adjustAvailableTroopCounts(availableTroopCounts) {
        return availableTroopCounts
            .filter(this.preferences.getAllowedTroopTypes())
            .subtract(this.preferences.getReservedTroopCounts())
            .zeroNegatives();
    }

    /**
     * @param {int[]} usableOptionIds 
     */
    adjustUsableOptionIds(usableOptionIds) {
        return usableOptionIds.filter(optionId => this.preferences.isOptionAllowed(optionId));
    }

    /**
     * @param {int[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts
     * @param {float} haulFactor
     */
    assignTroops(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        usableOptionIds = this.adjustUsableOptionIds(usableOptionIds);
        availableTroopCounts = this.adjustAvailableTroopCounts(availableTroopCounts);

        if (this.preferences.mode === ScavengeTroopsAssignerPreferences.MODE_ADDICT) {
            return this.assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor);
        }
        return this.assignTroopsForSanePerson(usableOptionIds, availableTroopCounts, haulFactor);
    }

    /**
     * @param {number[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts 
     * @param {float} haulFactor
     * @return {Map<number, TroopCounts>}
     */
    assignTroopsForSanePerson(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        let assignedCountsByOption = new Map();
        let optionIds = [...this.options.keys()].reverse();

        for (let optionId of optionIds) {
            let assignedCounts;
            if (usableOptionIds.includes(optionId)) {
                let option = this.options.get(optionId);
                let targetCapacity = option.calcTargetCapacity(this.preferences.targetDurationSeconds);
                assignedCounts = this.chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor);
            } else {
                assignedCounts = new TroopCounts();
            }            
            assignedCountsByOption.set(optionId, assignedCounts);
            availableTroopCounts = availableTroopCounts.subtract(assignedCounts);
        }

        return assignedCountsByOption;
    }

    /**
     * @param {number[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts 
     * @param {float} haulFactor
     * @return {Map<number, TroopCounts>}
     */
    assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        let assignedCountsByOption = new Map();
        let optionIds = [...this.options.keys()].reverse();

        let availableCapacity = availableTroopCounts.carryCapacity() * haulFactor;
        let targetDurationSeconds = this.preferences.targetDurationSeconds;

        let targetCapacitySum = 0;
        let inverseLootFactors = {};
        let inverseLootFactorSum = 0;

        for (let optionId of optionIds) {
            if (!usableOptionIds.includes(optionId)) {
                continue;
            }
            let option = this.options.get(optionId);
            inverseLootFactors[optionId] = 1 / option.getLootFactor()
            inverseLootFactorSum += inverseLootFactors[optionId];
            targetCapacitySum += option.calcTargetCapacity(targetDurationSeconds);
        }

        let portionAvailableTroopsOverall = Math.min(1, targetCapacitySum / availableCapacity);

        for (let optionId of optionIds) {
            let assignedCounts;
            if (usableOptionIds.includes(optionId)) {
                let portionOfOptionFactors = inverseLootFactors[optionId] / inverseLootFactorSum;
                let portionAvailableTroopsForOption = portionAvailableTroopsOverall * portionOfOptionFactors;
                let targetCapacity = portionAvailableTroopsForOption * availableCapacity;
                assignedCounts = this.chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor);
            } else {
                assignedCounts = new TroopCounts();
            }            
            assignedCountsByOption.set(optionId, assignedCounts);
            availableTroopCounts = availableTroopCounts.subtract(assignedCounts);
        }

        return assignedCountsByOption;
    }

    chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor = 1.0) {
        let assignedTroopCounts = new TroopCounts();
        let capacities = {};
        for (let chunk of this.preferences.troopOrder) {            
            if (targetCapacity < 0) {
                break;
            }

            let availableCapacity = 0;
            for (let troopType of chunk) {
                let troopCount = availableTroopCounts[troopType];
                capacities[troopType] = this.troopUtil.carryCapacity(troopType, haulFactor);
                availableCapacity += troopCount * capacities[troopType];
            }
            let chunkRatio = Math.min(1, targetCapacity / availableCapacity);

            for (let troopType of chunk) {
                let troopCount = availableTroopCounts[troopType];                
                assignedTroopCounts[troopType] = Math.round(troopCount * chunkRatio);
                targetCapacity -= assignedTroopCounts[troopType] * capacities[troopType];
            }
        }
        return assignedTroopCounts;
    }

}


export { ScavengeTroopsAssigner };