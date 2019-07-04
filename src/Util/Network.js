import { RateLimiter } from '/twcheese/src/Models/RateLimiter.js';

let throttle = new RateLimiter(5);

let originalFetch = fetch;
fetch = function() {
    throttle.requestWasMade();
    return originalFetch.apply(this, arguments);
};

/**
 *	requests the document from a url
 *	@param	{string} url the url of the page to get the document from
 *  @return {Promise}
 *	@resolve {HTMLDocment}
 */
async function requestDocument(url) {
    await throttle.sleepIfNeeded();
    let response = await fetch(url);
    let responseText = await response.text();
    return (new DOMParser()).parseFromString(responseText, 'text/html');
};


function gameUrl(screen, uriParams, method = 'GET') {
    return window.TribalWars.buildURL(method, screen, uriParams);
}


export { requestDocument, gameUrl };