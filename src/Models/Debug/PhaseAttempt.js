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
        this.instructions;
        this.attempt = asyncFunctionToAttempt;
        this.success = async () => {};
        this.fail = async () => {};
        this.status = Status.NOT_ATTEMPTED;
        this.autoComplete = true;
        this.error;
        this.data;
        this.summarizeData = d => d;
    }

    async doAttempt() {
        try {
            let data = await this.attempt();
            this.data = data;
            await this.success(data);
            this.status = Status.SUCCESS;
        } catch (err) {
            this.status = Status.FAIL;
            this.error = err;
            await this.fail(err);
        }
        console.log(this.status);
        this.checkCompletionReady();
    }

    setInstructions(instructions) {
        this.instructions = instructions;
        return this;
    }

    setDataSummarizer(func) {
        this.summarizeData = func;
        return this;
    }

    onSuccess(cb) {
        this.success = cb;
        return this;
    }

    onFail(cb) {
        this.fail = cb;
        return this;
    }

    start() {
        this.doAttempt();
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
            phaseName: this.name,
            status: this.status,
            data: typeof this.data === 'undefined' ? this.data : this.summarizeData(this.data),
            error: this.summarizeError()
        }
    }

    summarizeError() {
        let err = this.error;
        if (!(err instanceof Error)) {
            return err;
        }
        return {
            message: err.message,
            name: err.name,
            stack: err.stack
        };
    }
    
    static create(phaseNum, functionToAttempt) {
        return new PhaseAttempt(phaseNum, functionToAttempt);
    }

}

export { PhaseAttempt };