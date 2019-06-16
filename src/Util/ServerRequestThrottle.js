import { RateLimiter } from '/twcheese/src/Models/RateLimiter.js';

let throttle = new RateLimiter(5);

let originalSend = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function() {
    throttle.requestWasMade();
    originalSend.apply(this, arguments);
}

export { throttle }