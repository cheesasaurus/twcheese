import { Phase } from '/twcheese/src/Models/Debug/Phase.js';


class PhaseReport extends Phase {
    constructor(process) {
        super('about to send bug report');
        this.process = process;
    }

    start() {
        // todo
        throw 'not implemented';
    }

    checkCompletionReady() {
        // todo
        console.log('in phase report, checkCompletionReady');
        throw 'not implemented';
    }

    getThingsToFollowUpOn() {
        // todo
        console.log('in phase report, getThingsToFollowUpOn');
        throw 'not implemented';
    }

    static create(process) {
        return new PhaseReport(process);
    }
}

export { PhaseReport };