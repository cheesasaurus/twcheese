import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';
import { promptLoadHauls } from '/twcheese/src/Prompt/promptLoadHauls.js';
import { appendHaulColsToCommandsTable } from '/twcheese/src/Transform/appendHaulColsToCommandsTable.js';


let haulsIncluded = false;

async function enhanceScreenWithHaulInfo(progressMonitor) {
    let returningCommands = await appendHaulColsToCommandsTable(progressMonitor);

    (new HaulStatsWidget(returningCommands, scrapePageNumber()))
        .insertAfter($('.modemenu:eq(1)'));

    haulsIncluded = true;
};


window.TwCheese.registerTool('OverviewHauls', function() {
    let here = document.location.toString();
    if (here.includes('screen=overview_villages') && here.includes('mode=commands')) {
        if (haulsIncluded) {
            UI.InfoMessage('This is already active.', 3000, 'error');
            return;
        }
        promptLoadHauls(enhanceScreenWithHaulInfo);
    }
    else {
        alert('To use this, you must be on the commands overview. It\'s recommended to use the \'return\' filter, since outgoing troops don\'t carry resources :)');
    }
});
