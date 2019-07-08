import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';

// note: some worlds have milliseconds disabled

/**
 * @param {string} text formatted the way tw does it
 * @param {string} market two char market code. e.g. "en"
 * @return {TwCheeseDate}
 */
function parseArrival(text, market) {    
    switch (market) {
        case 'pt': return parseArrivalPortuguese(text);            
    }
    return parseArrivalEnglish(text);
};

function parseArrivalEnglish(text) {
    // e.g. "Jun 12, 2019  15:36:23:000"
    let expr = /(\D{3}) (\d{1,2}), (\d{4})  (\d{2}):(\d{2}):(\d{2}):?(\d{3})?/;
    let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);    
    let month = TwCheeseDate.monthNumber(monthName);
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}

function parseArrivalPortuguese(text) {
    // e.g. "09/jul/2019 (20:03:15):895"
    let expr = /(\d+)\/(\D+)\/(\d+) \((\d+):(\d+):(\d+)\):?(\d+)?/;
    let [, day, monthName, year, hours, minutes, seconds, millis] = text.match(expr);
    let month = TwCheeseDate.monthNumber(monthName);
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}


export { parseArrival };