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

// EXTERNAL MODULE: ./src/Models/Debug/Build/ProcessFactory.js
var ProcessFactory = __webpack_require__(3);

// CONCATENATED MODULE: ./dist/tool/cfg/debug/MassTagIncomings/Default.js
let processCfg = { phases: [{"type":"PhaseQuestion","internalName":"Entry","questions":[{"type":"QuestionFreeForm","ask":"What's broken?","placeholderText":"e.g. \"nothing gets renamed\"","minResponseLength":10}]}] };


// CONCATENATED MODULE: ./src/ToolSetup/MassTagIncomings.js



if(!twcheese)
	var twcheese={};

twcheese.MassTag = {
	widget: {},
	format: '',
	config: {
		options: [
			{
				name:'unit',
				description:'The estimated slowest unit speed',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'coords',
				description:'The coordinates of village sending troops',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'player',
				description:'The player sending troops',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'duration',
				description:'The duration of the attack',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'distance',
				description:'The distance (fields) between villages',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'return',
				description:'The estimated date and time the troops return',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'sent',
				description:'The estimated date and time the troops were sent',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'arrival',
				description:'The arrival date and time',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'origin',
				description:'sending village: name (xxx|yyy) KYX',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'destination',
				description:'target village: name (xxx|yyy) KYX',
				defaultLabel:' ',
				enabled: false
			}
		]	
	},		
	
	init: function () {
		this.loadConfig();
		this.widget = this.createWidget();
		this.preview();
	},

	createWidget: function () {
		console.log('opening config widget');
		
		var widget = document.createElement('div');
		widget.id = 'twcheese_tag_config_container';
		widget.style.display = 'block';
		widget.style.position = 'fixed';
		widget.style.zIndex = 13000;
		widget.style.top = '60px'; //below top menu
		widget.style.left = '50%';
		widget.style.width = '600px';
		widget.style.marginLeft = '-300px';
		widget.style.borderStyle = 'solid';
		widget.style.borderWidth = '1px';
		widget.style.borderRadius = '8px 8px 4px 4px';
		widget.style.borderColor = '#804000 #603000 #402000 #804000';
		widget.style.backgroundColor = '#f7eed3';		
		
			/*==== title bar ====*/				
				var title_bar = document.createElement('div');
				title_bar.style.backgroundColor = '#dfcca6';
				title_bar.style.borderRadius = '8px 8px 0px 0px';
				title_bar.style.cursor = 'move';
				
				/*==== title ====*/
				var title = document.createElement('span');
				title.innerHTML = 'Configure Label';
				title.style.fontWeight = 700;
				title.style.fontSize = '14px';
				title.marginLeft = '10px';
				title_bar.appendChild(title);
				
				twcheese.style.popupTitleBar(title_bar, function(){
					twcheese.MassTag.closeWidget();
				});
				
				/*==== narcissism ====*/
				var contactEle = document.createElement('span');
				contactEle.innerHTML = ' created by <a href="http://forum.tribalwars.net/member.php?u=28484">cheesasaurus</a>';
				contactEle.style.fontSize = '10px';
				contactEle.style.cssFloat = 'right';
				contactEle.style.marginRight = '5px';
				title_bar.appendChild(contactEle);
				
			widget.appendChild(title_bar);
			$(widget).draggable({handle:'.twcheese_title_bar'});				
			
			var content = document.createElement('div');
			content.id = 'twcheese_tag_config';			
			
			/*==== preview ====*/
			var preview_container = document.createElement('div');
			preview_container.innerHTML = '<b>Preview: </b>';
			preview_container.style.margin = '10px';
			
				var preview = document.createElement('span');
				preview.id = 'twcheese_MassTag_preview';				
				preview.innerHTML = 'blahblahblah';			
				preview_container.appendChild(preview);
				
			content.appendChild(preview_container);			
			
			/*==== config ====*/
			var options = this.config.options;			
			var optionsTable = document.createElement('table');
			optionsTable.style.marginLeft = '10px';
			optionsTable.style.width = '580px';
			optionsTable.id = 'twcheese_config_table';
			
			for(var i=0; i<twcheese.MassTag.config.options.length; i++)
			{
				optionsTable.insertRow(-1);
				optionsTable.rows[i].optionData = options[i];
				optionsTable.rows[i].insertCell(-1);
				optionsTable.className = 'vis';
				
				/*==== checkbox ====*/
				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.checked = options[i].enabled;
				checkbox.onchange = function() {
					twcheese.MassTag.preview();
					this.parentNode.parentNode.optionData.enabled = this.checked;
					twcheese.MassTag.saveConfig();
				};
				optionsTable.rows[i].cells[0].appendChild(checkbox);
				
				/*==== custom text ====*/
				optionsTable.rows[i].insertCell(-1);
				var label = document.createElement('input');
				label.type = 'text';
				label.size = 10;
				if(options[i].label != null)
					label.value = options[i].label;
				else
					label.value = options[i].defaultLabel;
				label.onkeyup = function(){					
					twcheese.MassTag.preview();
					if (!this.value) {
						this.parentNode.parentNode.optionData.label = '';
					} else {
						this.parentNode.parentNode.optionData.label = this.value;	
					}									
					twcheese.MassTag.saveConfig();
				};
				optionsTable.rows[i].cells[1].appendChild(label);
				
				/*==== short name ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[2].innerHTML = options[i].name;
				
				/*==== description ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[3].innerHTML = options[i].description;
				
				/*==== handles ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[4].innerHTML = '<div style="width: 11px; height:11px; background-image: url(' + image_base + 'sorthandle.png); cursor:move" class="qbhandle" title="drag to re-order"> </div>';
			}
			content.appendChild(optionsTable);
			
			/*==== buttons ====*/
			var button_container = document.createElement('div');
			button_container.style = 'text-align:center; margin:10px;';
				/*==== label button ====*/
				var label_button = document.createElement('a');
				label_button.className = 'btn';
				label_button.style.marginRight = '5px';
				label_button.innerHTML = 'Label';
				label_button.onclick = function () {
					twcheese.MassTag.label(twcheese.MassTag.getFormat());
				};
				button_container.appendChild(label_button);
			content.appendChild(button_container);			
			
		widget.appendChild(content);			
		
		document.getElementById('content_value').appendChild(widget);
		$('#twcheese_config_table > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
		$('#twcheese_config_table > tbody').on('sortstop', function(){
			twcheese.MassTag.preview();
			twcheese.MassTag.saveConfig();
		});		
		
		return document.getElementById('twcheese_tag_config');
	},
	
	closeWidget: function () {
		$('#twcheese_tag_config_container').remove();
	},
	
	getFormat: function () {
		var format = '';
		var inputs = this.widget.getElementsByTagName('input');
		var rows = this.widget.getElementsByTagName('tr');
		for(var i=0; i<twcheese.MassTag.config.options.length; i++){
			if(inputs[i*2].checked)
			{
				format += inputs[i*2+1].value;
				format += '%'+rows[i].optionData.name+'%';
			}
		}
		return format;
	},
	
	preview: function () {
		document.getElementById('twcheese_MassTag_preview').innerHTML = this.getFormat();
	},
	
	saveConfig: function () {
		var rows = this.widget.getElementsByTagName('tr');
		var options = new Array();
		for (var i=0; i<twcheese.MassTag.config.options.length; i++) {
			options[i] = rows[i].optionData;			
		}
		
		this.config.options = options;
		
		localStorage.setItem('twcheese.MassTag.config',JSON.stringify(this.config));
		console.log('config saved');
	},
	
	loadConfig: function () {
		if (localStorage.getItem('twcheese.MassTag.config')) {
			this.config = JSON.parse(localStorage.getItem('twcheese.MassTag.config'));
			return true;
		} else {
			return false;
		}
	},
	
	label: function (format) {
		$('#select_all').click();
		$('input[name=label_format]').val(format).parents('form').find('input[name=label]').click();
	}
};

/*==== styles ====*/
if(!twcheese.style)
	twcheese.style = {};

/**
 *	@param element:HTMLElement
 *	@param topColor:String
 *	@param bottomColor:String
 */
twcheese.style.bgVertGradient = function(element, topColor, bottomColor)
{
	element.style.backgroundColor = bottomColor;
	var browser;
	if(/Chrome/.test(navigator.userAgent)|| /AppleWebKit/.test(navigator.userAgent))
		browser = 'webkit';
	else if(/Firefox/.test(navigator.userAgent))
		browser = 'moz';
	else if(window.opera)
		browser = 'o';
	else if(/MSIE/.test(navigator.userAgent))
		browser = 'ms';
	
	if(browser)
		element.style.background = '-' + browser + '-linear-gradient(top, ' + topColor + ', ' + bottomColor +')';
};
	
/**
 *	@param element:HTMLElement
 */
twcheese.style.popupTitleBar = function (element, exit_function) {
	element.className = 'twcheese_title_bar';
	twcheese.style.bgVertGradient(element, '#DEC378', '#BDA666');
	element.style.height = '22px';
	element.style.padding = '4px';
	
	/*==== exit button ====*/
	var exit_button = document.createElement('span');
	exit_button.style.backgroundImage = 'url("' + image_base + 'login_close.png")';
	exit_button.style.height = '20px';
	exit_button.style.width = '20px';
	exit_button.style.display = 'inline-block';
	exit_button.style.cssFloat = 'right';
	exit_button.style.cursor = 'pointer';
	exit_button.onclick = exit_function;
	element.appendChild(exit_button);
};


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory["a" /* ProcessFactory */]({});


window.TwCheese.registerTool({
	id: 'MassTagIncomings',
	
    use() {
		if (game_data.screen == 'overview_villages' && game_data.mode == 'incomings') {
			twcheese.MassTag.init();
		} else {
			UI.InfoMessage('Going to Incoming overview ...', 3000, 'success');
			document.location = game_data.link_base_pure + 'overview_villages&mode=incomings';
		}
	},

    getDebugProcess() {
		let name = 'Tool: Mass Tag Incomings';
		return processFactory.create(name, processCfg, true);
	}

});

/***/ })
/******/ ]);