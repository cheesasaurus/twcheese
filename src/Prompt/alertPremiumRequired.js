import { twAlert } from '/twcheese/src/Prompt/twAlert.js';

async function alertPremiumRequired() {
    let message = `
        This script relies on features that are only available to <a href="game.php?screen=premium">premium account</a> users.
        <br/>
        <p style="font-size: 10px;">
            For $999 you could buy a monitor stand.
            <br/>Or <strong>30+ years</strong> of tw premium account!
        </p>`;

    let buttonText = `Do I look like I'm made out of money?`;
    return twAlert(message, buttonText);
}

export { alertPremiumRequired };