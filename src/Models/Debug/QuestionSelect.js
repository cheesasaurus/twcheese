import { QuestionTypes } from '/twcheese/src/Models/Debug/QuestionTypes.js';
import { Question } from '/twcheese/src/Models/Debug/Question.js';


class QuestionSelect extends Question {
    getType() {
        return QuestionTypes.SELECT;
    }

    static create(text) {
        return new QuestionSelect(text);
    }
}

export { QuestionSelect};
