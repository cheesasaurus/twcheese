/**
 * @param {HTMLElement} resourcesContainer an element containing timber/clay/iron amounts
 * @return {Object} {timber: timberAmount, clay: clayAmount, iron: ironAmount}
 */
function scrapeResources(resourcesContainer) {
    // remove grey periods used as thousands separators
    let $res = $(resourcesContainer).clone().remove('.grey'); 

    let resAmount = function(resIconCssClass) {
        // note: sometimes, if the res amount is 0, the game excludes it (and its icon) instead of showing 0
        let icon = $res.find('span.' + resIconCssClass).get(0);
        return icon ? parseInt($(icon.nextSibling).text()) : 0;
    }

    return {
        timber: resAmount('wood'),
        clay: resAmount('stone'),
        iron: resAmount('iron')
    };
};

export { scrapeResources };