import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';

// note: some worlds have milliseconds disabled

/**
 * @param {string} text formatted the way tw does it
 * @param {string} market two char market code. e.g. "en"
 * @return {TwCheeseDate}
 */
function parseArrival(text, market) {    
    switch (market) {
        case 'br': return parseArrivalBrazilianPortuguese(text);
        case 'cz': return parseArrivalCzech(text);
        case 'pt': return parseArrivalPortuguese(text);        
    }
    return parseArrivalEnglish(text);
};

function parseArrivalEnglish(text) {
    // e.g. "Jun 12, 2019  15:36:23:000"
    let expr = /(\S+) (\d+), (\d+)  (\d+):(\d+):(\d+):?(\d+)?/;
    let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);    
    let month = TwCheeseDate.monthNumber(monthName);
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}

function parseArrivalCzech(text) {
    // e.g. "10.07.19 04:43:15:967"
    let [day, monthNumber, yearShort, hours, minutes, seconds, millis] = text.match(/\d+/g);
    let year = '20' + yearShort;
    let month = monthNumber - 1;
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}

function parseArrivalPortuguese(text) {
    // e.g. "09/jul/2019 (20:03:15):895"
    let expr = /(\d+)\/(\D+)\/(\d+) \((\d+):(\d+):(\d+)\):?(\d+)?/;
    let [, day, monthName, year, hours, minutes, seconds, millis] = text.match(expr);
    let month = TwCheeseDate.monthNumber(monthName);
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}

function parseArrivalBrazilianPortuguese(text) {
    // e.g. "mai 20, 2020  11:54:33:503"
    let expr = /(\S+) (\d+), (\d+)  (\d+):(\d+):(\d+):?(\d+)?/;
    let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);
    let month = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'].indexOf(monthName.toLowerCase());
    return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
}

export { parseArrival };