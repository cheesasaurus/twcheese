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
    return 'https://' + document.domain + window.TribalWars.buildURL(method, screen, uriParams);
}


function attackPrepUrl(unitCounts, targetVillageId, originVillageId = window.game_data.village.id) {
    let uriParams = {
        from: 'simulator',
        village: originVillageId,
        target_village_id: targetVillageId        
    };
    for (let [unitType, count] of Object.entries(unitCounts)) {
        uriParams['att_' + unitType] = count;
    }
    return gameUrl('place', uriParams);
}


export { requestDocument, gameUrl, attackPrepUrl };