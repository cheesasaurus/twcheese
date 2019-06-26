import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';
import { promptLoadHauls } from '/twcheese/src/Prompt/promptLoadHauls.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { alertPremiumRequired } from '/twcheese/src/Prompt/alertPremiumRequired.js';
import { appendHaulColsToCommandsTable } from '/twcheese/src/Transform/appendHaulColsToCommandsTable.js';
import { debugProcess as debugProcessAtCommandsOverview } from '/twcheese/src/ToolDebug/OverviewHauls/AtCommandsOverview.js';
import { debugProcess as debugProcessDefault } from '/twcheese/src/ToolDebug/OverviewHauls/Default.js';


let haulsIncluded = false;

async function enhanceScreenWithHaulInfo(progressMonitor) {
    let returningCommands = await appendHaulColsToCommandsTable(progressMonitor);

    (new HaulStatsWidget(returningCommands, scrapePageNumber()))
        .insertAfter($('.modemenu:eq(1)'));

    haulsIncluded = true;
};


function atCommandsOverview() {
    let here = document.location.href;
    return here.includes('screen=overview_villages') && here.includes('mode=commands');
}


function suggestRedirectToCommandsOverview() {
    suggestRedirect({
        message: `
            To use this, you must be at the commands overview.
            <p style="font-size: 10px;">Consider using the 'return' filter, since outgoing troops don't carry resources :)</p>`,
        screen: 'overview_villages',
        uriParams: {
            mode: 'commands',
            type: 'return'
        }
    });
}


function useTool() {
    if (haulsIncluded) {
        window.UI.InfoMessage('This is already active.', 3000, 'error');
        return;
    }
    if (!window.premium) {
        alertPremiumRequired();
        return;
    }    
    if (!atCommandsOverview()) {
        suggestRedirectToCommandsOverview();
        return;
    }

    promptLoadHauls(enhanceScreenWithHaulInfo);
}


window.TwCheese.registerTool({
    id: 'OverviewHauls',
    use: useTool,
    getDebugProcess: () => atCommandsOverview() ? debugProcessAtCommandsOverview : debugProcessDefault
});
