import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class Option {
    constructor(humanText, value, className = '') {
        this.text = humanText;
        this.value = value;
        this.className = className;
        this.followUpPhases = [];
    }

    addFollowUp(phase) {
        this.followUpPhases.push(phase);
        phase.setFollowsUpOn(this);
        return this;
    }

    setValue(value) {
        this.value = value;
        $(this).trigger(DebugEvents.OPTION_VALUE_CHANGED);
    }

    static create(humanText, value, className) {
        return new Option(humanText, value, className);
    }

}

export { Option };