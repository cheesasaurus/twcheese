/*!---------------------------------------------------------------------
 * Mass Incomings Tagger
 * author Nick Toby (cheesasaurus@gmail.com)
 * 
 * ==== pages where this can be used ====
 * incoming overview (screen=overview_villages&mode=incomings)
 * 
 * ==== license ====
 * Copyright (C) 2014  Nick Toby
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 *---------------------------------------------------------------------
 *
 * Want to fix something?
 * https://github.com/cheesasaurus/twcheese
 *---------------------------------------------------------------------*/
/*! Tool setup compiled from /src/ToolSetup/MassTagIncomings.js
 *---------------------------------------------------------------------*/
(function() {
    let toolId = 'MassTagIncomings';

    if (typeof window.TwCheese === 'undefined') {

        function handleJqXhrError(reject) {
            return function(jqxhr) {
                reject(new Error(`[${jqxhr.status} ${jqxhr.statusText}] ${this.type} ${this.url}`));
            }
        }


        window.TwCheese = {
            ROOT: 'https://cheesasaurus.github.io/twcheese',
            version: '1.10-1-g972349d',
            tools: {},
            lastToolUsedId: null,

            async loadVendorLibs() {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/vendor.js`, {
                        complete: resolve,
                        error: handleJqXhrError(reject),
                        dataType: "script"
                    });
                });
            },

            async loadVendorLibsMinified(cacheBuster) {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/vendor.min.js?${cacheBuster}`, {
                        cache: true,
                        complete: resolve,
                        error: handleJqXhrError(reject),
                        dataType: "script"
                    });
                });
            },

            async loadTool(toolId) {
                return new Promise((resolve) => {
                    let module = document.createElement('script');
                    module.type = 'module';
                    module.onload = resolve;
                    module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
                    document.head.appendChild(module);
                });
            },

            async loadToolCompiled(toolId, cacheBuster) {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/tool/setup-only/${toolId}.min.js?${cacheBuster}`, {
                        cache: true,
                        complete: resolve,
                        error: handleJqXhrError(reject),
                        dataType: "script"
                    });
                });
            },

            hasTool(toolId) {
                return typeof this.tools[toolId] !== 'undefined';
            },

            registerTool(tool) {
                this.tools[tool.id] = tool;
            },

            useTool(toolId) {
                this.lastToolUsedId = toolId;
                this.tools[toolId].use();
            },

            tryUseTool(toolId) {
                if (!this.hasTool(toolId)) {
                    return false;
                }
                this.useTool(toolId);
                return true;
            },

            newDebugProcess(toolId) {
                if (!this.hasTool(toolId)) {
                    return null;
                }
                return this.tools[toolId].getDebugProcess();
            }

        };

                // init libs to window
        (function() {
            // thwart environment sniffing
            let define, exports, module;
        
            /*!
             * this is just an example of a library
             */
            (function(root, factory) {
                if (typeof define === 'function' && define.amd) {
                    throw new Error('unwanted: AMD module instead of window');
                } else if (typeof exports === 'object') {
                    throw new Error('unwanted: CommonJS module instead of window');
                } else if (typeof module === 'object' && module.exports) {
                    throw new Error('unwanted: Node module instead of window');
                } else {
                    root.twcheeseExampleLib = factory();
                }
            })(this, function() {
                return {
                    nice: () => 69
                };
            });
        
        }).call(window);
    }

    if (!TwCheese.hasTool(toolId)) {
        let sidebarInitd = TwCheese.hasTool('Sidebar');

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
        /******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionTypes; });
        const QuestionTypes = {
            VALUE: 'value',
            FREE_FORM: 'free_form',
            SELECT: 'select'
        };
        
        
        
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
        /* 4 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessFactory; });
        /* harmony import */ var _twcheese_src_Models_Debug_DebugProcess_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
        /* harmony import */ var _twcheese_src_Models_Debug_Build_PhaseFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
        /* harmony import */ var _twcheese_src_Models_Debug_BugReporter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
        /* harmony import */ var _twcheese_src_Models_Debug_PhaseReport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
        
        
        
        
        
        
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
        /* 5 */
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
        /* 6 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseReport; });
        /* harmony import */ var _twcheese_src_Models_Debug_Phase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
        /* 7 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        
        // EXTERNAL MODULE: ./src/Models/Debug/Phase.js
        var Phase = __webpack_require__(3);
        
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
        
        
        
        
        // EXTERNAL MODULE: ./src/Models/Debug/QuestionTypes.js
        var QuestionTypes = __webpack_require__(1);
        
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
                return QuestionTypes["a" /* QuestionTypes */].SELECT;
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
                return QuestionTypes["a" /* QuestionTypes */].FREE_FORM;
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
                return QuestionTypes["a" /* QuestionTypes */].VALUE;
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
        /* 8 */
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
        /* 9 */
        /***/ (function(module, exports, __webpack_require__) {
        
        __webpack_require__(11);
        module.exports = __webpack_require__(10);
        
        
        /***/ }),
        /* 10 */
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
        
        
        
        // EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
        var DebugEvents = __webpack_require__(0);
        
        // EXTERNAL MODULE: ./src/Models/Debug/PhaseTypes.js
        var PhaseTypes = __webpack_require__(2);
        
        // EXTERNAL MODULE: ./src/Models/Debug/QuestionTypes.js
        var QuestionTypes = __webpack_require__(1);
        
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
                    case QuestionTypes["a" /* QuestionTypes */].FREE_FORM:
                        return this._createHtmlQuestionFreeForm();
                    case QuestionTypes["a" /* QuestionTypes */].VALUE:
                        return this._createHtmlQuestionAboutValue(options);
                    case QuestionTypes["a" /* QuestionTypes */].SELECT:
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
                if (this.question.getType() === QuestionTypes["a" /* QuestionTypes */].FREE_FORM) {
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
                $(this.phase).on(DebugEvents["a" /* DebugEvents */].BUG_REPORT_SUCCEEDED, e => {
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
                
                $(process).on(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_READY, () => {
                    if (this.process.hasNextPhase()) {
                        this.$next.show();
                    }
                });
                $(process).on(DebugEvents["a" /* DebugEvents */].PHASE_COMPLETION_NOT_READY, () => {
                    this.$next.hide();
                });
                $(process).on(DebugEvents["a" /* DebugEvents */].PHASE_CHANGED, () => {
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
                    case PhaseTypes["a" /* PhaseTypes */].QUESTION:   this._renderPhaseQuestion(phase);   break;
                    case PhaseTypes["a" /* PhaseTypes */].ATTEMPT:    this._renderPhaseAttempt(phase);    break;
                    case PhaseTypes["a" /* PhaseTypes */].REPORT:     this._renderPhaseReport(phase);     break;
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
        
        
        /***/ }),
        /* 11 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        
        // EXTERNAL MODULE: ./src/Models/Debug/Build/ProcessFactory.js
        var ProcessFactory = __webpack_require__(4);
        
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

        if (!sidebarInitd) {
            TwCheese.useTool('Sidebar');
        }
    }

    TwCheese.useTool(toolId);
})();