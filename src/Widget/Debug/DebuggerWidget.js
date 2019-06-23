import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';

class DebuggerWidget extends AbstractWidget {
    constructor() {
        super();
        this.initStructure();
        this.watchSelf();
        this.process = null;
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$prev = this.$el.find('.twcheese-debugger-prev');
        this.$next = this.$el.find('.twcheese-debugger-next');
        this.$content = this.$el.find('.twcheese-debugger-content');
        this.$processName = this.$el.find('.twcheese-debugger-process-name');
    }

    createHtml() {
        return `
            <div class="twcheese-debugger">
                <div class="twcheese-debugger-header">
                    <div>REPORT A BUG</div>
                    <div class="twcheese-debugger-process-name"></div>
                </div>
                <div class="twcheese-debugger-content">blah bla blucci</div>
                <div class="twcheese-debugger-nav">
                    <div class="twcheese-debugger-prev"></div>
                    <div class="twcheese-debugger-next"></div>
                </div>
            </div>
        `;
    }

    watchSelf() {
        this.$next.on('click', () => {
            this.process.goToNextPhase();
        });
        this.$prev.on('click', () => {
            this.process.goToPrevPhase();
        });
    }

    startProcessForLastUsedToolIfSensible() {
        if (this.process) {
            return;
        }
        this.startProcess(window.TwCheese.newDebugProcess(TwCheese.lastToolUsedId));
    }

    startProcess(process) {
        this.$next.hide();
        this.$prev.hide();
        this.process = process;
        this.$processName.text(process.name);
        
        $(process).on(DebugEvents.PHASE_COMPLETION_READY, () => {
            this.$next.show();
        });
        $(process).on(DebugEvents.PHASE_COMPLETION_NOT_READY, () => {
            this.$next.hide();
        });
        $(process).on(DebugEvents.PHASE_CHANGED, () => {
            this.renderCurrentPhase();
        });

        process.start();
    }

    renderCurrentPhase() {
        this.$content.html('');
        if (!this.process.hasNextPhase()) {
            this.$prev.hide();
        }
        if (!this.process.hasPrevPhase()) {
            this.$prev.hide();
        }
        // todo
    }

}


initCss(`
    .twcheese-debugger-contents {
        padding: 2px 3px;
    }

    .twcheese-debugger-header {
        min-width: 200px;
        background-color: rgb(56, 56, 56);
        padding: 9px 20px;
        font-weight: 700;
        font-size: 14px;
        color: rgb(200, 200, 200);
        cursor: default;
    }

    .twcheese-debugger-process-name {
        font-weight: normal;
        font-size: 11px;
        margin-top: 3px;
        white-space: nowrap;
    }

    .twcheese-debugger-nav {
        padding: 10px;
    }

    .twcheese-debugger-prev,
    .twcheese-debugger-next {
        width: 0;
        height: 0;
        border: 10px solid transparent;
        cursor: pointer;
        webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-debugger-prev {        
        border-right: 20px solid white;
        float: left;
    }

    .twcheese-debugger-next {
        border-left: 20px solid white;
        float: right;
    }

    .twcheese-debugger-prev:hover,
    .twcheese-debugger-next:hover {
        webkit-filter: brightness(1);
        filter: brightness(1);
    }

`);

export { DebuggerWidget };