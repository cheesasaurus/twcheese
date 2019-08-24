import { TroopCounts } from '/twcheese/src/Models/Troops.js';

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

        this.preferences = {
            mode: ScavengeTroopsAssigner.MODE_SANE_PERSON,
            targetDurationHours: 2,
            troops: {},
            troopOrder: [
                ['axe', 'light', 'marcher'], // first chunk (sent together)
                ['spear', 'sword', 'archer'], // second chunk (sent together)
                ['heavy'] // third chunk
            ]
        };
        this.initTroopPreferences();
    }

    initTroopPreferences() {
        for (let troopType of this.sendableTroopTypes) {
            this.preferences.troops[troopType] = {
                maySend: true,
                reserved: 0
            };
        }
    }

    /**
     * @return {string[]}
     */
    getAllowedTroopTypes() {
        return this.sendableTroopTypes.filter(troopType => this.preferences.troops[troopType].maySend);
    }

    /**
     * @param {int[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts
     * @param {float} haulFactor
     */
    assignTroops(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        if (this.preferences.mode === ScavengeTroopsAssigner.MODE_ADDICT) {
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
        let allowedTroopTypes = this.getAllowedTroopTypes();
        let optionIds = [...this.options.keys()].reverse();

        for (let optionId of optionIds) {
            let assignedCounts;
            if (usableOptionIds.includes(optionId)) {
                let option = this.options.get(optionId);
                let targetCapacity = option.calcTargetCapacity(this.preferences.targetDurationHours * 3600);
                assignedCounts = this.chunkTroopsToHaul(targetCapacity, availableTroopCounts, allowedTroopTypes, haulFactor);
            } else {
                assignedCounts = new TroopCounts();
            }            
            assignedCountsByOption.set(optionId, assignedCounts);
            availableTroopCounts = availableTroopCounts.subtract(assignedCounts);
        }

        return assignedCountsByOption;
    }

    assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {

        // todo: shinko style
    }

    chunkTroopsToHaul(targetCapacity, availableTroopCounts, allowedTroopTypes, haulFactor = 1.0) {
        let assignedTroopCounts = new TroopCounts();
        let capacities = {};
        for (let chunk of this.preferences.troopOrder) {
            let availableCapacity = 0;
            for (let troopType of chunk) {
                if (!allowedTroopTypes.includes(troopType)) {
                    continue;
                }
                let troopCount = availableTroopCounts[troopType];
                capacities[troopType] = this.troopUtil.carryCapacity(troopType, haulFactor);
                availableCapacity += troopCount * capacities[troopType];
            }
            let chunkRatio = Math.min(1, targetCapacity / availableCapacity);

            for (let troopType of chunk) {
                if (!allowedTroopTypes.includes(troopType)) {
                    continue;
                }
                let troopCount = availableTroopCounts[troopType];                
                assignedTroopCounts[troopType] = Math.round(troopCount * chunkRatio);
                targetCapacity -= assignedTroopCounts[troopType] * capacities[troopType];
            }
        }
        return assignedTroopCounts;
    }

}

ScavengeTroopsAssigner.MODE_SANE_PERSON = 'sane_person';
ScavengeTroopsAssigner.MODE_ADDICT = 'addict'


export { ScavengeTroopsAssigner };