import { RateLimiter } from '/twcheese/src/Models/RateLimiter.js';

let throttle = new RateLimiter(5);

let originalFetch = window.fetch;
window.fetch = function() {
    throttle.requestWasMade();
    return originalFetch.apply(this, arguments);
};


/**
 * requests the document from a url
 * @param {string} url the url of the page to get the document from
 * @return {Promise}
 * @resolve {HTMLDocment}
 */
async function requestDocument(url) {
    await throttle.sleepIfNeeded();
    let response = await fetch(url);
    let responseText = await response.text();
    let doc = (new DOMParser()).parseFromString(responseText, 'text/html');

    Object.defineProperty(doc, 'URL', {
        get: () => url
    });
    
    return doc;
};


/**
 * requests xml document from a url
 * @param {string} url the url of the page to get the cml document from
 * @return {Promise}
 * @resolve {XMLDocument}
 */
async function requestXml(url) {
    await throttle.sleepIfNeeded();
    let response = await fetch(url);
    let responseText = await response.text();
    let xmlDoc = (new DOMParser()).parseFromString(responseText, 'text/xml');

    Object.defineProperty(xmlDoc, 'URL', {
        get: () => url
    });

    return xmlDoc;
};


/**
 * make a POST request to the game
 * @param {string} screen 
 * @param {object} uriParams 
 * @param {object} data
 * @return {Promise}
 * @resolve {object} response data from the game
 */
async function postToGame(screen, uriParams, data) {
    await throttle.sleepIfNeeded();
    return new Promise(function(resolve, reject) {
        window.TribalWars.post(screen, uriParams, data, resolve, reject);
    });
}


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


export { requestDocument, requestXml, postToGame, gameUrl, attackPrepUrl };