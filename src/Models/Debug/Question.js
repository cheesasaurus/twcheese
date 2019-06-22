
class Question {
    constructor(text) {
        this.text = text;
        this.options = [];
        this.selectedOption = 0;
    }

    addOption(option) {
        this.options.push(option);
        return this;
    }

    static create() {
        return new Question(text);
    }
}

export { Question };