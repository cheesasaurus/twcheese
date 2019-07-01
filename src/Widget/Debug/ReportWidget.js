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
            this.$el.html(`<p>Bug reported!</p>`);
        });
    }

}


initCss(`
    .twcheese-debug-report {
        min-height: 200px;
    }    
`);


export { ReportWidget };