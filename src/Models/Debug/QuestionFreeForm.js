import { Question } from '/twcheese/src/Models/Debug/Question.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class QuestionFreeForm extends Question {

    constructor(questionText, placeholderText, minResponseLength) {
        super(questionText);
        this.minResponseLength = minResponseLength || 0;
        this.options = [
            Option.create(placeholderText, '', 'free-form')
        ];
        this.setSelectedOption(0);
        this.watchSelectedOption();        
    }

    watchSelectedOption() {
        $(this.getSelectedOption()).on(DebugEvents.OPTION_VALUE_CHANGED, () => {
            if (this.isAnswered()) {
                $(this).trigger(DebugEvents.QUESTION_ANSWERED);
            } else {
                $(this).trigger(DebugEvents.QUESTION_NOT_ANSWERED);
            }
        });
    }

    isAnswered() {
        return super.isAnswered() && this.options[0].value.length >= this.minResponseLength;
    }

    static create(questionText, placeholderText, minResponseLength) {
        return new QuestionFreeForm(questionText, placeholderText, minResponseLength);
    }

}

export { QuestionFreeForm };
