import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


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
        $(question).on(DebugEvents.QUESTION_ANSWERED, () => {
            this.checkCompletionReady();
        });
        return this;
    }

    start() {
        // do nothing;
    }

    checkCompletionReady() {
        for (let question of this.questions) {
            if (!question.isAnswered()) {
                $(this).trigger(DebugEvents.PHASE_COMPLETION_NOT_READY);
                return;
            }
        }
        $(this).trigger(DebugEvents.PHASE_COMPLETION_READY);
    }

    getThingsToFollowUpOn() {
        return this.questions.reduce((acc, question) => acc.concat(question.getThingsToFollowUpOn()), []);
    }

    static create(phaseName) {
        return new PhaseQuestion(phaseName);
    }

}

export { PhaseQuestion };

