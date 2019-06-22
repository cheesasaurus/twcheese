import { Phase } from '/twcheese/src/Debug/Phase.js';

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
        } catch (err) {
            this.fail(err);
        }      
    }

    onSuccess(cb) {
        this.success = cb;
        return this;
    }

    onFail(cb) {
        this.fail = cb;
        return this;
    }
    
    static create(phaseNum, functionToAttempt) {
        return new PhaseAttempt(phaseNum, functionToAttempt);
    }

}

export { PhaseAttempt };