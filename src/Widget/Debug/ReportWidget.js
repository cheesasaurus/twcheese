import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { initCss } from '/twcheese/src/Util/UI.js';


class ReportWidget extends AbstractWidget {
    constructor(phase) {
        super();
        this.phase = phase;
        this.initStructure();
        this.watchPhase();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
    }

    createHtml() {
        return `<div class="twcheese-debug-report"><i>Submitting report...</i></div>`;
    }

    watchPhase() {
        $(this.phase).on(DebugEvents.BUG_REPORT_SUCCEEDED, e => {
            console.log(e);
            this.$el.html(`
                <p>Bug reported!</p>
                <a href="${e.url}" target="_blank">${e.url}</a>
            `);
        });
    }

}


initCss(`
    .twcheese-debug-report {
        min-width: 375px;
        min-height: 200px;
    }

    .twcheese-debug-report a {
        font-weight: normal;
        font-size: 12px;
        color: rgb(63, 156, 214);
        text-decoration: underline;
    }
    .twcheese-debug-report a:hover {
        color: rgb(96, 174, 221);
    }    
`);


export { ReportWidget };