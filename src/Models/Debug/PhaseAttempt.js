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
        this._error;
        this._result;
        this.summarizeData = d => d;
        this.ctrl = {};

        this.successFollowUpPhases = [];
    }

    getType() {
        return PhaseTypes.ATTEMPT;
    }

    get result() {
        if (this.status === Status.NOT_ATTEMPTED) {
            throw new Error('tried to get result before the attempt settled');
        }
        if (this.status === Status.FAIL) {
            throw new Error(`tried to get result of an attempt that failed`);
        }
        return this._result;
    }

    async doAttempt() {
        try {
            let result = await this.abortableAttempt();
            this.status = Status.SUCCESS;
            this._result = result;            
            await this.success(result);
        } catch (err) {
            console.warn(err);
            this.status = Status.FAIL;
            this._error = err;
            await this.fail(err);
        }
        this.checkCompletionReady();
    }

    async abortableAttempt() {
        return new Promise(async (resolve, reject) => {
            $(this.ctrl).on(DebugEvents.USER_REJECTED, () => reject('user rejected'));
            try {
                let parentResult;
                if (this.followsUpOn) {
                    parentResult = this.followsUpOn.result;
                }
                let result = await this.attempt(parentResult, this.ctrl);
                resolve(result);
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

    addSuccessFollowUp(phase) {
        this.successFollowUpPhases.push(phase);
        phase.setFollowsUpOn(this);
        return this;
    }

    get followUpPhases() {
        if (this.status === Status.SUCCESS) {
            return this.successFollowUpPhases;
        }
        return [];
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
        return [this];
    }

    getSummary() {
        return {
            phaseName: this.name,
            status: this.status,
            data: typeof this._result === 'undefined' ? this._result : this.summarizeData(this._result),
            error: this.summarizeError()
        }
    }

    summarizeError() {
        let err = this._error;
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