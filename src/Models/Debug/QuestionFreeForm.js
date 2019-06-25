import { Question } from '/twcheese/src/Models/Debug/Question.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';


class QuestionFreeForm extends Question {

    constructor(questionText, placeholderText) {
        super(questionText);
        this.options = [
            Option.create(placeholderText, '', 'free-form')
        ];
        this.setSelectedOption(0);
    }

    static create(questionText, placeholderText) {
        return new QuestionFreeForm(questionText, placeholderText);
    }

}

export { QuestionFreeForm };
