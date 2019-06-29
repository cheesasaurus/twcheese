import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { QuestionTypes } from '/twcheese/src/Models/Debug/QuestionTypes.js';


class Question {
    constructor(text) {
        this.text = text;
        this.options = [];
        this.selectedOptionIndex = null;
    }

    getType() {
        // todo: this violates classification (all children should have the attributes of the parent)
        return QuestionTypes.GENERIC;
    }

    addOption(option) {
        this.options.push(option);
        return this;
    }

    setSelectedOption(index) {
        this.selectedOptionIndex = index;
        $(this).trigger(DebugEvents.QUESTION_ANSWERED);
        return this;
    }

    isAnswered() {
        return this.selectedOptionIndex !== null;
    }

    getSelectedOption() {
        return this.options[this.selectedOptionIndex];
    }

    getThingsToFollowUpOn() {
        let option = this.getSelectedOption();
        return (option.followUpPhases.length > 0) ? [option] : [];
    }

    getSummary() {
        return {
            question: this.text,
            answer: this.getSelectedOption().value
        };
    }

    static create(text) {
        return new Question(text);
    }
}

export { Question };