import { Correctness } from '/twcheese/src/Models/Debug/Correctness.js';
import { Question } from '/twcheese/src/Models/Debug/Question.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';
import { QuestionTypes } from '/twcheese/src/Models/Debug/QuestionTypes.js';


const OPTION_INCORRECT = 1;

class QuestionValue extends Question {

    constructor(questionText, valueQuestioned) {
        super(questionText);
        this._valueQuestioned = valueQuestioned;
        this.options = [
            Option.create('Correct', Correctness.CORRECT, 'correct'),
            Option.create('Incorrect', Correctness.INCORRECT, 'incorrect'),
            Option.create('Not sure', Correctness.NOT_SURE, 'not-sure')
        ];
    }

    get value() {
        if (typeof this._valueQuestioned === 'function') {
            return this._valueQuestioned();
        }
        return this._valueQuestioned;
    }

    getType() {
        return QuestionTypes.VALUE;
    }

    addFollowUp(phase) {
        this.options[OPTION_INCORRECT].addFollowUp(phase);
        return this;
    }

    getSummary() {
        return Object.assign(super.getSummary(), {
            valueChecked: this.value
        });
    }

    static create(questionText, valueQuestioned) {
        return new QuestionValue(questionText, valueQuestioned);
    }
}

export { QuestionValue };