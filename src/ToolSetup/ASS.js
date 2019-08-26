import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { scrapeScavengeModels } from '/twcheese/src/Scrape/scavenge.js';
import { troopUtil } from '/twcheese/src/Models/Troops.js';
import { ScavengeTroopsAssigner } from '/twcheese/src/Models/ScavengeTroopsAssigner.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/ASS/Default.js';



let initialized = false;
let troopsAssigner;

// todo: need a function to scrape available troop counts

async function useTool() {
    if (!atScavengeScreen()) {
        suggestRedirectToScavengeScreen();
        return;
    }

    if (!initialized) {
        await ensureRemoteConfigsUpdated();
        let { options, sendableTroopTypes } = scrapeScavengeModels(document);
        troopsAssigner = new ScavengeTroopsAssigner(options, sendableTroopTypes, troopUtil);
        initialized = true;
    }

    // todo
    
}


function atScavengeScreen() {
    let here = document.location.href;
    return here.includes('screen=place') && here.includes('mode=scavenge');
}


function suggestRedirectToScavengeScreen() {
    suggestRedirect({
        message: 'To use this, you must be at the scavenging screen.',
        screen: 'place',
        screenName: 'Scavenging Screen',
        uriParams: {
            mode: 'scavenge'
        },
        skippableId: 'Tool:ASS'
    });
}


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory({});

function newDebugProcess() {
    let name = 'Tool: Another Scavenging Script';
    return processFactory.create(name, debugCfgDefault, true);
}


window.TwCheese.registerTool({
    id: 'ASS',
    use: useTool,
    getDebugProcess: newDebugProcess
});