import { TroopCounts } from '/twcheese/src/Models/Troops.js';


class ScavengeTroopsAssignerPreferences {

    constructor(sendableTroopTypes) {
        this._sendableTroopTypes = sendableTroopTypes;
        this.reset();        
    }

    reset() {
        this.mode = ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON;
        this.allowedOptionIds = new Set([1, 2, 3, 4]);
        this.targetDurationSeconds = 2 * 3600;
        this.initTroops();
        this.troopOrder = [
            ['axe', 'light', 'marcher'], // first chunk (sent together)
            ['spear', 'sword', 'archer'], // second chunk (sent together)
            ['heavy'], // third chunk
            ['knight']
        ];
    }

    initTroops() {
        this.troops = {};
        for (let troopType of this._sendableTroopTypes) {
            this.troops[troopType] = {
                maySend: true,
                reserved: 0
            };
        }
    }

    setMode(mode) {
        this.mode = mode;
        $(this).trigger('change');
    }

    isOptionAllowed(optionId) {
        return this.allowedOptionIds.has(optionId);
    }

    setOptionAllowed(optionId, isAllowed = true) {
        if (isAllowed) {
            this.allowedOptionIds.add(optionId);
        } else {
            this.allowedOptionIds.delete(optionId);
        }
        $(this).trigger('change');
    }

    setTargetDuration(seconds) {
        this.targetDurationSeconds = seconds;
        $(this).trigger('change');
    }

    /**
     * @return {string[]}
     */
    getAllowedTroopTypes() {
        return this._sendableTroopTypes.filter(troopType => this.troops[troopType].maySend);
    }

    isTroopTypeAllowed(troopType) {
        return this.troops[troopType].maySend;
    }

    setTroopAllowed(troopType, isAllowed) {
        this.troops[troopType].maySend = isAllowed;
        $(this).trigger('change');
    }

    /**
     * @return TroopCounts
     */
    getReservedTroopCounts() {
        let troopCounts = new TroopCounts();
        for (let troopType of this._sendableTroopTypes) {
            troopCounts[troopType] = this.troops[troopType].reserved;
        }
        return troopCounts;
    }

    getReservedCount(troopType) {
        return this.troops[troopType].reserved;
    }

    setReservedCount(troopType, count) {
        this.troops[troopType].reserved = count;
        $(this).trigger('change');
    }

    setTroopOrder(troopOrder) {
        this.troopOrder = troopOrder;
        $(this).trigger('change');
    }

    export() {
        return {
            mode: this.mode,
            allowedOptionIds: [...this.allowedOptionIds.values()],
            targetDurationSeconds: this.targetDurationSeconds,
            troops: this.troops,
            troopOrder: this.troopOrder
        }
    }

    import(exported) {
        this.mode = exported.mode;
        this.allowedOptionIds = new Set(exported.allowedOptionIds);
        this.targetDurationSeconds = exported.targetDurationSeconds;
        this.troops = exported.troops;
        this.troopOrder = exported.troopOrder;
    }

}

ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON = 'sane_person';
ScavengeTroopsAssignerPreferences.MODE_ADDICT = 'addict';

export { ScavengeTroopsAssignerPreferences };