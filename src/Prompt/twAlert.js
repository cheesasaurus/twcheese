
async function twAlert(message = '', buttonText = 'Ok') {
    return new Promise(function(resolve) {    
        let buttonAcknowledge = {
            text: buttonText,
            callback: resolve
        };
        window.UI.ConfirmationBox(message, [buttonAcknowledge], 'twcheese_alert', true, true);
    });    
}

export { twAlert };