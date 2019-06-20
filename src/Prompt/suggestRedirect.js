
function suggestRedirect(options) {
    let { message, screen, uriParams } = options;
    message = message || '{{Some genius forgot to write a message here}}';
    uriParams = uriParams || {};
    if (!screen) {
        throw 'screen must be specified!';
    }

    let buttonConfirm = {
        text: 'Take me there!',
        callback: () => window.TribalWars.redirect(screen, uriParams),
        confirm: true
    };
    let buttonCancel = {
        text: 'Whatever...',
        callback: () => {}
    };
    window.UI.ConfirmationBox(message, [buttonConfirm, buttonCancel], 'twcheese_suggest_redirect', true, true);
}

export { suggestRedirect };
