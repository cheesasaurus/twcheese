import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { initCss, escapeHtml } from '/twcheese/src/Util/UI.js';
import { QuestionTypes } from '/twcheese/src/Models/Debug/QuestionTypes.js';


class QuestionWidget extends AbstractWidget {
    constructor(question) {
        super();
        this.question = question;
        this.initStructure(question);
        this.watchSelf();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$answers = this.$el.find('.twcheese-debug-question-answer');
    }

    createHtml() {
        let options = [];

        for (let i = 0; i < this.question.options.length; i++) {
            let option = this.question.options[i];
            options.push(`
                <div class="twcheese-debug-question-answer ${option.className}" data-index="${i}">
                    ${option.text}
                </div>
            `);
        }

        switch (this.question.getType()) {
            case QuestionTypes.FREE_FORM:
                return this._createHtmlQuestionFreeForm();
            case QuestionTypes.VALUE:
                return this._createHtmlQuestionAboutValue(options);
            case QuestionTypes.SELECT:
                return this._createHtmlQuestionSelect(options);
            default:
                throw Error('unrecognized question type');    
        }                
    }

    _createHtmlQuestionSelect(options) {
        return `
            <div class="twcheese-debug-question">
                <div class="twcheese-debug-question-text">${this.question.text}</div>
                <hr/>
                ${options.join('')}
            </div>
        `;
    }

    _createHtmlQuestionFreeForm() {
        let option = this.question.options[0];

        return `
            <div class="twcheese-debug-question">
                <div class="twcheese-debug-question-text">${this.question.text}</div>
                <hr/>
                <textarea
                    placeholder="${escapeHtml(option.text)}"
                    class="twcheese-debug-question-answer ${option.className}"
                    data-index="0"
                >${escapeHtml(option.value)}</textarea>
            </div>
        `;
    }

    _createHtmlQuestionAboutValue(options) {
        let valueRendered = this.createHtmlForValue(this.question.value);

        return `
            <div class="twcheese-debug-question">
                <div class="twcheese-debug-question-text">${this.question.text}</div>
                <hr/>
                <div class="twcheese-debug-question-content">
                    <div class="twcheese-debug-question-value">${valueRendered}</div>
                    <div style="padding-left: 10px;">${options.join('')}</div>
                </div>                
            </div>
        `;
    }

    createHtmlForValue(value) {
        if (typeof value === 'undefined' || value === null) {
            return '<span class="non-existent">non-existent</span>';
        }
        if (typeof value.toDebugString === 'function') {
            return escapeHtml(value.toDebugString());
        }
        if (typeof value === 'object') {
            return Object.entries(value).map((input) => {
                let [propName, propVal] = input;
                return `<div class="twcheese-debug-value-iter">
                    <div class="key">${this.createLabelForValue(propVal, propName)}</div>
                    <div class="value">${this.createHtmlForValue(propVal)}</div>
                </div>`;
            }).join('');
        }
        return escapeHtml(value.toString());
    }

    createLabelForValue(value, defaultLabel) {
        if (typeof value.imageSrc === 'function') {
            return `<image src="${value.imageSrc()}" />`;
        }
        return defaultLabel;
    }

    watchSelf() {
        if (this.question.getType() === QuestionTypes.FREE_FORM) {
            this.$answers.on('input', (e) => {
                let $answer = $(e.target);
                this.question.options[0].setValue($answer.val());
            });
            return;
        }

        this.$answers.on('click', (e) => {
            this.$answers.removeClass('active');
            let $answer = $(e.target).addClass('active');
            this.question.setSelectedOption($answer.data('index'));
        });
    }

}


initCss(`
    .twcheese-debug-question {
        margin-bottom: 40px;
    }

    .twcheese-debug-question-text {
        font-size: 13px;
        font-weight: 700;
        color: rgb(200, 200, 200);
    }

    .twcheese-debug-question hr {
        height: 1px;
        background-color: white;
        border: none;
        opacity: 0.2;
    }

    .twcheese-debug-question-content {
        display: flex;
        justify-content: space-between;        
        align-items: center;
    }

    .twcheese-debug-question-value {
        line-height: 20px;
    }
    .twcheese-debug-question-value img {
        vertical-align: middle;
    }

    .twcheese-debug-question-value .non-existent {
        font-style: italic;
    }

    .twcheese-debug-question-answer {
        margin: 10px 0;
        background-color: rgb(23, 23, 23);
        border: 1px solid rgb(75, 75, 75);
        height: 30px;
        border-radius: 15px;
        line-height: 30px;
        white-space: nowrap;
        padding: 0 10px;
        text-align: center;
        cursor: pointer;
    }
    .twcheese-debug-question-answer:hover {
        border-color: rgb(150, 150, 150);
    }
    .twcheese-debug-question-answer.active {
        border-color: darkOrange;
        background-color: black;
    }
    
    .twcheese-debug-question-answer.correct {
        border-color: rgb(0, 70, 0);
    }
    .twcheese-debug-question-answer.correct:hover {
        border-color: rgb(0, 100, 0);
    }
    .twcheese-debug-question-answer.correct.active {
        border-color: rgb(0, 150, 0);
    }

    .twcheese-debug-question-answer.incorrect {
        border-color: rgb(100, 0, 0);
    }
    .twcheese-debug-question-answer.incorrect:hover {
        border-color: rgb(175, 0, 0);
    }
    .twcheese-debug-question-answer.incorrect.active {
        border-color: rgb(250, 0, 0);
    }

    .twcheese-debug-question-answer.free-form {
        border: 1px solid rgb(75, 75, 75);
        border-radius: 3px;
        white-space: pre-wrap;
        color: inherit;
        padding: 2px 5px;
        text-align: left;
        line-height: normal;
        height: 120px;
        width: calc(100% - 6px);
        resize: vertical;
        cursor: text;
    }

    .twcheese-debug-value-iter {
        display: flex;
    }
    .twcheese-debug-value-iter > div:nth-child(2) {
        padding-left: 5px;
    }

`);


export { QuestionWidget };