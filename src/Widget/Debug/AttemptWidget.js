import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { initCss } from '/twcheese/src/Util/UI.js';


class AttemptWidget extends AbstractWidget {
    constructor(phase) {
        super();
        this.phase = phase;
        this.initStructure();
        this.watchSelf();
        this.$abort.hide();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$abort = this.$el.find('.twcheese-debug-attempt-abort');
    }

    createHtml() {
        if (this.phase.instructions) {
            return this.createHtmlForUserInteraction();
        }
        return this.createHtmlForAutoAttempt();
    }

    createHtmlForUserInteraction() {
        return `
            <div class="twcheese-debug-attempt">
                <p>${this.phase.instructions}</p>
                <div style="text-align: center;">
                    <div class="twcheese-debug-attempt-abort">Can't do it</div>
                </div>
            </div>
        `;
    }

    createHtmlForAutoAttempt() {
        return `
            <div class="twcheese-debug-attempt">
                Standby for <i>${this.phase.name}</i>.
            </div>
        `;
    }

    watchSelf() {
        this.$abort.on('click', () => this.phase.userAbort());
    }    

    appendTo($el) {
        setTimeout(() => this.showAbortButton(), 10000);
        return super.appendTo($el);
    }

    showAbortButton() {
        this.$abort.show();
        $(this).trigger('change');
    }

}


initCss(`
    .twcheese-debug-attempt-abort {
        display: inline-block;
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
    .twcheese-debug-attempt-abort:hover {
        border-color: rgb(150, 150, 150);
    }   
`);


export { AttemptWidget };