import { RateLimiter } from '/twcheese/src/Models/RateLimiter.js';

let throttle = new RateLimiter(5);

let originalSend = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function() {
    throttle.requestWasMade();
    originalSend.apply(this, arguments);
}

/**
 *	requests the document from a url
 *	@param	{string} url the url of the page to get the document from
 *  @return {Promise}
 *	@resolve {HTMLDocment}
 */
async function requestDocument(url) {
    await throttle.sleepIfNeeded();

    return new Promise(function(resolve, reject) {
        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", url);
        xmlhttp.onload = function() {
            let doc = (new DOMParser()).parseFromString(xmlhttp.responseText, 'text/html')
            resolve(doc);
        };
        xmlhttp.onerror = function() {
            reject('failed to load ' + url);
        }
        xmlhttp.send("");
    });
};

export { requestDocument };