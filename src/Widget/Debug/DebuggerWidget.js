import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { QuestionWidget } from '/twcheese/src/Widget/Debug/QuestionWidget.js';
import { PhaseAttempt } from '/twcheese/src/Models/Debug/PhaseAttempt.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';
import { ReportWidget } from '/twcheese/src/Widget/Debug/ReportWidget.js';


class DebuggerWidget extends AbstractWidget {
    constructor() {
        super();
        this.initStructure();
        this.watchSelf();
        this.watchGlobal();
        this.process = null;
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$header = this.$el.find('.twcheese-debugger-header');
        this.$content = this.$el.find('.twcheese-debugger-content');
        this.$nav = this.$el.find('.twcheese-debugger-nav');
        this.$prev = this.$el.find('.twcheese-debugger-prev');
        this.$next = this.$el.find('.twcheese-debugger-next');        
        this.$processName = this.$el.find('.twcheese-debugger-process-name');
        this.$inspector = this.$el.find('.twcheese-debugger-inspector');
        this.$iframe = this.$inspector.find('iframe');
        this.$iframeOverlay = this.$inspector.find('.iframe-overlay');
    }

    createHtml() {
        return `
            <div class="twcheese-debugger">
                <div>
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
                <div class="twcheese-debugger-inspector">
                    <iframe scrolling="no"></iframe>
                    <div class="iframe-overlay"></div>
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

    watchGlobal() {
        $(window).on('resize', () => this.updateScrolling());
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
            if (this.process.hasNextPhase()) {
                this.$next.show();
            }
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
        this.$inspector.hide();
        this.$content.html('');
        if (!this.process.hasNextPhase()) {
            this.$next.hide();
        }
        if (!this.process.hasPrevPhase()) {
            this.$prev.hide();
        }

        let phase = this.process.getCurrentPhase();
        if (phase instanceof PhaseQuestion) {
            this._renderPhaseQuestion(phase);
        } else if (phase instanceof PhaseAttempt) {
            this._renderPhaseAttempt(phase);
        } else if (phase instanceof PhaseReport) {
            this._renderPhaseReport(phase);
        }

        setTimeout(() => this.updateScrolling(), 200);
        $(this).trigger('change');
    }

    _renderPhaseQuestion(phase) {
        for (let question of phase.questions) {
            (new QuestionWidget(question)).appendTo(this.$content);
        }
        if (typeof phase.examinedHtml === 'string') {
            this.openInspector(phase.examinedHtml);
        }
    }

    _renderPhaseAttempt(phase) {
        if (phase.instructions) {
            this.$content.html(`
                <div class="twcheese-debug-attempt">
                    ${phase.instructions}
                </div>
            `);
        } else {
            this.$content.html(`
                <div class="twcheese-debug-attempt">
                    Standby for <i>${phase.name}</i>.
                </div>
            `);
        }
    }

    _renderPhaseReport(phase) {
        (new ReportWidget(phase)).appendTo(this.$content);
    }

    updateScrolling() {
        // https://github.com/rochal/jQuery-slimScroll/issues/16
        if (this.$content.parent('.slimScrollDiv').size() > 0) {
            this.$content.parent().replaceWith(this.$content);
            this.$content.height('auto');
        }        

        let availableVert = this.$el.innerHeight() - this.$header.outerHeight() - this.$nav.outerHeight();

        this.$content.slimScroll({
            height: Math.min(availableVert, this.$content.outerHeight()),
            color: 'rgb(150, 150, 150)',
            opacity: 0.3,
            borderRadius: 0,
            alwaysVisible: true
        });
    }

    openInspector(html) {
        let win = this.$iframe[0].contentWindow;
        let doc = win.document;
        doc.open();
        doc.write(html);
        doc.close();

        setTimeout(() => {
            if (typeof win.Timing !== 'undefined') {
                win.Timing.pause();
            }
            this.$inspector.show(); // must be visible for size to be computed
            let width = Math.min(win.document.body.scrollWidth, this.calcMaxIframeWidth());
            this.$iframe.css({width});
            this.$iframeOverlay.css({width});
            $(this).trigger('change');
        }, 200);
    }

    calcMaxIframeWidth() {
        let menuWidth = 50;
        let margin = 20;
        return document.documentElement.clientWidth - this.$header.outerWidth() - menuWidth - 2*margin;
    }

}


initCss(`
    .twcheese-debugger {
        height: 100%;
        display: flex;
    }

    .twcheese-debugger-header {
        background-color: rgb(56, 56, 56);
        padding: 9px 20px;
        font-weight: 700;
        font-size: 14px;
        color: rgb(200, 200, 200);
        cursor: default;
        min-width: 300px;
    }

    .twcheese-debugger-process-name {
        font-weight: normal;
        font-size: 11px;
        margin-top: 3px;
        white-space: nowrap;
    }

    .twcheese-debugger-content {
        box-sizing: border-box;
        padding: 20px;
    }

    .twcheese-debugger-nav {
        padding: 20px 10px;
        height: 20px;
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

    /* inspector */

    .twcheese-debugger-inspector {
        position: relative;
        width: 100%;
        background-color: rgb(30, 30, 30);
        line-height: unset;
    }

    .twcheese-debugger-inspector iframe,
    .twcheese-debugger-inspector .iframe-overlay {
        width: 500px;
        height: calc(100% - 40px);
        margin: 20px;
        border: none;
        overflow: hidden;
    }

    .twcheese-debugger-inspector .iframe-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background-color: cyan;
        opacity: 0.1;
    }


`);

export { DebuggerWidget };