import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';

/**
 * @param {string} text formatted the way tw does it. e.g. "Jun 12, 2019  15:36:23:000"
 * @return {TwCheeseDate}
 */
function parseArrival(text) {
    // note: some worlds have milliseconds disabled
    let expr = /(\D{3}) (\d{1,2}), (\d{4})  (\d{2}):(\d{2}):(\d{2}):?(\d{3})?/;
    let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);    
    let month = TwCheeseDate.monthNumber(monthName);
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
};

export { parseArrival };