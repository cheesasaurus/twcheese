import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class Question {
    constructor(text) {
        this.text = text;
        this.options = [];
        this.selectedOptionIndex = null;
    }

    getType() {
        throw Error('not implemented');
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