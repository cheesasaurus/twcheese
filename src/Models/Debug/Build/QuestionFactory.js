import { QuestionSelect } from '/twcheese/src/Models/Debug/QuestionSelect.js';
import { QuestionFreeForm } from '/twcheese/src/Models/Debug/QuestionFreeForm.js';
import { QuestionValue } from '/twcheese/src/Models/Debug/QuestionValue.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';


class QuestionFactory {
    
    create(cfg, lazyEval) {
        switch (cfg.type) {
            case 'QuestionFreeForm':
                return this.createQuestionFreeForm(cfg);
            case 'QuestionSelect':
                return this.createQuestionSelect(cfg);
            case 'QuestionValue':
                return this.createQuestionValue(cfg, lazyEval);
            default:
                throw `unrecognized question type: ${cfg.type}`;
        }
    }

    createQuestionFreeForm(cfg) {
        let minResponseLength = cfg.minResponseLength || 0;
        return QuestionFreeForm.create(cfg.ask, cfg.placeholderText, minResponseLength);
    }

    createQuestionSelect(cfg) {
        let question = QuestionSelect.create(cfg.ask);

        for (let optionCfg of cfg.options) {
            question.addOption(Option.create(optionCfg.answer, optionCfg.value));
        }

        return question;
    }

    createQuestionValue(cfg, lazyEval) {
        let valueExamined = lazyEval(cfg.examine);
        return QuestionValue.create(cfg.ask, valueExamined);
    }

}

export { QuestionFactory };