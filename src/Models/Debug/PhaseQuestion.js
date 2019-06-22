import { Phase } from '/twcheese/src/Debug/Phase.js';


class PhaseQuestion extends Phase {
    constructor(phaseName) {
        this.phaseName = phaseName;
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

