
async function twAlert(message, buttonText) {
    return new Promise(function(resolve) {
        message = message || '';
        buttonText = buttonText || 'Ok';
    
        let buttonAcknowledge = {
            text: buttonText,
            callback: resolve
        };
        window.UI.ConfirmationBox(message, [buttonAcknowledge], 'twcheese_alert', true, true);
    });    
}

export { twAlert };