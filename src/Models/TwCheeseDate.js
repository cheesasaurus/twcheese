let serverOffsetFromUtc = window.server_utc_diff * 1000;
let localOffsetFromUtc = new Date().getTimezoneOffset() * 60000;

class TwCheeseDate extends Date {
    constructor() {
        if (arguments.length === 0) {
            super(window.Timing.getCurrentServerTime());
        } else {
            super(...arguments);
        }
    }

    clone() {
        return new TwCheeseDate(this.getTime());
    }

    addDays(days) {
        let ret = this.clone();
        ret.setUTCDate(this.getUTCDate() + days);
        return ret;
    }

    addHours(hours) {
        let ret = this.clone();
        ret.setUTCHours(this.getUTCHours() + hours);
        return ret;
    }

    addMinutes(minutes) {
        let ret = this.clone();
        ret.setUTCMinutes(this.getUTCMinutes() + minutes);
        return ret;
    }

    addSeconds(seconds) {
        let ret = this.clone();
        ret.setUTCSeconds(this.getUTCSeconds() + seconds);
        return ret;
    }

    addMilliseconds(milliseconds) {
        let ret = this.clone();
        ret.setUTCMilliseconds(this.getUTCMilliseconds() + milliseconds);
        return ret;
    }

    subDays(days) {
        return this.addDays(-days);        
    }

    subHours(hours) {
        return this.addHours(-hours);
    }

    subMinutes(minutes) {
        return this.addMinutes(-minutes);
    }

    subSeconds(seconds) {
        return this.addSeconds(-seconds);
    }

    subMilliseconds(milliseconds) {
        return this.addMilliseconds(-milliseconds);
    }

    getServerHours() {
        return this.addMilliseconds(serverOffsetFromUtc).getUTCHours();
    }

    isTodayOnServer() {
        let dateAdjusted = this.addMilliseconds(serverOffsetFromUtc);
        let nowAdjusted = new TwCheeseDate().addMilliseconds(serverOffsetFromUtc);
        return dateAdjusted.isSameDayInUtc(nowAdjusted);
    }

    isTomorrowOnServer() {
        let dateAdjusted = this.addMilliseconds(serverOffsetFromUtc);
        let nowAdjusted = new TwCheeseDate().addMilliseconds(serverOffsetFromUtc);
        let tomorrow = nowAdjusted.addDays(1);    
        return dateAdjusted.isSameDayInUtc(tomorrow);
    }

    isSameDayInUtc(otherDate) {
        return this.getUTCFullYear() === otherDate.getUTCFullYear()
            && this.getUTCMonth() === otherDate.getUTCMonth()
            && this.getUTCDate() === otherDate.getUTCDate();
    }

    startOfHour() {
        let ret = this.clone();
        ret.setUTCMinutes(0);
        ret.setUTCSeconds(0);
        ret.setUTCMilliseconds(0);
        return ret;
    }

    endOfHour() {
        let ret = this.clone();
        ret.setUTCMinutes(59);
        ret.setUTCSeconds(59);
        ret.setUTCMilliseconds(999);
        return ret;
    }

    /**
     * @params whatever would be passed to a Date constructor
     * @return {TwCheeseDate}
     */
    static newServerDate() {
        let ret = new TwCheeseDate(...arguments);
        if (arguments.length > 1) {
            ret = ret.addMilliseconds(0 - serverOffsetFromUtc - localOffsetFromUtc);
        }
        return ret;
    }

    static monthNumber(monthName) {
        return (new Date(monthName + ' 1 1970')).getMonth();
    }

}

export { TwCheeseDate };