let scoreDefenderDied = {
    spear: 4,
    sword: 5,
    axe: 1,
    archer: 5,
    spy: 1,
    light: 5,
    marcher: 6,
    heavy: 23,
    ram: 4,
    catapult: 12,
    knight: 40,
    snob: 200,
    militia: 4
};

let scoreAttackerDied = {
    spear: 1,
    sword: 2,
    axe: 4,
    archer: 2,
    spy: 2,
    light: 13,
    marcher: 12,
    heavy: 15,
    ram: 8,
    catapult: 10,
    knight: 20,
    snob: 200,
    militia: 1
};


/**
 * @param {TroopCounts} defenderLosses
 */
function calcAttackerScore(defenderLosses) {
    let attackerScore = 0;
    for (let [unitType, count] of Object.entries(defenderLosses)) {
        if (typeof scoreDefenderDied[unitType] === 'undefined') {
            console.warn(`Couldn't determine ODA score for ${unitType}`);
            continue;
        }
        attackerScore += scoreDefenderDied[unitType] * count;
    }
    return attackerScore;
}    


/**
 * @param {TroopCounts} attackerLosses
 */
function calcDefenderScore(attackerLosses) {
    let defenderScore = 0;
    for (let [unitType, count] of Object.entries(attackerLosses)) {
        if (typeof scoreAttackerDied[unitType] === 'undefined') {
            console.warn(`Couldn't determine ODD score for ${unitType}`);
            continue;
        }
        defenderScore += scoreAttackerDied[unitType] * count;
    }
    return defenderScore;
}


export { calcAttackerScore, calcDefenderScore };
