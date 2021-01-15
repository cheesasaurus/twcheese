/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Widget/AbstractWidget.js

function afterDOMInsert(el, callback) {
    let observer = new MutationObserver((mutations) => {
        outerloop:
            for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                    if (node === el || node.contains(el)) {
                        setTimeout(callback, 0);
                        observer.disconnect();
                        break outerloop;
                    }
                }
            }
    });

    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
}


class AbstractWidget {

    insertBefore(el) {
        this._beforeInsert();
        $(el).before(this.$el);
        return this;
    }

    insertAfter(el) {
        this._beforeInsert();
        $(el).after(this.$el);
        return this;
    }

    appendTo(el) {
        this._beforeInsert();
        $(el).append(this.$el);
        return this;
    }

    _beforeInsert() {
        if (typeof this.afterInsert !== 'function') {
            return;
        }
        let el = this.$el[0];
        afterDOMInsert(el, () => this.afterInsert());
    }

}


// CONCATENATED MODULE: ./conf/ImageSrc.js
let game = window.image_base;
let ImageSrc_self = window.TwCheese.ROOT + '/assets/images/';

let ImageSrc = {
    plus: game + 'plus.png',
    minus: game + 'minus.png',
    wood: game + 'holz.png',
    stone: game + 'lehm.png',
    iron: game + 'eisen.png',
    attack: game + 'command/attack.png',
    haulPartial: game + 'max_loot/0.png',
    haulFull: game + 'max_loot/1.png',
    info: game + 'questionmark.png',
    attackSentViaFa: game + 'command/farm.png',
    attackSizeSmall: game + 'command/attack_small.png',
    attackSizeMedium: game + 'command/attack_medium.png',
    attackSizeLarge: game + 'command/attack_large.png',
    attackContainsSnob: game + 'command/snob.png',
    attackContainsSpy: game + 'command/spy.png',
    attackContainsKnight: game + 'command/knight.png',
    popupBackground: game + 'popup/content_background.png',
    popupBorder: game + 'popup/border.png',
    servant: game + 'paladin_new.png',
    loadingSpinner: game + 'throbber.gif',
    calendar: ImageSrc_self + 'calendar.png',
    sidebarMain: ImageSrc_self + 'sidebar/gear.png',
    sidebarBug: ImageSrc_self + 'sidebar/bug.png',
    sidebarGithub: ImageSrc_self + 'sidebar/github.png',
    jq: {
        blue: ImageSrc_self + 'jquery/ui-icons_2e83ff_256x240.png',
        black: ImageSrc_self + 'jquery/ui-icons_222222_256x240.png',
        darkGrey: ImageSrc_self + 'jquery/ui-icons_454545_256x240.png',
        grey: ImageSrc_self + 'jquery/ui-icons_888888_256x240.png',
        red: ImageSrc_self + 'jquery/ui-icons_cd0a0a_256x240.png'
    },
    legacy: {
        helpBackground: ImageSrc_self + 'legacy/help_background.png',
        helpBackgroundBright: ImageSrc_self + 'legacy/help_background_highlight.png'
    },    
    buildingIcon: buildingType => game + `buildings/${buildingType}.png`,
    troopIcon: troopType => game + `unit/unit_${troopType}.png`,
    dotIcon: color => game + `dots/${color}.png`,
    scavengeOption: optionId => game + `scavenging/options/${optionId}.png`,
};



// CONCATENATED MODULE: ./src/Util/UI.js



function escapeHtml(text) {
    if (typeof text !== 'string') {
        text = String(text);
    }
    // https://stackoverflow.com/a/4835406
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };  
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

////// css //////

let cssInitd = new Set();

function initCss(css) {
    if (cssInitd.has(css)) {
        return;
    }
    $(`<style>${css}</style>`).appendTo('head');
    cssInitd.add(css);
}

initCss(`
    .twcheese-popup {
        z-index: 13000;
        display: block;
        position: fixed;
        top: 60px;
        border: 19px solid #804000;
        border-image: url(${ImageSrc.popupBorder}) 19 19 19 19 repeat;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
`);

//////// faders ///////////


function fadeGameContent () {
    $('body').append('<div id="fader" class="fader">');
};


function unfadeGameContent() {
    $('#fader').remove();
    $('.twcheese-fader').remove();
}


function fadeGameContentExcept(el) {
    let $el = $(el);

    if ($el.length < 1) {
        throw new Error('element does not exist');
    }
    if ($el.length > 1) {
        throw new Error('expected exactly one element, got more');
    }

    let $faderLeft = spawnFader();
    let $faderRight = spawnFader();
    let $faderTopMenu = spawnFader();
    let $faderTopScreen = spawnFader();
    let $faderBottomScreen = spawnFader();
    let $faderBottomMenu = spawnFader();

    var $bottomMenu = $('#footer');
    var $topMenu = $('#topContainer');
    var topMenuHeight, screenWidth, screenHeight;

    function updateMeasurements() {
        topMenuHeight = $topMenu.outerHeight() + 3;
        screenWidth = $('body').outerWidth();
        screenHeight = Math.max($('#ds_body')[0].scrollHeight, document.documentElement.clientHeight);
    }

    function updateFaders() {
        updateMeasurements();
        updateFaderLeft();
        updateFaderRight();
        updateFaderTopMenu();
        updateFaderTopScreen();
        updateFaderBottomScreen();
        updateFaderBottomMenu();
    }


    function updateFaderLeft() {
        let offset = $el.offset();
        $faderLeft.css({
            top: 0,
            left: 0,
            width: offset.left,
            height: screenHeight
        });
    }


    function updateFaderRight() {
        let offset = $el.offset();
        $faderRight.css({
            top: 0,
            right: 0,
            width: screenWidth - $el.outerWidth() - offset.left,
            height: screenHeight
        });
    }


    function updateFaderTopScreen() {
        let offset = $el.offset();
        $faderTopScreen.css({
            top: topMenuHeight,
            left: offset.left,
            height: offset.top - topMenuHeight,
            width: $el.outerWidth(),
            zIndex: $('.top_bar').zIndex() - 1
        });
    }


    function updateFaderBottomScreen() {
        let offset = $el.offset();
        $faderBottomScreen.css({
            top: offset.top + $el.outerHeight(),
            left: offset.left,
            height: screenHeight - offset.top - $el.outerHeight(),
            width: $el.outerWidth(),
            zIndex: $bottomMenu.zIndex() - 1
        });
    }


    function updateFaderTopMenu() {
        let offset = $el.offset();
        $faderTopMenu.css({
            position: 'fixed',
            top: 0,
            left: offset.left,
            height: topMenuHeight,
            width: $el.outerWidth()
        });
    }


    function updateFaderBottomMenu() {
        let offset = $el.offset();
        $faderBottomMenu.css({
            position: 'fixed',
            bottom: 0,
            left: offset.left,
            height: $bottomMenu.outerHeight(),
            width: $el.outerWidth()
        });
    }


    function spawnFader() {
        let css = {
            position: 'absolute',
            background: 'black',
            opacity: 0.5,
            zIndex: 12000
        };
        return $('<div class="twcheese-fader"></div>').css(css).appendTo($('body'));
    }

    updateFaders();
    $(window).on('resize', updateFaders);
}


// mousetrap ///////////////////////////////

let mouseEvents = ['click', 'mousemove', 'mousenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup'];
let mouseBubbleEvents = new Set(['click', 'mousemove', 'mouseover', 'mouseout', 'mousedown', 'mouseup']);
let mouseEventsNeedSpecial = new Set(['mousenter', 'mouseleave', 'mouseover', 'mouseout']);

class Mousetrap {
    constructor() {
        this.$trap = $('<div class="twcheese-mousetrap">').css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'cyan',
            opacity: 0.001,
            zIndex: 12000
        })
        this.prevIntendedTarget;

        this.watchers = {
            // example:
            // click: [{$elements, handler}, {$elements, handler}]
            mouseout: []
        }

        this.setupHandling();
    }

    spawn() {
        this.$trap.appendTo('body');
        return this;
    }

    destruct() {
        this.$trap.remove();
    }

    setupHandling() {
        let trapEvents = mouseEvents.filter(name => !mouseEventsNeedSpecial.has(name));

        this.$trap.on(trapEvents.join(' '), (e) => {
            this.$trap.hide();
            let intendedTarget = document.elementFromPoint(e.offsetX, e.offsetY);
            this.$trap.show();

            this.notifyWatchers(e.type, e, intendedTarget);

            if (e.type === 'mousemove' && intendedTarget !== this.prevIntendedTarget) {
                this.notifyWatchers('mousenter', e, intendedTarget);
                this.notifyWatchers('mouseleave', e, this.prevIntendedTarget);
                this.notifyWatchers('mouseover', e, intendedTarget);

                // mouseout
                for (let watcher of this.watchers.mouseout) {
                    watcher.$elements.each((i, el) => {
                        if (
                            this.doesElMatch(el, 'mouseover', this.prevIntendedTarget)
                            && !this.doesElMatch(el, 'mouseover', intendedTarget)
                        ) {
                            watcher.handler.call(el, e);
                        }
                    });
                }
            }

            this.prevIntendedTarget = intendedTarget;
        });
    }

    notifyWatchers(eventName, e, intendedTarget) {
        if (typeof this.watchers[eventName] === 'undefined') {
            return;
        }
        for (let watcher of this.watchers[eventName]) {
            watcher.$elements.each((i, el) => {
                if (this.doesElMatch(el, eventName, intendedTarget)) {
                    watcher.handler.call(el, e);
                }
            });
        }
    }

    doesElMatch(el, eventName, intendedTarget) {
        return el === intendedTarget
        || (mouseBubbleEvents.has(eventName) && $.contains(el, intendedTarget));
    }

    on(eventName, $elements, handler) {
        if (typeof this.watchers[eventName] === 'undefined') {
            this.watchers[eventName] = [];
        }
        this.watchers[eventName].push({$elements, handler});
        return this;
    }

}



// CONCATENATED MODULE: ./src/Models/Debug/DebugEvents.js
const DebugEvents = {
    PHASE_COMPLETION_READY: 'phase_completion_ready',
    PHASE_COMPLETION_NOT_READY: 'phase_completion_not_ready',
    PHASE_CHANGED: 'phase_changed',
    QUESTION_ANSWERED: 'question_answered',
    QUESTION_NOT_ANSWERED: 'question_not_answered',
    OPTION_VALUE_CHANGED: 'answer_value_changed',
    BUG_REPORT_SUCCEEDED: 'bug_report_succeeded',
    BUG_REPORT_FAILED: 'bug_report_failed',
    USER_REJECTED: 'user_rejected'
};



// CONCATENATED MODULE: ./src/Models/Debug/PhaseTypes.js
const PhaseTypes = {
    ATTEMPT: 'attempt',
    QUESTION: 'question',
    REPORT: 'report'
};


// CONCATENATED MODULE: ./src/Models/Debug/QuestionTypes.js
const QuestionTypes = {
    VALUE: 'value',
    FREE_FORM: 'free_form',
    SELECT: 'select'
};


// CONCATENATED MODULE: ./src/Widget/Debug/QuestionWidget.js





class QuestionWidget_QuestionWidget extends AbstractWidget {
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



// CONCATENATED MODULE: ./src/Widget/Debug/AttemptWidget.js




class AttemptWidget_AttemptWidget extends AbstractWidget {
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



// CONCATENATED MODULE: ./src/Widget/Debug/ReportWidget.js





class ReportWidget_ReportWidget extends AbstractWidget {
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



// CONCATENATED MODULE: ./src/Widget/Debug/DebuggerWidget.js









class DebuggerWidget_DebuggerWidget extends AbstractWidget {
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

        let phase = this.process.getCurrentPhase();

        switch (phase.getType()) {
            case PhaseTypes.QUESTION:   this._renderPhaseQuestion(phase);   break;
            case PhaseTypes.ATTEMPT:    this._renderPhaseAttempt(phase);    break;
            case PhaseTypes.REPORT:     this._renderPhaseReport(phase);     break;
            default: throw Error('unrecognized phase');
        }

        setTimeout(() => this.updateScrolling(), 200);
        $(this).trigger('change');
    }

    _renderPhaseQuestion(phase) {
        for (let question of phase.questions) {
            (new QuestionWidget_QuestionWidget(question)).appendTo(this.$content);
        }
        if (typeof phase.examinedHtml === 'string') {
            this.openInspector(phase.examinedHtml);
        }
    }

    _renderPhaseAttempt(phase) {
        let widget = (new AttemptWidget_AttemptWidget(phase)).appendTo(this.$content);
        $(widget).on('change', () => this.updateScrolling());
    }

    _renderPhaseReport(phase) {
        (new ReportWidget_ReportWidget(phase)).appendTo(this.$content);
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

    .twcheese-debugger a {
        font-weight: normal;
        font-size: 12px;
        color: rgb(63, 156, 214);
        text-decoration: underline;
    }
    .twcheese-debugger a:hover {
        color: rgb(96, 174, 221);
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

    .twcheese-debugger-next {
        width: 0;
        height: 0;
        border: 10px solid transparent;
        cursor: pointer;
        webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-debugger-next {
        border-left: 20px solid white;
        float: right;
    }

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


// CONCATENATED MODULE: ./src/Widget/SidebarWidget.js






class SidebarWidget_SidebarWidget extends AbstractWidget {
    constructor() {
        super();
        this.initStructure();
        this.watchSelf();
        this.isExpandedVert = false;
        this.activeMenuItem = null;

        this.contents = {
            bugReporter: (new DebuggerWidget_DebuggerWidget()).appendTo(this.$content)
        };
        this.watchContents();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$menuMain = this.$el.find('.menu-item.main');
        this.$mainIcon = this.$menuMain.find('.icon');
        this.$menuBug = this.$el.find('.menu-item.bug');
        this.$menuGithub = this.$el.find('.menu-item.github');
        this.$content = this.$el.find('.twcheese-sidebar-content');
    }

    createHtml() {
        return `
            <div id="twcheese-sidebar">
                <div class="twcheese-sidebar-menu">
                    <div class="menu-item main"><div class="icon"></div></div>
                    <div class="menu-item bug"><div class="icon"></div></div>
                    <a class="menu-item github"
                      href="https://github.com/cheesasaurus/twcheese/releases"
                      target="_blank"
                    ><div class="icon"></div></a>
                </div>
                <div class="twcheese-sidebar-content"></div>
            </div>
        `;
    }

    watchSelf() {
        this.$menuMain.on('click', () => this.toggleExpand());

        this.$menuBug.on('click', () => {
            if (this.$menuBug.hasClass('active')) {
                this.$menuBug.removeClass('active');
                this.activeMenuItem = null;
                this.shrinkHoriz();
            } else {
                this.contents.bugReporter.startProcessForLastUsedToolIfSensible();
                this.$menuBug.addClass('active');
                this.activeMenuItem = 'bug';
                this.expandHoriz();
            }
        });
    }

    watchContents() {
        $.each(this.contents, (key, content) => {
            $(content).on('change', () => {
                if (this.activeMenuItem) {
                    this.$el.width(this.$el[0].scrollWidth);
                }                
            })
        });
    }

    async toggleExpand() {
        let durationVert = 200;
        let durationHoriz = this.activeMenuItem ? 200 : 0;
        let durationSpin = durationVert + durationHoriz;
        this.spinMainIcon(durationSpin);
        
        if (this.isExpandedVert) {
            if (this.activeMenuItem) {
                await this.shrinkHoriz(durationHoriz);
            }
            this.shrinkVert(durationVert);
        } else {
            await this.expandVert(durationVert);
            if (this.activeMenuItem) {
                this.expandHoriz(durationHoriz);
            }
        }        
    }

    spinMainIcon(durationMs) {
        $({deg: 0}).animate({deg: 180}, {
            duration: durationMs,
            step: (angle) => {
                this.$mainIcon.css({
                    transform: 'rotate(' + angle + 'deg)'
                });
            }
        });
    }

    async expandVert(durationMs) {
        this.isExpandedVert = true;
        return new Promise((resolve, reject) => {
            let options = {
                duration: durationMs,
                complete: () => {
                    this.$menuGithub.show();
                    resolve();
                }
            };
            this.$el.animate({
                height: '100%',
                easing: 'linear'
            }, options);
        });
    }

    shrinkVert(durationMs) {
        this.$menuGithub.hide();
        this.isExpandedVert = false;
        this.$el.animate({
            height: '50px'
        }, durationMs);
    }

    expandHoriz(durationMs) {
        let options = {
            duration: durationMs,
        };
        this.$el.animate({
            width: this.$el[0].scrollWidth
        }, options);
    }

    async shrinkHoriz(durationMs) {
        return new Promise((resolve, reject) => {
            let options = {
                duration: durationMs,
                complete: resolve
            };
            this.$el.animate({
                width: '50px'
            }, options);
        });
    }


}


initCss(`
    #twcheese-sidebar {
        position: fixed;
        display: inline-block;
        z-index: 20000;
        top: 0;
        left: 0;
        height: 50px;
        max-height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        width: 50px;
        max-width: 100%;
    }

    /* menu **************************************************/

    .twcheese-sidebar-menu {
        position: relative;
        display: block;
        width: 50px;
        height: 100%;
        background-color: rgb(51, 51, 51);
    }

    .twcheese-sidebar-menu.expanded {
        height: 100%;
    }

    .twcheese-sidebar-menu .menu-item {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    .twcheese-sidebar-menu .menu-item .icon {
        position: absolute;
        box-sizing: border-box;
        position: absolute;
        width: 50px;
        height: 50px;
        
        background-size: 36px 36px;
        background-repeat: no-repeat;
        background-position: center;
    }
    

    .twcheese-sidebar-menu .menu-item.main {
        background-color: darkOrange;
    }

    .twcheese-sidebar-menu .menu-item.main .icon {
        background-image: url('${ImageSrc.sidebarMain}');
    }
    .twcheese-sidebar-menu .menu-item.main:hover .icon {
        -webkit-filter: brightness(2);
        filter: brightness(2);
    }

    .twcheese-sidebar-menu .menu-item.bug .icon {
        background-image: url('${ImageSrc.sidebarBug}');
        -webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-sidebar-menu .menu-item.github {
        position: absolute;
        display: none;
        bottom: 0;
        margin-top: 50px;
    }

    .twcheese-sidebar-menu .menu-item.github .icon {
        background-image: url('${ImageSrc.sidebarGithub}');
        -webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-sidebar-menu .menu-item:hover .icon,
    .twcheese-sidebar-menu .menu-item.active .icon {
        -webkit-filter: brightness(1);
        filter: brightness(1);
    }

    /* content  **************************************************/

    .twcheese-sidebar-content {
        position: absolute;
        display: block;
        left: 50px;
        height: 100%;
        top: 0;
        background-color: rgb(37, 37, 37);
        color: rgb(187, 187, 187);
    }


`);



// CONCATENATED MODULE: ./src/ToolSetup/Sidebar.js


TwCheese.registerTool({
    id: 'Sidebar',
    use: () => {
        let widget = new SidebarWidget_SidebarWidget();
        widget.appendTo($('body'));
    },
    getDebugProcess: () => null
});


/***/ })
/******/ ]);