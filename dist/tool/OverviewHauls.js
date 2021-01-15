/*!---------------------------------------------------------------------
 * Commands Overview - show returning hauls
 * market: uk, us, en, {all}
 * author Nick Toby (cheesasaurus@gmail.com)
 * 
 * use script on: game.php?screen=overview_villages&mode=commands&type=return (the commands overview, with the return filter on)
 * effect: includes 'haul' as part of the information for the listed commands. Also shows statistics about the incoming resources
 *  
 * Copyright (C) 2011  Nick Toby
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
/*! Tool setup compiled from /src/ToolSetup/OverviewHauls.js
 *---------------------------------------------------------------------*/
(function() {
    let toolId = 'OverviewHauls';

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
        /******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageSrc; });
        let game = window.image_base;
        let self = window.TwCheese.ROOT + '/assets/images/';
        
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
            calendar: self + 'calendar.png',
            sidebarMain: self + 'sidebar/gear.png',
            sidebarBug: self + 'sidebar/bug.png',
            sidebarGithub: self + 'sidebar/github.png',
            jq: {
                blue: self + 'jquery/ui-icons_2e83ff_256x240.png',
                black: self + 'jquery/ui-icons_222222_256x240.png',
                darkGrey: self + 'jquery/ui-icons_454545_256x240.png',
                grey: self + 'jquery/ui-icons_888888_256x240.png',
                red: self + 'jquery/ui-icons_cd0a0a_256x240.png'
            },
            legacy: {
                helpBackground: self + 'legacy/help_background.png',
                helpBackgroundBright: self + 'legacy/help_background_highlight.png'
            },    
            buildingIcon: buildingType => game + `buildings/${buildingType}.png`,
            troopIcon: troopType => game + `unit/unit_${troopType}.png`,
            dotIcon: color => game + `dots/${color}.png`,
            scavengeOption: optionId => game + `scavenging/options/${optionId}.png`,
        };
        
        
        
        
        /***/ }),
        /* 2 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return escapeHtml; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return initCss; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fadeGameContent; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fadeGameContentExcept; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return unfadeGameContent; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mousetrap; });
        /* harmony import */ var _twcheese_conf_ImageSrc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        
        
        
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
                border-image: url(${_twcheese_conf_ImageSrc_js__WEBPACK_IMPORTED_MODULE_0__[/* ImageSrc */ "a"].popupBorder}) 19 19 19 19 repeat;
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
        
        
        
        
        /***/ }),
        /* 3 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractWidget; });
        
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
        
        
        
        /***/ }),
        /* 4 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionTypes; });
        const QuestionTypes = {
            VALUE: 'value',
            FREE_FORM: 'free_form',
            SELECT: 'select'
        };
        
        
        
        /***/ }),
        /* 5 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseTypes; });
        const PhaseTypes = {
            ATTEMPT: 'attempt',
            QUESTION: 'question',
            REPORT: 'report'
        };
        
        
        
        /***/ }),
        /* 6 */
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
        /* 7 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessFactory; });
        /* harmony import */ var _twcheese_src_Models_Debug_DebugProcess_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
        /* harmony import */ var _twcheese_src_Models_Debug_Build_PhaseFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
        /* harmony import */ var _twcheese_src_Models_Debug_BugReporter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
        /* harmony import */ var _twcheese_src_Models_Debug_PhaseReport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
        
        
        
        
        
        
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
        /* 8 */
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
        /* 9 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaseReport; });
        /* harmony import */ var _twcheese_src_Models_Debug_Phase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
        /* harmony import */ var _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
        /* harmony import */ var _twcheese_src_Models_Debug_PhaseTypes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
        
        
        
        
        
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
        /* 10 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        
        // EXTERNAL MODULE: ./src/Models/Debug/Phase.js
        var Phase = __webpack_require__(6);
        
        // EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
        var DebugEvents = __webpack_require__(0);
        
        // EXTERNAL MODULE: ./src/Models/Debug/PhaseTypes.js
        var PhaseTypes = __webpack_require__(5);
        
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
        var QuestionTypes = __webpack_require__(4);
        
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
        /* 11 */
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
        /* 12 */
        /***/ (function(module, exports, __webpack_require__) {
        
        __webpack_require__(13);
        module.exports = __webpack_require__(14);
        
        
        /***/ }),
        /* 13 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        
        // CONCATENATED MODULE: ./src/Scrape/pagination.js
        function scrapePageNumber() {
            let currentPage = $('#paged_view_content').children('table:eq(0)').find('strong').html();
            if (currentPage && !currentPage.includes('all')) {
                return parseInt(currentPage.match(/\d+/)[0]);
            }
            return null;
        };
        
        
        // EXTERNAL MODULE: ./src/Widget/AbstractWidget.js
        var AbstractWidget = __webpack_require__(3);
        
        // EXTERNAL MODULE: ./conf/ImageSrc.js
        var ImageSrc = __webpack_require__(1);
        
        // CONCATENATED MODULE: ./src/Models/TwCheeseDate.js
        
        
        let serverOffsetFromUtc = window.server_utc_diff * 1000;
        let localOffsetFromUtc = new Date().getTimezoneOffset() * 60000;
        
        let pretendServerIsUTC = function(cheeseDate) {
            return cheeseDate.addMilliseconds(serverOffsetFromUtc)
        }
        
        
        class TwCheeseDate_TwCheeseDate extends Date {
            constructor() {
                if (arguments.length === 0) {
                    super(window.Timing.getCurrentServerTime());
                } else {
                    super(...arguments);
                }
            }
        
            clone() {
                return new TwCheeseDate_TwCheeseDate(this.getTime());
            }
        
            addDays(days) {
                let ret = this.clone();
                ret.setUTCDate(this.getUTCDate() + days);
                return ret;
            }
        
            addHours(hours) {
                let ret = this.clone();
                ret.setUTCHours(this.getUTCHours() + hours);
                return ret;
            }
        
            addMinutes(minutes) {
                let ret = this.clone();
                ret.setUTCMinutes(this.getUTCMinutes() + minutes);
                return ret;
            }
        
            addSeconds(seconds) {
                let ret = this.clone();
                ret.setUTCSeconds(this.getUTCSeconds() + seconds);
                return ret;
            }
        
            addMilliseconds(milliseconds) {
                let ret = this.clone();
                ret.setUTCMilliseconds(this.getUTCMilliseconds() + milliseconds);
                return ret;
            }
        
            subDays(days) {
                return this.addDays(-days);        
            }
        
            subHours(hours) {
                return this.addHours(-hours);
            }
        
            subMinutes(minutes) {
                return this.addMinutes(-minutes);
            }
        
            subSeconds(seconds) {
                return this.addSeconds(-seconds);
            }
        
            subMilliseconds(milliseconds) {
                return this.addMilliseconds(-milliseconds);
            }
        
            getServerYear() {
                return pretendServerIsUTC(this).getUTCFullYear();
            }
        
            getServerMonth() {
                return pretendServerIsUTC(this).getUTCMonth();
            }
        
            getServerDate() {
                return pretendServerIsUTC(this).getUTCDate();
            }
        
            getServerHours() {
                return pretendServerIsUTC(this).getUTCHours();
            }
        
            getServerHours() {
                return pretendServerIsUTC(this).getUTCHours();
            }
        
            getServerMinutes() {
                return pretendServerIsUTC(this).getUTCMinutes();
            }
        
            getServerSeconds() {
                return pretendServerIsUTC(this).getUTCSeconds();
            }
        
            getServerMilliseconds() {
                return pretendServerIsUTC(this).getUTCMilliseconds();
            }
        
            isTodayOnServer() {
                let date = pretendServerIsUTC(this);
                let now = pretendServerIsUTC(new TwCheeseDate_TwCheeseDate());
                return date.isSameDayInUtc(now);
            }
        
            isTomorrowOnServer() {
                let date = pretendServerIsUTC(this);
                let now = pretendServerIsUTC(new TwCheeseDate_TwCheeseDate());
                let tomorrow = now.addDays(1);    
                return date.isSameDayInUtc(tomorrow);
            }
        
            isSameDayInUtc(otherDate) {
                return this.getUTCFullYear() === otherDate.getUTCFullYear()
                    && this.getUTCMonth() === otherDate.getUTCMonth()
                    && this.getUTCDate() === otherDate.getUTCDate();
            }
        
            startOfHour() {
                let ret = this.clone();
                ret.setUTCMinutes(0);
                ret.setUTCSeconds(0);
                ret.setUTCMilliseconds(0);
                return ret;
            }
        
            endOfHour() {
                let ret = this.clone();
                ret.setUTCMinutes(59);
                ret.setUTCSeconds(59);
                ret.setUTCMilliseconds(999);
                return ret;
            }
        
            startOfSecond() {
                let ret = this.clone();
                ret.setUTCMilliseconds(0);
                return ret;
            }
        
            equals(date) {
                return this.getTime() === date.getTime();
            }
        
            toHtml(includeMillis = true) {
                let d = pretendServerIsUTC(this);
                let year = d.getUTCFullYear();
                let monthName = d.toLocaleString('default', {month: 'short'});
                let day = d.getUTCDate().toString().padStart(2, '0');
                let hours = d.getUTCHours().toString().padStart(2, '0');
                let minutes = d.getUTCMinutes().toString().padStart(2, '0');
                let seconds = d.getUTCSeconds().toString().padStart(2, '0');
                let ms = d.getUTCMilliseconds().toString().padStart(3, '0');
        
                let html = `${monthName} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
                if (includeMillis) {
                    html += `<span class="small grey">:${ms}</span>`;
                }
                return html;
            }
        
            toDebugString() {
                let d = pretendServerIsUTC(this);
                let year = d.getUTCFullYear();
                let month = d.getUTCMonth().toString().padStart(2, '0');
                let day = d.getUTCDate().toString().padStart(2, '0');
                let hours = d.getUTCHours().toString().padStart(2, '0');
                let minutes = d.getUTCMinutes().toString().padStart(2, '0');
                let seconds = d.getUTCSeconds().toString().padStart(2, '0');
                let ms = d.getUTCMilliseconds().toString().padStart(3, '0');
                let offsetHours = Math.round(serverOffsetFromUtc / 360000) / 10;        
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms} ServerTime(UTC+${offsetHours})`;
            }
        
            imageSrc() {
                return ImageSrc["a" /* ImageSrc */].calendar;
            }
        
            /**
             * @params whatever would be passed to a Date constructor
             * @return {TwCheeseDate}
             */
            static newServerDate() {
                let ret = new TwCheeseDate_TwCheeseDate(...arguments);
                if (arguments.length > 1) {
                    ret = ret.addMilliseconds(0 - serverOffsetFromUtc - localOffsetFromUtc);
                }
                return ret;
            }
        
            static monthNumber(monthName) {
                return (new Date(monthName + ' 1 1970')).getMonth();
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Models/Resource.js
        
        
        class Resource_Resource {
            constructor(type, amount) {
                this.type = type;
                this.amount = amount;
            }
        
            valueOf() {
                return this.amount;
            }
        
            toString() {
                return this.amount;
            }
        
            toDebugString() {
                return this.amount;
            }
        
            imageSrc() {
                return ImageSrc["a" /* ImageSrc */][this.type];
            }
        
        }
        
        Resource_Resource.TYPE_TIMBER = 'wood';
        Resource_Resource.TYPE_CLAY = 'stone';
        Resource_Resource.TYPE_IRON = 'iron';
        
        
        // CONCATENATED MODULE: ./src/Models/Resources.js
        
        
        class Resources_Resources {
            constructor(woodAmount = 0, stoneAmount = 0, ironAmount = 0) {
                this.wood = new Resource_Resource(Resource_Resource.TYPE_TIMBER, woodAmount);
                this.stone = new Resource_Resource(Resource_Resource.TYPE_CLAY, stoneAmount);
                this.iron = new Resource_Resource(Resource_Resource.TYPE_IRON, ironAmount);
            }
        
            sum() {
                return this.wood + this.stone + this.iron;
            }
        
            add(other) {
                return new Resources_Resources(
                    this.wood + other.wood,
                    this.stone + other.stone,
                    this.iron + other.iron
                );
            }
        
            multiply(factor) {
                return new Resources_Resources(
                    this.wood * factor,
                    this.stone * factor,
                    this.iron * factor
                );
            }
        
            cap(maxAmount) {
                return new Resources_Resources(
                    Math.min(this.wood, maxAmount),
                    Math.min(this.stone, maxAmount),
                    Math.min(this.iron, maxAmount)
                );
            }
        
            /**
             * @param {Objecet} other 
             */
            equals(other) {
                return this.wood.valueOf() === other.wood.valueOf()
                    && this.stone.valueOf() === other.stone.valueOf()
                    && this.iron.valueOf() === other.iron.valueOf();
            }
        
            toArray() {
                return [this.wood.amount, this.stone.amount, this.iron.amount];
            }
        
        }
        
        Resources_Resources.TYPES = [Resource_Resource.TYPE_TIMBER, Resource_Resource.TYPE_CLAY, Resource_Resource.TYPE_IRON];
        
        
        // CONCATENATED MODULE: ./src/Models/Command.js
        
        
        
        class Command_Command {
            constructor() {
                this.arrival = TwCheeseDate_TwCheeseDate.newServerDate();
                this.haul = new Resources_Resources(0, 0, 0);
                this.haulCapacity = 0;
            }
        
            sumLoot() {
                return this.haul.sum();
            }
        
            calcHaulPercent() {
                if (this.haulCapacity === 0) {
                    return 0;
                }
                return Math.round(100 * this.sumLoot() / this.haulCapacity);
            }
        
            arrivesDuring(fromTime, toTime) {
                return this.arrival >= fromTime && this.arrival <= toTime;
            }
        
            /**
             * @param {Object} other 
             */
            equals(other) {
                return this.arrival.equals(other.arrival)
                    && this.haul.equals(other.haul)
                    && this.haulCapacity === other.haulCapacity;
            }
        
            static sumProps(commands) {
                let sum = new Command_Command();
        
                for (let command of commands) {
                    sum.haul = sum.haul.add(command.haul);
                    sum.haulCapacity += command.haulCapacity;
                }
                return sum;
            }
        
            static sumPropsFromTimeframe(commands, fromTime, toTime) {
                let relevantCommands = commands.filter(command => command.arrivesDuring(fromTime, toTime));
                return Command_Command.sumProps(relevantCommands);
            }
        }
        
        
        // EXTERNAL MODULE: ./src/Util/UI.js
        var UI = __webpack_require__(2);
        
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
            
        
        
        // CONCATENATED MODULE: ./src/Widget/HaulStatsWidget.js
        
        
        
        
        
        
        
        class HaulStatsWidget_HaulStatsWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {Command[]} commands 
             * @param {int|null} pageNumber 
             */
            constructor(commands, pageNumber) {
                super();
                this.commands = commands;
                this.pageNumber = pageNumber;
        
                this.initStructure();
                this.watchSelf();
        
                this.$to.find('option').last().prop('selected', true);
                this.updateSum();
            }
        
            initStructure() {
                this.$el = $(this.createHtml().trim());
                this.$from = this.$el.find('#twcheese_pillaging_stats_from');
                this.$to = this.$el.find('#twcheese_pillaging_stats_to');
                this.$sum = this.$el.find('#twcheese_pillaging_results');
                this.$toggleIcon = this.$el.find('#twcheese_pillaging_stats_toggle');
                this.$content = this.$el.find('#twcheese_pillaging_stats_content');
            }
        
            createHtml() {
                let summationFromOptions = [];
                let summationToOptions = [];
                let hourlyBreakdowns = [];
        
                let startOfHour = TwCheeseDate_TwCheeseDate.newServerDate().startOfHour();
                let latestCommandArrival;
                if (this.commands.length > 0) {
                    latestCommandArrival = this.commands[this.commands.length - 1].arrival;
                }        
            
                while (startOfHour < latestCommandArrival) {
                    let endOfHour = startOfHour.endOfHour();
                    let hourOfDay = startOfHour.getServerHours();
                    let dayHint = this.dayHint(startOfHour);
            
                    summationFromOptions.push(`<option value=${startOfHour.getTime()}>${hourOfDay}:00 ${dayHint}</option>`);
                    summationToOptions.push(`<option value="${endOfHour.getTime()}">${hourOfDay}:59 ${dayHint}</option>`);
            
                    let result = Command_Command.sumPropsFromTimeframe(this.commands, startOfHour, endOfHour);
                    hourlyBreakdowns.push(`
                        <tr>
                            <td>${hourOfDay}:00 - ${hourOfDay}:59 ${dayHint}</td>
                            <td>${result.haul.wood}</td>
                            <td>${result.haul.stone}</td>
                            <td>${result.haul.iron}</td>
                            <td>${result.sumLoot()}/${result.haulCapacity}</td>
                            <td>${result.calcHaulPercent()}%</td>
                        </tr>
                    `);
            
                    startOfHour = startOfHour.addHours(1);
                }
        
                let pageInfo = this.pageNumber ? `from Page ${this.pageNumber}` : '';
            
                let collapsed = userConfig.get('HaulStatsWidget.collapseStats', false);
                let toggleIconSrc = collapsed ? ImageSrc["a" /* ImageSrc */].plus : ImageSrc["a" /* ImageSrc */].minus;
                let contentDisplay = collapsed ? 'none' : 'block';
            
                return `
                    <div id="twcheese_pillaging_stats" class="vis widget">
                        <h4>
                            Pillaging Statistics
                            <img id="twcheese_pillaging_stats_toggle" src="${toggleIconSrc}" style="float:right; cursor: pointer;">
                            <span style="font-size: 10px; font-style: normal; font-weight: normal; margin-right: 25px; float: right;">
                                created by <a target="_blank" href="https://forum.tribalwars.net/index.php?members/28484/">cheesasaurus</a>
                            </span>
                        </h4>
                        <div id="twcheese_pillaging_stats_content" style="display: ${contentDisplay};">
                            <!-- summation -->
                            <div class="twcheese-pillaging-stats-summation">
                                <div style="text-align: center; width: 100%; margin-top: 5px; margin-bottom: 5px;">
                                    From <select id="twcheese_pillaging_stats_from">${summationFromOptions.join('')}</select>
                                    to <select id="twcheese_pillaging_stats_to">${summationToOptions.join('')}</select>
                                </div>
                                <div id="twcheese_pillaging_results" style="text-align: center;">
                                    Results displayed here...
                                </div>
                                <br/>
                            </div>
                            
                            <!-- hourly breakdown -->
                            <table class="twcheese-pillaging-stats-hourly-breakdown" width="100%">
                                <tbody>
                                    <tr><td colspan="6" style="text-align: center; font-size: 16px;">Incoming Resources ${pageInfo}</td></tr>
                                    <tr>
                                        <th>Arrival</th>
                                        <th><img src="${ImageSrc["a" /* ImageSrc */].wood}"></img></th>
                                        <th><img src="${ImageSrc["a" /* ImageSrc */].stone}"></img></th>
                                        <th><img src="${ImageSrc["a" /* ImageSrc */].iron}"></img></th>
                                        <th colspan="2">Performance</th>
                                    </tr>
                                    ${hourlyBreakdowns.join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
        
            /**
             * @param {TwCheeseDate} date
             * @return {string}
             */
            dayHint(date) {
                if (date.isTodayOnServer()) {
                    return '';
                }
                else if (date.isTomorrowOnServer()) {
                    return ' (tomorrow)';
                }
                return ' (' + date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) + ')';
            }
        
            watchSelf() {
                this.$toggleIcon.on('click', (e) => {
                    e.preventDefault();
                    this.toggleCollapse();
                });
                this.$to.on('change', (e) => this.updateSum());
                this.$from.on('change', (e) => this.updateSum());
            }
        
            /**
             *	change the results displayed in the summation section
             */
            updateSum() {
                let startTime = TwCheeseDate_TwCheeseDate.newServerDate(parseInt(this.$from.val()));
                let endTime = TwCheeseDate_TwCheeseDate.newServerDate(parseInt(this.$to.val()));
                if (startTime > endTime) {
                    tmpTime = startTime;
                    startTime = endTime;
                    endTime = tmpTime;
                }
                let sum = Command_Command.sumPropsFromTimeframe(this.commands, startTime, endTime);
        
                this.$sum.html(`
                    <img src="${ImageSrc["a" /* ImageSrc */].wood}"> ${sum.haul.wood}
                    <img src="${ImageSrc["a" /* ImageSrc */].stone}"> ${sum.haul.stone}
                    <img src="${ImageSrc["a" /* ImageSrc */].iron}"> ${sum.haul.iron}
                    &nbsp;&nbsp;| ${sum.sumLoot()}/${sum.haulCapacity} (${sum.calcHaulPercent()}%)
                `);
            }
        
            toggleCollapse() {
                let $toggleIcon = this.$toggleIcon;
        
                this.$content.toggle({
                    duration: 200,
                    start: function() {
                        let willCollapse = $toggleIcon.attr('src').includes(ImageSrc["a" /* ImageSrc */].minus);
                        $toggleIcon.attr('src', willCollapse ? ImageSrc["a" /* ImageSrc */].plus : ImageSrc["a" /* ImageSrc */].minus);
                        userConfig.set('HaulStatsWidget.collapseStats', willCollapse);
                    }
                });
            }
        
        }
        
        
        Object(UI["e" /* initCss */])(`
            .twcheese-pillaging-stats-summation {
                background-color: #f4e4bc
            }
        
            .twcheese-pillaging-stats-hourly-breakdown tr:nth-child(even) td {
                background: #FFE0A2;
            }
        `);
        
        
        
        // CONCATENATED MODULE: ./src/Models/ProgressMonitor.js
        class ProgressMonitor {
            constructor() {
                this.progress = 0;
                this.goal = 0;
                this.progressHandlers = [];
            }
        
            goalDetermined(size) {
                this.goal = size;
                this.notifyChange();
            }
        
            progressMade(size) {
                this.progress += size;
                this.notifyChange();
            }
        
            notifyChange() {
                for (let handler of this.progressHandlers) {
                    handler({progress: this.progress, goal: this.goal});
                }
            }
        
            onChange(handler) {
                this.progressHandlers.push(handler);
            }
        }
        
        
        // CONCATENATED MODULE: ./src/Prompt/promptLoadHauls.js
        
        
        
        
        
        /**
         * A prompt with a progress bar.
         * It only asks confirmation and shows progress.
         * 
         * Its the responsibility of the onConfirm callback to do any loading.
         * 
         * @param {function} onConfirm - async function, will be passsed one param: a ProgressMonitor
         */
        function promptLoadHauls(onConfirm) {
            $('body').append(popupHtml);
            Object(UI["c" /* fadeGameContent */])();
        
            let $progressBarFiller = $('#twcheese_hauls_loading_bar').find('.filler');
            let $progressText = $('#twcheese_hauls_loading_text');
            let updateProgress = function(progress, goal) {
                let percent = 100 * progress / goal;
                $progressBarFiller.css({width: `${percent}%`});
                $progressText.html(`${progress}/${goal}`);
            }
            let progressMonitor = new ProgressMonitor();
            progressMonitor.onChange((e) => updateProgress(e.progress, e.goal));
        
            $('#twcheese_hauls_prompt_confirm').on('click', async function(e) {
                e.preventDefault();
                document.getElementById('twcheese_servant_text').innerHTML = '<br/>May the cheese be with you.';
                $('#twcheese_servant_info_prompt').hide();
                $('#twcheese_servant_info_loading').show();
                
                await onConfirm(progressMonitor);
        
                $('#twcheese_showHaulsPrompt').remove();
                Object(UI["f" /* unfadeGameContent */])();
            });
        
            $('#twcheese_hauls_prompt_cancel').on('click', function(e) {
                e.preventDefault();
                $('#twcheese_showHaulsPrompt').remove();
                Object(UI["f" /* unfadeGameContent */])();
            });
        }
        
        
        let popupHtml = `
            <div id="twcheese_showHaulsPrompt" class="twcheese-popup" style="width: 500px;">
                <div style="height: 100%; width: 100%; background: url('${ImageSrc["a" /* ImageSrc */].popupBackground}')">
                    <div style="background: no-repeat url('${ImageSrc["a" /* ImageSrc */].servant}');">
                        <div id="twcheese_servant_text">
                            <p style="font-size: 16px;">My liege,</p>
                            <p>Dost thou wish hauls to be included on thine screen?</p>
                        </div>
                        <div class="quest-goal">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td id="twcheese_servant_info_prompt" class="twcheese-servant-info">
                                            <h5>Load haul information?</h5>
                                            <p>This could take a while if you have a lot of commands.</p>
                                            <div class="confirmation-buttons">
                                                <button id="twcheese_hauls_prompt_confirm" class="btn btn-confirm-yes">Yes</button>
                                                <button id="twcheese_hauls_prompt_cancel" class="btn btn-default">Cancel</button>
                                            </div>
                                        </td>
                                        <td id="twcheese_servant_info_loading" class="twcheese-servant-info" style="display: none;">
                                            <h5>Loading hauls</h5>
                                            <div style="margin-top: 10px;">
                                                <span id="twcheese_hauls_loading_bar">
                                                    <div class="filler"></div>
                                                </span>
                                                <span id="twcheese_hauls_loading_text">999/1000</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        
        Object(UI["e" /* initCss */])(`
            #twcheese_servant_text {
                box-sizing: border-box;
                height: 100px;
                margin-left: 120px;
                padding-top: 10px;
            }
            #twcheese_hauls_loading_bar {
                display: inline-block;
                border: 2px solid black;
                background-color: darkgrey;
                width: 200px;
                height: 16px;
                vertical-align: middle;
                margin-left: 60px;
            }
            #twcheese_hauls_loading_bar .filler {
                display: block;
                width: 0;
                height: 100%;
                background-color: darkorange;
                -webkit-transition-duration: 300ms;
                -mos-transition-duration: 300ms;
                -o-transition-duration: 300ms;
                transition-duration: 300ms;
            }
            #twcheese_hauls_loading_text {
                display: inline-block;
                line-height: 16px;
                vertical-align: middle;
                font-size: 10px;
                margin: 5px;
                width: 60px;
                text-align: left;
            }
            .twcheese-servant-info {
                text-align: center;
                height: 80px;
            }
        `);
        
        
        
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
        
        
        Object(UI["e" /* initCss */])(`
            .twcheese-suggest-redirect-skip-container {
                margin-top: 20px;
                font-size: 10px;
            }
        
            .twcheese-suggest-redirect-skip-container > * {
                vertical-align: middle;
            }
        `);
        
        
        
        
        
        // CONCATENATED MODULE: ./src/Prompt/twAlert.js
        
        async function twAlert(message = '', buttonText = 'Ok') {
            return new Promise(function(resolve) {    
                let buttonAcknowledge = {
                    text: buttonText,
                    callback: resolve
                };
                window.UI.ConfirmationBox(message, [buttonAcknowledge], 'twcheese_alert', true, true);
            });    
        }
        
        
        // CONCATENATED MODULE: ./src/Prompt/alertPremiumRequired.js
        
        
        async function alertPremiumRequired() {
            let message = `
                This script relies on features that are only available to <a href="game.php?screen=premium">premium account</a> users.
                <br/>
                <p style="font-size: 10px;">
                    For $999 you could buy a monitor stand.
                    <br/>Or <strong>30+ years</strong> of tw premium account!
                </p>`;
        
            let buttonText = `Do I look like I'm made out of money?`;
            return twAlert(message, buttonText);
        }
        
        
        // CONCATENATED MODULE: ./src/Scrape/time.js
        
        
        // note: some worlds have milliseconds disabled
        
        /**
         * @param {string} text formatted the way tw does it
         * @param {string} market two char market code. e.g. "en"
         * @return {TwCheeseDate}
         */
        function parseArrival(text, market) {    
            switch (market) {
                case 'br': return parseArrivalBrazilianPortuguese(text);
                case 'cz': return parseArrivalCzech(text);
                case 'pt': return parseArrivalPortuguese(text);        
            }
            return parseArrivalEnglish(text);
        };
        
        function parseArrivalEnglish(text) {
            // e.g. "Jun 12, 2019  15:36:23:000"
            let expr = /(\S+) (\d+), (\d+)  (\d+):(\d+):(\d+):?(\d+)?/;
            let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);    
            let month = TwCheeseDate_TwCheeseDate.monthNumber(monthName);
            return TwCheeseDate_TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
        }
        
        function parseArrivalCzech(text) {
            // e.g. "10.07.19 04:43:15:967"
            let [day, monthNumber, yearShort, hours, minutes, seconds, millis] = text.match(/\d+/g);
            let year = '20' + yearShort;
            let month = monthNumber - 1;
            return TwCheeseDate_TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
        }
        
        function parseArrivalPortuguese(text) {
            // e.g. "09/jul/2019 (20:03:15):895"
            let expr = /(\d+)\/(\D+)\/(\d+) \((\d+):(\d+):(\d+)\):?(\d+)?/;
            let [, day, monthName, year, hours, minutes, seconds, millis] = text.match(expr);
            let month = TwCheeseDate_TwCheeseDate.monthNumber(monthName);
            return TwCheeseDate_TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
        }
        
        function parseArrivalBrazilianPortuguese(text) {
            // e.g. "mai 20, 2020  11:54:33:503"
            let expr = /(\S+) (\d+), (\d+)  (\d+):(\d+):(\d+):?(\d+)?/;
            let [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);
            let month = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'].indexOf(monthName.toLowerCase());
            return TwCheeseDate_TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
        }
        
        
        // CONCATENATED MODULE: ./src/Scrape/res.js
        
        
        /**
         * @param {HTMLElement} resourcesContainer an element containing wood/stone/iron amounts
         * @return {Resources}
         */
        function scrapeResources(resourcesContainer) {
            // remove grey periods used as thousands separators
            let $res = $(resourcesContainer).clone();
            $res.find('.grey').remove();
        
            let resAmount = function(resIconCssClass) {
                // note: sometimes, if the res amount is 0, the game excludes it (and its icon) instead of showing 0
                let icon = $res.find('span.' + resIconCssClass).get(0);
                return icon ? parseInt($(icon).parent().text()) : 0;
            }
        
            return new Resources_Resources(
                resAmount('wood'),
                resAmount('stone'),
                resAmount('iron')
            );
        };
        
        
        // CONCATENATED MODULE: ./src/Scrape/command.js
        
        
        
        
        /**
         *	scrapes a command page for the command info and returns it as a Command object
         *	@param	{HTMLDocument} gameDoc	the page generated by game.php?screen=command_info&id=x&type=own
         *	@return {Command}
         */
        function scrapeCommand(gameDoc) {
            var command = new Command_Command();
            
            var content = $(gameDoc).find('#content_value').get()[0];
            let tables = content.getElementsByTagName('table');
            let rowMap = mapFirstTable(tables);
        
            command.arrival = parseArrival($(rowMap.arrival.cells[1]).text(), window.game_data.market);
        
            if (tables.length < 3) {
                return command;
            }
        
            let resCell = tables[2].rows[0].cells[1];
            command.haul = scrapeResources(resCell);
        
            var haulText = resCell.innerHTML;
            if (haulText.search('\\|') !== -1) {
                haulText = haulText.substring(haulText.search('\\|') + 7);
                let performance = haulText.split('/');
                command.haulCapacity = parseInt(performance[1]);
            }
        
            return command;
        };
        
        
        function mapFirstTable(tables) {
            let table = tables[0];
            let headerRows = 1;
            let originRows = table.rows[headerRows].cells[0].rowSpan;
            let destRows = table.rows[headerRows + originRows].cells[0].rowSpan;
        
            let rowMap = {};
            rowMap.originPlayer = table.rows[headerRows];
            rowMap.originVillage = table.rows[headerRows + 1];
            rowMap.destPlayer = table.rows[headerRows + originRows];
            rowMap.destVillage = table.rows[headerRows + originRows + 1];
        
            if (destRows > 2) {
                rowMap.catapultTarget = table.rows[headerRows + originRows + 2];
            }
        
            rowMap.duration = table.rows[headerRows + originRows + destRows];
            rowMap.arrival = table.rows[headerRows + originRows + destRows + 1];
            rowMap.arrivalIn = table.rows[headerRows + originRows + destRows + 2];
            rowMap.estimatedReturn = table.rows[headerRows + originRows + destRows + 3];
        
            return rowMap;
        }
        
        
        function scrapeCommandUrlFromRow(row) {
            let firstCell = row.cells[0];
            let links = firstCell.getElementsByTagName('a');
            if (links.length < 1) {
                let err = new Error('failed to find command link');
                err.extra = { rowHtml: row.outerHTML};
                throw err;
            }
            return links[0].href;
        }
        
        
         
        // CONCATENATED MODULE: ./src/Scrape/error.js
        
        /**
         * @param {HTMLDocument} gameDoc
         * @return {string|null}
         */
        function scrapeErrorMessage(gameDoc) {
            let $error = $(gameDoc).find('.error_box');
            return $error.length < 1 ? null : $error.text().trim();
        }
        
        
        // CONCATENATED MODULE: ./src/Transform/appendHaulColsToCommandsTable.js
        
        
        
        
        
        /**
         * @param {ProgressMonitor} progressMonitor
         * @return {Command[]} returning commands from the table
         */
        async function appendHaulColsToCommandsTable(progressMonitor) {
            let commandsTable = document.getElementById('commands_table');
            if (!commandsTable) {
                return [];
            }
        
            $(commandsTable.rows[0]).append(`
                <th><img src="${ImageSrc["a" /* ImageSrc */].wood}" title="Wood" alt="Timber"></th>
                <th><img src="${ImageSrc["a" /* ImageSrc */].stone}" title="Clay" alt="Clay"></th>
                <th><img src="${ImageSrc["a" /* ImageSrc */].iron}" title="Iron" alt="Iron"></th>
                <th>Performance</th>
            `);
        
            let commandCount = $(commandsTable).find('.rename-icon').length;
            progressMonitor.goalDetermined(commandCount);
            let returningCommands = [];
        
            for (let row of commandsTable.rows) {
                let firstCell = row.cells[0];
                if (firstCell.tagName.toLowerCase() === 'th') {
                    // no command here! this is a header row. e.g. the "select all" bar
                    row.cells[row.cells.length - 1].colSpan += 4;
                    continue;
                }
        
                let commandUrl = scrapeCommandUrlFromRow(row);
                let doc = await requestDocument(commandUrl);
                let errorMessage = scrapeErrorMessage(doc);
                if (errorMessage) {
                    $(row).append(`<td colspan="4" style="background-color:#FFCCAA; font-size:13px; font-weight:bold; color:#B40000;">${errorMessage}</td>`);
                    progressMonitor.progressMade(1);
                    continue;
                }
        
                try {
                    let command = scrapeCommand(doc);
                    let commandType = $(firstCell).find('.own_command').data('command-type');
                    if (commandType === 'return') {            
                        returningCommands.push(command);
                    }
            
                    $(row).append(`
                        <td>${command.haul.wood}</td>
                        <td>${command.haul.stone}</td>
                        <td>${command.haul.iron}</td>
                        <td>${command.haul.sum()}/${command.haulCapacity} (${command.calcHaulPercent()}%)</td>
                    `);
                }
                catch(err) {
                    console.error(err);
                    $(row).append(`<td>?</td><td>?</td><td>?</td><td>?</td>`);
                }
                progressMonitor.progressMade(1);
            }
        
            return returningCommands;
        };
        
        
        // EXTERNAL MODULE: ./src/Models/Debug/Build/ProcessFactory.js
        var ProcessFactory = __webpack_require__(7);
        
        // EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
        var DebugEvents = __webpack_require__(0);
        
        // CONCATENATED MODULE: ./src/ToolDebug/OverviewHauls/Actions.js
        
        
        
        
        
        
        let debugActions = {
        
            trySelectCommandFromTable: {
                async execute(na, ctrl) {
                    let $commandsTable = $('#commands_table');
                    let $commandRows = $commandsTable.children().children();
        
                    Object(UI["d" /* fadeGameContentExcept */])($commandsTable);
                    $(document).scrollTop($commandsTable.offset().top);
                    
                    let mousetrap = (new UI["a" /* Mousetrap */]()).spawn()
                        .on('mouseover', $commandRows, function() {
                            $(this).css({outline: '3px solid magenta'});
                        })
                        .on('mouseout', $commandRows, function() {
                            $(this).css({outline: 'none'})
                        });
        
                    let cleanup = function() {
                        Object(UI["f" /* unfadeGameContent */])();
                        mousetrap.destruct();
                        $commandRows.css({outline: 'none'});
                    };
        
                    $(ctrl).on(DebugEvents["a" /* DebugEvents */].USER_REJECTED, function() {
                        cleanup();
                    });
        
                    return new Promise(function(resolve, reject) {
                        let handleRowSelected = function() {
                            cleanup();
                            try {
                                resolve(scrapeCommandUrlFromRow(this));
                            } catch (err) {
                                reject(err);
                            }
                        }
                        mousetrap.on('click', $commandRows, handleRowSelected);
                    });
                }
            },
        
            tryScrapeCommandScreen: {
                async execute(commandUrl) {
                    let commandDoc = await requestDocument(commandUrl);
                    return {
                        document: commandDoc,
                        command: scrapeCommand(commandDoc)
                    };
                },
                async summarizeResult(r) {
                    let document = r.document;
                    if (document instanceof window.HTMLDocument) {
                        document = document.documentElement.outerHTML;
                    }
                    return {
                        document: document,
                        command: r.command
                    }
                }
            }
        
        }
        
        
        // CONCATENATED MODULE: ./dist/tool/cfg/debug/OverviewHauls/Default.js
        let processCfg = { phases: [{"type":"PhaseQuestion","internalName":"Entry","questions":[{"type":"QuestionFreeForm","ask":"What's broken?","placeholderText":"e.g. \"it freezes when loading hauls\"","minResponseLength":10}]}] };
        
        
        // CONCATENATED MODULE: ./dist/tool/cfg/debug/OverviewHauls/AtCommandsOverview.js
        let AtCommandsOverview_processCfg = { phases: [{"type":"PhaseQuestion","internalName":"Entry","questions":[{"type":"QuestionSelect","ask":"What's broken?","options":[{"answer":"Wrong values shown in commands list","value":"wrong_values","followUp":[{"type":"PhaseAttempt","internalName":"Determine command url","action":"trySelectCommandFromTable","instructions":"Select a problematic row.","success":[{"type":"PhaseAttempt","internalName":"Read selected command","action":"tryScrapeCommandScreen","success":[{"type":"PhaseQuestion","internalName":"Command scraper","lookAt":"parentResult.document.documentElement.outerHTML","questions":[{"type":"QuestionValue","ask":"Arrival","examine":"parentResult.command.arrival"},{"type":"QuestionValue","ask":"Haul","examine":"parentResult.command.haul"},{"type":"QuestionValue","ask":"Haul capacity","examine":"parentResult.command.haulCapacity"}]}]}]}]},{"answer":"Something else","value":"other"}]}]},{"type":"PhaseQuestion","internalName":"extra info","questions":[{"type":"QuestionFreeForm","ask":"Additional information","placeholderText":"e.g. \"iron isn't shown\""}]}] };
        
        
        // CONCATENATED MODULE: ./src/ToolSetup/OverviewHauls.js
        
        
        
        
        
        
        
        
        
        
        
        
        
        let haulsIncluded = false;
        
        async function enhanceScreenWithHaulInfo(progressMonitor) {
            let returningCommands = await appendHaulColsToCommandsTable(progressMonitor);
        
            (new HaulStatsWidget_HaulStatsWidget(returningCommands, scrapePageNumber()))
                .insertAfter($('.modemenu:eq(1)'));
        
            haulsIncluded = true;
        };
        
        
        function atCommandsOverview() {
            let here = document.location.href;
            return here.includes('screen=overview_villages') && here.includes('mode=commands');
        }
        
        
        function suggestRedirectToCommandsOverview() {
            suggestRedirect({
                message: `
                    <p style="font-size:14px;">To use this, you must be at the commands overview.</p>
                    <p style="font-size:12px;">Consider using the 'return' filter, since outgoing troops don't carry resources :)</p>`,
                screen: 'overview_villages',
                screenName: 'Commands Overview',
                uriParams: {
                    mode: 'commands',
                    type: 'return'
                },
                skippableId: 'Tool:OverviewHauls'
            });
        }
        
        
        function useTool() {
            if (haulsIncluded) {
                window.UI.InfoMessage('This is already active.', 3000, 'error');
                return;
            }
            if (!window.premium) {
                alertPremiumRequired();
                return;
            }    
            if (!atCommandsOverview()) {
                suggestRedirectToCommandsOverview();
                return;
            }
            if (!document.getElementById('commands_table')) {
                window.UI.ErrorMessage(`It looks like you don't have any commands.`, 3000);
                return;
            }
        
            promptLoadHauls(enhanceScreenWithHaulInfo);
        }
        
        
        let processFactory = new ProcessFactory["a" /* ProcessFactory */](debugActions);
        
        function newDebugProcess() {
            let name = 'Tool: OverviewHauls';
            if (atCommandsOverview()) {
                return processFactory.create(name, AtCommandsOverview_processCfg, true);
            }
            return processFactory.create(name, processCfg, true);
        }
        
        
        window.TwCheese.registerTool({
            id: 'OverviewHauls',
            use: useTool,
            getDebugProcess: newDebugProcess
        });
        
        
        /***/ }),
        /* 14 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        
        // EXTERNAL MODULE: ./src/Widget/AbstractWidget.js
        var AbstractWidget = __webpack_require__(3);
        
        // EXTERNAL MODULE: ./src/Util/UI.js
        var UI = __webpack_require__(2);
        
        // EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
        var DebugEvents = __webpack_require__(0);
        
        // EXTERNAL MODULE: ./src/Models/Debug/PhaseTypes.js
        var PhaseTypes = __webpack_require__(5);
        
        // EXTERNAL MODULE: ./src/Models/Debug/QuestionTypes.js
        var QuestionTypes = __webpack_require__(4);
        
        // CONCATENATED MODULE: ./src/Widget/Debug/QuestionWidget.js
        
        
        
        
        
        class QuestionWidget_QuestionWidget extends AbstractWidget["a" /* AbstractWidget */] {
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
                            placeholder="${Object(UI["b" /* escapeHtml */])(option.text)}"
                            class="twcheese-debug-question-answer ${option.className}"
                            data-index="0"
                        >${Object(UI["b" /* escapeHtml */])(option.value)}</textarea>
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
                    return Object(UI["b" /* escapeHtml */])(value.toDebugString());
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
                return Object(UI["b" /* escapeHtml */])(value.toString());
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
        
        
        Object(UI["e" /* initCss */])(`
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
        
        
        
        
        class AttemptWidget_AttemptWidget extends AbstractWidget["a" /* AbstractWidget */] {
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
        
        
        Object(UI["e" /* initCss */])(`
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
        
        
        
        
        
        class ReportWidget_ReportWidget extends AbstractWidget["a" /* AbstractWidget */] {
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
        
        
        Object(UI["e" /* initCss */])(`
            .twcheese-debug-report {
                min-height: 200px;
            }    
        `);
        
        
        
        // CONCATENATED MODULE: ./src/Widget/Debug/DebuggerWidget.js
        
        
        
        
        
        
        
        
        
        class DebuggerWidget_DebuggerWidget extends AbstractWidget["a" /* AbstractWidget */] {
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
        
        
        Object(UI["e" /* initCss */])(`
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
        
        
        // EXTERNAL MODULE: ./conf/ImageSrc.js
        var ImageSrc = __webpack_require__(1);
        
        // CONCATENATED MODULE: ./src/Widget/SidebarWidget.js
        
        
        
        
        
        
        class SidebarWidget_SidebarWidget extends AbstractWidget["a" /* AbstractWidget */] {
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
        
        
        Object(UI["e" /* initCss */])(`
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
                background-image: url('${ImageSrc["a" /* ImageSrc */].sidebarMain}');
            }
            .twcheese-sidebar-menu .menu-item.main:hover .icon {
                -webkit-filter: brightness(2);
                filter: brightness(2);
            }
        
            .twcheese-sidebar-menu .menu-item.bug .icon {
                background-image: url('${ImageSrc["a" /* ImageSrc */].sidebarBug}');
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
                background-image: url('${ImageSrc["a" /* ImageSrc */].sidebarGithub}');
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

        if (!sidebarInitd) {
            TwCheese.useTool('Sidebar');
        }
    }

    TwCheese.useTool(toolId);
})();