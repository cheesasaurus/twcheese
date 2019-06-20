import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';
import { promptLoadHauls } from '/twcheese/src/Prompt/promptLoadHauls.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { appendHaulColsToCommandsTable } from '/twcheese/src/Transform/appendHaulColsToCommandsTable.js';


let haulsIncluded = false;

async function enhanceScreenWithHaulInfo(progressMonitor) {
    let returningCommands = await appendHaulColsToCommandsTable(progressMonitor);

    (new HaulStatsWidget(returningCommands, scrapePageNumber()))
        .insertAfter($('.modemenu:eq(1)'));

    haulsIncluded = true;
};


function suggestRedirectToCommandsOverview() {
    suggestRedirect({
        message: `
            <p>To use this, you must be at the commands overview.</p>
            <p style="font-size: 10px;">Consider using the 'return' filter, since outgoing troops don't carry resources :)</p>`,
        screen: 'overview_villages',
        uriParams: {
            mode: 'commands',
            type: 'return'
        }
    });
}


window.TwCheese.registerTool('OverviewHauls', function() {
    let here = document.location.toString();
    if (here.includes('screen=overview_villages') && here.includes('mode=commands')) {
        if (haulsIncluded) {
            window.UI.InfoMessage('This is already active.', 3000, 'error');
            return;
        }
        promptLoadHauls(enhanceScreenWithHaulInfo);
    }
    else {
        suggestRedirectToCommandsOverview();
    }
});
