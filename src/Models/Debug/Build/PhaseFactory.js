import { PhaseAttempt } from '/twcheese/src/Models/Debug/PhaseAttempt.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { QuestionFactory } from '/twcheese/src/Models/Debug/Build/QuestionFactory.js';


class PhaseFactory {

    constructor(actions) {
        this.actions = actions;
        this.questionFactory = new QuestionFactory();
    }

    create(cfg) {
        switch (cfg.type) {
            case 'PhaseAttempt':
                return this.createPhaseAttempt(cfg);
            case 'PhaseQuestion':
                return this.createPhaseQuestion(cfg);            
            case 'PhaseReport':
                return this.createPhaseReport(cfg);
            default:
                throw Error(`unrecognized phase type ${cfg.type}`);
        }
    }

    createPhaseAttempt(cfg) {
        let action = this.actions[cfg.action];
        if (typeof action === 'undefined') {
            throw Error(`unrecognized action: ${cfg.action}`);
        }

        let phase = PhaseAttempt.create(cfg.internalName, action.execute);

        if (action.summarizeResult) {
            phase.setDataSummarizer(action.summarizeResult);
        }
        if (cfg.instructions) {
            phase.setInstructions(cfg.instructions);
        }
        return phase;
    }

    createPhaseQuestion(cfg) {
        let phase = PhaseQuestion.create(cfg.internalName);

        if (cfg.lookAt) {
            // todo
        }

        for (let questionCfg of cfg.questions) {
            let question = this.questionFactory.create(questionCfg);
            phase.addQuestion(question);
        }
        
        return phase;
    }

}

export { PhaseFactory };