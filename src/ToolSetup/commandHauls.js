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


window.TwCheese.actions.promptCommandHauls = function() {
    if (haulsIncluded) {
        UI.InfoMessage('This is already active.', 3000, 'error');
        return;
    }
    promptLoadHauls(enhanceScreenWithHaulInfo);
}