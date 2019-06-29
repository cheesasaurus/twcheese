import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { PhaseTypes } from '/twcheese/src/Models/Debug/PhaseTypes.js';

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
        this.ctrl = {};
    }

    getType() {
        return PhaseTypes.ATTEMPT;
    }

    async doAttempt() {
        try {
            let data = await this.abortableAttempt();
            this.data = data;
            await this.success(data);
            this.status = Status.SUCCESS;
        } catch (err) {
            this.status = Status.FAIL;
            this.error = err;
            await this.fail(err);
        }
        this.checkCompletionReady();
    }

    async abortableAttempt() {
        return new Promise(async (resolve, reject) => {
            $(this.ctrl).on(DebugEvents.USER_REJECTED, () => reject('user rejected'));
            try {
                let data = await this.attempt(this.ctrl);
                resolve(data);
            }
            catch(err) {
                reject(err);
            }            
        });
    }

    userAbort() {
        $(this.ctrl).trigger(DebugEvents.USER_REJECTED);
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
            extra: err.extra,
            stack: err.stack
        };
    }
    
    static create(phaseNum, functionToAttempt) {
        return new PhaseAttempt(phaseNum, functionToAttempt);
    }

}

export { PhaseAttempt };