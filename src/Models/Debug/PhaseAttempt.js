import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';

const Status = {
    SUCCESS: 'success',
    FAIL: 'fail',
    NOT_ATTEMPTED: 'not_attempted'
};


class PhaseAttempt extends Phase {
    constructor(phaseName, asyncFunctionToAttempt) {
        super(phaseName);
        this.attempt = asyncFunctionToAttempt;
        this.success = () => {};
        this.fail = () => {};
        this.status = Status.NOT_ATTEMPTED;
        this.error;
    }

    async doAttempt() {
        try {
            let data = await this.attempt();
            this.success(data);
            this.status = Status.SUCCESS;
        } catch (err) {
            this.fail(err);
            this.status = Status.FAIL;
        }
        this.checkCompletionReady();
    }

    onSuccess(cb) {
        this.success = cb;
        return this;
    }

    onFail(cb) {
        this.fail = cb;
        return this;
    }

    checkCompletionReady() {
        if (this.status !== Status.NOT_ATTEMPTED) {
            $(this).trigger(DebugEvents.PHASE_COMPLETION_READY);
        }
    }

    getThingsToFollowUpOn() {
        return [];
    }
    
    static create(phaseNum, functionToAttempt) {
        return new PhaseAttempt(phaseNum, functionToAttempt);
    }

}

export { PhaseAttempt };