class RateLimiter {
    constructor(maxBurstsPerSecond) {
        this.maxBurstsPerSecond = maxBurstsPerSecond;
        this.recentRequests = new Array(maxBurstsPerSecond);
    }

    requestWasMade() {
        this.recentRequests.unshift(performance.now());
        this.recentRequests.pop();
    }

    async sleepIfNeeded() {
        let anchorTimestamp = this.recentRequests[this.maxBurstsPerSecond - 1];
        if (typeof anchorTimestamp === 'undefined') {
            return;
        }
        let delayMs = anchorTimestamp + 1000 - performance.now();
        if (delayMs <= 0) {
            return;
        }
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, delayMs);
        });
    }
}

export {RateLimiter}