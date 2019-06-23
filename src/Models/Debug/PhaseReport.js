import { Phase } from '/twcheese/src/Models/Debug/Phase.js';


class PhaseReport extends Phase {
    constructor(process) {
        super('about to send bug report');
        this.process = process;
    }

    checkCompletionReady() {
        // todo
        throw 'not implemented';
    }

    getThingsToFollowUpOn() {
        // todo
        throw 'not implemented';
    }

    static create(process) {
        return new PhaseReport(process);
    }
}

export { PhaseReport };