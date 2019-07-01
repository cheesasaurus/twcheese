import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';
import { PhaseFactory } from '/twcheese/src/Models/Debug/Build/PhaseFactory.js';
import { BugReporter } from '/twcheese/src/Models/Debug/BugReporter.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';

class ProcessFactory {

    constructor(actions) {
        this.phaseFactory = new PhaseFactory(actions);
    }

    create(cfg, finishWithReport) {
        let process = new DebugProcess();

        for (let phaseCfg of cfg.phases) {
            process.enqueuePhase(this.createPhase(phaseCfg));
        }

        if (finishWithReport) {
            let bugReporter = new BugReporter(debugProcess);
            process.enqueuePhase(PhaseReport.create(bugReporter));
        }

        return process;
    }

    createPhase(cfg) {
        let phase = this.phaseFactory.create(cfg);

        if (cfg.type === 'PhaseAttempt' && cfg.success) {
            for (let phaseCfg of cfg.success) {
                phase.addSuccessFollowUp(this.createPhase(phaseCfg));
            }
        }

        return phase;
    }

};

export { ProcessFactory };