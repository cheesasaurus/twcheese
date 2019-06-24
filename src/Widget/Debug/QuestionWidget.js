import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';


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

        return `
            <div class="twcheese-debug-question">
                <div class="twcheese-debug-question-text">${this.question.text}</div>
                <hr/>
                ${options.join('')}
            </div>
        `;
    }

    watchSelf() {
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

`);


export { QuestionWidget };