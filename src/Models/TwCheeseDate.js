import { ImageSrc } from '/twcheese/conf/ImageSrc.js';

let serverOffsetFromUtc = window.server_utc_diff * 1000;
let localOffsetFromUtc = new Date().getTimezoneOffset() * 60000;

let pretendServerIsUTC = function(cheeseDate) {
    return cheeseDate.addMilliseconds(serverOffsetFromUtc)
}


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

    getServerYear() {
        return pretendServerIsUTC(this).getUTCFullYear();
    }

    getServerMonth() {
        return pretendServerIsUTC(this).getUTCMonth();
    }

    getServerDate() {
        return pretendServerIsUTC(this).getUTCDate();
    }

    getServerHours() {
        return pretendServerIsUTC(this).getUTCHours();
    }

    getServerHours() {
        return pretendServerIsUTC(this).getUTCHours();
    }

    getServerMinutes() {
        return pretendServerIsUTC(this).getUTCMinutes();
    }

    getServerSeconds() {
        return pretendServerIsUTC(this).getUTCSeconds();
    }

    getServerMilliseconds() {
        return pretendServerIsUTC(this).getUTCMilliseconds();
    }

    isTodayOnServer() {
        let date = pretendServerIsUTC(this);
        let now = pretendServerIsUTC(new TwCheeseDate());
        return date.isSameDayInUtc(now);
    }

    isTomorrowOnServer() {
        let date = pretendServerIsUTC(this);
        let now = pretendServerIsUTC(new TwCheeseDate());
        let tomorrow = now.addDays(1);    
        return date.isSameDayInUtc(tomorrow);
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

    startOfSecond() {
        let ret = this.clone();
        ret.setUTCMilliseconds(0);
        return ret;
    }

    equals(date) {
        return this.getTime() === date.getTime();
    }

    toHtml(includeMillis = true) {
        let d = pretendServerIsUTC(this);
        let year = d.getUTCFullYear();
        let monthName = d.toLocaleString('default', {month: 'short'});
        let day = d.getUTCDate().toString().padStart(2, '0');
        let hours = d.getUTCHours().toString().padStart(2, '0');
        let minutes = d.getUTCMinutes().toString().padStart(2, '0');
        let seconds = d.getUTCSeconds().toString().padStart(2, '0');
        let ms = d.getUTCMilliseconds().toString().padStart(3, '0');

        let html = `${monthName} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
        if (includeMillis) {
            html += `<span class="small grey">:${ms}</span>`;
        }
        return html;
    }

    toDebugString() {
        let d = pretendServerIsUTC(this);
        let year = d.getUTCFullYear();
        let month = d.getUTCMonth().toString().padStart(2, '0');
        let day = d.getUTCDate().toString().padStart(2, '0');
        let hours = d.getUTCHours().toString().padStart(2, '0');
        let minutes = d.getUTCMinutes().toString().padStart(2, '0');
        let seconds = d.getUTCSeconds().toString().padStart(2, '0');
        let ms = d.getUTCMilliseconds().toString().padStart(3, '0');
        let offsetHours = Math.round(serverOffsetFromUtc / 360000) / 10;        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms} ServerTime(UTC+${offsetHours})`;
    }

    imageSrc() {
        return ImageSrc.calendar;
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