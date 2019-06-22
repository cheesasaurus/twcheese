import { Correctness } from '/twcheese/src/Debug/Correctness.js';
import { Question } from '/twcheese/src/Debug/Question.js';
import { Option } from '/twcheese/src/Debug/Option.js';


const OPTION_INCORRECT = 1;
const OPTION_NOT_SURE = 2;

class QuestionValue extends Question {

    construct(questionText, valueQuestioned) {
        super(questionText);
        this.value = valueQuestioned;
        this.options = [
            Option.create('Correct', Correctness.CORRECT, 'twcheese-debug-option-correct'),
            Option.create('Incorrect', Correctness.INCORRECT, 'twcheese-debug-option-incorrect'),
            Option.create('Not sure', Correctness.NOT_SURE, 'twcheese-debug-option-not-sure')
        ];
        this.selectedOption = OPTION_NOT_SURE;
    }

    addFollowUp(phase) {
        this.options[OPTION_INCORRECT].addFollowUp(phase);
        return this;
    }

    static create(questionText, valueQuestioned) {
        return new QuestionValue(questionText, valueQuestioned);
    }
}

export { QuestionValue };