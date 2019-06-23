import { Phase } from '/twcheese/src/Models/Debug/Phase.js';


class PhaseReport extends Phase {
    constructor(process) {
        super('about to send bug report');
        this.process = process;
    }

    static create(process) {
        return new PhaseReport(process);
    }
}

export { PhaseReport };