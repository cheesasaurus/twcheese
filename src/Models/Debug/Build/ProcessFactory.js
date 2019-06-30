import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';

class ProcessFactory {

    createFromYAML(yaml, actions) {        
        let cfg = {}; // todo: parse yaml to js object
        return this.create(cfg, actions);
    }

    create(cfg, actions) {
        actions = actions || {};

        // todo: implement

        return new DebugProcess();
    }

};

export { ProcessFactory };