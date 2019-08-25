import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';


let initialized = false;

async function useTool() {
    if (!initialized) {
        await ensureRemoteConfigsUpdated();
        initialized = true;
    }

    // todo
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