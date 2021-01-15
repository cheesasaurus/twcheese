import { initCss } from '/twcheese/src/Util/UI.js';
import { userConfig } from '/twcheese/src/Util/Config.js';


function suggestRedirect(options) {
    let { message, screen, screenName, uriParams, skippableId } = options;
    message = message || '{{Some genius forgot to write a message here}}';
    screenName = screenName || '{{Screen Name goes here}}';
    uriParams = uriParams || {};
    if (!screen) {
        throw Error('screen must be specified!');
    }

    if (skippableId && userConfig.get(skipKey(skippableId), false)) {
        window.UI.InfoMessage(`Redirecting to <strong>${screenName}</strong>...`);
        setTimeout(() => window.TribalWars.redirect(screen, uriParams), 200);        
        return;
    }    

    let buttonConfirm = {
        text: 'Take me there!',
        callback: () => {
            if (skippableId) {
                let skipNextTime = $('#twcheese-suggest-redirect-skip').prop('checked');
                userConfig.set(skipKey(skippableId), skipNextTime);
            }
            window.TribalWars.redirect(screen, uriParams);
        },
        confirm: true
    };
    let buttonCancel = {
        text: 'Whatever...',
        callback: () => {}
    };
    window.UI.ConfirmationBox(buildContent(message, options), [buttonConfirm, buttonCancel], 'twcheese_suggest_redirect', true, true);
}


function skipKey(skippableId) {
    return 'suggestRedirect.skip.' + skippableId;
}


function buildContent(message, options) {
    let html = message;
    if (options.skippableId) {
        html += `<div class="twcheese-suggest-redirect-skip-container">
            <input id="twcheese-suggest-redirect-skip" type="checkbox">
            <span>Don't ask, just take me there next time.</span>
        </div>`
    }
    return html;
}


initCss(`
    .twcheese-suggest-redirect-skip-container {
        margin-top: 20px;
        font-size: 10px;
    }

    .twcheese-suggest-redirect-skip-container > * {
        vertical-align: middle;
    }
`);



export { suggestRedirect };
