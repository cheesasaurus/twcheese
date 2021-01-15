import { Resources } from '/twcheese/src/Models/Resources.js';

/**
 * @param {HTMLElement} resourcesContainer an element containing wood/stone/iron amounts
 * @return {Resources}
 */
function scrapeResources(resourcesContainer) {
    // remove grey periods used as thousands separators
    let $res = $(resourcesContainer).clone();
    $res.find('.grey').remove();

    let resAmount = function(resIconCssClass) {
        // note: sometimes, if the res amount is 0, the game excludes it (and its icon) instead of showing 0
        let icon = $res.find('span.' + resIconCssClass).get(0);
        return icon ? parseInt($(icon).parent().text()) : 0;
    }

    return new Resources(
        resAmount('wood'),
        resAmount('stone'),
        resAmount('iron')
    );
};

export { scrapeResources };