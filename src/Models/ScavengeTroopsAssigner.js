

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

    assignTroopsForSanePerson(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        // todo
    }

    assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        // todo: shinko style
    }

    chunkTroopsToHaul(targetCapacity, availableTroopCounts, allowedTroopTypes, haulFactor = 1.0) {
        // todo
    }

}

ScavengeTroopsAssigner.MODE_SANE_PERSON = 'sane_person';
ScavengeTroopsAssigner.MODE_ADDICT = 'addict'


export { ScavengeTroopsAssigner };