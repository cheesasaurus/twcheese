import { Phase } from '/twcheese/src/Models/Debug/Phase.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { PhaseTypes } from '/twcheese/src/Models/Debug/PhaseTypes.js';


class PhaseQuestion extends Phase {
    constructor(phaseName) {
        super(phaseName);
        this.questions = [];
        this._examinedHtml;
    }

    getType() {
        return PhaseTypes.QUESTION;
    }

    lookAt(html) {
        this._examinedHtml = html;
        return this;
    }

    get examinedHtml() {
        if (typeof this._examinedHtml === 'function') {
            return this._examinedHtml();
        }
        return this._examinedHtml;
    }

    addQuestion(question) {
        this.questions.push(question);
        $(question).on(DebugEvents.QUESTION_ANSWERED, () => {
            this.checkCompletionReady();
        });
        $(question).on(DebugEvents.QUESTION_NOT_ANSWERED, () => {
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

    getSummary() {
        return {
            phaseName: this.name,
            questions: this.questions.map(question => question.getSummary())
        };
    }

    static create(phaseName) {
        return new PhaseQuestion(phaseName);
    }

}

export { PhaseQuestion };

