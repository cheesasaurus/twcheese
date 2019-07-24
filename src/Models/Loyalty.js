import { troopUtil } from '/twcheese/src/Models/Troops.js';
import { gameConfig } from '/twcheese/src/Util/Config.js';


/**
 * @param {number} reportedLoyalty
 * @param {Date} timeReported
 * @param {Date} timeNow
 * @param {Village|{x:number, y:number}} home
 * @param {Village} target
 * @return {{loyaltyNow:Number, loyatyAtArrival:Number}}
 */
function calcLoyalty(reportedLoyalty, timeReported, timeNow, home, target) {
    if (reportedLoyalty <= 0) {
        reportedLoyalty = 25; // loyalty jumps to 25 after a village is conquered
    }

    let hourlyGain = gameConfig.get('speed');

    let hoursPassed = (timeNow - timeReported) / 3600000;
    let loyaltyNow = Math.min(100, Math.floor(reportedLoyalty + hoursPassed * hourlyGain));

    let distance = target.distanceTo(home);
    let travelHours = troopUtil.travelDuration('snob', distance) / 3600000;
    let loyaltyAtArrival = Math.min(100, Math.floor(loyaltyNow + travelHours * hourlyGain));

    return {loyaltyNow, loyaltyAtArrival};
}


export { calcLoyalty };
