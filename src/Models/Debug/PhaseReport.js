import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class PhaseReport extends Phase {
    constructor(process) {
        super('about to send bug report');
        this.process = process;
    }

    start() {
        // do nothing
    }

    checkCompletionReady() {
        $(this).trigger(DebugEvents.PHASE_COMPLETION_READY);
    }

    getThingsToFollowUpOn() {
        return [];
    }

    getSummary() {
        return {
            phaseName: this.name
        };
    }

    static create(process) {
        return new PhaseReport(process);
    }
}

export { PhaseReport };