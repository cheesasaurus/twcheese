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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugEvents; });
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




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Phase; });

class Phase {
    constructor(phaseName) {
        this.name = phaseName;
        this.followsUpOn = null;
        this.autoComplete = false;
    }

    setFollowsUpOn(thingToFollowUpOn) {
        this.followsUpOn = thingToFollowUpOn;
        return this;
    }

    setAutoComplete(auto) {
        this.autoComplete = auto;
        return this;
    }

    getType() {
        throw Error('notimplemented');
    }

    start() {
        throw Error('not implemented');
    }

    checkCompletionReady() {
        throw Error('not implemented');
    }

    getThingsToFollowUpOn() {
        throw Error('not implemented');
    }

    getSummary() {
        throw Error('not implemented');
    }
    
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseTypes; });
const PhaseTypes = {
    ATTEMPT: 'attempt',
    QUESTION: 'question',
    REPORT: 'report'
};



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessFactory; });
/* harmony import */ var _twcheese_src_Models_Debug_DebugProcess_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _twcheese_src_Models_Debug_Build_PhaseFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _twcheese_src_Models_Debug_BugReporter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _twcheese_src_Models_Debug_PhaseReport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);






function lazyEvalUsingParent(parentPhase) {
    return (str) => {
        return () => {
            let parentResult = parentPhase.result;
            return eval(str);
        };
    }
}


class ProcessFactory {

    constructor(actions) {
        this.phaseFactory = new _twcheese_src_Models_Debug_Build_PhaseFactory_js__WEBPACK_IMPORTED_MODULE_1__[/* PhaseFactory */ "a"](actions);
    }

    create(name, cfg, finishWithReport) {
        let process = new _twcheese_src_Models_Debug_DebugProcess_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugProcess */ "a"](name);

        for (let phaseCfg of cfg.phases) {
            process.enqueuePhase(this.createPhase(phaseCfg));
        }

        if (finishWithReport) {
            let bugReporter = new _twcheese_src_Models_Debug_BugReporter_js__WEBPACK_IMPORTED_MODULE_2__[/* BugReporter */ "a"](process);
            process.enqueuePhase(_twcheese_src_Models_Debug_PhaseReport_js__WEBPACK_IMPORTED_MODULE_3__[/* PhaseReport */ "a"].create(bugReporter));
        }

        return process;
    }

    createPhase(cfg, lazyEval) {
        let phase = this.phaseFactory.create(cfg, lazyEval);
        this.addFollowUpPhasesForSuccess(phase, cfg);
        this.addFollowUpPhasesForAnswers(phase, cfg);
        return phase;
    }

    addFollowUpPhasesForSuccess(phase, cfg) {
        if (cfg.type === 'PhaseAttempt' && cfg.success) {
            for (let phaseCfg of cfg.success) {
                let subPhase = this.createPhase(phaseCfg, lazyEvalUsingParent(phase));
                phase.addSuccessFollowUp(subPhase);
            }
        }
    }

    addFollowUpPhasesForAnswers(phase, cfg) {
        if (cfg.type !== 'PhaseQuestion') {
            return;
        }
        
        for (let [q, questionCfg] of Object.entries(cfg.questions)) {
            if (questionCfg.type !== 'QuestionSelect') {
                continue;
            }
            for (let [o, optionCfg] of Object.entries(questionCfg.options)) {
                if (optionCfg.followUp) {
                    for (let phaseCfg of optionCfg.followUp) {
                        let option = phase.questions[q].options[o];
                        let subPhase = this.createPhase(phaseCfg, lazyEvalUsingParent(phase))
                        option.addFollowUp(subPhase);
                    }
                }
            }
        }
    }

};



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugProcess; });
/* harmony import */ var _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);



class DebugProcess {
    constructor(processName) {
        this.name = processName;
        this.phases = [];
        this.currentPhaseIndex = -1;
    }

    enqueuePhase(phase) {
        this.phases.push(phase);
        this.watchPhase(phase);
        return this;
    }

    insertPhase(phase) {
        this.phases.splice(this.currentPhaseIndex + 1, 0, phase);
        this.watchPhase(phase);
        return this;
    }

    watchPhase(phase) {
        let events = [
            _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugEvents */ "a"].PHASE_COMPLETION_READY,
            _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugEvents */ "a"].PHASE_COMPLETION_NOT_READY,
            _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugEvents */ "a"].PHASE_CHANGED
        ];

        $(phase).on(events.join(' '), (e) => $(this).trigger(e.type, e));

        $(phase).on(_twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugEvents */ "a"].PHASE_COMPLETION_READY, () => {
            if (phase.autoComplete) {
                this.goToNextPhase();
            }
        });
    }

    start() {
        this.currentPhaseIndex = -1;
        this.goToNextPhase();
    }

    goToNextPhase() {
        if (this.currentPhaseIndex >= 0) {
            for (let thing of this.getCurrentPhase().getThingsToFollowUpOn()) {
                for (let phase of thing.followUpPhases) {
                    this.insertPhase(phase);
                }            
            }
        }        
        if (!this.hasNextPhase()) {
            throw Error(`there's no next phase`);
        }
        this.currentPhaseIndex++;
        $(this).trigger(_twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__[/* DebugEvents */ "a"].PHASE_CHANGED);
        this.getCurrentPhase().checkCompletionReady();
        this.getCurrentPhase().start();
    }

    hasNextPhase() {
        return this.currentPhaseIndex < this.phases.length - 1;
    }

    getCurrentPhase() {
        return this.phases[this.currentPhaseIndex];
    }

    getSummarySoFar() {
        // everything before the current phase
        return this.phases.slice(0, this.currentPhaseIndex)
            .map(phase => phase.getSummary());
    }

    static create(processName) {
        return new DebugProcess(processName);
    }

}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseReport; });
/* harmony import */ var _twcheese_src_Models_Debug_Phase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _twcheese_src_Models_Debug_PhaseTypes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





const Status = {
    SUCCESS: 'success',
    FAIL: 'fail',
    NOT_ATTEMPTED: 'not_attempted'
};


class PhaseReport extends _twcheese_src_Models_Debug_Phase_js__WEBPACK_IMPORTED_MODULE_0__[/* Phase */ "a"] {
    constructor(bugReporter) {
        super('send bug report');
        this.bugReporter = bugReporter;
        this.status = Status.NOT_ATTEMPTED;
        this.error;
    }

    getType() {
        return _twcheese_src_Models_Debug_PhaseTypes_js__WEBPACK_IMPORTED_MODULE_2__[/* PhaseTypes */ "a"].REPORT;
    }

    start() {
        let report = this.bugReporter.buildReport();
        this.bugReporter.submitReport(report)
            .then(d => {
                this.status = Status.SUCCESS;
                $(this).trigger({
                    type: _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__[/* DebugEvents */ "a"].BUG_REPORT_SUCCEEDED,
                    url: d.html_url
                })
            })
            .catch(error => {
                this.error = error;
                this.status = Status.FAIL;
                $(this).trigger(_twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__[/* DebugEvents */ "a"].BUG_REPORT_FAILED)
            })
            .finally(() => this.checkCompletionReady());
    }

    checkCompletionReady() {
        if (this.status !== Status.NOT_ATTEMPTED) {
            $(this).trigger(_twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__[/* DebugEvents */ "a"].PHASE_COMPLETION_READY);
        } else {
            $(this).trigger(_twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__[/* DebugEvents */ "a"].PHASE_COMPLETION_NOT_READY);
        }
    }

    getThingsToFollowUpOn() {
        return [];
    }

    getSummary() {
        return {
            phaseName: this.name
        };
    }

    static create(bugReporter) {
        return new PhaseReport(bugReporter);
    }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/Models/Debug/Phase.js
var Phase = __webpack_require__(1);

// EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
var DebugEvents = __webpack_require__(0);

// EXTERNAL MODULE: ./src/Models/Debug/PhaseTypes.js
var PhaseTypes = __webpack_require__(2);

// CONCATENATED MODULE: ./src/Models/Debug/PhaseAttempt.js




const Status = {
    SUCCESS: 'success',
    FAIL: 'fail',
    NOT_ATTEMPTED: 'not_attempted'
};


class PhaseAttempt_PhaseAttempt extends Phase["a" /* Phase */] {
    constructor(phaseName, asyncFunctionToAttempt) {
        super(phaseName);
        this.instructions;
        this.attempt = asyncFunctionToAttempt;
        this.success = async () => {};
        this.fail = async () => {};
        this.status = Status.NOT_ATTEMPTED;
        this.autoComplete = true;
        this._error;
        this._result;
        this.summarizeData = d => d;
        this.ctrl = {};

        this.successFollowUpPhases = [];
    }

    getType() {
        return PhaseTypes["a" /* PhaseTypes */].ATTEMPT;
    }

    get result() {
        if (this.status === Status.NOT_ATTEMPTED) {
            throw new Error('tried to get result before the attempt settled');
        }
        if (this.status === Status.FAIL) {
            throw new Error(`tried to get result of an attempt that failed`);
        }
        return this._result;
    }

    async doAttempt() {
        try {
            let result = await this.abortableAttempt();
            this.status = Status.SUCCESS;
            this._result = result;            
            await this.success(result);
        } catch (err) {
            console.warn(err);
            this.status = Status.FAIL;
            this._error = err;
            await this.fail(err);
        }
        this.checkCompletionReady();
    }

    async abortableAttempt() {
        return new Promise(async (resolve, reject) => {
            $(this.ctrl).on(DebugEvents["a" /* DebugEvents */].USER_REJECTED, () => reject('user rejected'));
            try {
                let parentResult;
                if (this.followsUpOn) {
                    parentResult = this.followsUpOn.result;
                }
                let result = await this.attempt(parentResult, this.ctrl);
                resolve(result);
            }
            catch(err) {
                reject(err);
            }            
        });
    }

    userAbort() {
        $(this.ctrl).trigger(DebugEvents["a" /* DebugEvents */].USER_REJECTED);
    }

    setInstructions(instructions) {
        this.instructions = instructions;
        return this;
    }

    setDataSummarizer(func) {
        this.summarizeData = func;
        return this;
    }

    onSuccess(cb) {
        this.success = cb;
        return this;
    }

    addSuccessFollowUp(phase) {
        this.successFollowUpPhases.push(phase);
        phase.setFollowsUpOn(this);
        return this;
    }

    get followUpPhases() {
        if (this.status === Status.SUCCESS) {
            return this.successFollowUpPhases;
        }
        return [];
    }

    onFail(cb) {
        this.fail = cb;
        return this;
    }

    start() {
        this.doAttempt();
    }

    checkCompletionReady() {
        if (this.status !== Status.NOT_ATTEMPTED) {
            $(this).trigger(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_READY);
        } else {
            $(this).trigger(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_NOT_READY);
        }
    }

    getThingsToFollowUpOn() {
        return [this];
    }

    getSummary() {
        return {
            phaseName: this.name,
            status: this.status,
            data: typeof this._result === 'undefined' ? this._result : this.summarizeData(this._result),
            error: this.summarizeError()
        }
    }

    summarizeError() {
        let err = this._error;
        if (!(err instanceof Error)) {
            return err;
        }
        return {
            message: err.message,
            name: err.name,
            extra: err.extra,
            stack: err.stack
        };
    }
    
    static create(phaseNum, functionToAttempt) {
        return new PhaseAttempt_PhaseAttempt(phaseNum, functionToAttempt);
    }

}


// CONCATENATED MODULE: ./src/Models/Debug/PhaseQuestion.js





class PhaseQuestion_PhaseQuestion extends Phase["a" /* Phase */] {
    constructor(phaseName) {
        super(phaseName);
        this.questions = [];
        this._examinedHtml;
    }

    getType() {
        return PhaseTypes["a" /* PhaseTypes */].QUESTION;
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
        $(question).on(DebugEvents["a" /* DebugEvents */].QUESTION_ANSWERED, () => {
            this.checkCompletionReady();
        });
        $(question).on(DebugEvents["a" /* DebugEvents */].QUESTION_NOT_ANSWERED, () => {
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
                $(this).trigger(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_NOT_READY);
                return;
            }
        }
        $(this).trigger(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_READY);
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
        return new PhaseQuestion_PhaseQuestion(phaseName);
    }

}




// CONCATENATED MODULE: ./src/Models/Debug/QuestionTypes.js
const QuestionTypes = {
    VALUE: 'value',
    FREE_FORM: 'free_form',
    SELECT: 'select'
};


// CONCATENATED MODULE: ./src/Models/Debug/Question.js



class Question_Question {
    constructor(text) {
        this.text = text;
        this.options = [];
        this.selectedOptionIndex = null;
    }

    getType() {
        throw Error('not implemented');
    }

    addOption(option) {
        this.options.push(option);
        return this;
    }

    setSelectedOption(index) {
        this.selectedOptionIndex = index;
        $(this).trigger(DebugEvents["a" /* DebugEvents */].QUESTION_ANSWERED);
        return this;
    }

    isAnswered() {
        return this.selectedOptionIndex !== null;
    }

    getSelectedOption() {
        return this.options[this.selectedOptionIndex];
    }

    getThingsToFollowUpOn() {
        let option = this.getSelectedOption();
        return (option.followUpPhases.length > 0) ? [option] : [];
    }

    getSummary() {
        return {
            question: this.text,
            answer: this.getSelectedOption().value
        };
    }

    static create(text) {
        return new Question_Question(text);
    }
}


// CONCATENATED MODULE: ./src/Models/Debug/QuestionSelect.js




class QuestionSelect_QuestionSelect extends Question_Question {
    getType() {
        return QuestionTypes.SELECT;
    }

    static create(text) {
        return new QuestionSelect_QuestionSelect(text);
    }
}



// CONCATENATED MODULE: ./src/Models/Debug/Option.js



class Option_Option {
    constructor(humanText, value, className = '') {
        this.text = humanText;
        this.value = value;
        this.className = className;
        this.followUpPhases = [];
    }

    addFollowUp(phase) {
        this.followUpPhases.push(phase);
        phase.setFollowsUpOn(this);
        return this;
    }

    setValue(value) {
        this.value = value;
        $(this).trigger(DebugEvents["a" /* DebugEvents */].OPTION_VALUE_CHANGED);
    }

    static create(humanText, value, className) {
        return new Option_Option(humanText, value, className);
    }

}


// CONCATENATED MODULE: ./src/Models/Debug/QuestionFreeForm.js






class QuestionFreeForm_QuestionFreeForm extends Question_Question {

    constructor(questionText, placeholderText, minResponseLength = 0) {
        super(questionText);
        this.minResponseLength = minResponseLength;
        this.options = [
            Option_Option.create(placeholderText, '', 'free-form')
        ];
        this.setSelectedOption(0);
        this.watchSelectedOption();        
    }

    getType() {
        return QuestionTypes.FREE_FORM;
    }

    watchSelectedOption() {
        $(this.getSelectedOption()).on(DebugEvents["a" /* DebugEvents */].OPTION_VALUE_CHANGED, () => {
            if (this.isAnswered()) {
                $(this).trigger(DebugEvents["a" /* DebugEvents */].QUESTION_ANSWERED);
            } else {
                $(this).trigger(DebugEvents["a" /* DebugEvents */].QUESTION_NOT_ANSWERED);
            }
        });
    }

    isAnswered() {
        return super.isAnswered() && this.options[0].value.length >= this.minResponseLength;
    }

    static create(questionText, placeholderText, minResponseLength) {
        return new QuestionFreeForm_QuestionFreeForm(questionText, placeholderText, minResponseLength);
    }

}



// CONCATENATED MODULE: ./src/Models/Debug/Correctness.js

const Correctness = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    NOT_SURE: 'not_sure'
}


// CONCATENATED MODULE: ./src/Models/Debug/QuestionValue.js






const OPTION_INCORRECT = 1;

class QuestionValue_QuestionValue extends Question_Question {

    constructor(questionText, valueQuestioned) {
        super(questionText);
        this._valueQuestioned = valueQuestioned;
        this.options = [
            Option_Option.create('Correct', Correctness.CORRECT, 'correct'),
            Option_Option.create('Incorrect', Correctness.INCORRECT, 'incorrect'),
            Option_Option.create('Not sure', Correctness.NOT_SURE, 'not-sure')
        ];
    }

    get value() {
        if (typeof this._valueQuestioned === 'function') {
            return this._valueQuestioned();
        }
        return this._valueQuestioned;
    }

    getType() {
        return QuestionTypes.VALUE;
    }

    addFollowUp(phase) {
        this.options[OPTION_INCORRECT].addFollowUp(phase);
        return this;
    }

    getSummary() {
        return Object.assign(super.getSummary(), {
            valueChecked: this.value
        });
    }

    static create(questionText, valueQuestioned) {
        return new QuestionValue_QuestionValue(questionText, valueQuestioned);
    }
}


// CONCATENATED MODULE: ./src/Models/Debug/Build/QuestionFactory.js






class QuestionFactory_QuestionFactory {
    
    create(cfg, lazyEval) {
        switch (cfg.type) {
            case 'QuestionFreeForm':
                return this.createQuestionFreeForm(cfg);
            case 'QuestionSelect':
                return this.createQuestionSelect(cfg);
            case 'QuestionValue':
                return this.createQuestionValue(cfg, lazyEval);
            default:
                throw `unrecognized question type: ${cfg.type}`;
        }
    }

    createQuestionFreeForm(cfg) {
        let minResponseLength = cfg.minResponseLength || 0;
        return QuestionFreeForm_QuestionFreeForm.create(cfg.ask, cfg.placeholderText, minResponseLength);
    }

    createQuestionSelect(cfg) {
        let question = QuestionSelect_QuestionSelect.create(cfg.ask);

        for (let optionCfg of cfg.options) {
            question.addOption(Option_Option.create(optionCfg.answer, optionCfg.value));
        }

        return question;
    }

    createQuestionValue(cfg, lazyEval) {
        let valueExamined = lazyEval(cfg.examine);
        return QuestionValue_QuestionValue.create(cfg.ask, valueExamined);
    }

}


// CONCATENATED MODULE: ./src/Models/Debug/Build/PhaseFactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseFactory_PhaseFactory; });





class PhaseFactory_PhaseFactory {

    constructor(actions) {
        this.actions = actions;
        this.questionFactory = new QuestionFactory_QuestionFactory();
    }

    create(cfg, lazyEval) {
        switch (cfg.type) {
            case 'PhaseAttempt':
                return this.createPhaseAttempt(cfg);
            case 'PhaseQuestion':
                return this.createPhaseQuestion(cfg, lazyEval);
            case 'PhaseReport':
                return this.createPhaseReport(cfg);
            default:
                throw Error(`unrecognized phase type ${cfg.type}`);
        }
    }

    createPhaseAttempt(cfg) {
        let action = this.actions[cfg.action];
        if (typeof action === 'undefined') {
            throw Error(`unrecognized action: ${cfg.action}`);
        }

        let phase = PhaseAttempt_PhaseAttempt.create(cfg.internalName, action.execute);

        if (action.summarizeResult) {
            phase.setDataSummarizer(action.summarizeResult);
        }
        if (cfg.instructions) {
            phase.setInstructions(cfg.instructions);
        }
        return phase;
    }

    createPhaseQuestion(cfg, lazyEval) {
        let phase = PhaseQuestion_PhaseQuestion.create(cfg.internalName);

        if (cfg.lookAt) {
            phase.lookAt(lazyEval(cfg.lookAt));
        }

        for (let questionCfg of cfg.questions) {
            let question = this.questionFactory.create(questionCfg, lazyEval);
            phase.addQuestion(question);
        }
        
        return phase;
    }

}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/Models/Debug/DataCollector.js

class DataCollector {
    constructor(debugProcess) {
        this.process = debugProcess;
        this.censoredProps = new Set(['csrf', 'birthdate']);
    }

    getCollectibleData() {
        return this.scrub(this.buildData());
    }

    buildData() {
        let nav = window.navigator;

        return {
            process: this.process.getSummarySoFar(),
            contentHtml: document.getElementById('contentContainer').outerHTML,
            navigator: {
                appCodeName: nav.app,
                appName: nav.appName,
                appVersion: nav.appVersion,
                platfrom: nav.platfrom,
                userAgent: nav.userAgent,
                languages: $.extend(true, [], nav.languages),
                oscpu: nav.oscpu
            },
            gameData: $.extend(true, {}, window.game_data)
        }
    }

    scrub(d) {
        if (typeof d === 'object' && d !== null) {
            for (let key of Object.keys(d)) {
                if (this.censoredProps.has(key)) {
                    d[key] = 'CENSORED';
                } else {
                    d[key] = this.scrub(d[key]);
                }
            }
        }
        if (typeof d === 'string') {
            return this.censorCsrfInString(d);
        }
        return d;
    }

    censorCsrfInString(s) {
        return s.replace(/((&|&amp;)h=)(\w+)/g, '$1CENSORED')
            .replace(/(\?h=)(\w+)(&|&amp;)/g, '$1CENSORED$3')
            .replace(/(csrf_token = ')(\w+)/g, '$1CENSORED')
            .replace(/("csrf":")(\w+)/g, '$1CENSORED');
    }
}


// CONCATENATED MODULE: ./conf/API.js
let API = {
    bugReport: {
        url: 'https://56hqsw3c2c.execute-api.us-east-2.amazonaws.com/prod/bugreport'
    }
}




// CONCATENATED MODULE: ./src/Models/Debug/BugReporter.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BugReporter_BugReporter; });



class BugReporter_BugReporter {
    constructor(process) {
        this.process = process;
    }

    buildReport() {
        return {
            title: '[Bug report] ' + this.process.name,
            dataCollected: (new DataCollector(this.process)).getCollectibleData()
        }
    }

    async submitReport(report) {
        let message = [
            '|game version|world|player|twcheese|',
            '|---|---|---|---|',
            `|${game_data.majorVersion}|${game_data.world}|${game_data.player.name}|${window.TwCheese.version}|`,
            '```' + JSON.stringify(report.dataCollected, null, 2) +  '```'
        ].join("\n");
        return await this.createIssue(report.title, message);
    }

    async createIssue(title, message) {
        let response = await fetch(API.bugReport.url, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                message: message
            })
        });
        if (!response.ok) {
            throw new Error(`Failed to create issue. [${response.status}: ${response.statusText}]`);
        }
        return await response.json();
    }

}



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Util/Object.js


function getProp(object, propPath, defaultValue) {
    let tokens = propPath.split('.');
    for (let i = 0; i < tokens.length - 1; i++) {
        let token = tokens[i];
        if (typeof object[token] !== 'object' || token === null) {
            return defaultValue;
        }
        object = object[token];
    }
    let value = object[tokens[tokens.length - 1]];
    return (typeof value === 'undefined') ? defaultValue : value;
}


function setProp(object, propPath, value) {
    let tokens = propPath.split('.');
    for (let i = 0; i < tokens.length - 1; i++) {
        let token = tokens[i];
        if (typeof object[token] !== 'object' || token === null) {
            object[token] = {};
        }
        object = object[token];
    }
    object[tokens[tokens.length - 1]] = value;
}



// CONCATENATED MODULE: ./src/Models/Config.js



class Config_Config {
    constructor(id) {
        this.id = id;
        this.props = {};
        this._loadCachedData();
    }

    get(prop, defaultValue) {
        return getProp(this.props, prop, defaultValue);
    }

    set(prop, value) {
        setProp(this.props, prop, value);
        this._save();
    }

    initProps(props) {
        this.props = props;
    }

    /**
     * @protected
     * @return {object|null}
     */
    _loadCachedData() {
        let saved = window.localStorage.getItem(this.id);
        if (saved) {
            let data = JSON.parse(saved);

            // should ideally be data.props
            // But for backwards compatibility, the data could be the props too.
            this.props = data.props || data;
            return data;
        }
        return null;
    }

    /**
     * @final
     * @protected
     */
    _save() {
        this._beforeSave();
        window.localStorage.setItem(this.id, JSON.stringify(this._getCacheableData()));
    }

    /**
     * @protected
     */
    _beforeSave() {
        
    }

    /**
     * @protected
     * @return {object}
     */
    _getCacheableData() {
        return {
            props: this.props
        };
    }

}


// CONCATENATED MODULE: ./src/Models/RateLimiter.js
class RateLimiter {
    constructor(maxBurstsPerSecond) {
        this.maxBurstsPerSecond = maxBurstsPerSecond;
        this.recentRequests = new Array(maxBurstsPerSecond);
    }

    requestWasMade() {
        this.recentRequests.unshift(performance.now());
        this.recentRequests.pop();
    }

    async sleepIfNeeded() {
        let anchorTimestamp = this.recentRequests[this.maxBurstsPerSecond - 1];
        if (typeof anchorTimestamp === 'undefined') {
            return;
        }
        let delayMs = anchorTimestamp + 1000 - performance.now();
        if (delayMs <= 0) {
            return;
        }
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, delayMs);
        });
    }
}


// CONCATENATED MODULE: ./src/Util/Network.js


let throttle = new RateLimiter(5);

let originalFetch = window.fetch;
window.fetch = function() {
    throttle.requestWasMade();
    return originalFetch.apply(this, arguments);
};


/**
 * requests the document from a url
 * @param {string} url the url of the page to get the document from
 * @return {Promise}
 * @resolve {HTMLDocment}
 */
async function requestDocument(url) {
    await throttle.sleepIfNeeded();
    let response = await fetch(url);
    let responseText = await response.text();
    let doc = (new DOMParser()).parseFromString(responseText, 'text/html');

    Object.defineProperty(doc, 'URL', {
        get: () => url
    });
    
    return doc;
};


/**
 * requests xml document from a url
 * @param {string} url the url of the page to get the cml document from
 * @return {Promise}
 * @resolve {XMLDocument}
 */
async function requestXml(url) {
    await throttle.sleepIfNeeded();
    let response = await fetch(url);
    let responseText = await response.text();
    let xmlDoc = (new DOMParser()).parseFromString(responseText, 'text/xml');

    Object.defineProperty(xmlDoc, 'URL', {
        get: () => url
    });

    return xmlDoc;
};


/**
 * make a POST request to the game
 * @param {string} screen 
 * @param {object} uriParams 
 * @param {object} data
 * @return {Promise}
 * @resolve {object} response data from the game
 */
async function postToGame(screen, uriParams, data) {
    await throttle.sleepIfNeeded();
    return new Promise(function(resolve, reject) {
        window.TribalWars.post(screen, uriParams, data, resolve, reject);
    });
}


function gameUrl(screen, uriParams, method = 'GET') {
    return 'https://' + document.domain + window.TribalWars.buildURL(method, screen, uriParams);
}


function attackPrepUrl(unitCounts, targetVillageId, originVillageId = window.game_data.village.id) {
    let uriParams = {
        from: 'simulator',
        village: originVillageId,
        target_village_id: targetVillageId        
    };
    for (let [unitType, count] of Object.entries(unitCounts)) {
        uriParams['att_' + unitType] = count;
    }
    return gameUrl('place', uriParams);
}



// CONCATENATED MODULE: ./src/Models/RemoteConfig.js




function parseXmlNode(node) {
    if (node.children.length === 0) {
        return parseFloat(node.innerHTML) || null;
    }
    let object = {};
    for (let childNode of node.children) {
        object[childNode.tagName] = parseXmlNode(childNode);
    }
    return object;
}


class RemoteConfig_RemoteConfig extends Config_Config {

    /**
     * @param {string} url 
     */
    setUrl(url) {
        this.url = url;
        return this;
    }

    /**
     * @param {number} seconds 
     */
    setTtl(seconds) {
        this.ttl = seconds * 1000;
        return this;
    }

    async ensureUpdated() {
        if (this.needsUpdate()) {
            await this.update();
        }    
    }

    needsUpdate() {
        let now = new Date().getTime();
        let ttl = this.ttl || 86400;
        return !this.timeUpdated || ttl < now - this.timeUpdated;
    }

    async update() {
        let xmlDoc = await requestXml(this.url);
        this._processXml(xmlDoc);
        this._save();
    }

    /**
     * @protected
     * @param {XMLDocument} xmlDoc 
     */
    _processXml(xmlDoc) {
        this.props = parseXmlNode(xmlDoc).config;
    }

    /**
     * @protected
     * @return {object|null}
     */
    _loadCachedData() {
        let data = super._loadCachedData();
        if (data) {
            this.timeUpdated = data.timeUpdated;
        }
    }

    /**
     * @protected
     */
    _beforeSave() {
        this.timeUpdated = new Date().getTime();
    }

    /**
     * @protected
     * @return {object}
     */
    _getCacheableData() {
        return Object.assign({}, super._getCacheableData(), {
            timeUpdated: this.timeUpdated
        });
    }

}



// CONCATENATED MODULE: ./src/Util/Config.js



let userConfig = new Config_Config('twcheese.userConfig');

let gameConfig = (new RemoteConfig_RemoteConfig('twcheese.gameConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_config`)
    .setTtl(8 * 3600);

let buildingConfig = (new RemoteConfig_RemoteConfig('twcheese.buildingConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_building_info`)
    .setTtl(8 * 3600);

let troopConfig = (new RemoteConfig_RemoteConfig('twcheese.troopConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_unit_info`)
    .setTtl(8 * 3600);


async function ensureRemoteConfigsUpdated() {
    await Promise.all([
        gameConfig.ensureUpdated(),
        troopConfig.ensureUpdated(),
        buildingConfig.ensureUpdated()
    ]);
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



// CONCATENATED MODULE: ./src/Prompt/suggestRedirect.js




function suggestRedirect(options) {
    let { message, screen, screenName, uriParams, skippableId } = options;
    message = message || '{{Some genius forgot to write a message here}}';
    screenName = screenName || '{{Screen Name goes here}}';
    uriParams = uriParams || {};
    if (!screen) {
        throw Error('screen must be specified!');
    }

    if (skippableId && userConfig.get(skipKey(skippableId), false)) {
        window.UI.InfoMessage(`Redirecting to <strong>${screenName}</strong>...`);
        setTimeout(() => window.TribalWars.redirect(screen, uriParams), 200);        
        return;
    }    

    let buttonConfirm = {
        text: 'Take me there!',
        callback: () => {
            if (skippableId) {
                let skipNextTime = $('#twcheese-suggest-redirect-skip').prop('checked');
                userConfig.set(skipKey(skippableId), skipNextTime);
            }
            window.TribalWars.redirect(screen, uriParams);
        },
        confirm: true
    };
    let buttonCancel = {
        text: 'Whatever...',
        callback: () => {}
    };
    window.UI.ConfirmationBox(buildContent(message, options), [buttonConfirm, buttonCancel], 'twcheese_suggest_redirect', true, true);
}


function skipKey(skippableId) {
    return 'suggestRedirect.skip.' + skippableId;
}


function buildContent(message, options) {
    let html = message;
    if (options.skippableId) {
        html += `<div class="twcheese-suggest-redirect-skip-container">
            <input id="twcheese-suggest-redirect-skip" type="checkbox">
            <span>Don't ask, just take me there next time.</span>
        </div>`
    }
    return html;
}


initCss(`
    .twcheese-suggest-redirect-skip-container {
        margin-top: 20px;
        font-size: 10px;
    }

    .twcheese-suggest-redirect-skip-container > * {
        vertical-align: middle;
    }
`);





// CONCATENATED MODULE: ./src/Models/ScavengeOption.js


class ScavengeOption {

    constructor(base) {
        this.base = base;
        this.id = base.id;
    }

    getName() {
        return this.base.name;
    }

    getLootPercent() {
        return this.base.loot_factor * 100;
    }

    getLootFactor() {
        return this.base.loot_factor;
    }

    calcDurationSeconds(squadCapacity) {
        let base = (squadCapacity ** 2) * this.getLootPercent() * this.base.loot_factor;
        let preDuration = Math.pow(base, this.base.duration_exponent) + this.base.duration_initial_seconds
        return Math.round(preDuration * this.base.duration_factor);
    }

    calcTargetCapacity(durationSeconds) {
        let preDuration = durationSeconds / this.base.duration_factor;
        let base = (preDuration - this.base.duration_initial_seconds) ** (1 / this.base.duration_exponent);
        return Math.round(Math.sqrt(base / this.getLootPercent() / this.base.loot_factor));
    }

}



// CONCATENATED MODULE: ./src/Models/Troops.js


let Troops_troopTypes = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob', 'militia'];


function troopPop(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.pop;
}


function travelMinutes(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.speed;
}


function troopCarry(troopType) {
    let troop = troopConfig.get(troopType);
    if (typeof troop === 'undefined') {
        return 0;
    }
    return troop.carry;
}


class TroopCounts {
    constructor() {
        for (let type of Troops_troopTypes) {
            this[type] = 0;
        }
    }

    clone() {
        return Object.assign(new TroopCounts(), this);
    }

    filter(allowedTroopTypes) {
        let counts = new TroopCounts();
        for (let type of Troops_troopTypes) {
            if (allowedTroopTypes.includes(type)) {
                counts[type] = this[type];
            }
        }
        return counts;
    }

    isZero() {        
        for (let count of Object.values(this)) {
            if (count !== 0) {
                return false;
            }
        }
        return true;
    }

    sum() {
        let sum = 0;
        for (let count of Object.values(this)) {
            sum += count;
        }
        return sum;
    }

    /**
     * @param {function} doSomething - receives two params: troopType and count
     */
    each(doSomething) {
        for (let type of Troops_troopTypes) {
            let count = this[type];
            doSomething(type, count);
        }
    }

    carryCapacity() {
        let capacity = 0;
        for (let type of Troops_troopTypes) {
            capacity += this[type] * troopCarry(type);
        }
        return capacity;
    }

    populationUsed() {
        return Troops_troopTypes.reduce((sum, type) => sum + troopPop(type) * this[type], 0);
    }

    travelDuration(distance, role = 'attack') {
        let minutesPerField = this.travelMinutesPerField(role);
        return calcTravelDuration(minutesPerField, distance);
    }

    travelMinutesPerField(role = 'attack') {
        if (role === 'support' && this.knight > 0) {
            return travelMinutes('knight');
        }

        let relevantMinutes = Troops_troopTypes
            .filter(type => this[type] > 0)
            .map(type => travelMinutes(type));

        return Math.max(...relevantMinutes);
    }

    /**
     * @param {TroopCounts} subtrahend
     * @return {TroopCounts} difference
     */
    subtract(subtrahend) {
        let difference = new TroopCounts();
        for (let [troopType, count] of Object.entries(this)) {
            difference[troopType] = count - subtrahend[troopType];
        }
        return difference;
    }

    /**
     * get new TroopCounts, like this one but with any negative counts set to 0
     */
    zeroNegatives() {
        let troopCounts = new TroopCounts();
        for (let [troopType, count] of Object.entries(this)) {
            troopCounts[troopType] = Math.max(0, count);
        }
        return troopCounts;
    }

    toArray() {
        return Troops_troopTypes.map(type => this[type]);
    }

    static fromArray(array) {
        let troops = new TroopCounts();
        array.forEach((count, i) => {
            troops[Troops_troopTypes[i]] = count;
        });
        return troops;
    }
}


/**
 *	@param {number} distance
 *	@return	{{spear:number, sword:number, ...}} milliseconds
 */
function calcTravelDurations(distance) {
    let travelTimes = {};
    for (let type of Troops_troopTypes) {
        travelTimes[type] = calcTravelDuration(travelMinutes(type), distance);
    }
    return travelTimes;
};


function calcTravelDuration(minutesPerField, distance) {
    // The game rounds travel duration to the nearest second.
    // The milliseconds part of the scheduled arrival is NOT some fraction of travel seconds.
    // But rather, copied from the clock when the server started processing the request to travel.
    //
    // e.g. The clock says its 12:30:00.123.
    // The server processes a request for troops to travel somewhere that takes them 10 minutes to reach.
    // The scheduled arrival will be 12:40:00.123
    return Math.round(distance * minutesPerField * 60) * 1000;
}


let Troops_troopUtil = {

    troopTypesOnWorld() {
        return window.game_data.units;
    },

    existsOnWorld(troopType) {
        return typeof troopConfig.get(troopType) !== 'undefined';
    },

    /** 
     * @param {string} troopType
     * @param {number} resourceAmount     
     * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
     * @return {number} how many troops does it take to carry all the resources
     */
    countToCarry(troopType, resourceAmount, haulBonus = 0) {
        let haulPerUnit = troopCarry(troopType) * (100 + haulBonus) / 100;
        let troopCount = resourceAmount / haulPerUnit;
        return Math.round(10 * troopCount) / 10;
    },

    carryCapacity(troopType, factor = 1.0) {
        return troopCarry(troopType) * factor;
    },

    /**
     * @param {string} troopType
     * @param {number} distance
     * @return {number} milliseconds to travel
     */
    travelDuration(troopType, distance) {
        return calcTravelDuration(travelMinutes(troopType), distance);
    }

};



// CONCATENATED MODULE: ./src/Scrape/scavenge.js




/**
 * @param {HTMLDocument} gameDoc
 * @return {TroopCounts}
 */
function scrapeAvailableTroopCounts(gameDoc) {
    let availableCounts = new TroopCounts();
    $(gameDoc).find('.units-entry-all').each(function() {
        let troopType = this.dataset.unit;
        availableCounts[troopType] = parseInt(this.innerHTML.match(/\d+/)[0]);
    });
    return availableCounts;
}


/**
 * @param {HTMLDocument} gameDoc
 * @return {int[]}
 */
function scrapeUsableOptionIds(gameDoc) {
    let usableIds = [];

    $(gameDoc).find('.scavenge-option').has('.free_send_button:not(.btn-disabled)').each(function() {
        let [, id] = $(this).find('.portrait').css('background-image').match(/options\/(\d).png/);
        usableIds.push(parseInt(id));
    });

    return usableIds;
}


/**
 * @param {HTMLDocument} gameDoc
 * @return {object}
 */
function scrapeScavengeModels(gameDoc) {
    let data = scrapeScavengeData(gameDoc);
    let optionBases = data.optionsConfig;

    let options = new Map();
    for (let optionId of Object.keys(optionBases)) {
        options.set(parseInt(optionId), new ScavengeOption(optionBases[optionId]));
    }

    return {
        options,
        sendableTroopTypes: Object.keys(data.troops),
        haulFactor: data.village.unit_carry_factor
    };
}


/**
 * @param {HTMLDocument} gameDoc 
 */
function scrapeScavengeData(gameDoc) {
    let jsCode = findScavengeScreenJsCode(gameDoc);

    let paramCode = findScavengeScreenParamCode(jsCode);
    let dataFromParams = parseScavengeScreenParamCode(paramCode);
    
    let villageCode = findVillageCode(jsCode);

    return {
        optionsConfig: dataFromParams.optionsConfig,
        troops: dataFromParams.troops,
        village: JSON.parse(villageCode)
    };
}


/**
 * @param {HTMLDocument} gameDoc 
 */
function findScavengeScreenJsCode(gameDoc) {
    let scripts = gameDoc.getElementsByTagName('script');
    
    for (let script of scripts) {
        let code = script.innerHTML;
        if (code.includes('new ScavengeScreen')) {
            return code;
        }
    }
}


/**
 * @param {string} jsCode
 * @return {string}
 */
function findScavengeScreenParamCode(jsCode) {
    let search = 'new ScavengeScreen';
    let startIndex = jsCode.indexOf(search) + search.length;
    return wrappedCode(jsCode, startIndex, '(', ')');
}


/**
 * @param {string} paramCode 
 */
function parseScavengeScreenParamCode(paramCode) {
    let optionsConfigStartIndex = paramCode.indexOf('{');
    let optionsConfigCode = wrappedCode(paramCode, optionsConfigStartIndex, '{', '}');

    let troopsCode;
    let troopsStartIndex = optionsConfigStartIndex + optionsConfigCode.length;
    for (; troopsStartIndex < paramCode.length; troopsStartIndex++) {
        if (paramCode[troopsStartIndex] === '{') {
            troopsCode = wrappedCode(paramCode, troopsStartIndex, '{', '}');
            break;
        }
    }

    return {
        optionsConfig: JSON.parse(optionsConfigCode),
        troops: JSON.parse(troopsCode)
    };
}


/**
 * @param {string} jsCode
 * @return {string}
 */
function findVillageCode(jsCode) {
    let search = 'var village = ';
    let startIndex = jsCode.indexOf(search) + search.length;
    return wrappedCode(jsCode, startIndex, '{', '}');
}


/**
 * @param {string} string 
 * @param {number} firstParenIndex 
 * @param {string} openingChar 
 * @param {string} closingChar 
 * @return {string}
 */
function wrappedCode(string, firstParenIndex, openingChar = '(', closingChar = ')') {
    let openingParens = 1;
    let closingParens = 0;
    let lastParenIndex = -1;
    
    for (let i = firstParenIndex + 1; i < string.length; i++) {
        let char = string[i];
        if (char === openingChar) {
            openingParens++;
        }
        if (char === closingChar) {
            closingParens++;
            lastParenIndex = i;
        }
        if (closingParens === openingParens) {
            return string.substring(firstParenIndex, lastParenIndex + 1);
        }
    }
}



// CONCATENATED MODULE: ./src/Models/ScavengeTroopsAssignerPreferences.js



class ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences {

    constructor(sendableTroopTypes) {
        this._sendableTroopTypes = sendableTroopTypes;
        this.reset();        
    }

    reset() {
        this.mode = ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON;
        this.allowedOptionIds = new Set([1, 2, 3, 4]);
        this.targetDurationSeconds = 2 * 3600;
        this.initTroops();
        this.troopOrder = [
            ['axe', 'light', 'marcher'], // first chunk (sent together)
            ['spear', 'sword', 'archer'], // second chunk (sent together)
            ['heavy'], // third chunk
            ['knight']
        ];
    }

    initTroops() {
        this.troops = {};
        for (let troopType of this._sendableTroopTypes) {
            this.troops[troopType] = {
                maySend: true,
                reserved: 0
            };
        }
    }

    setMode(mode) {
        this.mode = mode;
        $(this).trigger('change');
    }

    isOptionAllowed(optionId) {
        return this.allowedOptionIds.has(optionId);
    }

    setOptionAllowed(optionId, isAllowed = true) {
        if (isAllowed) {
            this.allowedOptionIds.add(optionId);
        } else {
            this.allowedOptionIds.delete(optionId);
        }
        $(this).trigger('change');
    }

    setTargetDuration(seconds) {
        this.targetDurationSeconds = seconds;
        $(this).trigger('change');
    }

    /**
     * @return {string[]}
     */
    getAllowedTroopTypes() {
        return this._sendableTroopTypes.filter(troopType => this.troops[troopType].maySend);
    }

    isTroopTypeAllowed(troopType) {
        return this.troops[troopType].maySend;
    }

    setTroopAllowed(troopType, isAllowed) {
        this.troops[troopType].maySend = isAllowed;
        $(this).trigger('change');
    }

    /**
     * @return TroopCounts
     */
    getReservedTroopCounts() {
        let troopCounts = new TroopCounts();
        for (let troopType of this._sendableTroopTypes) {
            troopCounts[troopType] = this.troops[troopType].reserved;
        }
        return troopCounts;
    }

    getReservedCount(troopType) {
        return this.troops[troopType].reserved;
    }

    setReservedCount(troopType, count) {
        this.troops[troopType].reserved = count;
        $(this).trigger('change');
    }

    setTroopOrder(troopOrder) {
        this.troopOrder = troopOrder;
        $(this).trigger('change');
    }

    export() {
        return {
            mode: this.mode,
            allowedOptionIds: [...this.allowedOptionIds.values()],
            targetDurationSeconds: this.targetDurationSeconds,
            troops: this.troops,
            troopOrder: this.troopOrder
        }
    }

    import(exported) {
        this.mode = exported.mode;
        this.allowedOptionIds = new Set(exported.allowedOptionIds);
        this.targetDurationSeconds = exported.targetDurationSeconds;
        this.troops = exported.troops;
        this.troopOrder = exported.troopOrder;
    }

}

ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON = 'sane_person';
ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_ADDICT = 'addict';


// CONCATENATED MODULE: ./src/Models/ScavengeTroopsAssigner.js



class ScavengeTroopsAssigner_ScavengeTroopsAssigner {

    /**
     * @param {Map<number, ScavengeOption>} options 
     * @param {string[]} sendableTroopsTypes
     * @param troopUtil
     */
    constructor(options, sendableTroopTypes, troopUtil) {
        this.options = options;
        this.sendableTroopTypes = sendableTroopTypes;
        this.troopUtil = troopUtil;
        this.preferences = new ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences(sendableTroopTypes);
    }

    /**
     * @return TroopCounts
     */
    adjustAvailableTroopCounts(availableTroopCounts) {
        return availableTroopCounts
            .filter(this.preferences.getAllowedTroopTypes())
            .subtract(this.preferences.getReservedTroopCounts())
            .zeroNegatives();
    }

    /**
     * @param {int[]} usableOptionIds 
     */
    adjustUsableOptionIds(usableOptionIds) {
        return usableOptionIds.filter(optionId => this.preferences.isOptionAllowed(optionId));
    }

    /**
     * @param {TroopCounts} availableTroopCounts 
     */
    areTroopsSufficient(availableTroopCounts) {
        availableTroopCounts = this.adjustAvailableTroopCounts(availableTroopCounts);
        return availableTroopCounts.populationUsed() >= 10;
    }

    /**
     * @param {int[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts
     * @param {float} haulFactor
     */
    assignTroops(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        usableOptionIds = this.adjustUsableOptionIds(usableOptionIds);
        availableTroopCounts = this.adjustAvailableTroopCounts(availableTroopCounts);

        if (this.preferences.mode === ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_ADDICT) {
            return this.assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor);
        }
        return this.assignTroopsForSanePerson(usableOptionIds, availableTroopCounts, haulFactor);
    }

    /**
     * @param {number[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts 
     * @param {float} haulFactor
     * @return {Map<number, TroopCounts>}
     */
    assignTroopsForSanePerson(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        let assignedCountsByOption = new Map();
        let optionIds = [...this.options.keys()].reverse();

        for (let optionId of optionIds) {
            let assignedCounts;
            if (usableOptionIds.includes(optionId)) {
                let option = this.options.get(optionId);
                let targetCapacity = option.calcTargetCapacity(this.preferences.targetDurationSeconds);
                assignedCounts = this.chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor);
            } else {
                assignedCounts = new TroopCounts();
            }            
            assignedCountsByOption.set(optionId, assignedCounts);
            availableTroopCounts = availableTroopCounts.subtract(assignedCounts);
        }

        return assignedCountsByOption;
    }

    /**
     * @param {number[]} usableOptionIds 
     * @param {TroopCounts} availableTroopCounts 
     * @param {float} haulFactor
     * @return {Map<number, TroopCounts>}
     */
    assignTroopsForAddict(usableOptionIds, availableTroopCounts, haulFactor = 1.0) {
        let assignedCountsByOption = new Map();
        let optionIds = [...this.options.keys()].reverse();

        let availableCapacity = availableTroopCounts.carryCapacity() * haulFactor;
        let targetDurationSeconds = this.preferences.targetDurationSeconds;

        let targetCapacitySum = 0;
        let inverseLootFactors = {};
        let inverseLootFactorSum = 0;

        for (let optionId of optionIds) {
            if (!usableOptionIds.includes(optionId)) {
                continue;
            }
            let option = this.options.get(optionId);
            inverseLootFactors[optionId] = 1 / option.getLootFactor()
            inverseLootFactorSum += inverseLootFactors[optionId];
            targetCapacitySum += option.calcTargetCapacity(targetDurationSeconds);
        }

        let portionAvailableTroopsOverall = Math.min(1, targetCapacitySum / availableCapacity);

        for (let optionId of optionIds) {
            let assignedCounts;
            if (usableOptionIds.includes(optionId)) {
                let portionOfOptionFactors = inverseLootFactors[optionId] / inverseLootFactorSum;
                let portionAvailableTroopsForOption = portionAvailableTroopsOverall * portionOfOptionFactors;
                let targetCapacity = portionAvailableTroopsForOption * availableCapacity;
                assignedCounts = this.chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor);
            } else {
                assignedCounts = new TroopCounts();
            }            
            assignedCountsByOption.set(optionId, assignedCounts);
            availableTroopCounts = availableTroopCounts.subtract(assignedCounts);
        }

        return assignedCountsByOption;
    }

    chunkTroopsToHaul(targetCapacity, availableTroopCounts, haulFactor = 1.0) {
        let assignedTroopCounts = new TroopCounts();
        let capacities = {};
        for (let chunk of this.preferences.troopOrder) {            
            if (targetCapacity < 0) {
                break;
            }

            let availableCapacity = 0;
            for (let troopType of chunk) {
                let troopCount = availableTroopCounts[troopType];
                capacities[troopType] = this.troopUtil.carryCapacity(troopType, haulFactor);
                availableCapacity += troopCount * capacities[troopType];
            }
            let chunkRatio = Math.min(1, targetCapacity / availableCapacity);

            for (let troopType of chunk) {
                let troopCount = availableTroopCounts[troopType];                
                assignedTroopCounts[troopType] = Math.floor(troopCount * chunkRatio);
                targetCapacity -= assignedTroopCounts[troopType] * capacities[troopType];
            }

            if (targetCapacity > 0) {
                this.troopsToTopOff(targetCapacity, availableTroopCounts, assignedTroopCounts, chunk, capacities)
                    .each(function(troopType, count) {
                        targetCapacity -= count * (capacities[troopType] || 0);
                        assignedTroopCounts[troopType] += count;
                    });
            }

        }
        return assignedTroopCounts;
    }

    /**
     * @param {int} targetCapacity 
     * @param {TroopCounts} availableTroopCounts 
     * @param {TroopCounts} assignedTroopCounts 
     * @param {string[]} troopTypes
     * @return {TroopCounts}
     */
    troopsToTopOff(targetCapacity, availableTroopCounts, assignedTroopCounts, troopTypes, capacities) {
        let extraCounts = new TroopCounts();

        while (targetCapacity > 0) {
            let unassignedExists = false;
            let closestType = null;
            let smallestDiff = Number.MAX_SAFE_INTEGER;
            
            for (let troopType of troopTypes) {
                if (availableTroopCounts[troopType] > assignedTroopCounts[troopType] + extraCounts[troopType]) {
                    unassignedExists = true;

                    let diff = Math.abs(targetCapacity - capacities[troopType]);
                    if (diff < smallestDiff) {
                        smallestDiff = diff;
                        closestType = troopType;
                    }
                }
            }

            if (!unassignedExists) {
                break;
            }

            if (targetCapacity < Math.abs(targetCapacity - capacities[closestType])) {
                // adding more troops would put us farther from the target than we already are
                break;
            }
            extraCounts[closestType] += 1;
            targetCapacity -= capacities[closestType];
        }

        return extraCounts;
    }

}



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


// CONCATENATED MODULE: ./src/Widget/ScavengePreferencesWidget.js







class ScavengePreferencesWidget_ScavengePreferencesWidget extends AbstractWidget {

    /**
     * @param {ScavengeTroopsAssignerPreferences} preferences
     * @param {Map<ScavengeOption>} scavengeOptions
     * @param {string[]} sendableTroopTypes
     */
    constructor(preferences, scavengeOptions, sendableTroopTypes) {
        super();
        this.preferences = preferences;
        this.scavengeOptions = scavengeOptions;
        this.sendableTroopTypes = sendableTroopTypes;
        this.initStructure();
        this.initTroopOrder();
        this.watchSelf();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$targetDuration = this.$el.find('.target-duration');
        this.$options = this.$el.find('.options-section input');
        this.$modes = this.$el.find(`input[name='mode']`);
        this.$troopsAllowed = this.$el.find('.troop-allowed');
        this.$troopsReserved = this.$el.find('.troop-reserved');
        this.$troopGroups = this.$el.find('.troop-group');
    }

    createHtml() {
        return `<div class="twcheese-scavenge-preferences-widget">
            <h3>Preferences</h3>
            ${this.createTimingSectionHtml()}
            <br/>
            ${this.createOptionsSectionHtml()}
            <br/>
            <table style="width: 100%;">
                <tr>
                    <td>${this.createTroopsSectionHtml()}</td>
                    <td style="width: 20px;"></td>
                    <td>${this.createTroopsOrderSectionHtml()}</td>
                </tr>
            </table>
        </div>`;
    }

    createTimingSectionHtml() {
        let overallSeconds = this.preferences.targetDurationSeconds;
        let hours = Math.floor(overallSeconds / 3600);
        let minutes = String(Math.floor(overallSeconds / 60) % 60).padStart(2, '0');
        let durationPattern = "\\d+:\\d{2}";

        let mode = this.preferences.mode;
        let modeSane = ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON;
        let modeAddict = ScavengeTroopsAssignerPreferences_ScavengeTroopsAssignerPreferences.MODE_ADDICT;        
        let checkSane = (mode === modeSane) ? 'checked' : '';
        let checkAddict = (mode === modeAddict) ? 'checked' : '';

        return `
            <table class="vis timing-section">
                <tr><th>Timing</th></tr>
                <tr>
                    <td>
                        Target duration:
                        <input type="text" class="target-duration" value="${hours}:${minutes}" placeholder="2:00" required pattern="${durationPattern}">
                        hours:minutes
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input type="radio" name="mode" value="${modeSane}" ${checkSane}>
                            Max-out duration of best options first.
                            <br/><span class="hint">(recommended if you'll be afk)</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input type="radio" name="mode" value="${modeAddict}" ${checkAddict}>
                            Aim for same duration across all options.
                            <br/><span class="hint">(recommended if you can immediately resend whenever)</span>
                        </label>    
                    </td>
                </tr>
            </table>
        `;
    }

    createOptionsSectionHtml() {
        let optionsArr = [...this.scavengeOptions.values()];

        return `
            <table class="vis options-section">
                <tr><th colspan="2">Options to use</th></tr>
                ${optionsArr.map(option => this.createOptionRowHtml(option)).join('')}
            </table>
        `;
    }

    createOptionRowHtml(option) {
        let checked = '';
        if (this.preferences.isOptionAllowed(option.id)) {
            checked = 'checked';
        }

        return `<tr>
            <td>
                <label>
                    <input type="checkbox" ${checked} data-option-id="${option.id}">
                    <img src="${ImageSrc.scavengeOption(option.id)}">
                    <span>${option.getName()}</span>
                </label>
            </td>
            <td>(${option.getLootPercent()}% carry capacity)</td>
        </tr>`;
    }

    createTroopsSectionHtml() {
        let helpTooltip = [
            `Reserved troops won't be sent scavenging.`,
            `<br/>`,
            `<br/>Example:`,
            ` :: You have 500 spears and 100 are reserved. At most, 400 spears would be sent scavenging.`
        ].join('');

        return `
            <table class="vis troops-section">
                <tr>
                    <th>Use</th>
                    <th>Reserved <img src="${ImageSrc.info}" title="${helpTooltip}" class="tooltip info"></th>
                </tr>
                ${this.sendableTroopTypes.map(type => this.createTroopRowHtml(type)).join('')}
            </table>
        `;
    }

    createTroopRowHtml(troopType) {
        let checked = this.preferences.isTroopTypeAllowed(troopType) ? 'checked' : '';
        let reservedCount = this.preferences.getReservedCount(troopType);
        
        return `<tr>
            <td>
                <input class="troop-allowed" type="checkbox" value="${troopType}" ${checked}>
                <img src="${ImageSrc.troopIcon(troopType)}">
            </td>
            <td><input class="troop-reserved" data-troop-type="${troopType}" type="number" min="0" value="${reservedCount}"></td>
        </tr>`;
    }

    createTroopsOrderSectionHtml() {
        let helpTooltip = [
            `Troops in upper groups will be sent before troops in lower groups.`,
            `<br/>`,
            `<br/>Troops within the same group will be split proportionally by count available.`
        ].join('');

        return `
            <table class="vis troop-order-section">
                <tr>
                    <th>Order <img src="${ImageSrc.info}" title="${helpTooltip}" class="tooltip info"></th>
                </tr>
                ${this.sendableTroopTypes.map(() => '<tr><td><div class="troop-group"></div></td></tr>').join('')}
            </table>
        `;
    }

    initTroopOrder() {
        for (let [i, chunk] of Object.entries(this.preferences.troopOrder)) {
            let $group = this.$troopGroups.eq(i);
            for (let troopType of chunk) {
                if (!Troops_troopUtil.existsOnWorld(troopType)) { // todo: this is dirty. the preferences shouldn't be initialized with invalid troop types
                    continue;
                }
                let $troopType = $(`<img class="troop" draggable="true" data-troop-type="${troopType}" src="${ImageSrc.troopIcon(troopType)}">`);
                $group.append($troopType);
            }
        }

        let $draggingTroop;

        this.$troopGroups
            .on('dragover', function(e) {
                e.preventDefault(); // allows dropping
            })
            .on('dragenter', function(e) {
                $(this).addClass('dragging-over');
            })
            .on('dragleave', function(e) {
                $(this).removeClass('dragging-over');
            })
            .on('drop', function(e) {
                e.preventDefault();
                $(this).append($draggingTroop);
                $(this).removeClass('dragging-over');
                updateTroopOrderPreferences();
            });

        this.$troopGroups.find('.troop')
            .on('dragstart', function(e) {
                let dt = e.originalEvent.dataTransfer;
                $draggingTroop = $(this);
                dt.setDragImage($draggingTroop.clone()[0], 0, 0);
                dt.dropEffect = 'move';
                $draggingTroop.addClass('dragging');
            })
            .on('dragend', function(e) {
                $draggingTroop.removeClass('dragging');
                $draggingTroop = null;
            });

        let updateTroopOrderPreferences = () => {
            let order = determineTroopOrder();
            this.preferences.setTroopOrder(order);
        }

        let determineTroopOrder = () => {
            let chunks = [];
            this.$troopGroups.each(function() {
                let $group = $(this);
                let $troops = $group.find('.troop');
                if ($troops.length < 1) {
                    return;
                }
                let chunk = [];
                $troops.each(function() {
                    chunk.push($(this).data('troopType'));
                });
                chunks.push(chunk);
            });            
            return chunks;
        }
    }

    watchSelf() {
        let prefs = this.preferences;

        this.$targetDuration.on('change', function() {
            if (!this.checkValidity()) {
                return;
            }
            let [, hours, minutes] = this.value.match(/(\d+):(\d+)/);

            let durationSeconds = parseInt(hours)*3600 + parseInt(minutes)*60;
            if (durationSeconds < 3600) {
                this.setCustomValidity('must be at least 1 hour');
                return;
            } else {
                this.setCustomValidity('');
            }

            prefs.setTargetDuration(durationSeconds);
        });

        this.$options.on('change', function() {
            let $option = $(this);
            prefs.setOptionAllowed($option.data('optionId'), $option.prop('checked'));
        });

        this.$modes.on('change', () => {
            let mode = this.$modes.filter(':checked').val();
            prefs.setMode(mode);
        });

        this.$troopsAllowed.on('change', function() {
            let $this = $(this);
            prefs.setTroopAllowed($this.val(), $this.prop('checked'));
        });

        this.$troopsReserved.on('input', function() {
            if (!this.checkValidity()) {
                return;
            }
            let count = parseInt(this.value) || 0;
            prefs.setReservedCount(this.dataset.troopType, count);
        });
    }

}


initCss(`

    .twcheese-scavenge-preferences-widget .options-section,
    .twcheese-scavenge-preferences-widget .timing-section,
    .twcheese-scavenge-preferences-widget .troops-section,
    .twcheese-scavenge-preferences-widget .troop-order-section {
        width: 100%;
    }

    
    .twcheese-scavenge-preferences-widget .info {
        width: 14px;
        height: 14px;
        vertical-align: middle;
        position: relative;
        top: -1px;
    }

    .twcheese-scavenge-preferences-widget .target-duration {
        width: 50px;
    }

    .twcheese-scavenge-preferences-widget .timing-section .hint {
        font-size: x-small;
        margin-left: 25px;
    }

    .twcheese-scavenge-preferences-widget .timing-section input[type='radio'] {
        vertical-align: middle;
    }

    .twcheese-scavenge-preferences-widget .options-section td {
        height: 22px;
    }

    .twcheese-scavenge-preferences-widget .options-section input,
    .twcheese-scavenge-preferences-widget .options-section span {
        vertical-align: middle;
    }

    .twcheese-scavenge-preferences-widget .options-section img {
        vertical-align: middle;
        width: 18px;
        height: 18px;
    }

    .twcheese-scavenge-preferences-widget .troops-section td,
    .twcheese-scavenge-preferences-widget .troop-order-section td {
        height: 26px;
    }

    .twcheese-scavenge-preferences-widget .troops-section td:first-child {
        width: 45px;
    }   

    .twcheese-scavenge-preferences-widget .troops-section img,
    .twcheese-scavenge-preferences-widget .troops-section input {
        vertical-align: middle;
    }

    .twcheese-scavenge-preferences-widget .troop-reserved {
        width: 70px;
    }

    .twcheese-scavenge-preferences-widget .troop-group {
        position: relative;
        border: 1px solid black;
        border-radius: 3px;
        height: 18px;
        width: 176px;
        padding: 3px;
    }

    .twcheese-scavenge-preferences-widget .troop-group.dragging-over {
        background-color: darkOrange;
    }

    .twcheese-scavenge-preferences-widget .troop {
        display: inline-block;
        width: 18px;
        height: 18px;
        cursor: move;
        margin: 0 3px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .twcheese-scavenge-preferences-widget .troop.dragging {
        opacity: 0.1;
    }
    
`);


// EXTERNAL MODULE: ./src/Models/Debug/Build/ProcessFactory.js
var ProcessFactory = __webpack_require__(3);

// CONCATENATED MODULE: ./dist/tool/cfg/debug/ASS/Default.js
let processCfg = { phases: [{"type":"PhaseQuestion","internalName":"Entry","questions":[{"type":"QuestionFreeForm","ask":"What's broken?","placeholderText":"e.g. \"it doesn't focus the Start button\"","minResponseLength":10}]}] };


// CONCATENATED MODULE: ./src/ToolSetup/ASS.js











let initialized = false;
let ASS_haulFactor, troopsAssigner, scavengeOptions;

async function useTool() {
    if (!atScavengeScreen()) {
        suggestRedirectToScavengeScreen();
        return;
    }

    if (!initialized) {
        await init();
        initialized = true;
    }

    prepareBestOption();
}


async function init() {
    await ensureRemoteConfigsUpdated();

    let models = scrapeScavengeModels(document);
    troopsAssigner = new ScavengeTroopsAssigner_ScavengeTroopsAssigner(models.options, models.sendableTroopTypes, Troops_troopUtil);
    ASS_haulFactor = models.haulFactor;

    let exportedPreferences = userConfig.get('ASS.troopsAssigner');
    if (exportedPreferences) {
        troopsAssigner.preferences.import(exportedPreferences);
    }
    $(troopsAssigner.preferences).on('change', function() {
        userConfig.set('ASS.troopsAssigner', troopsAssigner.preferences.export());
    });
    scavengeOptions = models.options;
    insertPreferencesLauncher();

    insertNarcissim();

    initCss(`
        .free_send_button:focus {
            color: yellow;
            box-shadow: 0 0 5px 3px yellow;
        }
    `);

    afterScavengingStarted(() => prepareBestOption(false));
}


function atScavengeScreen() {
    let here = document.location.href;
    return here.includes('screen=place') && here.includes('mode=scavenge');
}


function suggestRedirectToScavengeScreen() {
    suggestRedirect({
        message: 'To use this, you must be at the scavenging screen.',
        screen: 'place',
        screenName: 'Scavenging Screen',
        uriParams: {
            mode: 'scavenge'
        },
        skippableId: 'Tool:ASS'
    });
}


function insertPreferencesLauncher() {
    let $launcher = $(`<a href="#">&raquo; preferences</a>`)
        .css({
            fontSize: 'small',
            marginLeft: '10px'
        })
        .on('click', function(e) {
            e.preventDefault();
            openPreferencesPopup();
        });

    $('#content_value').find('h3').eq(0).append($launcher);
}


function insertNarcissim() {
    let $narcissism = $(`<span>Script created by <a href="https://forum.tribalwars.net/index.php?members/28484">cheesasaurus</a></span>`)
        .css({
            float: 'right',
            fontSize: 'xx-small',
            fontWeight: 'normal'
        });

    $('#content_value').find('h3').eq(0).append($narcissism);
}


function openPreferencesPopup() {
    let onClose = prepareBestOption;

    Dialog.show('twcheese-scavenge-preferences-popup', function($container) {        
        let widget = new ScavengePreferencesWidget_ScavengePreferencesWidget(troopsAssigner.preferences, scavengeOptions, troopsAssigner.sendableTroopTypes);
        widget.appendTo($container);
    }, onClose);
}


function prepareBestOption(informUserOfIssues = true) {
    let usableOptionIds = scrapeUsableOptionIds(document);
    usableOptionIds = troopsAssigner.adjustUsableOptionIds(usableOptionIds);
    if (usableOptionIds.length < 1) {
        if (informUserOfIssues) {
            window.UI.ErrorMessage(`Can't scavenge right now because there's no usable options`);
        }        
        return;
    }

    let availableTroops = scrapeAvailableTroopCounts(document);
    if (!troopsAssigner.areTroopsSufficient(availableTroops)) {
        if (informUserOfIssues) {
            window.UI.ErrorMessage(`Not enough troops available to scavenge right now`);
        }
        return;
    }
    
    let assignedTroopsByOption = troopsAssigner.assignTroops(usableOptionIds, availableTroops, ASS_haulFactor);

    let optionId = usableOptionIds[usableOptionIds.length - 1];
    fillTroops(assignedTroopsByOption.get(optionId));
    focusStartButton(optionId);
}


function focusStartButton(optionId) {
    $('.free_send_button')[optionId - 1].focus();
}


function fillTroops(troopCounts) {
    troopCounts.each(function(troopType, count) {
        $(`.unitsInput[name='${troopType}']`)
            .val(count)
            .trigger('change');
    });
}


function afterScavengingStarted(doSomething) {
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let didScavengingStart = $(mutation.addedNodes).is('.active-view');
            if (didScavengingStart) {
                doSomething();
            }
        });
    });
    
    $('.scavenge-option').each(function() {
        observer.observe(this, {
            childList: true,
            subtree: true
        });
    });
}


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory["a" /* ProcessFactory */]({});

function newDebugProcess() {
    let name = 'Tool: Another Scavenging Script';
    return processFactory.create(name, processCfg, true);
}


window.TwCheese.registerTool({
    id: 'ASS',
    use: useTool,
    getDebugProcess: newDebugProcess
});

/***/ })
/******/ ]);