import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';
import { promptLoadHauls } from '/twcheese/src/Prompt/promptLoadHauls.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { alertPremiumRequired } from '/twcheese/src/Prompt/alertPremiumRequired.js';
import { appendHaulColsToCommandsTable } from '/twcheese/src/Transform/appendHaulColsToCommandsTable.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';

import { debugActions } from '/twcheese/src/ToolDebug/OverviewHauls/Actions.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/OverviewHauls/Default.js';
import { processCfg as debugCfgAtCommandsOverview } from '/twcheese/dist/tool/cfg/debug/OverviewHauls/AtCommandsOverview.js';


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
    if (!document.getElementById('commands_table')) {
        window.UI.ErrorMessage(`It looks like you don't have any commands.`, 3000);
        return;
    }

    promptLoadHauls(enhanceScreenWithHaulInfo);
}


let processFactory = new ProcessFactory(debugActions);

function newDebugProcess() {
    if (atCommandsOverview()) {
        return processFactory.create(debugCfgAtCommandsOverview, true);
    }
    return processFactory.create(debugCfgDefault, true);
}


window.TwCheese.registerTool({
    id: 'OverviewHauls',
    use: useTool,
    getDebugProcess: newDebugProcess
});
