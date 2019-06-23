
class Option {
    constructor(humanText, value, className) {
        this.text = humanText;
        this.value = value;
        this.className = className;
        this.followUpPhases = [];
    }

    addFollowUp(phase) {
        this.followUpPhases.push(phase);
        phase.followUpOn = this;
        return this;
    }

    static create(humanText, value, className) {
        return new Option(humanText, value, className);
    }

}

export { Option };