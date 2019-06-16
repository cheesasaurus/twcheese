import { RateLimiter } from '/twcheese/src/Models/RateLimiter.js';

let throttle = new RateLimiter(5);

let originalSend = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function() {
    throttle.requestWasMade();
    originalSend.apply(this, arguments);
}

/**
 *	requests the body from an html document and returns it as an HTML element
 *	@param	{string} url the url of the page to get the document body from
 *  @return {Promise}
 *	@resolve {HTMLBodyElement}
 */
async function requestDocumentBody(url) {
    await throttle.sleepIfNeeded();

    return new Promise(function(resolve, reject) {
        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", url);
        xmlhttp.onload = function() {
            let requestedDocumentBody = document.createElement("body");
            requestedDocumentBody.innerHTML = xmlhttp.responseText;
            resolve(requestedDocumentBody);
        };
        xmlhttp.onerror = function() {
            reject('failed to load ' + url);
        }
        xmlhttp.send("");
    });
};

export { requestDocumentBody };