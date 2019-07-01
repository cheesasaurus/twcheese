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
        this.addFollowUpPhasesForSuccess(phase, cfg);
        this.addFollowUpPhasesForAnswers(phase, cfg);
        return phase;
    }

    addFollowUpPhasesForSuccess(phase, cfg) {
        if (cfg.type === 'PhaseAttempt' && cfg.success) {
            for (let phaseCfg of cfg.success) {
                phase.addSuccessFollowUp(this.createPhase(phaseCfg));
            }
        }
    }

    addFollowUpPhasesForAnswers(phase, cfg) {
        if (cfg.type !== 'PhaseQuestion') {
            return;
        }
        
        for (let [q, questionCfg] of Object.entries(cfg.questions)) {
            if (questionCfg.type !== 'QuestionSelect') {
                continue;
            }
            for (let [o, optionCfg] of Object.entries(questionCfg.options)) {
                if (optionCfg.followUp) {
                    for (let phaseCfg of optionCfg.followUp) {
                        let option = phase.questions[q].options[o];
                        option.addFollowUp(this.createPhase(phaseCfg));
                    }
                }
            }
        }
    }

};

export { ProcessFactory };