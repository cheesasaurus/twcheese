import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';


let initialized = false;

async function useTool() {
    if (!initialized) {
        await ensureRemoteConfigsUpdated();
        initialized = true;
    }

    if (!atScavengeScreen()) {
        suggestRedirectToScavengeScreen();
        return;
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