import { ImageSrc } from '/twcheese/conf/ImageSrc.js';


let bits = {
    SENT_VIA_FA: 1,
    CONTAINS_SNOB: 2,
    CONTAINS_KNIGHT: 4,
    SIZE_SMALL: 8,
    SIZE_MEDIUM: 16,
    SIZE_LARGE: 32,
    CONTAINS_SPY: 64
};


let sizeThresholds = [
    [5001, bits.SIZE_LARGE],
    [1001, bits.SIZE_MEDIUM],
    [1, bits.SIZE_SMALL]
];


let Icons = new Map([
    [bits.SENT_VIA_FA, {
        src: ImageSrc.attackSentViaFa,
        description: 'Looting attack'
    }],
    [bits.SIZE_SMALL, {
        src: ImageSrc.attackSizeSmall,
        description: 'Small attack (1-1000 troops)'
    }],
    [bits.SIZE_MEDIUM, {
        src: ImageSrc.attackSizeMedium,
        description: 'Medium attack (1000-5000 troops)'
    }],
    [bits.SIZE_LARGE, {
        src: ImageSrc.attackSizeLarge,
        description: 'Large attack (5000+ troops)'
    }],
    [bits.CONTAINS_SNOB, {
        src: ImageSrc.attackContainsSnob,
        description: 'Contains Nobleman'
    }],
    [bits.CONTAINS_SPY, {
        src: ImageSrc.attackContainsSpy,
        description: 'Contains Scouts'
    }],
    [bits.CONTAINS_KNIGHT, {
        src: ImageSrc.attackContainsKnight,
        description: 'Contains Paladin'
    }],
]);


class AttackIcons {
    constructor(mask = 0) {
        this.mask = mask;
    }

    getIcons() {
        let icons = [];
        for (let [bit, icon] of Icons) {
            if (this.mask & bit) {
                icons.push(icon);
            }
        }
        return icons;
    }

    getMask() {
        return this.mask;
    }

    setSentViaFa() {
        this.mask |= bits.SENT_VIA_FA;
    }

    setContainsSnob() {
        this.mask |= bits.CONTAINS_SNOB;
    }

    setContainsSpy() {
        this.mask |= bits.CONTAINS_SPY;
    }

    setContainsKnight() {
        this.mask |= bits.CONTAINS_KNIGHT;
    }

    setSizeSmall() {
        this.mask |= bits.SIZE_SMALL;
    }

    setSizeMedium() {
        this.mask |= bits.SIZE_MEDIUM;
    }

    setSizeLarge() {
        this.mask |= bits.SIZE_LARGE;
    }

    /**
     * @param {TroopCounts} troops
     * @param {boolean} wasSentViaFa
     * @return {AttackIcons}
     */
    static fromTroopCounts(troops, wasSentViaFa = false) {
        let mask = 0;
        if (wasSentViaFa) {
            mask |= bits.SENT_VIA_FA;
        }
        if (troops.snob > 0) {
            mask |= bits.CONTAINS_SNOB;
        }
        if (troops.knight > 0) {
            mask |= bits.CONTAINS_KNIGHT;
        }
        if (troops.spy > 0) {
            mask |= bits.CONTAINS_SPY;
        }
        if (!wasSentViaFa) {
            let sum = troops.sum();
            for (let [threshold, bit] of sizeThresholds) {
                if (sum >= threshold) {
                    mask |= bit;
                    break;
                }
            }
        }
        return new AttackIcons(mask);
    }

}


export { AttackIcons };
