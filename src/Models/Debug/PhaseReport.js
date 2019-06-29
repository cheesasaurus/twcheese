import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { PhaseTypes } from '/twcheese/src/Models/Debug/PhaseTypes.js';


const Status = {
    SUCCESS: 'success',
    FAIL: 'fail',
    NOT_ATTEMPTED: 'not_attempted'
};


class PhaseReport extends Phase {
    constructor(bugReporter) {
        super('send bug report');
        this.bugReporter = bugReporter;
        this.status = Status.NOT_ATTEMPTED;
        this.error;
    }

    getType() {
        return PhaseTypes.REPORT;
    }

    start() {
        let report = this.bugReporter.buildReport();
        this.bugReporter.submitReport(report)
            .then(d => {
                this.status = Status.SUCCESS;
                $(this).trigger({
                    type: DebugEvents.BUG_REPORT_SUCCEEDED,
                    url: d.html_url
                })
            })
            .catch(error => {
                this.error = error;
                this.status = Status.FAIL;
                $(this).trigger(DebugEvents.BUG_REPORT_FAILED)
            })
            .finally(() => this.checkCompletionReady());
    }

    checkCompletionReady() {
        if (this.status !== Status.NOT_ATTEMPTED) {
            $(this).trigger(DebugEvents.PHASE_COMPLETION_READY);
        } else {
            $(this).trigger(DebugEvents.PHASE_COMPLETION_NOT_READY);
        }
    }

    getThingsToFollowUpOn() {
        return [];
    }

    getSummary() {
        return {
            phaseName: this.name
        };
    }

    static create(bugReporter) {
        return new PhaseReport(bugReporter);
    }
}


export { PhaseReport };