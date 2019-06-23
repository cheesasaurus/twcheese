import { Phase } from '/twcheese/src/Models/Debug/Phase.js';


class PhaseQuestion extends Phase {
    constructor(phaseName) {
        super(phaseName);
        this.questions = [];
        this.examined_html;
    }

    lookAt(html) {
        this.examined_html = html;
        return this;
    }

    addQuestion(question) {
        this.questions.push(question);
        return this;
    }

    static create(phaseName) {
        return new PhaseQuestion(phaseName);
    }

}

export { PhaseQuestion };

