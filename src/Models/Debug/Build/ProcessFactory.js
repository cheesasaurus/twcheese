import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';

class ProcessFactory {

    create(cfg, actions) {
        actions = actions || {};

        // todo: implement

        return new DebugProcess();
    }

};

export { ProcessFactory };