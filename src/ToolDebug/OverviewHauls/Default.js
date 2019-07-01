import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg } from '/twcheese/dist/tool/cfg/debug/OverviewHauls/Default.js';

let pf = new ProcessFactory({});
let debugProcess = pf.create(processCfg, true);

export { debugProcess };