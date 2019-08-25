import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { scrapeScavengeOptions } from '/twcheese/src/Scrape/scavenge.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';


let initialized = false;
let scavengeOptions;

async function useTool() {
    if (!atScavengeScreen()) {
        suggestRedirectToScavengeScreen();
        return;
    }

    if (!initialized) {
        await ensureRemoteConfigsUpdated();
        scavengeOptions = scrapeScavengeOptions(document);
        console.log(scavengeOptions);
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