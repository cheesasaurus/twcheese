
/**
 * @param {HTMLDocument} gameDoc
 * @return {string|null}
 */
function scrapeErrorMessage(gameDoc) {
    let $error = $(gameDoc).find('.error_box');
    return $error.length < 1 ? null : $error.text().trim();
}

export { scrapeErrorMessage };