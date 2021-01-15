/*!---------------------------------------------------------------------
 * Battle Report Enhancer
 * market: en, uk, us, cz, se, gr, hr
 * author Nick Toby (cheesasaurus@gmail.com)
 *  
 * ==== when viewing a report ====
 * use script on: game.php?screen=report&view=x (a report)
 * effect: include some extra features on the page:
 *     -loyalty calculations
 *     -raiding calculator
 *     -demolition calculator
 *     -remaining defense
 *     -opponents defeated
 *     -population summary
 *     -timing summary
 *     -twcheese's json encoded representation of the report (for copy+pasting somewhere that other scripts would interpret it)
 *     -renamer (limit of 256 characters?)
 * 
 * ==== when viewing the reports folder, with the 'Attacks' or 'Defenses' filter on ====
 * use script on:	game.php?screen=report&mode=attack || game.php?screen=report&mode=defense
 * effects:
 *     -include some extra features on the page:
 *         - selector bar (has options to select reports based on various criteria)
 *         - mass renamer (renames all selected reports to a format readable by the BRE)
 *         - extended report information (information displayed can be customized to the user's preferences)
 *         - links to "attack again with the same troops"
 *         - text that can be copied to create "attack again with the same troops" links that can be saved in notebook or bookmarked in browser;
 *  
 * ==== license ====
 * Copyright (C) 2011  Nick Toby
 * 
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
/*! Tool setup compiled from /src/ToolSetup/BRE.js
 *---------------------------------------------------------------------*/
(function() {
    let toolId = 'BRE';

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
        /* 1 */
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
        /* 2 */
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
        /* 3 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return escapeHtml; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initCss; });
        /* unused harmony export fadeGameContent */
        /* unused harmony export fadeGameContentExcept */
        /* unused harmony export unfadeGameContent */
        /* unused harmony export Mousetrap */
        /* harmony import */ var _twcheese_conf_ImageSrc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        
        
        
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
        /* harmony import */ var _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        
        
        
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
        /* harmony import */ var _twcheese_src_Models_Debug_DebugEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
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
        var DebugEvents = __webpack_require__(1);
        
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
        
        
        
        // CONCATENATED MODULE: ./src/Scrape/TextScraper.js
        
        
        var language = { "buildings": {}, "report": {}, "twcheese": {} };
        switch (game_data.market) {
            default:
                /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
                language['buildings']['main'] = 'Headquarters';
                language['buildings']['barracks'] = 'Barracks';
                language['buildings']['stable'] = 'Stable';
                language['buildings']['garage'] = 'Workshop';
                language['buildings']['church'] = 'Church';
                language['buildings']['church_f'] = 'First church';
                language['buildings']['snob'] = 'Academy';
                language['buildings']['smith'] = 'Smithy';
                language['buildings']['place'] = 'Rally point';
                language['buildings']['statue'] = 'Statue';
                language['buildings']['market'] = 'Market';
                language['buildings']['wood'] = 'Timber camp';
                language['buildings']['stone'] = 'Clay pit';
                language['buildings']['iron'] = 'Iron mine';
                language['buildings']['farm'] = 'Farm';
                language['buildings']['storage'] = 'Warehouse';
                language['buildings']['hide'] = 'Hiding place';
                language['buildings']['wall'] = 'Wall';
                language['buildings']['watchtower'] = 'Watchtower';
        
                language['report']['catDamage'] = 'Damage by catapults:';
                language['report']['ramDamage'] = 'Damage by rams:';
                language['report']['haul'] = 'Haul:';
                language['report']['loyalty'] = 'Loyalty:';
                language['report']['unitsInTransit'] = 'Defender\'s troops, that were in transit';
                language['report']['deletedPlayer'] = '(deleted)';
                language['report']['unread'] = '(new)';
                break;
        
            case 'cz':
                /*==== divokekmeny.cz/ ====*/
                language['buildings']['main'] = 'Hlavní budova';
                language['buildings']['barracks'] = 'Kasárna';
                language['buildings']['stable'] = 'Stáj';
                language['buildings']['garage'] = 'Dílna';
                language['buildings']['church'] = 'Kostel';
                language['buildings']['church_f'] = 'První kostel';
                language['buildings']['snob'] = 'Panský dvůr';
                language['buildings']['smith'] = 'Kovárna';
                language['buildings']['place'] = 'Nádvoří';
                language['buildings']['statue'] = 'Socha';
                language['buildings']['market'] = 'Tržiště';
                language['buildings']['wood'] = 'Dřevorubec';
                language['buildings']['stone'] = 'Lom na těžbu hlíny';
                language['buildings']['iron'] = 'Železný důl';
                language['buildings']['farm'] = 'Selský dvůr';
                language['buildings']['storage'] = 'Skladiště';
                language['buildings']['hide'] = 'Skrýš';
                language['buildings']['wall'] = 'Hradby';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
        
                language['report']['catDamage'] = 'Škoda vzniklá střelbou z katapultu:';
                language['report']['ramDamage'] = 'Škoda vzniklá beranidlem:';
                language['report']['haul'] = 'Kořist:';
                language['report']['loyalty'] = 'Oddanost:';
                language['report']['unitsInTransit'] = 'Vojsko obránce, které bylo na cestě';
                language['report']['deletedPlayer'] = '(deleted)'; //todo: translate
                language['report']['unread'] = '(new)'; //todo: translate
                break;
        
            case 'se':
                language['buildings']['main'] = 'Högkvarter';
                language['buildings']['barracks'] = 'Barack';
                language['buildings']['stable'] = 'Stall';
                language['buildings']['garage'] = 'Verkstad';
                language['buildings']['church'] = 'Kyrka';
                language['buildings']['church_f'] = 'Första Kyrkan';
                language['buildings']['snob'] = 'Akademi';
                language['buildings']['smith'] = 'Smedja';
                language['buildings']['place'] = 'Samlingsplats';
                language['buildings']['statue'] = 'Staty';
                language['buildings']['market'] = 'Marknad';
                language['buildings']['wood'] = 'Sågverk';
                language['buildings']['stone'] = 'Lergrop';
                language['buildings']['iron'] = 'Järngruva';
                language['buildings']['farm'] = 'Farm';
                language['buildings']['storage'] = 'Förråd';
                language['buildings']['hide'] = 'Gömställe';
                language['buildings']['wall'] = 'Mur';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
        
                language['report']['catDamage'] = 'Skada gjord av katapulter:';
                language['report']['ramDamage'] = 'Skada gjorda av Murbräckan:';
                language['report']['haul'] = 'Byte:';
                language['report']['loyalty'] = 'Lojalitet:';
                language['report']['unitsInTransit'] = 'Enheter utanför byn';
                language['report']['deletedPlayer'] = '(borttaget)';
                language['report']['unread'] = '(new)'; //todo: translate
                break;
        
            /*==== fyletikesmaxes.gr/ ====*/
            case 'gr':
                language['buildings']['main'] = 'Επιτελείο';
                language['buildings']['barracks'] = 'Στρατώνας';
                language['buildings']['stable'] = 'Στάβλος';
                language['buildings']['garage'] = 'Εργαστήριο';
                language['buildings']['church'] = 'Εκκλησία';
                language['buildings']['church_f'] = 'ΠρώτηΕκκλησία';
                language['buildings']['snob'] = 'Ακαδημία';
                language['buildings']['smith'] = 'Οπλοποιείο';
                language['buildings']['place'] = 'ΜέροςΣυγκέντρωσης';
                language['buildings']['statue'] = 'Άγαλμα';
                language['buildings']['market'] = 'Αγορά';
                language['buildings']['wood'] = 'Ξυλουργείο';
                language['buildings']['stone'] = 'Λατομείο';
                language['buildings']['iron'] = 'Σιδηρωρυχείο';
                language['buildings']['farm'] = 'Αγρόκτημα';
                language['buildings']['storage'] = 'Αποθήκη';
                language['buildings']['hide'] = 'Κρυψώνα';
                language['buildings']['wall'] = 'Τείχος';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
        
                language['report']['catDamage'] = 'Ζημία που έκαναν οι καταπέλτες:';
                language['report']['ramDamage'] = 'Ζημιά που προκλήθηκε από τον πολιορκητικό κριό:';
                language['report']['haul'] = 'Αλλαγή:';
                language['report']['loyalty'] = 'Πίστη:';
                language['report']['unitsInTransit'] = 'Στρατεύματα αμυνόμενου που ήταν σε μεταφορά';
                language['report']['deletedPlayer'] = '(διεγραμμένο)';
                language['report']['unread'] = '(νέο)';
                break;
        
            /* the market where Arma plays :D */
            case 'hr':
                language['buildings']['main'] = 'Sjedište';
                language['buildings']['barracks'] = 'Vojarna';
                language['buildings']['stable'] = 'Štala';
                language['buildings']['garage'] = 'Radionica';
                language['buildings']['church'] = 'Crkva';
                language['buildings']['church_f'] = 'Prva crkva';
                language['buildings']['snob'] = 'Akademija';
                language['buildings']['smith'] = 'Kovačnica';
                language['buildings']['place'] = 'Okupljalište';
                language['buildings']['statue'] = 'Spomenik';
                language['buildings']['market'] = 'Tržnica';
                language['buildings']['wood'] = 'Drvosječa';
                language['buildings']['stone'] = 'Glinokop';
                language['buildings']['iron'] = 'Rudnik željeza';
                language['buildings']['farm'] = 'Farma';
                language['buildings']['storage'] = 'Spremište';
                language['buildings']['hide'] = 'Skrovište';
                language['buildings']['wall'] = 'Zid';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
        
                language['report']['catDamage'] = 'Šteta nanešena katapultima:	';
                language['report']['ramDamage'] = 'Šteta nanešena ovnovima:';
                language['report']['haul'] = 'Nosivost:';
                language['report']['loyalty'] = 'Odanost:';
                language['report']['unitsInTransit'] = 'Obrambene postrojbe koje su bile na putu';
                language['report']['deletedPlayer'] = '(obrisano)';
                break;
        
            /* Norwegian */
            case 'no':
                language['buildings']['main'] = 'Hovedkvarter';
                language['buildings']['barracks'] = 'Brakker';
                language['buildings']['stable'] = 'Stall';
                language['buildings']['garage'] = 'Verksted';
                language['buildings']['church'] = 'Kirke';
                language['buildings']['church_f'] = 'Første Kirke';
                language['buildings']['snob'] = 'Akademi';
                language['buildings']['smith'] = 'Smie';
                language['buildings']['place'] = 'Samlingsplass';
                language['buildings']['statue'] = 'Statue';
                language['buildings']['market'] = 'Marked';
                language['buildings']['wood'] = 'Hogstfelt';
                language['buildings']['stone'] = 'Leirgrav';
                language['buildings']['iron'] = 'Jerngruve';
                language['buildings']['farm'] = 'Gård';
                language['buildings']['storage'] = 'Varehus';
                language['buildings']['hide'] = 'Skjulested';
                language['buildings']['wall'] = 'Mur';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
        
                language['report']['catDamage'] = 'Skade forårsaket av katapulter:';
                language['report']['ramDamage'] = 'Skade forårsaket av rambukker:';
                language['report']['haul'] = 'Bytte';
                language['report']['loyalty'] = 'Lojalitet:';
                language['report']['unitsInTransit'] = 'Forsvarer';
                language['report']['unitsInTransit'] = 'Antall';
                language['report']['deletedPlayer'] = '(slettet)';
                language['report']['unread'] = '(ny)';
                break;
        
            // Portugal
            case 'pt':
                language['buildings']['main'] = 'Edifício Principal';
                language['buildings']['barracks'] = 'Quartel';
                language['buildings']['stable'] = 'Estábulo';
                language['buildings']['garage'] = 'Oficina';
                language['buildings']['church'] = 'Igreja';
                language['buildings']['church_f'] = 'Primeira Igreja';
                language['buildings']['snob'] = 'Academia';
                language['buildings']['smith'] = 'Ferreiro';
                language['buildings']['place'] = 'Praça de Reuniões';
                language['buildings']['statue'] = 'Estátua';
                language['buildings']['market'] = 'Mercado';
                language['buildings']['wood'] = 'Bosque';
                language['buildings']['stone'] = 'Poço de Argila';
                language['buildings']['iron'] = 'Mina de Ferro';
                language['buildings']['farm'] = 'Fazenda';
                language['buildings']['storage'] = 'Armazém';
                language['buildings']['hide'] = 'Esconderijo';
                language['buildings']['wall'] = 'Muralha';
                language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
            
                language['report']['catDamage'] = 'Dano provocado por catapultas:';
                language['report']['ramDamage'] = 'Dano provocado por aríetes:';
                language['report']['haul'] = 'Busca minuciosa:';
                language['report']['loyalty'] = 'Lealdade:';
                language['report']['unitsInTransit'] = 'Unidades fora da aldeia';
                language['report']['deletedPlayer'] = '(eliminado)';
                language['report']['unread'] = '(novo)';
                break;
        
            // Brazil
            case 'br':        
                language['buildings']['main'] = 'Edifício principal';
                language['buildings']['barracks'] = 'Quartel';
                language['buildings']['stable'] = 'Estábulo';
                language['buildings']['garage'] = 'Oficina';
                language['buildings']['church'] = 'Igreja';
                language['buildings']['church_f'] = 'Primeira igreja';
                language['buildings']['snob'] = 'Academia';
                language['buildings']['smith'] = 'Ferreiro';
                language['buildings']['place'] = 'Praça de reunião';
                language['buildings']['statue'] = 'Estátua';
                language['buildings']['market'] = 'Mercado';
                language['buildings']['wood'] = 'Bosque';
                language['buildings']['stone'] = 'Poço de argila';
                language['buildings']['iron'] = 'Mina de ferro';
                language['buildings']['farm'] = 'Fazenda';
                language['buildings']['storage'] = 'Armazém';
                language['buildings']['hide'] = 'Esconderijo';
                language['buildings']['wall'] = 'Muralha';
                language['buildings']['watchtower'] = 'Torre de vigia';
        
                language['report']['catDamage'] = 'Dano - catapultas:';
                language['report']['ramDamage'] = 'Dano - aríetes:';
                language['report']['haul'] = 'Saque:';
                language['report']['loyalty'] = 'Lealdade:';
                language['report']['unitsInTransit'] = 'Tropas defensivas em trânsito';
                language['report']['deletedPlayer'] = '(apagado)';
                language['report']['unread'] = '(novo)';
                break;
        
        }
        
        function escapeSingleQuotes(str) {
            return str.replace(/'/g, "\\'");
        }
        
        class TextScraper_TextScraper {
            constructor(gameTexts) {
                this.gameTexts = gameTexts;
            }
        
            t(textId) {
                return getProp(this.gameTexts, textId);
            }
        
            /**
             * @param {HTMLElement|jQuery|string} haystack
             * @param {string} textId
             * @return {boolean}
             */
            includes(haystack, textId) {
                let needle = this.t(textId);
                if (typeof haystack === 'string') {
                    return haystack.includes(needle);
                }
                return $(haystack).html().includes(needle);
            }
        
            /**
             * @param {HTMLElement[] | jQuery} elements
             * @param {string} textId 
             * @return {HTMLElement|undefined}
             */
            first(elements, textId) {
                let searchFor = this.t(textId);
                return $(elements).filter(`:contains('${escapeSingleQuotes(searchFor)}')`)[0];
            }
        
            /**
             * @param {HTMLElment|jQuery} el
             * @return {string}
             */
            buildingType(el) {
                let text = $(el).text();
                for (let [buildingType, buildingName] of Object.entries(this.gameTexts.buildings)) {
                    if (text.includes(buildingName)) {
                        return buildingType;
                    }
                }
            }
        
        }
        
        
        let textScraper = new TextScraper_TextScraper(language);
        
        
        
        // EXTERNAL MODULE: ./conf/ImageSrc.js
        var ImageSrc = __webpack_require__(0);
        
        // CONCATENATED MODULE: ./src/Models/BattleReportCondensed.js
        
        
        
        class BattleReportCondensed_BattleReportCondensed {
            constructor() {
                this.subject = null; // string
                this.attackIcons = null; // AttackIcons
                this.attackerName = null; // string
                this.attackerNobleDied = false; // boolean
                this.attackerVillage = null; // Village
                this.buildingLevels = null; // BuildingLevels
                this.defenderName = null; // string
                this.defenderVillage = null; // Village
                this.defenderSurvivors = null; // TroopCounts
                this.dotColor = null; // string
                this.haulStatus = BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_UNKNOWN;
                this.isForwarded = false; // string
                this.loyalty = null; // {after:number}
                this.note = null; // string
                this.reportId = null; // int
                this.resources = null; // Resources
                this.strTimeReceived = null; // string
                this.timeLaunched = null; // TwCheeseDate
                this.wasAttackFeint = false; // boolean
            }
        
            /**
             * were the defender's troops all killed?
             * @return {boolean}
             */
            wasDefenderCleared() {
                return this.defenderSurvivors && this.defenderSurvivors.isZero();
            }
        
            haulStatusIconSrc() {
                if (this.haulStatus === BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
                    throw Error(`There's no icon.... that's why the status is unknown!`);
                }
                if (this.haulStatus === BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_FULL) {
                    return ImageSrc["a" /* ImageSrc */].haulFull;
                }
                return ImageSrc["a" /* ImageSrc */].haulPartial;
            }
        
            /**
             * @param {{x:number, y:number}} village
             * @return number
             */
            defenderDistance(village) {
                if (!this.defenderVillage) {
                    return '?';
                }
                return Math.round(this.defenderVillage.distanceTo(village) * 100) / 100;
            }
        
        }
        BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_UNKNOWN = -1;
        BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_PARTIAL = 0;
        BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_FULL = 1;
        
        
        
        // CONCATENATED MODULE: ./src/Models/Village.js
        
        class Village {
            constructor(id, x, y) {
                this.id = parseInt(id);
                this.x = parseInt(x);
                this.y = parseInt(y);
            }
        
            /**
             * @param {Village} otherVillage 
             */
            distanceTo(otherVillage) {
                let diffX = this.x - otherVillage.x;
                let diffY = this.y - otherVillage.y;
                return Math.hypot(diffX, diffY);
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
            
        
        
        // CONCATENATED MODULE: ./conf/Buildings.js
        let cfg = {
            main: {
                maxLevel: 30,
                minLevel: 1,
                pop: 5,
                popFactor: 1.17,
                req: {}
            },
            barracks: {
                maxLevel: 25,
                minLevel: 0,
                pop: 7,
                popFactor: 1.17,
                req: {
                    main: 3
                }
            },
            stable: {
                maxLevel: 20,
                minLevel: 0,
                pop: 8,
                popFactor: 1.17,
                req: {
                    main: 10,
                    barracks: 5,
                    smith: 5
                }
            },
            garage: {
                maxLevel: 15,
                minLevel: 0,
                pop: 8,
                popFactor: 1.17,
                req: {
                    main: 10,
                    smith: 10
                }
            },
            church: {
                maxLevel: 3,
                minLevel: 0,
                pop: 5000,
                popFactor: 1.55,
                req: {
                    main: 5,
                    farm: 5
                }
            },
            church_f: {
                maxLevel: 1,
                minLevel: 0,
                pop: 5,
                popFactor: 1.55,
                req: {}
            },
            snob: {
                maxLevel: 3,
                minLevel: 0,
                pop: 80,
                popFactor: 1.17,
                req: {
                    main: 20,
                    smith: 20,
                    market: 10
                }
            },
            smith: {
                maxLevel: 20,
                minLevel: 0,
                pop: 20,
                popFactor: 1.17,
                req: {
                    main: 5,
                    barracks: 1
                }
            },
            place: {
                maxLevel: 1,
                minLevel: 0,
                pop: 0,
                popFactor: 1.17,
                req: {}
            },
            statue: {
                maxLevel: 1,
                minLevel: 0,
                pop: 10,
                popFactor: 1.17,
                req: {}
            },
            market: {
                maxLevel: 25,
                minLevel: 0,
                pop: 20,
                popFactor: 1.17,
                req: {
                    main: 3,
                    storage: 2
                }
            },
            wood: {
                maxLevel: 30,
                minLevel: 0,
                pop: 5,
                popFactor: 1.155,
                req: {}
            },
            stone: {
                maxLevel: 30,
                minLevel: 0,
                pop: 10,
                popFactor: 1.14,
                req: {}
            },
            iron: {
                maxLevel: 30,
                minLevel: 0,
                pop: 10,
                popFactor: 1.17,
                req: {}
            },
            farm: {
                maxLevel: 30,
                minLevel: 1,
                pop: 0,
                popFactor: 1,
                req: {}
            },
            storage: {
                maxLevel: 30,
                minLevel: 1,
                pop: 0,
                popFactor: 1.15,
                req: {}
            },
            hide: {
                maxLevel: 10,
                minLevel: 0,
                pop: 2,
                popFactor: 1.17,
                req: {}
            },
            wall: {
                maxLevel: 20,
                minLevel: 0,
                pop: 5,
                popFactor: 1.17,
                req: {
                    barracks: 1
                }
            },
            watchtower: {
                maxLevel: 20,
                minLevel: 0,
                pop: 500,
                popFactor: 1.18,
                req: {
                    main: 5,
                    farm: 5
                }
            }    
        };
        
        
        // CONCATENATED MODULE: ./src/Models/Buildings.js
        
        
        
         // todo: request devs make additional info available via interface.php, so this won't be necessary
        
        
        /**
         * Building		Index
         * hq:			0
         * barracks:	1
         * stable:		2
         * workshop:	3
         * church:		4
         * church_f:	5
         * academy:		6
         * smithy:		7
         * rally:		8
         * statue:		9
         * market:		10
         * timber:		11
         * clay:		12
         * iron:		13
         * farm:		14
         * warehouse:	15
         * hiding:		16
         * wall:		17
         */
        let buildingTypes = [
            'main',
            'barracks',
            'stable',
            'garage',
            'church',
            'church_f',
            'snob',
            'smith',
            'place',
            'statue',
            'market',
            'wood',
            'stone',
            'iron',
            'farm',
            'storage',
            'hide',
            'wall',
            'watchtower'
        ];
        
        function maxLevel(buildingType) {
            let building = buildingConfig.get(buildingType);
            if (typeof building === 'undefined') {
                return 0;
            }
            return building.max_level;
        }
        
        
        function resProductionHourly(level) {
            if (level === 0) {
                return gameConfig.get('speed') * 5;
            }
            return gameConfig.get('speed') * 30 * (1.163118 ** (level - 1));
        }
        
        
        function popUsed(buildingType, level) {
            let building = buildingConfig.get(buildingType);
            if (typeof building === 'undefined') {
                return 0;
            }
            return Math.round(building.pop * building.pop_factor ** (level - 1));
        }
        
        
        function requiredBuildingLevels(buildingType) {
            // The config from interface.php is missing building requirements.
            // So use own config.
            let building = cfg[buildingType];
            if (typeof building === 'undefined') {
                return [];
            }
            return building.req;
        }
        
        
        class Buildings_BuildingLevels {
            constructor(fill = 0) {
                for (let type of buildingTypes) {
                    this[type] = fill;
                }
            }
        
            populationUsed() {
                let pop = 0;
                for (let buildingType of buildingTypes) {
                    let level = this[buildingType];
                    pop += popUsed(buildingType, level);
                }
                return pop;
            }
        
            populationCap() {
                return Math.round(240 * 1.172103 ** (this.farm - 1));
            }
        
            resourceCap() {
                return Math.round(1000 * 1.2294934 ** (this.storage - 1));
            }
            
            resourceProductionHourly() {
                return new Resources_Resources(
                    resProductionHourly(this.wood),
                    resProductionHourly(this.stone),
                    resProductionHourly(this.iron)
                );
            }
        
            hideableResources() {
                if (this.hide === 0) {
                    return 0;
                }
                return Math.round(112.4859 * 1.3335 ** this.hide);
            }
        
            canUpgrade(buildingType) {
                let alreadyMaxed = this[buildingType] >= maxLevel(buildingType);
                return !alreadyMaxed && this.areRequirementsMet(buildingType);
            }
        
            areRequirementsMet(buildingType) {
                let reqs = requiredBuildingLevels(buildingType);
                for (let [reqType, reqLevel] of Object.entries(reqs)) {
                    if (reqLevel > this[reqType]) {
                        return false;
                    }
                }
                return true;
            }
        
            toArray() {
                return buildingTypes.map(type => this[type]);
            }
        
            static fromArray(array) {
                let levels = new Buildings_BuildingLevels();
                array.forEach((level, i) => {
                    levels[buildingTypes[i]] = level;
                });
                return levels;
            }
        
            static typeAt(index) {
                return buildingTypes[index];
            }
        }
        
        
        let buildingUtil = {
            buildingTypesOnWorld() {
                return buildingTypes.filter(type => this.typeExistsOnWorld(type));
            },
        
            typeExistsOnWorld(buildingType) {
                return typeof buildingConfig.get(buildingType) !== 'undefined';
            },
        };
        
        
        
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
        
        
        let troopUtil = {
        
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
        
        
        // CONCATENATED MODULE: ./src/Models/ReportRenamer.js
        
        
        
        
        
        
        
        
        
        class ReportRenamer_ReportRenamer {
        
            /**
             * @param {BattleReport} report 
             * @param {string} note
             * @return {Promise}
             * @resolve {string} new name
             */
            async rename(report, note) {
                let newName = this.createName(report, note);
                await postToGame('report', { ajaxaction: 'edit_subject', report_id: report.reportId }, { text: newName });
        
                $(this).trigger({
                    type: 'report-renamed',
                    reportId: report.reportId,
                    newName
                });
        
                return newName;
            }
        
            /**
             * @param {BattleReport} report 
             * @param {string} note
             * @return {string} new name
             */
            createName(report, note = '') {
                var newName = 'twCheese: ';
                newName += report.attacker.name.replace(textScraper.t('report.deletedPlayer'), '') + ' ';
                newName += '(' + report.attackerVillage.x + '|' + report.attackerVillage.y + ',' + report.attackerVillage.id + ')';
                newName += report.defender.name.replace(textScraper.t('report.deletedPlayer'), '');
                newName += '(' + report.defenderVillage.x + '|' + report.defenderVillage.y + ',' + report.defenderVillage.id + ')';
            
                let timingInfo = report.calcTimingInfo();
                newName += '_t:' + Math.floor(timingInfo.launchTime.getTime() / 1000) + '. ';
        
                if (report.attackerLosses.snob > 0) //dead noble
                    newName += '_x';
                if (report.loyalty)
                    newName += '_l:' + report.loyalty.after + '.';
                if (report.defenderSurvivors)
                    newName += '_d[' + report.defenderSurvivors.toArray() + '] ';
                if (report.buildingLevels)
                    newName += '_b[' + report.buildingLevels.toArray() + '] ';
                if (report.resources)
                    newName += '_r[' + report.resources.toArray() + '] ';
                if (report.wasAttackFeint())
                    newName += '_f';
                if (note)
                    newName += '_n:' + note;
            
                return newName;
            }
        
        
            /**
             * @param {string} reportName 
             * @return {BattleReportCondensed}
             */
            parseName(reportName) {
                reportName = reportName.trim();
            
                if (reportName.startsWith('twCheese:')) {
                    try {
                        return this.parseTwCheeseName(reportName);
                    }
                    catch (err) {
                        console.error('parseTwCheeseName failed:', reportName, err);
                    }
                }
                else {
                    try {
                        return this.parseDefaultName(reportName);
                    }
                    catch (err) {
                        // The player could have renamed the report to something unrecognized, or the game changed the name format.
                        console.info('parseDefaultName failed:', reportName);
                    }
                }
                let fallbackReport = new BattleReportCondensed_BattleReportCondensed();        
                fallbackReport.subject = reportName;
                return fallbackReport;        
            }
        
            /**
             * @param {string} reportName 
             * @return {BattleReportCondensed}
             */
            parseDefaultName(reportName) {
                let report = new BattleReportCondensed_BattleReportCondensed();
                report.subject = reportName;
        
                // e.g. "Pazuzu (Squanch) scouts cheesasauruss village (600|410) K46 - (spy)"
                let expr = /(.*?) \(.+\((\d+)\|(\d+)/;
                let [, aName, dvX, dvY] = reportName.match(expr);
                report.attackerName = aName;
                report.defenderVillage = new Village(0, dvX, dvY);
                return report;
            }
        
            /**
             * @param {string} reportName 
             * @return {BattleReportCondensed}
             */
            parseTwCheeseName(reportName) {
                let report = new BattleReportCondensed_BattleReportCondensed();
                report.subject = reportName;
        
                // e.g. "twCheese: Pazuzu (598|419,17068)cheesasaurus(600|410,20373)"
                let expr = /twCheese: (.*?) \((\d+)\|(\d+),(\d+)\)(.*?)\((\d+)\|(\d+),(\d+)\)/
                let [, aName, avX, avY, avId, dName, dvX, dvY, dvId] = reportName.match(expr);
                report.attackerName = aName;
                report.attackerVillage = new Village(avId, avX, avY);
                report.defenderName = dName;
                report.defenderVillage = new Village(dvId, dvX, dvY);
        
                // set note, and remove from reportName
                if (reportName.includes('_n:')) {
                    report.note = reportName.match(/_n:(.+)/)[1];
                    reportName = reportName.replace(/_n:.+/, '');
                }
        
                // set buildingLevels
                let matches = reportName.match(/_b(\[\S+\])/);
                if (matches) {
                    report.buildingLevels = Buildings_BuildingLevels.fromArray(JSON.parse(matches[1]));
                }
        
                // set resources
                matches = reportName.match(/_r(\[\S+\])/);
                if (matches) {
                    let r = JSON.parse(matches[1]);
                    report.resources = new Resources_Resources(r[0], r[1], r[2]);
                }
        
                // set defenderSurvivors
                matches = reportName.match(/_d(\[\S+\])/);
                if (matches) {
                    report.defenderSurvivors = TroopCounts.fromArray(JSON.parse(matches[1]));
                }
        
                // set loyalty
                matches = reportName.match(/_l:(\d+)/);
                if (matches) {
                    report.loyalty = { after: parseInt(matches[1]) };
                }
        
                // set timeLaunched
                matches = reportName.match(/_t:(\d+)/);
                if (matches) {
                    report.timeLaunched = TwCheeseDate_TwCheeseDate.newServerDate(parseInt(matches[1]) * 1000);
                }
        
                report.attackerNobleDied = reportName.includes('_x');
                report.wasAttackFeint = reportName.includes('_f');
                return report;
            }
        
            availableChars(name) {
                return 255 - name.length;
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Models/DemolitionCalculator.js
        
        let catAmounts = [0, 2, 6, 10, 15, 21, 28, 36, 45, 56, 68, 82, 98, 115, 136, 159, 185, 215, 248, 286, 328, 376, 430, 490, 558, 634, 720, 815, 922, 1041, 1175, 1175];
        let catAmountsChurch = [0, 400, 500, 600, 600];
        let ramAmounts = [0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219];
        let invulnerable = ['church_f', 'hide'];
        
        
        function whichSiegeLookup(buildingType) {
            switch (buildingType) {
                case 'wall':    return ramAmounts;
                case 'church':  return catAmountsChurch;
                // todo: check if watchtower uses something special
                default:        return catAmounts;
            }
        }
        
        
        class DemolitionCalculator {
        
            /**
             * @param {BuildingLevels} buildingLevels
             * @return {{oneShotScouted:object, oneShotUpgraded:object}} mappings of how many siege units to demolish buildings
             *     example: {
             *         oneShotScouted: {
             *             barracks: 23, // 23 catapults to demolish the scouted barracks level in one shot
             *             wall: 42 // 42 rams to demolish the scouted wall level in one shot
             *         },
             *         oneShotUpgraded: {
             *             barracks: 69, // 69 catapults to demolish the scouted barracks level, +1 upgrade, in one shot
             *             wall: 1337 // 1337 rams to demolish the scouted wall level, +1 upgrade, in one shot
             *         }
             *     }
             *  
             */
            suggestSiegeUnits(buildingLevels) {
                let demoScouted = {};
                let demoBuffer = {};
        
                function assignDemolition(buildingType) {
                    if (invulnerable.includes(buildingType)) {
                        demoScouted[buildingType] = 'NA';
                        demoBuffer[buildingType] = 'NA';
                        return;
                    }
        
                    let level = buildingLevels[buildingType];
                    if (level === '?') {
                        demoScouted[buildingType] = '?';
                        demoBuffer[buildingType] = '?';
                        return;
                    }
        
                    let siegeAmounts = whichSiegeLookup(buildingType);
        
                    demoScouted[buildingType] = siegeAmounts[level];
                    let bufferLevel = buildingLevels.canUpgrade(buildingType) ? level + 1 : level;
                    demoBuffer[buildingType] = siegeAmounts[bufferLevel];
                }
        
                for (let buildingType in buildingLevels) {
                    assignDemolition(buildingType);
                }
        
                return {
                    oneShotScouted: demoScouted,
                    oneShotUpgraded: demoBuffer
                };
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/BattleReport.js
        
        
        
        
        class BattleReport_BattleReport {
            constructor() {
                this.attacker = null;
                this.attackerLosses = null;
                this.attackerQuantity = null;
                this.attackerSurvivors = null;
                this.attackerVillage = null;
                this.battleTime = null;
                this.buildingLevels = null;
                this.catDamage = null;
                this.defender = null;
                this.defenderLosses = null;
                this.defenderQuantity = null;
                this.defenderSurvivors = null;
                this.defenderVillage = null;
                this.dotColor = null;
                this.espionageLevel = null;
                this.haul = null;
                this.loyalty = null; // {before:number, after:number}
                this.luck = null;
                this.morale = null;
                this.ramDamage = null;
                this.reportId = null;
                this.resources = null;
                this.unitsInTransit = null;
                this.unitsOutside = null;
            }
        
            /**
             * @return {{launchTime:TwCheeseDate, returnTime:TwCheeseDate}}
             */
            calcTimingInfo() {
                let distance = this.attackerVillage.distanceTo(this.defenderVillage);
                let travelDuration = this.attackerQuantity.travelDuration(distance, 'attack');
                return {
                    launchTime: this.battleTime.subMilliseconds(travelDuration),
                    returnTime: this.battleTime.addMilliseconds(travelDuration).startOfSecond()
                };
            }
        
            /**
             * @return {{buildings:number, troops:number, idle:number}}
             */
            calcPopulation() {
                if (this.espionageLevel < 2) {
                    throw Error('not enough information to determine population');
                }
                let buildingPop = this.buildingLevels.populationUsed();
                let troopPop = this.defenderQuantity.populationUsed();
                if (this.unitsOutside) {
                    troopPop += this.unitsOutside.populationUsed();
                }
                return {
                    buildings: buildingPop,
                    troops: troopPop,
                    idle: this.buildingLevels.populationCap() - buildingPop - troopPop
                };
            }
        
            /**
             * @param {Number} haulBonus the extra % bonus haul from flags, events, etc.  Example: 30 for 30%, NOT 0.3
             * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
             */
            calcRaidScouted(haulBonus = 0) {
                if (this.espionageLevel < 1) {
                    throw Error('not enough information');
                }
                return this.calcRaidUnits(this.resources.sum(), haulBonus);
            }
        
            /**
             * @param {{x:number, y:number}} home
             * @param {TwCheeseDate} timeNow the current time
             * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
             * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
             */
            calcRaidPredicted(home, timeNow, haulBonus = 0) {
                if (this.espionageLevel < 2) {
                    throw Error('not enough information');
                }
                let distance = this.defenderVillage.distanceTo(home);
                let maxLoot = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();
                let hourlyProduction = this.buildingLevels.resourceProductionHourly();
        
                let hoursSinceReport = (timeNow - this.battleTime) / 3600000;
                let resourcesProducedSinceReport = hourlyProduction.multiply(hoursSinceReport);
                let resourcesNow = this.resources.add(resourcesProducedSinceReport);
        
                let troopCounts = new TroopCounts();
                for (let troopType of Troops_troopTypes) {
                    let travelDuration = troopUtil.travelDuration(troopType, distance);
                    let travelHours = travelDuration / 3600000;
                    let resourcesProducedDuringTravel = hourlyProduction.multiply(travelHours);
                    let resourcesAtArrival = resourcesNow.add(resourcesProducedDuringTravel).cap(maxLoot);
                    troopCounts[troopType] = troopUtil.countToCarry(troopType, resourcesAtArrival.sum(), haulBonus);
                }
                return troopCounts;
            }
        
            /**
             * @param {number} periodHours the number of hours that resources have been accumulating
             * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
             * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
             */
            calcRaidPeriodic(periodHours, haulBonus = 0) {
                let resourcesProduced = this.buildingLevels.resourceProductionHourly().multiply(periodHours);
                let maxLoot = this.buildingLevels.resourceCap() - this.buildingLevels.hideableResources();
                let totalResources = resourcesProduced.cap(maxLoot).sum();
                return this.calcRaidUnits(totalResources, haulBonus);
            }
        
            /**
             * @param {number} resources the total resources to be raided
             * @param {number} haulBonus the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
             * @return {TroopCounts} how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
             */
            calcRaidUnits(resources, haulBonus = 0) {
                let troopCounts = new TroopCounts();
                for (let troopType of Troops_troopTypes) {
                    troopCounts[troopType] = troopUtil.countToCarry(troopType, resources, haulBonus);
                }
                return troopCounts;
            }
        
            /**
             * was the attack likely just a distraction?
             * @return {boolean}
             */
            wasAttackFeint() {
                let troops = this.attackerQuantity;
                return troops.snob === 0 && troops.populationUsed() <= 130;
            }
        
            /**
             * were the defender's troops all killed?
             * @return {boolean}
             */
            wasDefenderCleared() {
                return this.defenderSurvivors && this.defenderSurvivors.isZero();
            }
        
            /**
             * @return {{oneShotScouted:object, oneShotUpgraded:object}} mappings of how many siege units to demolish buildings
             */
            suggestSiegeUnits() {
                if (this.espionageLevel < 2) {
                    throw Error('not enough information');
                }
                return (new DemolitionCalculator()).suggestSiegeUnits(this.buildingLevels);
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/Player.js
        
        class Player {
            constructor(id, name) {
                this.id = id;
                this.name = name;
            }
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/StationedTroops.js
        
        class StationedTroops {
            
            /**
             * @param TroopCounts troopCounts
             * @param Village village
             */
            constructor(troopCounts, village) {
                this.troopCounts = troopCounts;
                this.village = village;
            }
        
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
        
        
        // CONCATENATED MODULE: ./src/Scrape/BattleReportScraper.js
        
        
        
        
        
        
        
        
        
        
        /**
         * @param {HTMLTableCellElement} playerCell a cell containing a link to a player profile
         * @return {Player}
         */
        function scrapePlayer(playerCell) {
            if (textScraper.includes(playerCell, 'report.deletedPlayer')) {
                return new Player(-1, $(playerCell).text());
            }
            else if (playerCell.innerHTML === '---') {
                return new Player(0, '---');
            }
            let playerLink = playerCell.firstChild;
            let id = parseInt(playerLink.href.match(/&id=(\d+)/)[1]);
            let name = playerLink.innerHTML;
            return new Player(id, name);
        }
        
        
        /**
         * @param {HTMLTableRowElement} troopRow a row of cells containing troop counts
         * @return {TroopCounts}
         */
        function scrapeTroopCounts(troopRow) {
            let troops = new TroopCounts();
            let troopTypes = troopUtil.troopTypesOnWorld();
            for (let i = 0; i < troopTypes.length; i++) {
                if (typeof troopRow.cells[i] !== 'undefined') { // attacker can't have militia
                    troops[troopTypes[i]] = parseInt(troopRow.cells[i].innerHTML);
                }        
            }
            return troops;
        }
        
        
        /**
         * @param {HTMLAnchorElement} link - a link to a village with the name and coordinates
         * @return {Village}
         */
        function scrapeVillage(link) {
            let [, id] = link.href.match(/&id=(\d+)/);
            let [, x, y] = link.innerHTML.match(/\((\d+)\|(\d+)\)(?!.*\(.*?\))/);
            return new Village(parseInt(id), parseInt(x), parseInt(y));
        }
        
        
        /**
         * removes the label from a troop count row
         * @return	troopRowCopy:HTMLTableRowElement - a row of troop counts suitable for the twcheese_getTroopCount function
         * @param	troopRow:HTMLTableRowElement - the row of troop counts with the label
         */
        function removeTroopsLabel(troopRow) {
            var troopRowCopy = document.createElement('tr');
            for (var i = 1; i < troopRow.cells.length; i++) {
                troopRowCopy.appendChild(document.createElement('td'));
                troopRowCopy.cells[i - 1].innerHTML = troopRow.cells[i].innerHTML;
            }
            return troopRowCopy;
        }
        
        /**
         * scrapes the page from game.php?screen=report&view={reportId}
         */
        class BattleReportScraper_BattleReportScraper {
        
            /**
             * @param {HTMLDocument} gameDoc
             */
            constructor(gameDoc) {
                this.gameDoc = gameDoc;
                this.$gameDoc = $(gameDoc);
                this.mainTable = this.$gameDoc.find('#attack_luck').parents('table')[0];
                this.luckTable = gameDoc.getElementById('attack_luck');
                this.attackerTable = gameDoc.getElementById('attack_info_att');
                this.attackerUnitsTable = gameDoc.getElementById('attack_info_att_units');
                this.defenderTable = gameDoc.getElementById('attack_info_def');
                this.defenderUnitsTable = gameDoc.getElementById('attack_info_def_units');
                this.resultsTable = gameDoc.getElementById('attack_results');
                this.supportKilledTable = gameDoc.getElementById('attack_away_units');
                this._validate();
            }
        
            _validate() {
                let shouldAlwaysBeThere = ['mainTable', 'luckTable', 'attackerTable', 'attackerUnitsTable', 'defenderTable'];
                for (let propName of shouldAlwaysBeThere) {
                    if (!this[propName]) {
                        throw Error(`BattleReportScraper failed: couldn't locate the ${propName}`);
                    }
                }
            }
        
            scrapeReport() {
                let report = new BattleReport_BattleReport();
        
                report.attacker = this.getAttacker();
                report.attackerLosses = this.getAttackerLosses();
                report.attackerQuantity = this.getAttackerQuantity();
                report.attackerVillage = this.getAttackerVillage();
                report.battleTime = this.getBattleTime();
                report.buildingLevels = this.getBuildingLevels();
                report.catDamage = this.getCatDamage();
                report.defender = this.getDefender();
                report.defenderLosses = this.getDefenderLosses();
                report.defenderQuantity = this.getDefenderQuantity();
                report.defenderVillage = this.getDefenderVillage();
                report.dotColor = this.getDotColor();
                report.espionageLevel = this.getEspionageLevel();
                report.haul = this.getHaul();
                report.loyalty = this.getLoyalty();
                report.luck = this.getLuck();
                report.morale = this.getMorale();
                report.ramDamage = this.getRamDamage();
                report.reportId = this.getReportId();
                report.resources = this.getResources();        
                report.unitsOutside = this.getUnitsOutside();
                report.unitsInTransit = this.getUnitsInTransit();
        
                report.attackerSurvivors = report.attackerQuantity.subtract(report.attackerLosses);
        
                if (report.defenderQuantity) {
                    report.defenderSurvivors = report.defenderQuantity.subtract(report.defenderLosses);
                }
        
                if (!report.buildingLevels && (report.ramDamage || report.catDamage)) {
                    report.buildingLevels = new Buildings_BuildingLevels('?');
                    if (report.ramDamage) {
                        report.buildingLevels.wall = report.ramDamage.levelAfter;
                    }
                    if (report.catDamage) {
                        report.buildingLevels[report.catDamage.buildingType] = report.catDamage.levelAfter;
                    }
                }
        
        
        
                return report;
            }
        
            /**
             * @return {Player}
             */
            getAttacker() {
                var playerCell = this.attackerTable.rows[0].cells[1];
                return scrapePlayer(playerCell);
            }
        
            /**
             * @return {TroopCounts}
             */
            getAttackerLosses() {
                return scrapeTroopCounts(removeTroopsLabel(this.attackerUnitsTable.rows[2]));
            }
        
            /**
             * @return {TroopCounts}
             */
            getAttackerQuantity() {
                return scrapeTroopCounts(removeTroopsLabel(this.attackerUnitsTable.rows[1]));
            }
        
            /**
             * @return {Village}
             */
            getAttackerVillage() {
                return scrapeVillage(this.attackerTable.rows[1].cells[1].firstChild.firstChild);
            }
        
            /**
             * @return {TwCheeseDate}
             */
            getBattleTime() {
                var text = $(this.mainTable.rows[1].cells[1]).text();
                return parseArrival(text, window.game_data.market);
            }
        
            /**
             * @return {BuildingLevels|null}
             */
            getBuildingLevels() {
                if (this.getEspionageLevel() < 2) {
                    return null;
                }
        
                let levels = new Buildings_BuildingLevels();
                let buildingData = JSON.parse(this.$gameDoc.find('#attack_spy_building_data').val());
                for (let building of buildingData) {
                    levels[building.id] = parseInt(building.level);
                }
                return levels;
            }
        
            /**
             * @return {{buildingType:string, levelBefore:number, levelAfter:number} | null}
             */
            getCatDamage() {
                if (!this.resultsTable) {
                    return null;
                }
                var thElements = this.resultsTable.getElementsByTagName('th');
                let catHeader = textScraper.first(thElements, 'report.catDamage');
                if (!catHeader) {
                    return null;
                }
                let damageCell = catHeader.parentNode.cells[1];
                let buildingType = textScraper.buildingType(damageCell);
                let bElements = damageCell.getElementsByTagName('b');
                return {
                    buildingType,
                    levelBefore: parseInt(bElements[0].innerHTML),
                    levelAfter: parseInt(bElements[1].innerHTML)
                };
            }
        
            /**
             * @return {Player}
             */
            getDefender() {
                var playerCell = this.defenderTable.rows[0].cells[1];
                return scrapePlayer(playerCell);
            }
        
            /**
             * @return {TroopCounts|null}
             */
            getDefenderLosses() {
                if (!this.defenderUnitsTable) {
                    return null;
                }
                return scrapeTroopCounts(removeTroopsLabel(this.defenderUnitsTable.rows[2]));
            }
        
            /**
             * @return {TroopCounts|null}
             */
            getDefenderQuantity() {
                if (!this.defenderUnitsTable) {
                    return null;
                }
                return scrapeTroopCounts(removeTroopsLabel(this.defenderUnitsTable.rows[1]));
            }
        
            /**
             * @return {Village}
             */
            getDefenderVillage() {
                return scrapeVillage(this.defenderTable.rows[1].cells[1].firstChild.firstChild);
            }
        
            /**
             * @return {string} color: blue, green, yellow, or red
             */
            getDotColor() {
                return $(this.mainTable.rows[0].cells[1])
                    .find('img[src*="dots/"]')
                    .attr('src')
                    .match(/dots\/(.+).png/)[1];
            }
        
            /**
             * @return {number} espionageLevel
             *-------- level -------------
                * value	significance
                * 0		nothing scouted
                * 1		resources
                * 2		buildings
                * 3		external troops
                */
            getEspionageLevel() {
                var spied_resources = this.$gameDoc.find('#attack_spy_resources').length > 0;
                var spied_buildings = this.$gameDoc.find('#attack_spy_building_data').length > 0;
                var spied_external = this.$gameDoc.find('#attack_spy_away').length > 0;
                return Number(Number(spied_resources) + Number(spied_buildings) + Number(spied_external));
            }
        
            /**
             * @return {Resources|null}
             */
            getHaul() {
                if (!this.resultsTable) {
                    return null;
                }
                var thElements = this.resultsTable.getElementsByTagName('th');
                let haulHeader = textScraper.first(thElements, 'report.haul');
                if (!haulHeader) {
                    return null;
                }
                return scrapeResources(haulHeader.parentNode.cells[1]);
            }
        
            /**
             * @return {number}
             */
            getLuck() {
                var luckString = this.luckTable.getElementsByTagName('b')[0].innerHTML;
                return new Number(luckString.substring(0, luckString.indexOf('%')));
            }
        
            /**
             * @return {{before:number, after:number} | null}
             */
            getLoyalty() {
                if (!this.resultsTable) {
                    return null;
                }
                var thElements = this.resultsTable.getElementsByTagName('th');
                let loyaltyHeader = textScraper.first(thElements, 'report.loyalty');
                if (!loyaltyHeader) {
                    return null;
                }
                var bElements = loyaltyHeader.parentNode.getElementsByTagName('b');
                return {
                    before: parseInt(bElements[0].innerHTML),
                    after: parseInt(bElements[1].innerHTML)
                };
            }
        
            /**
             * @return {number|null}
             */
            getMorale() {
                let moraleContainer = this.gameDoc.getElementById('attack_moral'); // todo: there's no such thing
                if (!moraleContainer) {
                    return null;            
                }
                var moraleString = moraleContainer.getElementsByTagName('h4')[0].innerHTML;
                return new Number(moraleString.substring(moraleString.indexOf(' ') + 1, moraleString.indexOf('%')));
            }
        
            /**
             * @return {{levelBefore:number, levelAfter:number} | null}
             */
            getRamDamage() {
                if (!this.resultsTable) {
                    return null;
                }
                var thElements = this.resultsTable.getElementsByTagName('th');
                let ramHeader = textScraper.first(thElements, 'report.ramDamage');
                if (!ramHeader) {
                    return null;
                }
                var bElements = ramHeader.parentNode.getElementsByTagName('b');
                return {
                    levelBefore: parseInt(bElements[0].innerHTML),
                    levelAfter: parseInt(bElements[1].innerHTML)
                };
            }
        
            /**
             * @return {number}
             */
            getReportId() {
                return parseInt(this.gameDoc.URL.match(/view=(\d+)/)[1]);
            }
        
            /**
             * @return {Resources|null}
             */
            getResources() {
                let resContainer = this.$gameDoc.find('#attack_spy_resources').find('td')[0];
                if (!resContainer) {
                    return null;
                }
                return scrapeResources(resContainer);
            }
        
            /**
             * "Defender's troops in other villages"
             * Only visible if the village was conquered.
             * @return {StationedTroops[]}
             */
            getSupportKilled() {
                if (!this.supportKilledTable) {
                    return [];
                }
                let supportKilled = [];
                for (let row of this.supportKilledTable.rows) {
                    let troopCounts = scrapeTroopCounts(removeTroopsLabel(row));
                    let village = scrapeVillage(row.cells[0].firstChild);
                    supportKilled.push(new StationedTroops(troopCounts, village));
                }
                return supportKilled;
            }
        
            /**
             * only visible if the village was conquered
             * @return {TroopCounts|null}
             */
            getUnitsInTransit() {
                var h4elements = this.gameDoc.getElementsByTagName('h4');
                let transitHeader = textScraper.first(h4elements, 'report.unitsInTransit');
                if (!transitHeader) {
                    return null;
                }
                return scrapeTroopCounts(transitHeader.nextSibling.nextSibling.rows[1]);
            }
        
            /**
             * @return {TroopCounts|null}
             */
            getUnitsOutside() {
                if (this.getEspionageLevel() < 3) {
                    return null;
                }
                return scrapeTroopCounts(this.$gameDoc.find('#attack_spy_away').find('table')[0].rows[1]);
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/AttackIcons.js
        
        
        
        let bits = {
            SENT_VIA_FA: 1,
            CONTAINS_SNOB: 2,
            CONTAINS_KNIGHT: 4,
            SIZE_SMALL: 8,
            SIZE_MEDIUM: 16,
            SIZE_LARGE: 32,
            CONTAINS_SPY: 64
        };
        
        
        let sizeThresholds = [
            [5001, bits.SIZE_LARGE],
            [1001, bits.SIZE_MEDIUM],
            [1, bits.SIZE_SMALL]
        ];
        
        
        let Icons = new Map([
            [bits.SENT_VIA_FA, {
                src: ImageSrc["a" /* ImageSrc */].attackSentViaFa,
                description: 'Looting attack'
            }],
            [bits.SIZE_SMALL, {
                src: ImageSrc["a" /* ImageSrc */].attackSizeSmall,
                description: 'Small attack (1-1000 troops)'
            }],
            [bits.SIZE_MEDIUM, {
                src: ImageSrc["a" /* ImageSrc */].attackSizeMedium,
                description: 'Medium attack (1000-5000 troops)'
            }],
            [bits.SIZE_LARGE, {
                src: ImageSrc["a" /* ImageSrc */].attackSizeLarge,
                description: 'Large attack (5000+ troops)'
            }],
            [bits.CONTAINS_SNOB, {
                src: ImageSrc["a" /* ImageSrc */].attackContainsSnob,
                description: 'Contains Nobleman'
            }],
            [bits.CONTAINS_SPY, {
                src: ImageSrc["a" /* ImageSrc */].attackContainsSpy,
                description: 'Contains Scouts'
            }],
            [bits.CONTAINS_KNIGHT, {
                src: ImageSrc["a" /* ImageSrc */].attackContainsKnight,
                description: 'Contains Paladin'
            }],
        ]);
        
        
        class AttackIcons {
            constructor(mask = 0) {
                this.mask = mask;
            }
        
            getIcons() {
                let icons = [];
                for (let [bit, icon] of Icons) {
                    if (this.mask & bit) {
                        icons.push(icon);
                    }
                }
                return icons;
            }
        
            getMask() {
                return this.mask;
            }
        
            setSentViaFa() {
                this.mask |= bits.SENT_VIA_FA;
            }
        
            setContainsSnob() {
                this.mask |= bits.CONTAINS_SNOB;
            }
        
            setContainsSpy() {
                this.mask |= bits.CONTAINS_SPY;
            }
        
            setContainsKnight() {
                this.mask |= bits.CONTAINS_KNIGHT;
            }
        
            setSizeSmall() {
                this.mask |= bits.SIZE_SMALL;
            }
        
            setSizeMedium() {
                this.mask |= bits.SIZE_MEDIUM;
            }
        
            setSizeLarge() {
                this.mask |= bits.SIZE_LARGE;
            }
        
            /**
             * @param {TroopCounts} troops
             * @param {boolean} wasSentViaFa
             * @return {AttackIcons}
             */
            static fromTroopCounts(troops, wasSentViaFa = false) {
                let mask = 0;
                if (wasSentViaFa) {
                    mask |= bits.SENT_VIA_FA;
                }
                if (troops.snob > 0) {
                    mask |= bits.CONTAINS_SNOB;
                }
                if (troops.knight > 0) {
                    mask |= bits.CONTAINS_KNIGHT;
                }
                if (troops.spy > 0) {
                    mask |= bits.CONTAINS_SPY;
                }
                if (!wasSentViaFa) {
                    let sum = troops.sum();
                    for (let [threshold, bit] of sizeThresholds) {
                        if (sum >= threshold) {
                            mask |= bit;
                            break;
                        }
                    }
                }
                return new AttackIcons(mask);
            }
        
        }
        
        
        
        
        // CONCATENATED MODULE: ./src/Scrape/AttackIconsScraper.js
        
        
        
        class AttackIconsScraper_AttackIconsScraper {
            /**
             * @param {HTMLImageElement} imgElements
             * @return {AttackIcons}
             */
            scrapeIcons(imgElements) {
                let icons = new AttackIcons();
        
                for (let img of imgElements) {
                    if (img.src.includes('command/farm.png')) {
                        icons.setSentViaFa();
                    }
                    else if (img.src.includes('command/snob.png')) {
                        icons.setContainsSnob();
                    }
                    else if (img.src.includes('command/spy.png')) {
                        icons.setContainsSpy();
                    }
                    else if (img.src.includes('command/knight.png')) {
                        icons.setContainsKnight();
                    }
                    else if (img.src.includes('command/attack_small.png')) {
                        icons.setSizeSmall();
                    }
                    else if (img.src.includes('command/attack_medium.png')) {
                        icons.setSizeMedium();
                    }
                    else if (img.src.includes('command/attack_large.png')) {
                        icons.setSizeLarge();
                    }
                }
        
                return icons;
            }
        }
        
        
        // CONCATENATED MODULE: ./src/Scrape/BattleReportCondensedScraper.js
        
        
        
        
        
        /**
         * scrapes listed reports from
         *     - game.php?screen=report&mode=attack
         *     - game.php?screen=report&mode=defense
         * 
         */
        class BattleReportCondensedScraper_BattleReportCondensedScraper {
        
            /**
             * @param {ReportRenamer} reportRenamer 
             */
            constructor(reportRenamer) {
                this.reportRenamer = reportRenamer;
                this.attackIconsScraper = new AttackIconsScraper_AttackIconsScraper();
            }
        
            /**
             * @param {HTMLTableElement} reportsTable
             * @return {BattleReportCondensed[]}
             */
            scrapeReports(reportsTable) {
                let reports = [];
                for (var i = 1; i < reportsTable.rows.length - 1; i++) {
                    let report = this.scrapeReport(reportsTable.rows[i]);
                    reports.push(report);
                }
                return reports;
            }
        
            /**
             * @param {HTMLTableRowElement} row
             * @return {BattleReportCondensed}
             */
            scrapeReport(row) {
                let reportLink = row.cells[1].getElementsByTagName('a')[0];
                let reportName = reportLink.getElementsByTagName('span')[0].innerHTML;
                let reportIcons = [...row.cells[1].getElementsByTagName('img')];
        
                let report = this.reportRenamer.parseName(reportName);
                report.reportId = parseInt(reportLink.href.match(/view=(\d+)/)[1]);
                report.dotColor = reportIcons.find(img => img.src.includes('graphic/dots/')).src.match(/dots\/(.+).png/)[1];
                report.isForwarded = !!reportIcons.find(img => img.src.includes('graphic/forwarded.png'));
                report.isNew = $(row.cells[1]).text().trim().endsWith(textScraper.t('report.unread'));
                report.strTimeReceived = row.cells[2].innerHTML;
                report.haulStatus = this.determineHaulStatus(reportIcons);
                report.attackIcons = this.attackIconsScraper.scrapeIcons(reportIcons);
        
                return report;
            }
        
            /**
             * @param {HTMLImageElement[]} reportIcons
             * @return int
             */
            determineHaulStatus(reportIcons) {
                let lootImg = reportIcons.find(img => img.src.includes('graphic/max_loot/'));
                if (!lootImg) {
                    // Note: non-premium users don't get an icon showing partial/full haul.
                    // Scout reports don't have this icon either.
                    return BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_UNKNOWN
                }
                if (lootImg.src.includes('max_loot/0.png')) {
                    return BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_PARTIAL;
                }
                return BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_FULL;        
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/KillScores.js
        let scoreDefenderDied = {
            spear: 4,
            sword: 5,
            axe: 1,
            archer: 5,
            spy: 1,
            light: 5,
            marcher: 6,
            heavy: 23,
            ram: 4,
            catapult: 12,
            knight: 40,
            snob: 200,
            militia: 4
        };
        
        let scoreAttackerDied = {
            spear: 1,
            sword: 2,
            axe: 4,
            archer: 2,
            spy: 2,
            light: 13,
            marcher: 12,
            heavy: 15,
            ram: 8,
            catapult: 10,
            knight: 20,
            snob: 200,
            militia: 1
        };
        
        
        /**
         * @param {TroopCounts} defenderLosses
         */
        function calcAttackerScore(defenderLosses) {
            let attackerScore = 0;
            for (let [unitType, count] of Object.entries(defenderLosses)) {
                if (typeof scoreDefenderDied[unitType] === 'undefined') {
                    console.warn(`Couldn't determine ODA score for ${unitType}`);
                    continue;
                }
                attackerScore += scoreDefenderDied[unitType] * count;
            }
            return attackerScore;
        }    
        
        
        /**
         * @param {TroopCounts} attackerLosses
         */
        function calcDefenderScore(attackerLosses) {
            let defenderScore = 0;
            for (let [unitType, count] of Object.entries(attackerLosses)) {
                if (typeof scoreAttackerDied[unitType] === 'undefined') {
                    console.warn(`Couldn't determine ODD score for ${unitType}`);
                    continue;
                }
                defenderScore += scoreAttackerDied[unitType] * count;
            }
            return defenderScore;
        }
        
        
        
        
        // CONCATENATED MODULE: ./src/Models/Loyalty.js
        
        
        
        
        /**
         * @param {number} reportedLoyalty
         * @param {Date} timeReported
         * @param {Date} timeNow
         * @param {Village|{x:number, y:number}} home
         * @param {Village} target
         * @return {{loyaltyNow:Number, loyatyAtArrival:Number}}
         */
        function calcLoyalty(reportedLoyalty, timeReported, timeNow, home, target) {
            if (reportedLoyalty <= 0) {
                reportedLoyalty = 25; // loyalty jumps to 25 after a village is conquered
            }
        
            let hourlyGain = gameConfig.get('speed');
        
            let hoursPassed = (timeNow - timeReported) / 3600000;
            let loyaltyNow = Math.min(100, Math.floor(reportedLoyalty + hoursPassed * hourlyGain));
        
            let distance = target.distanceTo(home);
            let travelHours = troopUtil.travelDuration('snob', distance) / 3600000;
            let loyaltyAtArrival = Math.min(100, Math.floor(loyaltyNow + travelHours * hourlyGain));
        
            return {loyaltyNow, loyaltyAtArrival};
        }
        
        
        
        
        // EXTERNAL MODULE: ./src/Util/UI.js
        var UI = __webpack_require__(3);
        
        // CONCATENATED MODULE: ./src/Transform/enhanceBattleReport.js
        
        
        
        
        
        
        
        
        
        /**
         * @param {HTMLDocument} gameDoc 
         * @param {BattleReport} report
         */
        function enhanceBattleReport(gameDoc, report) {
        
            var reportTable = gameDoc.getElementById('attack_luck').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        
            /*==== surviving defenders ====*/
            if (gameDoc.getElementById('attack_info_def_units')) {
                var defenseUnitsTable = gameDoc.getElementById('attack_info_def_units');
                let rowAbove = defenseUnitsTable.rows[defenseUnitsTable.rows.length - 1];
                let survivorsRow = defenseUnitsTable.insertRow(-1);
                survivorsRow.className = "center";
                survivorsRow.insertCell(-1);
                survivorsRow.cells[0].innerHTML = 'Survivors:';
                survivorsRow.cells[0].align = 'left';
                
                for (let unitType of troopUtil.troopTypesOnWorld()) {
                    if (survivorsRow.cells.length >= rowAbove.cells.length) {
                        break;
                    }
                    let cell = survivorsRow.insertCell(-1);
                    let unitCount = report.defenderSurvivors[unitType];
                    if (unitCount === 0) {
                        cell.className = 'hidden';
                    }
                    cell.innerHTML = unitCount;
                }
            }
        
            /*==== surviving attackers ====*/
            if (gameDoc.getElementById('attack_info_att_units')) {
                var unit_table = gameDoc.getElementById('attack_info_att_units');
                let rowAbove = unit_table.rows[unit_table.rows.length - 1];
                let survivorsRow = unit_table.insertRow(-1);
                survivorsRow.className = "center";
                survivorsRow.insertCell(-1);
                survivorsRow.cells[0].innerHTML = 'Survivors:';
                survivorsRow.cells[0].align = 'left';
        
                for (let unitType of troopUtil.troopTypesOnWorld()) {
                    if (survivorsRow.cells.length >= rowAbove.cells.length) {
                        break;
                    }
                    let cell = survivorsRow.insertCell(-1);
                    let unitCount = report.attackerSurvivors[unitType];
                    if (unitCount === 0) {
                        cell.className = 'hidden';
                    }
                    cell.innerHTML = unitCount;
                }
            }
        
            /*==== population summary ====*/
            if (report.espionageLevel >= 2) {
                let population = report.calcPopulation();
                let idleLabel = (report.espionageLevel === 3) ? 'Idle' : 'Unknown';
        
                $(gameDoc).find('#attack_spy_buildings_right')
                    .after(`
                        <table>
                            <tr>
                                <th>Population:</th>
                                <td>
                                    Buildings <b>(${population.buildings})</b>
                                    <br/>Military <b>(${population.troops})</b>
                                    <br/>${idleLabel} <b>(${population.idle})</b>
                                </td>
                            </tr>
                        </table>
                    `);
            }
        
            /*==== loyalty ====*/
            if (report.loyalty) {
                let now = TwCheeseDate_TwCheeseDate.newServerDate();
                let loyaltyExtra = calcLoyalty(report.loyalty.after, report.battleTime, now, game_data.village, report.defenderVillage);
        
                var resultsHeaders = gameDoc.getElementById('attack_results').getElementsByTagName('th');
                var loyaltyRow = textScraper.first(resultsHeaders, 'report.loyalty').parentNode;
                var loyaltyHTML = loyaltyRow.cells[1].innerHTML;
                loyaltyRow.removeChild(loyaltyRow.cells[1]);
                loyaltyRow.insertCell(-1);
                loyaltyRow.cells[1].innerHTML = loyaltyHTML;
                loyaltyRow.cells[1].innerHTML += '<br/><span title="the current predicted loyalty, based on time passed since this report">@Current Time: ' + loyaltyExtra.loyaltyNow + '</span>';
                loyaltyRow.cells[1].innerHTML += '<br/><span title="the predicted loyalty at time of arrival, should you send a nobleman from your current village right now">@Arrival: ' + loyaltyExtra.loyaltyAtArrival + '</span>';
            }
        
            /*==== opponents defeated ====*/
            var oddRow = gameDoc.getElementById('attack_info_att').insertRow(-1);
            var oddHeader = document.createElement('th');
            oddHeader.innerHTML = 'ODD:';
            oddRow.appendChild(oddHeader);
            oddRow.insertCell(-1);
            oddRow.cells[1].innerHTML = `The defender gained ${calcDefenderScore(report.attackerLosses)} points.`;
        
            var odaRow = gameDoc.getElementById('attack_info_def').insertRow(-1);
            var odaHeader = document.createElement('th');
            odaHeader.innerHTML = 'ODA:';
            odaRow.appendChild(odaHeader);
            odaRow.insertCell(-1);
            if (!report.defenderQuantity) {
                odaRow.cells[1].innerHTML = 'Not enough information.'
            } else {
                odaRow.cells[1].innerHTML = `The attacker gained ${calcAttackerScore(report.defenderLosses)} points.`;
            }
        
            /*==== timing info ====*/
            let timingInfo = report.calcTimingInfo();
        
            if (!reportTable.rows) //6.5 graphics
                reportTable = reportTable.getElementsByTagName('table')[1];
            var launchRow = reportTable.insertRow(2);
        
            launchRow.insertCell(-1);
            launchRow.cells[0].innerHTML = '<span title="the time the attacker sent the attack">Launched</span>';
            launchRow.insertCell(-1);
            launchRow.cells[1].innerHTML = timingInfo.launchTime.toHtml();
        
            /*==== determine whether return time should be displayed. ====*/
            let showReturnTime = !report.attackerSurvivors.isZero();
        
            var returnRow = reportTable.insertRow(3);
            returnRow.insertCell(-1);
            if (showReturnTime) {
                returnRow.cells[0].innerHTML = '<span title="the time the attacking troops return to the attacker\'s village">Returns</span>';
                returnRow.insertCell(-1);
                returnRow.cells[1].innerHTML = timingInfo.returnTime.toHtml();
            }
        
            /*==== rally point Manage Troops link ====*/
            let isDefenderMe = report.defender.name == game_data.player.name;
            let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
            if (isDefenderMe || wasVillageConquered) {
                let url = gameUrl('place', {mode:'units', village:report.defenderVillage.id});
                let linkHtml = `<a href="${url}" style="float: right;">
                    <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc["a" /* ImageSrc */].buildingIcon('place')}" />
                </a>`;
                let defenderVillageCell = gameDoc.getElementById('attack_info_def').rows[1].cells[1];
                defenderVillageCell.appendChild($(linkHtml)[0]);
            }
        
            /*==== json representation ====*/
            var jsonRow = reportTable.insertRow(5);
            jsonRow.insertCell(-1);
            jsonRow.cells[0].colSpan = 2;
            jsonRow.cells[0].innerHTML = '<b>JSON</b><br/><textarea cols=50 readonly=true>' + Object(UI["a" /* escapeHtml */])(JSON.stringify(report, null, 2)) + '</textarea>';
        }
        
        
        
        // CONCATENATED MODULE: ./src/Transform/spawnLegacyHelpButton.js
        
        
        
        var spawnLegacyHelpButton_language = { "twcheese": {} };
        switch (game_data.market) {
            default:
                /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
                spawnLegacyHelpButton_language['twcheese']['Help'] = 'Help';
                break;
        
            case 'cz':
                /*==== divokekmeny.cz/ ====*/
                spawnLegacyHelpButton_language['twcheese']['Help'] = 'Pomoc';
                break;
        
            case 'se':
                spawnLegacyHelpButton_language['twcheese']['Help'] = 'Hjälp';
                break;
        
            /*==== fyletikesmaxes.gr/ ====*/
            case 'gr':
                spawnLegacyHelpButton_language['twcheese']['Help'] = 'Βοήθεια';
                break;
        
            /* Norwegian */
            case 'no':
                spawnLegacyHelpButton_language['twcheese']['Help'] = 'Hjelp';
                break;
                                
        }
        
        
        /**
         *	@param	address:String	(optional) if included, causes the button to open a new window when clicked, directing the page to the specified address
         */
        function spawnLegacyHelpButton(address) {
            var twcheese_menu = document.createElement('div');
            twcheese_menu.style.textAlign = 'center';
        
            var twcheese_menu_text = document.createElement('p');
            twcheese_menu_text.style.fontSize = '9pt';
            twcheese_menu_text.innerHTML = spawnLegacyHelpButton_language['twcheese']['Help'];
            twcheese_menu_text.style.fontWeight = '700';
            twcheese_menu_text.style.marginTop = '3px';
            twcheese_menu_text.style.color = '#422301';
            twcheese_menu.appendChild(twcheese_menu_text);
        
            twcheese_menu.style.background = `url("${ImageSrc["a" /* ImageSrc */].legacy.helpBackground}")`;
            twcheese_menu.style.height = '22px';
            twcheese_menu.style.width = '49px';
            twcheese_menu.style.display = 'block';
            twcheese_menu.style.position = 'fixed';
            twcheese_menu.style.left = '100%';
            twcheese_menu.style.top = '100%';
            twcheese_menu.style.marginTop = '-24px';
            twcheese_menu.style.marginLeft = '-52px';
            twcheese_menu.style.zIndex = '99999999999';
        
            twcheese_menu.onmouseover = function () { this.style.background = `url("${ImageSrc["a" /* ImageSrc */].legacy.helpBackgroundBright}")` };
            twcheese_menu.onmouseout = function () { this.style.background = `url("${ImageSrc["a" /* ImageSrc */].legacy.helpBackground}")` };
        
            if (address) {
                twcheese_menu.style.cursor = 'pointer';
                twcheese_menu.onclick = function () { window.open(address, 'twcheese_menu_window') };
            }
            else
                twcheese_menu.style.cursor = 'default';
        
            return document.body.appendChild(twcheese_menu);
        }
        
        
        
        // EXTERNAL MODULE: ./src/Widget/AbstractWidget.js
        var AbstractWidget = __webpack_require__(2);
        
        // CONCATENATED MODULE: ./src/Widget/ReportRaiderWidget.js
        
        
        
        
        
        
        
        
        class ReportRaiderWidget_ReportRaiderWidget extends AbstractWidget["a" /* AbstractWidget */] {
            constructor(report) {
                super();
                this.report = report;
        
                this.raiderTroopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy']
                    .filter(troopType => troopUtil.existsOnWorld(troopType));
        
                this.initStructure();
                this.watchSelf();
                this.applyUserConfig();
        
                if (!this.mayFillRallyPoint()) {
                    this.$scoutsContainer.hide();
                }
            }
        
            mayFillRallyPoint() {
                // uk rules forbid filling units into rally point
                return window.game_data.market !== 'uk';
            }
        
            initStructure() {
                this.$el = $(this.createHtml().trim());
                this.$raidMode = this.$el.find('#twcheese_raider_selection');
                this.$haulBonus = this.$el.find('#twcheese_raider_haulBonus');
                this.$period = this.$el.find('#twcheese_period');
                this.$periodContainer = this.$el.find('#twcheese_periodic_options');
                this.$scouts = this.$el.find('#twcheese_raider_scouts');
                this.$scoutsContainer = this.$el.find('#twcheese_raider_scout');
                this.$buttonSetDefault = this.$el.find('.twcheese-button-set-default');
        
                let raiderUnitsTable = this.$el.find('#twcheese_raider_units')[0];
                this.$raiderLinks = $(raiderUnitsTable.rows[0]).find('a');
                this.$raiderTroopCounts = $(raiderUnitsTable.rows[1].cells);
            }
        
            createHtml() {
                let report = this.report;
                let travelTimes = calcTravelDurations(report.attackerVillage.distanceTo(report.defenderVillage));
                let rallyPointUrl = gameUrl('place', {target: report.defenderVillage.id});
        
                let raidModeOptions = [];
                if (report.espionageLevel >= 1) { // resources were scouted
                    raidModeOptions.push(`<option value="scouted">raid scouted resources</option>`);
                }
                if (report.espionageLevel >= 2) { // buildings were scouted
                    raidModeOptions.push(`<option value="predicted">raid predicted resources</option>`);
                    raidModeOptions.push(`<option value="periodic">periodically raid resources</option>`);
                }        
        
                let iconCells = [];
                let troopCountCells = [];
                let travelTimeCells = [];
                for (let troopType of this.raiderTroopTypes) {
                    if (this.mayFillRallyPoint()) {
                        iconCells.push(`<td width="35px"><a><img src="${ImageSrc["a" /* ImageSrc */].troopIcon(troopType)}"></a></td>`);
                    } else {
                        iconCells.push(`<td width="35px"><img src="${ImageSrc["a" /* ImageSrc */].troopIcon(troopType)}"></td>`);
                    }
                    troopCountCells.push('<td></td>');
                    travelTimeCells.push(`<td>${window.Format.timeSpan(travelTimes[troopType])}</td>`);
                }
        
                return `
                    <table id="twcheese_raider_calculator">
                        <tr>
                            <td><span align="center"><h2>Raiders</h2></span></td>
                        </tr>
                        <tr align="center">
                            <td>
                                <select id="twcheese_raider_selection">
                                    ${raidModeOptions.join('')}
                                </select>
                                <a href="${rallyPointUrl}">&raquo; Send troops</a>
                                <div>
                                    Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size="5" value="0"/>%
                                </div>
                                <div id="twcheese_periodic_options">
                                    Period (hours): <input id="twcheese_period" type="text" size="4" value="8"/>
                                </div>
                                <button class="twcheese-button-set-default">Use current selection as default</button>
                            </td>
                        </tr>
                        <tr align="center">
                            <td>
                                <table id="twcheese_raider_units" class="vis overview_table" style="border: 1px solid">
                                    <tr class="center">${iconCells.join('')}</tr>
                                    <tr class="center">${troopCountCells.join('')}</tr>
                                    <tr class="center">${travelTimeCells.join('')}</tr>
                                </table>
                            </td>
                            <td>
                                <table id="twcheese_raider_scout" class="vis overview_table" style="border: 1px solid">
                                    <tr class="center">
                                        <td width="35px">
                                            <img src="${ImageSrc["a" /* ImageSrc */].troopIcon('spy')}" title="Number of scouts to send when a unit icon to the left is clicked">
                                        </td>
                                    </tr>
                                    <tr class="center">
                                        <td>
                                            <input id="twcheese_raider_scouts" type="number" size="3" value="0" min="0">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `;
            }
        
            watchSelf() {
                this.$raidMode.on('change', () => {
                    this.updateRaiders();
                });
        
                this.$haulBonus.on('input', () => {
                    this.updateRaiders();
                });
        
                this.$period.on('input', () => {
                    this.updateRaiders();
                });
        
                this.$scouts.on('input', () => {
                    userConfig.set('ReportRaiderWidget.raidScouts', this.getScouts());
                    this.updateRaiders();
                });
        
                this.$buttonSetDefault.on('click', () => {
                    userConfig.set('ReportRaiderWidget.raidMode', this.getRaidMode());
                    userConfig.set('ReportRaiderWidget.haulBonus', this.getHaulBonus());
                    userConfig.set('ReportRaiderWidget.raidPeriodHours', this.getPeriod());
                    window.UI.SuccessMessage('Settings Saved', 2000);
                });
            }
        
            applyUserConfig() {
                let haulBonus = userConfig.get('ReportRaiderWidget.haulBonus', 0);
                this.$haulBonus.val(haulBonus);
        
                let period = userConfig.get('ReportRaiderWidget.raidPeriodHours', 8);
                this.$period.val(period);        
        
                let scouts = userConfig.get('ReportRaiderWidget.raidScouts', 0);
                this.$scouts.val(scouts);
                
                let raidMode = userConfig.get('ReportRaiderWidget.raidMode', 'scouted');
                this.$raidMode.val(raidMode);
        
                this.updateRaiders();
            }
        
            updateRaiders() {
                let mode = this.getRaidMode();
                let haulBonus = this.getHaulBonus();
                let period = this.getPeriod();
                let report = this.report;
        
                if (mode === 'scouted') {            
                    let raiders = report.calcRaidScouted(haulBonus);
                    this.setRaiders(raiders);
                    this.$periodContainer.hide();
                }
                else if (mode === 'predicted') {
                    let raiders = report.calcRaidPredicted(window.game_data.village, TwCheeseDate_TwCheeseDate.newServerDate(), haulBonus);
                    this.setRaiders(raiders);
                    this.$periodContainer.hide();
                }
                else if (mode === 'periodic') {
                    let raiders = report.calcRaidPeriodic(period, haulBonus);
                    this.setRaiders(raiders);
                    this.$periodContainer.show();
                }
            }
        
            /**
             * @param {TroopCounts} troopCounts
             */
            setRaiders(troopCounts) {
                let spyCount = this.getScouts();
                let attackUrl = (troopType, count) => {
                    return attackPrepUrl({spy: spyCount, [troopType]: count}, this.report.defenderVillage.id);
                }
        
                for (let [i, troopType] of Object.entries(this.raiderTroopTypes)) {
                    let troopCount = troopCounts[troopType];
                    this.$raiderTroopCounts.eq(i).text(troopCount);
                    if (!this.mayFillRallyPoint()) {
                        continue;
                    }
                    let url = attackUrl(troopType, Math.round(troopCount));
                    this.$raiderLinks.eq(i).attr('href', url);
                }
            }
        
            getRaidMode() {
                return this.$raidMode.val();
            }
        
            getHaulBonus() {
                return parseFloat(this.$haulBonus.val()) || 0;
            }
        
            getPeriod() {
                return parseFloat(this.$period.val()) || 0;
            }
        
            getScouts() {
                return parseFloat(this.$scouts.val()) || 0;
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportRenamerWidget.js
        
        
        
        
        
        
        class ReportRenamerWidget_ReportRenamerWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {ReportRenamer} renamer 
             * @param {BattleReport} report      
             */
            constructor(renamer, report) {
                super();
                this.renamer = renamer;
                this.report = report;
        
                this.initStructure();
                this.watchSelf();
                this.applyUserConfig();
            }
        
            initStructure() {
                this.$el = $(this.createHtml().trim());
                this.$note = this.$el.find('#twcheese_note');
                this.$renameButton = this.$el.find('button');
                this.$autoRename = this.$el.find('#twcheese_auto_rename');
                this.$namePreview = this.$el.find('#twcheese_rename_preview');
                this.$availableChars = this.$el.find('#twcheese_availableCharacters');
            }
        
            createHtml() {
                let renamer = this.renamer;
                let name = renamer.createName(this.report, '');
        
                return `
                    <div id="twcheese_renamer" align="center">
                        <span align="center"><h2>Renamer</h2></span>
                        note <input id="twcheese_note" type="text"/>
                        <button>rename</button>
                        <input id="twcheese_auto_rename" type="checkbox" />auto rename
                        <img id="twcheese_autoRenameInfo" src="${ImageSrc["a" /* ImageSrc */].info}" width="13" height="13" title="automatically rename reports when the BRE is used" />
                        <br/> characters available: <span id="twcheese_availableCharacters">${renamer.availableChars(name)}</span>
                        <br/><b>Preview: </b><span id="twcheese_rename_preview">${Object(UI["a" /* escapeHtml */])(name)}</span>
                    </div>
                `;
            }
        
            watchSelf() {
                let renamer = this.renamer;
        
                this.$note.on('input', () => {
                    let name = renamer.createName(this.report, this.$note.val());
                    this.$namePreview.text(name);
                    this.$availableChars.text(renamer.availableChars(name));
                });
        
                this.$renameButton.on('click', () => {
                    this.renamer.rename(this.report, this.$note.val());
                });
        
                this.$autoRename.on('click', function() {
                    userConfig.set('BattleReportEnhancer.autoRename', this.checked);
                });
            }
        
            applyUserConfig() {
                let autoRename = userConfig.get('BattleReportEnhancer.autoRename', false);
                this.$autoRename.prop('checked', autoRename);
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportToolsWidget.js
        
        
        
        
        
        
        
        
        
        class ReportToolsWidget_ReportToolsWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {BattleReport} report 
             * @param {ReportRenamer} renamer 
             */
            constructor(report, renamer) {
                super();
                this.report = report;
                this.renamer = renamer;
                this.initStructure();
                this.watchSelf();
                this.applyUserConfig();
                this.initChildWidgets();
            }
        
            initStructure() {
                this.$el = $(this.createHtml().trim());
                this.$content = this.$el.find('.widget_content');
                this.$toggleIcon = this.$el.find('.twcheese-toggle-icon');
                this.$raiderContainer = this.$el.find('.twcheese-raider-container');
                this.$renamerContainer = this.$el.find('.twcheese-renamer-container');
            }
        
            createHtml() {
                return `
                    <div id="twcheese_show_report_tools" class="vis widget">
                        <h4>
                            Report Tools
                            <img class="twcheese-toggle-icon" src="${ImageSrc["a" /* ImageSrc */].plus}" style="float:right; cursor:pointer;">
                        </h4>
                        <div class="widget_content" style="display: none">
                            <table id="twcheese_BRE_tools" border="1">
                                <tr>
                                    <td class="twcheese-raider-container" valign="top"></td>
                                    <td valign="top">
                                        ${this.createDemolitionTableHtml()}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="twcheese-renamer-container" colspan="2" valign="top"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;
            }
        
            createDemolitionTableHtml() {
                let report = this.report;
                if (!report.buildingLevels) {
                    return '';
                }
        
                if (report.buildingLevels) {
                    let catHeaders = [];
                    let ramHeaders = [];
                    let catRowOne = [];
                    let catRowTwo = [];
                    let ramRowOne = [];
                    let ramRowTwo = [];
        
                    let suggestedCounts = report.suggestSiegeUnits();
        
                    for (let buildingType of buildingUtil.buildingTypesOnWorld()) {
                        let siegeWeapon = (buildingType === 'wall') ? 'ram' : 'catapult';
        
                        let headerInnerHtml;
                        if (game_data.market == 'uk') {
                            headerInnerHtml = '<img src="' + ImageSrc["a" /* ImageSrc */].buildingIcon(buildingType) + '" />';
                        } else {
                            let troopCounts = {[siegeWeapon]: suggestedCounts.oneShotUpgraded[buildingType]};
                            let rallyPointUrl = attackPrepUrl(troopCounts, report.defenderVillage.id);
                            headerInnerHtml = '<a href="' + rallyPointUrl + '"><img src="' + ImageSrc["a" /* ImageSrc */].buildingIcon(buildingType) + '" /></a>';
                        }
                        let headers = (siegeWeapon === 'ram') ? ramHeaders : catHeaders;
                        headers.push(`<td style="width: 35px;">${headerInnerHtml}</td>`);
        
                        let rowOne = (siegeWeapon === 'ram') ? ramRowOne : catRowOne;
                        let rowTwo = (siegeWeapon === 'ram') ? ramRowTwo : catRowTwo;
                        rowOne.push(`<td>${suggestedCounts.oneShotScouted[buildingType]}</td>`);
                        rowTwo.push(`<td>${suggestedCounts.oneShotUpgraded[buildingType]}</td>`);
                    }
        
                    let demolitionHtml = `
                        <table id="twcheese_demolition_calculator">
                            <tr>
                                <td><span align="center"><h2>Demolition</h2></span></td>
                            </tr>
                            <tr>
                                <td>
                                    <table id="twcheese_demolition_units" class="vis overview_table" style="border: 1px solid;">
                                        <tr class="center">
                                            <td colspan="${catHeaders.length}">
                                                <img src="${ImageSrc["a" /* ImageSrc */].troopIcon('catapult')}" alt="catapults" />
                                            </td>
                                            <td colspan="${ramHeaders.length}">
                                                <img src="${ImageSrc["a" /* ImageSrc */].troopIcon('ram')}" alt="rams" />
                                            </td>
                                        </tr>
                                        <tr class="center">${catHeaders.join('') + ramHeaders.join('')}</tr>
                                        <tr class="center">${catRowOne.join('') + ramRowOne.join('')}</tr>
                                        <tr class="center">${catRowTwo.join('') + ramRowTwo.join('')}<tr/>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    `;
        
                    return demolitionHtml.trim();
                }
            }
        
            watchSelf() {
                this.$toggleIcon.on('click', () => {
                    this.toggleCollapsed();
                });
            }
        
            applyUserConfig() {
                if (!userConfig.get('ReportToolsWidget.collapse', false)) {
                    this.toggleCollapsed();
                }
            }
        
            toggleCollapsed() {
                this.$content.toggle({
                    duration: 200,
                    start: () => {
                        let willCollapse = this.$toggleIcon.attr('src').includes(ImageSrc["a" /* ImageSrc */].minus);
                        this.$toggleIcon.attr('src', willCollapse ? ImageSrc["a" /* ImageSrc */].plus : ImageSrc["a" /* ImageSrc */].minus);
                        userConfig.set('ReportToolsWidget.collapse', willCollapse);
                    }
                });
            }
        
            initChildWidgets() {
                (new ReportRenamerWidget_ReportRenamerWidget(this.renamer, this.report))
                    .appendTo(this.$renamerContainer);
        
                (new ReportRaiderWidget_ReportRaiderWidget(this.report))
                    .appendTo(this.$raiderContainer);
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/columnCategories.js
        
        
        
        
        
        
        
        
        
        var columnCategories_language = { "twcheese": {} };
        switch (game_data.market) {
            default:
                /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
                columnCategories_language['twcheese']['Building'] = 'Building';
                break;
        
            case 'cz':
                /*==== divokekmeny.cz/ ====*/
                columnCategories_language['twcheese']['Building'] = 'budově';
                break;
        
            case 'se':
                columnCategories_language['twcheese']['Building'] = 'Byggnad';
                break;
        
            /*==== fyletikesmaxes.gr/ ====*/
            case 'gr':
                columnCategories_language['twcheese']['Building'] = 'Κτίριο';
                break;
        
            /* Norwegian */
            case 'no':
                columnCategories_language['twcheese']['Building'] = 'Bygning';
                break;
                                
        }
        
        
        function centeredImg(src, tooltip = '') {
            return `<img style="display:block; margin-left:auto; margin-right:auto" src="${src}" title="${tooltip}">`;
        }
        
        
        function villageLink(village) {
            let url = gameUrl('info_village', {id: village.id});
            return `<a href="${url}">${village.x}|${village.y}</a>`;
        }
        
        
        class ColumnCategories extends Map {
        
            getHideableCategories() {
                return this.toArray().filter(category => category.hideable);
            }
        
            toArray() {
                return [...this.values()];
            }
        }
        
        
        let columnCategories_cfg = [
            {
                key: 'essential',
                hideable: false,
                cols: [{
                    width: 120,
                    header: '',
                    createCellHtml(report) {
                        let icons = [`<img src="${ImageSrc["a" /* ImageSrc */].dotIcon(report.dotColor)}">`];
                        if (report.haulStatus !== BattleReportCondensed_BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
                            icons.push(`<img src="${report.haulStatusIconSrc()}">`);
                        }
                        if (report.isForwarded) {
                            icons.push('<img src="graphic/forwarded.png?1">');
                        }
                        let html = `<input name="id_${report.reportId}" type="checkbox"> ${icons.join(' ')}
                            <a href="${gameUrl('report', {mode:game_data.mode, view:report.reportId})}"> view</a>
                        `;
                        if (report.defenderName && report.defenderVillage) {
                            let isDefenderMe = report.defenderName == game_data.player.name;
                            let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
                            if (isDefenderMe || wasVillageConquered) {
                                html += `<a href="${gameUrl('place', {mode:'units', village:report.defenderVillage.id})}">
                                    <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc["a" /* ImageSrc */].buildingIcon('place')}" />
                                </a>`;
                            }
                        }
                        return html;
                    }
                }]
            },
        
            {
                key: 'attackIcons',
                hideable: true,
                description: 'Attack icons',
                cols: [{
                    width: 50,
                    header: '',
                    createCellHtml: (report) => {
                        return report.attackIcons.getIcons().map(icon => {
                            return `<img title="${escapeHtml(icon.description)}" src="${icon.src}">`
                        }).join(' ');
                    }
                }]
            },
        
            {
                key: 'distance',
                hideable: true,
                description: 'Distance',
                cols: [{
                    width: 60,
                    header: 'Distance',
                    createCellHtml: (report) => report.defenderDistance(game_data.village)
                }]
            },
        
            {
                key: 'repeatLinks',
                hideable: true,
                description: 'Links to repeat attack',
                cols: [{
                    width: 50,
                    header: 'Repeat',
                    createCellHtml(report) {
                        if (report.attackerName !== game_data.player.name) {
                            return '';
                        }
                        let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
                        let html = `<a title="repeat attack, from current village" href="${url}"><img src="${ImageSrc["a" /* ImageSrc */].attack}"></a>`;
                        if (report.attackerVillage && report.attackerVillage.id) {
                            let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
                            html += ` | <a title="repeat attack, from original village" href="${url}"><img src="${ImageSrc["a" /* ImageSrc */].attack}"></a>`;
                        }
                        return html;
                    }
                }]
            },
            
            {
                key: 'fullSubject',
                hideable: true,
                startHidden: true,
                description: 'Full subject',
                cols: [{
                    width: 400,
                    header: 'Subject',
                    createCellHtml: (report) => report.subject
                }]
            },
            {
                key: 'note',
                hideable: true,
                startHidden: true,
                description: 'Note',
                cols: [{
                    width: 200,
                    header: 'Note',
                    createCellHtml: (report) => report.note || ''
                }]
            },
            {
                key: 'attackerName',
                hideable: true,
                description: 'Attacker',
                cols: [{
                    width: 150,
                    header: 'Attacker',
                    createCellHtml: (report) => report.attackerName || ''
                }]
            },
            {
                key: 'defenderName',
                hideable: true,
                description: 'Defender',
                cols: [{
                    width: 150,
                    header: 'Defender',
                    createCellHtml: (report) => report.defenderName || ''
                }]
            },
            {
                key: 'attackerVillage',
                hideable: true,
                description: `Attacker's village`,
                cols: [{
                    width: 70,
                    header: 'Origin',
                    createCellHtml(report) {
                        if (!report.attackerVillage) {
                            return '';
                        }
                        return villageLink(report.attackerVillage);
                    }
                }]
            },
            {
                key: 'defenderVillage',
                hideable: true,
                description: `Defender's village`,
                cols: [{
                    width: 70,
                    header: 'Target',
                    createCellHtml(report) {
                        if (!report.defenderVillage) {
                            return '';
                        }
                        return villageLink(report.defenderVillage);
                    }
                }]
            },
            {
                key: 'feint',
                hideable: true,
                description: 'Feint',
                cols: [{
                    width: 50,
                    header: 'Feint',
                    createCellHtml(report) {
                        if (report.wasAttackFeint) {
                            return centeredImg('graphic/dots/grey.png?1', 'The attack contained only a small amount of units');
                        }
                        return '';
                    }
                }]
            },
            {
                key: 'deadNoble',
                hideable: true,
                description: 'Attacking noble died',
                cols: [{
                    width: 50,
                    header: 'Noble',
                    createCellHtml(report) {
                        if (!report.attackerNobleDied) {
                            return '';
                        }
                        let img = centeredImg(ImageSrc["a" /* ImageSrc */].troopIcon('priest'), 'An attacking nobleman died.');
                        if (report.attackerVillage && report.attackerName === game_data.player.name) {
                            let url = gameUrl('snob', {village: report.attackerVillage.id});
                            return `<a href="${url}">${img}</a>`;
                        }
                        return img;
                    }
                }]
            },
            {
                key: 'loyalty',
                hideable: true,
                description: 'Loyalty reported',
                cols: [{
                    width: 50,
                    header: 'Loyalty',
                    createCellHtml(report) {
                        if (report.loyalty) {
                            return '<span class="icon ally lead" title="Loyalty change"></span> ' + report.loyalty.after;
                        }
                        return '';
                    }
                }]
            },
            {
                key: 'defenderSurvivors',
                hideable: true,
                description: 'Troops: Defense remaining',
                title: 'Defense remaining',
                cols: troopUtil.troopTypesOnWorld().map(troopType => {
                    return {
                        width: 20,
                        align: 'center',
                        header: centeredImg(ImageSrc["a" /* ImageSrc */].troopIcon(troopType)),
                        createCellHtml(report) {
                            if (!report.defenderSurvivors) {
                                return '';
                            }
                            let survivorCount = report.defenderSurvivors[troopType];
                            return survivorCount;
                        },
                        cssClass(report) {
                            if (!report.defenderSurvivors) {
                                return '';
                            }
                            let survivorCount = report.defenderSurvivors[troopType];
                            return (survivorCount === 0) ? 'unit-item hidden' : '';
                        }
                    };
                })
            },
        
            ...buildingUtil.buildingTypesOnWorld().map(function(buildingType) {
                return {
                    key: 'buildingLevels.' + buildingType,
                    hideable: true,
                    description: columnCategories_language['twcheese']['Building'] + ': ' + textScraper.t(`buildings.${buildingType}`),
                    cols: [{
                        width: 20,
                        align: 'center',
                        header: centeredImg(ImageSrc["a" /* ImageSrc */].buildingIcon(buildingType)),
                        createCellHtml(report) {
                            if (!report.buildingLevels) {
                                return '';
                            }
                            let level = report.buildingLevels[buildingType];
                            if (level === '?') {
                                return '';
                            }
                            return level;
                        },
                        cssClass(report) {
                            if (!report.buildingLevels) {
                                return '';
                            }
                            let level = report.buildingLevels[buildingType];
                            return ['?', 0].includes(level) ? 'hidden' : '';
                        }
                    }]
                };
            }),
        
            ...Resources_Resources.TYPES.map(function(resType) {
                let resName = {wood:'Timber', stone:'Clay', iron:'Iron'}[resType];
                return {
                    key: `resources.${resType}`,
                    hideable: true,
                    description: `Resources: ${resName}`,
                    cols: [{
                        width: 16,
                        align: 'center',
                        header: centeredImg(ImageSrc["a" /* ImageSrc */][resType]),
                        createCellHtml(report) {
                            if (!report.resources) {
                                return '';                        
                            }
                            return window.Format.number(report.resources[resType].amount);
                        },
                        cssClass(report) {
                            if (!report.resources) {
                                return '';                        
                            }
                            return (report.resources[resType].amount === 0) ? 'hidden' : '';
                        }
                    }]
                };
            }),
        
            {
                key: 'resources.sum',
                hideable: true,
                description: 'Resources: Total',
                cols: [{
                    width: 40,
                    align: 'center',
                    header: 'Total',
                    createCellHtml(report) {
                        if (!report.resources) {
                            return '';                        
                        }
                        return window.Format.number(report.resources.sum());
                    },
                    cssClass(report) {
                        if (!report.resources) {
                            return '';                        
                        }
                        return (report.resources.sum() === 0) ? 'hidden' : '';
                    }
                }]
            },
            {
                key: 'timelaunched',
                hideable: true,
                description: 'Time: Attack launched',
                cols: [{
                    width: 170,
                    header: 'Launched',
                    createCellHtml(report) {
                        if (!report.timeLaunched) {
                            return '';
                        }
                        return report.timeLaunched.toHtml(false);
                    }
                }]
            },
            {
                key: 'strTimeReceived',
                hideable: true,
                description: 'Time: Report received',
                cols: [{
                    width: 140,
                    header: 'Received',
                    createCellHtml: (report) => report.strTimeReceived || ''
                }]
            }
        ];
        
        let columnCategories = new ColumnCategories();
        for (let category of columnCategories_cfg) {
            columnCategories.set(category.key, category);
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/ReportListWidget.js
        
        
        
        
        
        
        
        
        function cellAtIndex(row, i) {
            let endIndex = -1;
            for (let cell of row.cells) {
                let initialColSpan = cell.initialColSpan || cell.colSpan;
                endIndex += initialColSpan;
                if (endIndex >= i) {
                    return cell;
                }
            }
        }
        
        
        class ReportListWidget_ReportListWidget extends AbstractWidget["a" /* AbstractWidget */] {
            /**
             * @param {Map.<number, BattleReportCondensed>} reports 
             */
            constructor(reports) {
                super();
                this.reports = reports;
                this.columnIndexes = new Map();
        
                this.initStructure();
                this.$el.resizable();
                this.watchSelf();
            }
        
            initStructure() {
                var reportsFolderDisplay = document.createElement('div');
                reportsFolderDisplay.id = 'twcheese_reportsFolderDisplay';
                reportsFolderDisplay.style.overflow = 'hidden';
                reportsFolderDisplay.style.position = 'relative';
                reportsFolderDisplay.style.width = '646px';
                reportsFolderDisplay.style.height = '400px';
                reportsFolderDisplay.style.minHeight = '100px';
                reportsFolderDisplay.style.minWidth = '100px';        
        
                /*==== reports table header ====*/
                var reportsTableHeaderDiv = document.createElement('div');
                reportsFolderDisplay.appendChild(reportsTableHeaderDiv);
                reportsTableHeaderDiv.style.overflow = 'hidden';
        
                var reportsTableHeader = document.createElement('table');
                reportsTableHeaderDiv.appendChild(reportsTableHeader);
                reportsTableHeader.style.tableLayout = 'fixed';
                reportsTableHeader.style.width = '2370px';
                reportsTableHeader.id = 'twcheese_reportsTable_header';
        
                /*==== create headers ====*/
                reportsTableHeader.insertRow(-1);
                reportsTableHeader.insertRow(-1);
                reportsTableHeader.insertRow(-1);
        
                let cellIndex = 0;
                for (let category of columnCategories.values()) {
                    let titleTh = document.createElement('th');
                    titleTh.innerHTML = category.title || '';
                    titleTh.initialColSpan = category.cols.length;
                    titleTh.colSpan = category.cols.length;
                    reportsTableHeader.rows[1].appendChild(titleTh);
        
                    let widthSum = 0;
                    let colIndexes = [];
                    for (let col of category.cols) {
                        let alignmentTh = document.createElement('th');
                        alignmentTh.style.width = col.width + 'px';
                        alignmentTh.style.paddingTop = 0;
                        alignmentTh.style.paddingBottom = 0;
                        reportsTableHeader.rows[0].appendChild(alignmentTh);
        
                        let lowerTh = document.createElement('th');
                        lowerTh.innerHTML = col.header;
                        reportsTableHeader.rows[2].appendChild(lowerTh);
        
                        widthSum += col.width;
                        colIndexes.push(cellIndex);
                        cellIndex++;
                    }
                    let borderSpacing = 2 * (category.cols.length - 1);
                    titleTh.style.width = (widthSum + borderSpacing) + 'px';
                    this.columnIndexes.set(category.key, colIndexes);
                }
        
                /*==== reports table body ====*/
                var reportsTableBodyDiv = document.createElement('div');
                reportsFolderDisplay.appendChild(reportsTableBodyDiv);
                reportsTableBodyDiv.style.overflow = 'hidden';
                reportsTableBodyDiv.style.height = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
                reportsTableBodyDiv.style.width = '646px';
                reportsTableBodyDiv.id = 'twcheese_reportsTable';
        
        
                var reportsTableBody = document.createElement('table');
                reportsTableBodyDiv.appendChild(reportsTableBody);
                reportsTableBody.style.tableLayout = 'fixed';
                reportsTableBody.style.width = '2370px';
                reportsTableBody.id = 'twcheese_reportsTable_body';
                reportsTableBody.className = 'vis';
        
                /*==== create first row to match widths to header table ====*/
                reportsTableBody.insertRow(-1);
                for (let alignmentTh of reportsTableHeader.rows[0].cells) {
                    let alignmentCell = reportsTableBody.rows[0].insertCell(-1);
                    alignmentCell.style.width = alignmentTh.style.width;
                    alignmentCell.style.paddingTop = 0;
                    alignmentCell.style.paddingBottom = 0;
                }
        
                /*==== y scroll panel====*/
                var yScrollPanel = document.createElement('div');
                yScrollPanel.id = 'twcheese_reportsDisplay_yScrollPanel';
                reportsFolderDisplay.appendChild(yScrollPanel);
                yScrollPanel.style.overflowY = 'scroll';
                yScrollPanel.style.overflowX = 'hidden';
                yScrollPanel.style.background = 'transparent';
                yScrollPanel.style.position = 'absolute';
                yScrollPanel.style.right = 0;
                yScrollPanel.style.scrollbarWidth = 'thin';
        
                /*==== y table emulator ====*/
                var yTableEmulator = document.createElement('div');
                yTableEmulator.id = 'twcheese_reportsDisplay_y-table-emulator';
                yScrollPanel.appendChild(yTableEmulator);
                yTableEmulator.style.overflow = 'hidden';
                yTableEmulator.style.position = 'relative';
                yTableEmulator.innerHTML = '&nbsp;';
        
                /*==== x scroll panel ====*/
                var xScrollPanel = document.createElement('div');
                xScrollPanel.id = 'twcheese_reportsDisplay_xScrollPanel';
                reportsFolderDisplay.appendChild(xScrollPanel);
                xScrollPanel.style.height = '40px';
                xScrollPanel.style.width = `calc(100% - 18px)`;
                xScrollPanel.style.marginTop = '-23px';
                xScrollPanel.style.overflowX = 'scroll';
                xScrollPanel.style.overflowY = 'hidden';
                xScrollPanel.style.marginTop = 'expression(\'0px\')';// IE 7 fix
                xScrollPanel.style.height = 'expression(\'17px\')'; // IE 7 fix
        
                /*==== x table emulator ====*/
                var xTableEmulator = document.createElement('div');
                xTableEmulator.id = 'twcheese_reportsDisplay_x-table-emulator';
                xScrollPanel.appendChild(xTableEmulator);
                xTableEmulator.style.width = reportsTableHeader.clientWidth + 'px';
                xTableEmulator.innerHTML = '&nbsp;';
                
                this.$el = $(reportsFolderDisplay);
                this.$head = this.$el.find('#twcheese_reportsTable_header');
                this.$body = this.$el.find('#twcheese_reportsTable_body');
                this.$bodyPane = this.$el.find('#twcheese_reportsTable');
                this.$xBodyEmulator = this.$el.find('#twcheese_reportsDisplay_x-table-emulator');
                this.$yBodyEmulator = this.$el.find('#twcheese_reportsDisplay_y-table-emulator');
                this.$xScrollPanel = this.$el.find('#twcheese_reportsDisplay_xScrollPanel');
                this.$yScrollPanel = this.$el.find('#twcheese_reportsDisplay_yScrollPanel');
            }
        
        
            afterInsert() {
                let $headContainer = this.$head.parent();
                this.$yScrollPanel.css({
                    top: $headContainer.outerHeight() + 2
                });
                this.populateReportsTable();
                this.applySettings();
            }
        
        
            watchSelf() {
                this.$el.on('resize', (e) => {
                    this.fitDisplayComponents();
                    userConfig.set('ReportListWidget.size.width', this.$el.width());
                    userConfig.set('ReportListWidget.size.height', this.$el.height());
                });
        
                this.$bodyPane.on('scroll', (e) => {
                    this.$xScrollPanel.scrollTop(this.$bodyPane.scrollTop());
                });
        
                this.$yScrollPanel.on('scroll', (e) => {
                    this.$bodyPane.scrollTop(this.$yScrollPanel.scrollTop());
                });
        
                this.$xScrollPanel.on('scroll', (e) => {
                    this.$bodyPane.scrollLeft(this.$xScrollPanel.scrollLeft());
                    this.$head.parent().scrollLeft(this.$xScrollPanel.scrollLeft());
                });
        
                this.$bodyPane.on('wheel', (e) => {
                    e.preventDefault();
                    let deltaY = 90 * Math.sign(e.originalEvent.deltaY);
                    
                    let timeStart = performance.now();
                    let animDurationMs = 250;
                    let y = 0;
        
                    let scrollStep = () => {
                        let msElapsed = performance.now() - timeStart;
                        let targetY = deltaY * Math.min(1, msElapsed / animDurationMs);
                        let stepY = targetY - y;
        
                        y += stepY;
                        this.$yScrollPanel[0].scrollTop += stepY;
                        this.$bodyPane[0].scrollTop += stepY;
        
                        if (msElapsed < animDurationMs) {
                            window.requestAnimationFrame(scrollStep);
                        }
                    }
                    window.requestAnimationFrame(scrollStep);
                });
            }
        
        
            /**
             * fills body with information
             */
            populateReportsTable() {
                let minimal = new Set(['essential', 'attackIcons', 'repeatLinks', 'distance', 'fullSubject', 'strTimeReceived']);
        
                let fallbackSubjectColSpan = columnCategories.toArray().reduce(function(acc, category) {
                    if (category.key !== 'fullSubject' && minimal.has(category.key)) {
                        return acc;
                    }
                    return acc + category.cols.length;
                }, 0);
        
                for (let report of this.reports.values()) {
                    let row = this.$body[0].insertRow(-1);
                    row.twcheeseReport = report;
                    let hasDecentInfo = report.attackerName && report.defenderName && report.attackerVillage && report.defenderVillage;
        
                    for (let category of columnCategories.values()) {
                        if (!hasDecentInfo && !minimal.has(category.key)) {
                            continue;
                        }
                        for (let col of category.cols) {
                            let cell = row.insertCell(-1);
                            cell.innerHTML = col.createCellHtml(report);
                            if (typeof col.align === 'string') {
                                cell.style.textAlign = col.align;
                            }
                            if (typeof col.cssClass === 'function') {
                                cell.className = col.cssClass(report);
                            }
                            if (!hasDecentInfo && category.key === 'fullSubject') {
                                cell.initialColSpan = fallbackSubjectColSpan;
                                cell.colSpan = cell.initialColSpan;
                            }                    
                        }                
                    }
                }
                
                this.alignForTroops();
                this.alignForResources();
                this.adjustScrollbars();
            }
        
        
            /**
             * hides columns and resizes to user's preferences
             */
            applySettings() {
                for (let category of columnCategories.values()) {
                    if (!userConfig.get(`ReportListWidget.showCols.${category.key}`, !category.startHidden)) {
                        this.hideColumns(category.key);
                    }
                }
        
                this.$el.css({
                    width: userConfig.get('ReportListWidget.size.width', '720px'),
                    height: userConfig.get('ReportListWidget.size.height', '250px')
                });
                        
                this.fitDisplayComponents();
                this.adjustScrollbars();
            }
        
        
            adjustScrollbars() {
                this.$xBodyEmulator.width(this.$body.width());
                this.$yBodyEmulator.height(this.$body.height());
            }
        
        
            toggleReportsColumns(settingName) {
                let startHidden = columnCategories.get(settingName).startHidden;
                let configKey = `ReportListWidget.showCols.${settingName}`;
                let show = !userConfig.get(configKey, !startHidden);
                userConfig.set(configKey, show);
        
                for (let i of this.columnIndexes.get(settingName)) {
                    if (show) {
                        this.showColumn(i);
                    } else {
                        this.hideColumn(i);
                    }
                }
                this.adjustScrollbars();
            }
        
        
            hideColumns(settingName) {
                for (let i of this.columnIndexes.get(settingName)) {
                    this.hideColumn(i);
                }
            }
        
        
            showColumn(column) {
                var body = this.$body[0];
                var head = this.$head[0];
        
                var tableWidth = head.style.width.split('px')[0];        
        
                /*==== header ====*/
                let alignmentTh = cellAtIndex(head.rows[0], column);
                let columnWidth = alignmentTh.style.width.split('px')[0];
                tableWidth = parseFloat(tableWidth) + parseFloat(columnWidth);
                head.style.width = tableWidth + 'px';
        
                alignmentTh.style.display = "table-cell";
                cellAtIndex(head.rows[1], column).style.display = "table-cell";
                head.rows[2].cells[column].style.display = "table-cell";
        
                /*==== body ====*/
                body.style.width = tableWidth + 'px';
                for (let row of body.rows) {
                    let cell = cellAtIndex(row, column);
        
                    if (cell.initialColSpan && cell.initialColSpan > 1) {
                        cell.colSpan += 1;
                    } else {
                        cell.style.display = 'table-cell';
                    }
                }
            }
        
        
            hideColumn(column) {
                var body = this.$body[0];
                var head = this.$head[0];
        
                var tableWidth = head.style.width.split('px')[0];
        
                /*==== header ====*/
                let alignmentTh = cellAtIndex(head.rows[0], column);
                let columnWidth = alignmentTh.style.width.split('px')[0];
                tableWidth = parseFloat(tableWidth) - parseFloat(columnWidth);
                head.style.width = tableWidth + 'px';
        
                alignmentTh.style.display = "none";
                cellAtIndex(head.rows[1], column).style.display = "none";
                head.rows[2].cells[column].style.display = "none";
        
                /*==== body ====*/
                body.style.width = tableWidth + 'px';
                for (let row of body.rows) {
                    let cell = cellAtIndex(row, column);
        
                    if (cell.initialColSpan && cell.initialColSpan > 1) {
                        cell.colSpan -= 1;
                    } else {
                        cell.style.display = 'none';
                    }
                }
            }
        
        
            getSelectedReportIds() {
                return this.$body.find('input:checked')
                    .toArray()
                    .map(el => parseInt(el.name.match(/\d+/)[0]));
            }
        
            refreshContents() {
                this.$body.find('tr:not(:first)').remove();    
                this.populateReportsTable();
                this.applySettings();    
            }
        
            /**
             * sets display components styles to fill the display zone and ensure scrolling functionality
             */
            fitDisplayComponents() {
                let bodyPaneHeight = this.$el.height() - 67;
        
                this.$bodyPane.css({
                    width: this.$el.width(),
                    height: bodyPaneHeight
                });
                
                this.$yScrollPanel.css({height: bodyPaneHeight});
            }
        
        
            /**
             * adjust widths for troop counts
             */
            alignForTroops() {
                let colIndexes = this.columnIndexes.get('defenderSurvivors');
        
                let maxChars = Array(colIndexes.length).fill(2);
        
                for (let r = 1; r < this.$body[0].rows.length; r++) {
                    let row = this.$body[0].rows[r];
                    if (!row.twcheeseReport.defenderSurvivors) {
                        continue;
                    }
                    for (let [i, col] of Object.entries(colIndexes)) {
                        let chars = String(row.cells[col].innerHTML).length;
                        maxChars[i] = Math.max(chars, maxChars[i]);
                    }
                }
        
                this.alignCols(colIndexes, maxChars);
            }
        
        
            /**
             * adjust widths for resources
             */
            alignForResources() {
                let colIndexes = [
                    ...this.columnIndexes.get('resources.wood'),
                    ...this.columnIndexes.get('resources.stone'),
                    ...this.columnIndexes.get('resources.iron'),
                    ...this.columnIndexes.get('resources.sum'),
                ];
        
                let maxChars = [2, 2, 2, 2];
        
                for (let r = 1; r < this.$body[0].rows.length; r++) {
                    let row = this.$body[0].rows[r];
                    if (!row.twcheeseReport.resources) {
                        continue;
                    }
                    for (let [i, col] of Object.entries(colIndexes)) {
                        let chars = row.cells[col].innerText.length;
                        maxChars[i] = Math.max(chars, maxChars[i]);
                    }
                }
        
                this.alignCols(colIndexes, maxChars);
            }
        
        
            alignCols(colIndexes, maxChars) {
                let charWidth = 8;
                let widthSum = 0;
                for (let [i, col] of Object.entries(colIndexes)) {
                    let width = charWidth * maxChars[i];
                    width = Math.max(20, width);
                    widthSum += width;
        
                    let alignmentTh = this.$head[0].rows[0].cells[col];
                    let bodyCell = this.$body[0].rows[0].cells[col];
        
                    alignmentTh.style.width = width + 'px';
                    bodyCell.style.width = width + 'px';
                }
        
                let padding = 3 * 2 * colIndexes.length;
                let borderSpacing = 2 * (colIndexes.length - 1);
                let width = widthSum + borderSpacing + padding;
                
                let titleTh = cellAtIndex(this.$head[0].rows[1], colIndexes[0]);
                titleTh.style.width = width + 'px';
            }
        
        
            selectMatchingReports(isReportMatch) {
                for (let report of this.reports.values()) {
                    if (isReportMatch(report)) {
                        $(`input[name='id_${report.reportId}']`).prop('checked', true);
                    }
                }
            }
        
            deselectAllReports() {
                for (let report of this.reports.values()) {
                    $(`input[name='id_${report.reportId}']`).prop('checked', false);
                }
            }
        
        }
        
        
        
        
        
        // jquery-ui. Used for resizable
        Object(UI["b" /* initCss */])(`
            .ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }
        
            /* Icons
            ----------------------------------*/
        
            .ui-icon {
                display: block;
                text-indent: -99999px;
                overflow: hidden;
                background-repeat: no-repeat;
            }
        
            .ui-icon {
                width: 16px;
                height: 16px;
            }
            .ui-icon,
            .ui-widget-content .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.darkGrey});
            }
            .ui-widget-header .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.black});
            }
            .ui-state-default .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.grey});
            }
            .ui-state-hover .ui-icon,
            .ui-state-focus .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.darkGrey});
            }
            .ui-state-active .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.darkGrey});
            }
            .ui-state-highlight .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.blue});
            }
            .ui-state-error .ui-icon,
            .ui-state-error-text .ui-icon {
                background-image: url(${ImageSrc["a" /* ImageSrc */].jq.red});
            }
        
            /* Overlays */
            .ui-widget-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .ui-resizable {
                position: relative;
            }
            .ui-resizable-handle {
                position: absolute;
                font-size: 0.1px;
                display: block;
            }
            .ui-resizable-disabled .ui-resizable-handle,
            .ui-resizable-autohide .ui-resizable-handle {
                display: none;
            }
            .ui-resizable-n {
                cursor: n-resize;
                height: 7px;
                width: 100%;
                top: -5px;
                left: 0;
            }
            .ui-resizable-s {
                cursor: s-resize;
                height: 7px;
                width: 100%;
                bottom: -5px;
                left: 0;
            }
            .ui-resizable-e {
                cursor: e-resize;
                width: 7px;
                right: -5px;
                top: 0;
                height: 100%;
            }
            .ui-resizable-w {
                cursor: w-resize;
                width: 7px;
                left: -5px;
                top: 0;
                height: 100%;
            }
            .ui-resizable-se {
                cursor: se-resize;
                width: 12px;
                height: 12px;
                right: 1px;
                bottom: 1px;
            }
            .ui-resizable-sw {
                cursor: sw-resize;
                width: 9px;
                height: 9px;
                left: -5px;
                bottom: -5px;
            }
            .ui-resizable-nw {
                cursor: nw-resize;
                width: 9px;
                height: 9px;
                left: -5px;
                top: -5px;
            }
            .ui-resizable-ne {
                cursor: ne-resize;
                width: 9px;
                height: 9px;
                right: -5px;
                top: -5px;
            }
        `);
        
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/DisplayConfigurer.js
        
        
        
        
        
        class DisplayConfigurer_DisplayConfigurer {
            /**
             * @param {ReportListWidget} reportListWidget 
             */
            constructor(reportListWidget) {
                this.widget = reportListWidget;
            }
        
            /**
             * @param {string} key 
             * @return {boolean}
             */
            shouldShowColumn(key) {
                let startHidden = columnCategories.get(key).startHidden;
                return userConfig.get(`ReportListWidget.showCols.${key}`, !startHidden);
            }
        
            /**
             * @param {string} key 
             */
            toggleColumn(key) {
                this.widget.toggleReportsColumns(key);
            }
        
            /**
             * @return {{key:string, description:string}}
             */
            getHideableColumns() {
                return columnCategories.getHideableCategories()
                    .map(category => {
                        return {
                            key: category.key,
                            description: category.description
                        }
                    });
            }
        
            refreshDisplay() {
                this.widget.refreshContents();
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/DisplayConfigWidget.js
        
        
        
        class DisplayConfigWidget_DisplayConfigWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {DisplayConfigurer} displayConfigurer
             */
            constructor(displayConfigurer) {
                super();
        
                var reportsFolderSettingsDiv = document.createElement('div');
                reportsFolderSettingsDiv.id = 'twcheese_reportsFolderSettings';
                reportsFolderSettingsDiv.style.display = 'none';
                reportsFolderSettingsDiv.style.columnWidth = '200px';
                this.$el = $(reportsFolderSettingsDiv);
                
                function insertCheckbox(key, text) {
                    let $el = $(`<div style="white-space:nowrap"><label><input type="checkbox"> ${text}</label></div>`);
                    $el.find('input')
                        .prop('checked', displayConfigurer.shouldShowColumn(key))
                        .on('click', () => {
                            displayConfigurer.toggleColumn(key);
                        });
        
                    reportsFolderSettingsDiv.appendChild($el[0]);
                }
        
                for (let col of displayConfigurer.getHideableColumns()) {
                    insertCheckbox(col.key, col.description);
                }
            }
        }
        
        
        // CONCATENATED MODULE: ./src/Models/RepeatAttackLinks/Exporter.js
        
        
        
        class Exporter_Exporter {
        
            /**
             * @param {BattleReportCondensed[]} reports 
             * @param {string} attackFrom
             * @param {string} headerText
             * @return {string}
             */
            buildExportText(reports, attackFrom, headerText) {
                let exportText = this.buildHeader(headerText);
        
                for (let report of reports) {
                    if (!report.defenderVillage) {
                        continue; // not enough information
                    }
                    if (report.attackerName !== game_data.player.name) {
                        continue; // can't repeat somebody else's attack
                    }
                    if (attackFrom === Exporter_Exporter.ATTACK_FROM_CURRENT) {
                        exportText += "\n" + this.buildEntryCurrentVillage(report);
                    }
                    else if (attackFrom === Exporter_Exporter.ATTACK_FROM_ORIGINAL && report.attackerVillage) {
                        exportText += "\n" + this.buildEntryOriginalVillage(report);
                    } 
                }
        
                exportText += "\n" + this.buildFooter();
                return exportText;
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            urlCurrentVillage(report) {
                return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            urlOriginalVillage(report) {
                return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
            }
        
            /**
             * @abstract
             * @param {string} text
             * @return {string}
             */
            buildHeader(text) {
                throw Error('not implemented');
            }
        
            /**
             * @abstract
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryCurrentVillage(report) {
                throw Error('not implemented');
            }
        
            /**
             * @abstract
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryOriginalVillage(report) {
                throw Error('not implemented');
            }
        
            /**
             * @abstract
             * @return {string}
             */
            buildFooter() {
                throw Error('not implemented');
            }
        
        }
        
        Exporter_Exporter.ATTACK_FROM_CURRENT = 'current';
        Exporter_Exporter.ATTACK_FROM_ORIGINAL = 'original';
        
        
        
        // CONCATENATED MODULE: ./src/Models/RepeatAttackLinks/ExporterBBCode.js
        
        
        
        class ExporterBBCode_ExporterBBCode extends Exporter_Exporter {
        
            /**
             * @param {string} text
             * @return {string}
             */
            buildHeader(text) {
                return `[b][u][size=12]${text}[/size][/u][/b]`;
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryCurrentVillage(report) {
                return '[url=' + this.urlCurrentVillage(report) + ']repeat attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryOriginalVillage(report) {
                return '[url=' + this.urlOriginalVillage(report) + ']repeat attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';
            }
        
            /**
             * @return {string}
             */
            buildFooter() {
                return '';
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/RepeatAttackLinks/ExporterPlainText.js
        
        
        
        class ExporterPlainText_ExporterPlainText extends Exporter_Exporter {
        
            /**
             * @param {string} text
             * @return {string}
             */
            buildHeader(text) {
                return text;
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryCurrentVillage(report) {
                return this.urlCurrentVillage(report);
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryOriginalVillage(report) {
                return this.urlOriginalVillage(report);
            }
        
            /**
             * @return {string}
             */
            buildFooter() {
                return '';
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Models/RepeatAttackLinks/ExporterHTML.js
        
        
        
        class ExporterHTML_ExporterHTML extends Exporter_Exporter {
        
            /**
             * @param {string} text
             * @return {string}
             */
            buildHeader(text) {
                return [
                    '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
                    `\n<DT><H3>${text}</H3></DT>\n<DL><P>`
                ].join('');
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryCurrentVillage(report) {
                let leadingZero = '';
                let distance = report.defenderDistance(game_data.village);
                if (distance < 10) {
                    leadingZero = '0';
                }
                return '<DT><A HREF="' + this.urlCurrentVillage(report) + '" >' + leadingZero + distance + ' Repeat Attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';
            }
        
            /**
             * @param {BattleReportCondensed} report
             * @return {string}
             */
            buildEntryOriginalVillage(report) {
                return '<DT><A HREF="' + this.urlOriginalVillage(report) + '" >Repeat Attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';
            }
        
            /**
             * @return {string}
             */
            buildFooter() {
                return '</P></DL>';
            }
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/ExportRepeatLinksWidget.js
        
        
        
        
        
        
        class ExportRepeatLinksWidget_ExportRepeatLinksWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {Map.<BattleReportCondensed>} reports 
             */
            constructor(reports) {
                super();
                this.reports = reports;
                this.defaultHeader = 'new cheesy attack group';
        
                this.exporters = {
                    bbcode: new ExporterBBCode_ExporterBBCode(),
                    plainLink: new ExporterPlainText_ExporterPlainText(),
                    html: new ExporterHTML_ExporterHTML()
                };
        
                this.initStructure();
                this.watchSelf();
                this.updateExportText();
            }
        
            initStructure() {
                this.$el = $(this.createHtml().trim());
                this.$exportText = this.$el.find('.twcheese-export-text');
                this.$buttonCopy = this.$el.find('.twcheese-button-copy');
                this.$headerInput = this.$el.find('#twcheese_export_header');
                this.$formatOptions = this.$el.find("input[name='twcheese-repeat-attack-export-format']");
                this.$attackingVillageOptions = this.$el.find("input[name='twcheese-repeat-attack-export-village']");
            }
        
            createHtml() {
                return `
                    <table id="twcheese_reportsFolderExport" style="display: none;">
                        <td>
                            <textarea class="twcheese-export-text" rows="10" cols="40" readonly="true" />
                        </td>
                        <td>
                            <table id="twcheese_exportConfigTable">
                                <tr>
                                    <th>Format</th>
                                    <th>Attacking Village</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" name="twcheese-repeat-attack-export-format" checked="true" value="bbcode"/> BBCode
                                        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="plainLink"/> plain links
                                        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="html"/> HTML
                                    </td>
                                    <td>
                                        <input type="radio" name="twcheese-repeat-attack-export-village" checked="true" value="current"/> current village
                                        <br/><input type="radio" name="twcheese-repeat-attack-export-village" value="original"/> original village
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        Header: <input type="text" id="twcheese_export_header" value="${this.defaultHeader}" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center; padding-top: 20px;">
                                        <a class="twcheese-button-copy btn btn-default" href="#">Copy to clipboard</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </table>
                `;
            }
        
            watchSelf() {
                this.$headerInput.on('click', () => {
                    if (this.$headerInput.val() === this.defaultHeader) {
                        this.$headerInput.val('');
                    }
                    this.updateExportText();
                });
        
                this.$headerInput.on('input', (e) => {
                    this.updateExportText();
                });
        
                this.$formatOptions.on('change', (e) => {
                    this.updateExportText();
                });
        
                this.$attackingVillageOptions.on('change', (e) => {
                    this.updateExportText();
                });
        
                this.$buttonCopy.on('click', (e) => {
                    e.preventDefault();
                    this.$exportText.select();
                    document.execCommand('copy');
                    window.UI.SuccessMessage('Copied to clipboard');
                });
            }
        
            updateExportText() {
                let format = this.$formatOptions.filter(':checked').val();
                let attackFrom = this.$attackingVillageOptions.filter(':checked').val();
                let headerText = this.$headerInput.val();
        
                let exporter = this.exporters[format];
                let exportText = exporter.buildExportText(this.reports.values(), attackFrom, headerText);
                this.$exportText.val(exportText);
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/ReportSelector.js
        
        class ReportSelector {
        
            /**
             * @param {ReportListWidget} reportListWidget
             */
            constructor(reportListWidget) {
                this.widget = reportListWidget;
            }
        
            /**
             * @return {number[]}
             */
            getSelectedReportIds() {
                return this.widget.getSelectedReportIds();
            }
        
            selectNew() {
                this.widget.selectMatchingReports(report => report.isNew);
            }
        
            selectOld() {
                this.widget.selectMatchingReports(report => !report.isNew);
            }
        
            selectAll() {
                this.widget.selectMatchingReports(report => true);
            }
        
            selectNone() {
                this.widget.deselectAllReports();
            }
        
            selectDotColor(dotColor) {
                this.widget.selectMatchingReports(report => report.dotColor === dotColor);
            }
        
            selectForwarded() {
                this.widget.selectMatchingReports(report => report.isForwarded);
            }
        
            /**
             * @param {number} haulStatus 0 for non full haul, 1 for full haul
             */
            selectLoot(haulStatus) {
                this.widget.selectMatchingReports(report => report.haulStatus === haulStatus);
            }
        
            selectFeint() {
                this.widget.selectMatchingReports(report => report.wasAttackFeint);
            }
        
            selectDeadNoble() {
                this.widget.selectMatchingReports(report => report.attackerNobleDied);
            }
        
            selectLoyalty() {
                this.widget.selectMatchingReports(report => report.loyalty !== null);
            }
        
            selectCleared() {
                this.widget.selectMatchingReports(report => report.wasDefenderCleared());
            }
        
            selectText(text) {
                let textLower = text.toLowerCase();
                this.widget.selectMatchingReports(report => report.subject.toLowerCase().includes(textLower));
            }
        
            selectAttacker(attackerName) {
                let nameLower = attackerName.toLowerCase();
                this.widget.selectMatchingReports(report => report.attackerName && report.attackerName.toLowerCase().includes(nameLower));
            }
        
            selectDefender(defenderName) {
                let nameLower = defenderName.toLowerCase();
                this.widget.selectMatchingReports(report => report.defenderName && report.defenderName.toLowerCase().includes(nameLower));
            }
        
            selectAttackerVillage(coordinates) {
                let [, x, y] = coordinates.match(/(\d+)\|(\d+)/);
                x = parseInt(x);
                y = parseInt(y);
        
                this.widget.selectMatchingReports(report => {
                    if (!report.attackerVillage) {
                        return false;
                    }
        
                    return report.attackerVillage.x === x
                        && report.attackerVillage.y === y;
                });
            }
        
            selectDefenderVillage(coordinates) {
                let [, x, y] = coordinates.match(/(\d+)\|(\d+)/);
                x = parseInt(x);
                y = parseInt(y);
        
                this.widget.selectMatchingReports(report => {
                    if (!report.defenderVillage) {
                        return false;
                    }
                    
                    return report.defenderVillage.x === x
                        && report.defenderVillage.y === y;
                });
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/ReportSelectorWidget.js
        
        
        
        
        class ReportSelectorWidget_ReportSelectorWidget extends AbstractWidget["a" /* AbstractWidget */] {
            /**
             * @param {ReportSelector} reportSelector 
             */
            constructor(reportSelector) {
                super();
        
                var reportsSelectorBar = document.createElement('div');
                this.$el = $(reportsSelectorBar);
                reportsSelectorBar.id = 'twcheese_reportsSelectorBar';
                reportsSelectorBar.style.borderStyle = 'solid';
                reportsSelectorBar.style.borderWidth = '1px';
        
                /*==== label ====*/
                var reportsSelectorBarLabel = document.createElement('div');
                reportsSelectorBar.appendChild(reportsSelectorBarLabel);
                reportsSelectorBarLabel.style.backgroundColor = 'rgb(193, 162, 100) !important';
                reportsSelectorBarLabel.style.backgroundImage = 'linear-gradient(rgb(229,194,126), rgb(193,162,100))';
                reportsSelectorBarLabel.style.backgroundRepeat = 'repeat-x';
                reportsSelectorBarLabel.style.fontSize = '9pt';
                reportsSelectorBarLabel.style.fontWeight = '700';
                reportsSelectorBarLabel.innerHTML = 'SELECT';
                reportsSelectorBarLabel.style.height = '18px';
                reportsSelectorBarLabel.style.paddingLeft = '3px';
        
                /*==== clicky table ====*/
                var selectorClickyTable = document.createElement('table');
                reportsSelectorBar.appendChild(selectorClickyTable);
                selectorClickyTable.className = 'vis';
                selectorClickyTable.insertRow(-1);
        
                let imgHtml = src => `<img style="display:block; margin-left:auto; margin-right:auto" src="${src}"/>`;
        
                let clickyOptions = new Map([
                    ['all', {
                        click: () => reportSelector.selectAll(),
                        html: 'all'
                    }],
                    ['none', {
                        click: () => reportSelector.selectNone(),
                        html: 'none'
                    }],
                    ['new', {
                        click: () => reportSelector.selectNew(),
                        html: 'new'
                    }],
                    ['old', {
                        click: () => reportSelector.selectOld(),
                        html: 'old'
                    }],
                    ['dotGreen', {
                        click: () => reportSelector.selectDotColor('green'),
                        html: imgHtml('graphic/dots/green.png')
                    }],
                    ['dotYellow', {
                        click: () => reportSelector.selectDotColor('yellow'),
                        html: imgHtml('graphic/dots/yellow.png')
                    }],
                    ['dotRed', {
                        click: () => reportSelector.selectDotColor('red'),
                        html: imgHtml('graphic/dots/red.png')
                    }],
                    ['dotBlue', {
                        click: () => reportSelector.selectDotColor('blue'),
                        html: imgHtml('graphic/dots/blue.png')
                    }],
                    ['forwarded', {
                        click: () => reportSelector.selectForwarded(),
                        html: imgHtml('graphic/forwarded.png')
                    }],
                    ['haulPartial', {
                        click: () => reportSelector.selectLoot(BattleReportCondensed.HAUL_STATUS_PARTIAL),
                        html: imgHtml('graphic/max_loot/0.png')
                    }],
                    ['haulFull', {
                        click: () => reportSelector.selectLoot(BattleReportCondensed.HAUL_STATUS_FULL),
                        html: imgHtml('graphic/max_loot/1.png')
                    }],
                    ['feint', {
                        click: () => reportSelector.selectFeint(),
                        html: imgHtml('graphic/dots/grey.png'),
                        tooltip: 'feint'
                    }],
                    ['deadNoble', {
                        click: () => reportSelector.selectDeadNoble(),
                        html: imgHtml(ImageSrc["a" /* ImageSrc */].troopIcon('priest')),
                        tooltip: 'dead noble'
                    }],
                    ['loyalty', {
                        click: () => reportSelector.selectLoyalty(),
                        html: '<span style="display:block; margin-left:auto; margin-right:auto" class="icon ally lead"/>',
                        tooltip: 'loyalty change'
                    }],
                    ['cleared', {
                        click: () => reportSelector.selectCleared(),
                        html: 'defenseless'
                    }]
                ]);
        
                for (let [descriptor, option] of clickyOptions) {
                    let optionEl = $(`<a href="#">${option.html}</a>`)[0];
                    if (option.tooltip) {
                        optionEl.title = option.tooltip;
                    }
                    optionEl.addEventListener('click', function(e) {
                        e.preventDefault();
                        option.click();
                    });
        
                    let cell = selectorClickyTable.rows[0].insertCell(-1);
                    cell.style.width = '25px';
                    cell.style.textAlign = 'center';        
                    cell.appendChild(optionEl);
                }
        
                /*==== input table ====*/
                var selectorInputTable = document.createElement('table');
                reportsSelectorBar.appendChild(selectorInputTable);
                selectorInputTable.className = 'vis';
                selectorInputTable.insertRow(-1);
        
                let inputOptions = [
                    {
                        hintInput: 'contains text',
                        hintButton: 'select text',
                        use: (text) => reportSelector.selectText(text),
                        sprite: [-140, 0]
                    },
                    {
                        hintInput: 'attacker',
                        hintButton: 'select attacking player',
                        use: (attackerName) => reportSelector.selectAttacker(attackerName),
                        sprite: [-80, 0]
                    },
                    {
                        hintInput: 'defender',
                        hintButton: 'select defending player',
                        use: (defenderName) => reportSelector.selectDefender(defenderName),
                        sprite: [-80, 0]
                    },
                    {
                        hintInput: 'origin',
                        hintButton: 'select attacking village',
                        placeholder: 'x|y',
                        use: (coords) => reportSelector.selectAttackerVillage(coords),
                        sprite: [-120, 0]
                    },
                    {
                        hintInput: 'target',
                        hintButton: 'select defending village',
                        placeholder: 'x|y',
                        use: (coords) => reportSelector.selectDefenderVillage(coords),
                        sprite: [-120, 0]
                    }
                ];
        
                for (let option of inputOptions) {
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.size = 10;
                    input.value = option.hintInput;
                    input.placeholder = option.placeholder || '';
                    let alreadyCleared = false;
                    input.addEventListener('mousedown', function() {
                        if (alreadyCleared) {
                            return;
                        }
                        this.value = '';
                        alreadyCleared = true;
                    });
        
                    let $button = $(`<a href="#" title="${option.hintButton}"></a>`)
                        .on('click', function(e) {
                            e.preventDefault();
                            option.use(input.value);
                        });
        
                    let $buttonIcon = $('<span>&nbsp;</span>')
                        .css({
                            display: 'inline-block',
                            background: `url(graphic/bbcodes/bbcodes.png) no-repeat ${option.sprite[0]}px ${option.sprite[1]}px`,
                            paddingLeft: 0,
                            paddingBottom: 0,
                            margin: 3,
                            width: 20,
                            height: 20
                        });
        
                    $button.append($buttonIcon);
        
                    let cell = selectorInputTable.rows[0].insertCell(-1);
                    cell.appendChild(input);
                    cell.appendChild($button[0]);
                }
            }
        
        
        }
        
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/MassRenamerWidget.js
        
        
        
        
        
        var MassRenamerWidget_language = { "twcheese": {} };
        switch (game_data.market) {
            default:
                /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
                MassRenamerWidget_language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
                break;
        
            case 'cz':
                /*==== divokekmeny.cz/ ====*/
                MassRenamerWidget_language['twcheese']['noReportsSelected'] = 'Nejdříve si musíte vybrat, které zprávy přejmenovat.';
                break;
        
            case 'se':
                MassRenamerWidget_language['twcheese']['noReportsSelected'] = 'Du har inte valt några rapporter som skall döpas om.';
                break;
        
            /*==== fyletikesmaxes.gr/ ====*/
            case 'gr':
                MassRenamerWidget_language['twcheese']['noReportsSelected'] = 'Δεν έχεις επιλέξει  καμιά αναφορά για μετονομασία';
                break;
        
            /* Norwegian */
            case 'no':
                MassRenamerWidget_language['twcheese']['noReportsSelected'] = 'Du har ikke valgt hvilke rapporter som skal endres navn på.';
                break;
                                
        }
        
        
        class MassRenamerWidget_MassRenamerWidget extends AbstractWidget["a" /* AbstractWidget */] {
        
            /**
             * @param {Map.<number, BattleReportCondensed>} reports
             * @param {ReportRenamer} renamer
             * @param {ReportSelector} reportSelector
             * @param {DisplayConfigurer} displayConfigurer
             */
            constructor(reports, renamer, reportSelector, displayConfigurer) {
                super();
                this.reports = reports;
                this.renamer = renamer;
                this.reportSelector = reportSelector;
                this.displayConfigurer = displayConfigurer;
        
                this.initStructure();
                this.watchSelf();
            }
        
            initStructure() {
                this.$el = $(`
                    <table class="vis">
                        <tbody>
                            <tr>
                                <td>
                                    <a class="twcheese-button-rename" href="#">&raquo; Rename</a>
                                    <img src="/graphic/questionmark.png?1" width="13" height="13" title="rename selected reports to twCheese format">
                                </td>
                                <td style="textAlign: right;">Progress:</td>
                                <td style="width: 40px;"><span id="twcheese_progress_percent">0</span>%</td>
                                <td style="width: 136px;">(<span id="twcheese_progress_count">0</span>/<span id="twcheese_progress_count_max">0</span> reports)</td>
                                <td>time remaining: <span id="twcheese_time_remaining">00:00</span></td>
                            </tr>
                        </tbody>
                    </table>
                `.trim());
        
                this.$buttonRename = this.$el.find('.twcheese-button-rename');
                this.$progressCount = this.$el.find('#twcheese_progress_count');
                this.$targetCount = this.$el.find('#twcheese_progress_count_max');
                this.$progressPercent = this.$el.find('#twcheese_progress_percent');
                this.$timeRemaining = this.$el.find('#twcheese_time_remaining');
            }
        
            watchSelf() {
                this.$buttonRename.on('click', (e) => {
                    e.preventDefault();
                    this.massRename();
                });
            }
        
            async massRename() {
                let reportIds = this.reportSelector.getSelectedReportIds();
                let total = reportIds.length;
                let progress = 0;
        
                if (total === 0) {
                    window.UI.ErrorMessage(MassRenamerWidget_language['twcheese']['noReportsSelected'], 3000);
                    return;
                }
        
                this.$progressCount.text(0);
                this.$targetCount.text(total);
                
                var estimatedTimeRemaining;
        
                /*==== rename reports 1 by 1 ====*/
        
                for (let reportId of reportIds) {
                    let startTime = performance.now();           
        
                    try {
                        let reportDoc = await requestDocument(gameUrl('report', {mode: game_data.mode, view: reportId}));
        
                        let scraper = new BattleReportScraper_BattleReportScraper(reportDoc);
                        let fullReport = scraper.scrapeReport();
                        let name = await this.renamer.rename(fullReport, '');
            
                        $('.quickedit[data-id="' + reportId + '"]')
                            .find('.quickedit-label').html(name);
            
                        /*==== update reports information so row can be redrawn with updated information====*/
            
                        let oldReport = this.reports.get(reportId);
            
                        let report = this.renamer.parseName(name);
                        report.reportId = reportId;
                        report.attackIcons = oldReport.attackIcons;
                        report.dotColor = oldReport.dotColor;
                        report.haulStatus = oldReport.haulStatus;
                        report.isForwarded = oldReport.isForwarded;
                        report.strTimeReceived = oldReport.strTimeReceived;
            
                        this.reports.set(report.reportId, report);
            
            
                        /*==== update progress display ====*/
                        progress++;
                        var millisElapsed = performance.now() - startTime;
                        estimatedTimeRemaining = (millisElapsed * (total - progress)) / 1000;
                        var minutesRemaining = Math.floor(estimatedTimeRemaining / 60);
                        var secondsRemaining = Math.round(estimatedTimeRemaining - (minutesRemaining * 60));
                        if (minutesRemaining < 10)
                            minutesRemaining = '0' + minutesRemaining;
                        if (secondsRemaining < 10)
                            secondsRemaining = '0' + secondsRemaining;
                        this.$timeRemaining.text(`${minutesRemaining}:${secondsRemaining}`);
                        this.$progressCount.text(progress);
                        this.$progressPercent.text(Math.round(progress / total * 100));
                    }
                    catch (e) {
                        console.error('error renaming report:', e);
                    }
        
                }
                
                this.displayConfigurer.refreshDisplay();
            }
        
        }
        
        
        // CONCATENATED MODULE: ./src/Widget/ReportsFolder/ReportsFolderWidget.js
        
        
        
        
        
        
        
        
        
        
        
        class ReportsFolderWidget_ReportsFolderWidget extends AbstractWidget["a" /* AbstractWidget */] {
            constructor(reports, renamer) {
                super();
                this.reports = reports;
        
                let reportListWidget = new ReportListWidget_ReportListWidget(this.reports);
                let displayConfigurer = new DisplayConfigurer_DisplayConfigurer(reportListWidget);
                let reportSelector = new ReportSelector(reportListWidget);
        
                /*==== create twcheese reports folder ====*/
                var reportsFolder = document.createElement('div');
                reportsFolder.id = 'twcheese_reportsFolder';
                this.$el = $(reportsFolder);
        
                /*==== reports folder toolbar ====*/
                var reportsFolderToolbar = document.createElement('div');
                reportsFolder.appendChild(reportsFolderToolbar);
                reportsFolderToolbar.id = 'twcheese_reportsFolderToolbar';
        
                reportsFolderToolbar.currentPanel = 'none';
                reportsFolderToolbar.toggleDisplayConfig = function () {
                    if (this.currentPanel == 'displayConfig') {
                        document.getElementById('twcheese_displayConfig_tab').className = '';
                        document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
                        this.currentPanel = 'none';
                    }
                    else {
                        document.getElementById('twcheese_displayConfig_tab').className = 'selected';
                        document.getElementById('twcheese_export_tab').className = '';
                        document.getElementById('twcheese_reportsFolderSettings').style.display = '';
                        document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
                        this.currentPanel = 'displayConfig';
                    }
                };
        
                reportsFolderToolbar.toggleExport = function () {
                    if (this.currentPanel == 'exportLinks') {
                        document.getElementById('twcheese_export_tab').className = '';
                        document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
                        this.currentPanel = 'none';
                    }
                    else {
                        document.getElementById('twcheese_export_tab').className = 'selected';
                        document.getElementById('twcheese_displayConfig_tab').className = '';
                        document.getElementById('twcheese_reportsFolderExport').style.display = '';
                        document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
                        this.currentPanel = 'exportLinks';
                    }
                };
        
                /*==== toolbar tabs ====*/
                reportsFolderToolbar.innerHTML += `
                    <table style="border-style:solid; border-width:0px;" class="vis modemenu">
                        <tbody>
                            <tr>
                                <td id="twcheese_displayConfig_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleDisplayConfig();">
                                    <a>configure display</a>
                                </td>
                                <td id="twcheese_export_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleExport();">
                                    <a>export repeat-attack links</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>`;
        
        
                /*==== export links to repeat attacks ====*/
                let exportLinksWidget = new ExportRepeatLinksWidget_ExportRepeatLinksWidget(this.reports);
                exportLinksWidget.appendTo(reportsFolderToolbar);
        
                /*==== display settings ====*/
                (new DisplayConfigWidget_DisplayConfigWidget(displayConfigurer))
                    .appendTo(reportsFolderToolbar);
        
                /*==== reports display ====*/
                reportListWidget
                    .appendTo(reportsFolder);
        
                /*==== reports selector bar ====*/
                (new ReportSelectorWidget_ReportSelectorWidget(reportSelector))
                    .appendTo(reportsFolder);
        
                /*==== mass renamer ====*/
                (new MassRenamerWidget_MassRenamerWidget(this.reports, renamer, reportSelector, displayConfigurer))
                    .appendTo(reportsFolder);
        
            }
        }
        
        
        Object(UI["b" /* initCss */])(`
            #twcheese_reportsFolder {
                margin-bottom: 30px;
            }
        `);
        
        
        
        // EXTERNAL MODULE: ./src/Models/Debug/Build/ProcessFactory.js
        var ProcessFactory = __webpack_require__(7);
        
        // CONCATENATED MODULE: ./dist/tool/cfg/debug/BRE/Default.js
        let processCfg = { phases: [{"type":"PhaseQuestion","internalName":"Entry","questions":[{"type":"QuestionFreeForm","ask":"What's broken?","placeholderText":"e.g. \"it shows wrong OD scores\"","minResponseLength":10}]}] };
        
        
        // CONCATENATED MODULE: ./src/ToolSetup/BRE.js
        /* global $, game_data */
        
        
        
        
        
        
        
        
        
        
        
        
        let initialized = false;
        let reportEnhanced = false;
        let reportsFolderEnhanced = false;
        
        async function useTool() {
            if (!initialized) {
                await ensureRemoteConfigsUpdated();
                initBRE();
                initialized = true;
            }
        
            if (game_data.screen == 'report' && document.URL.includes('&view=')) {
                // user is viewing single report
                if (!reportEnhanced) {
                    enhanceReport();
                    reportEnhanced = true;
                }
            }
            else if (game_data.screen == 'report' && (game_data.mode == 'attack' || game_data.mode == 'defense')) {
                // user is viewing reports folder with 'Attacks' or "Defenses" filter on
                if (!reportsFolderEnhanced) {
                    enhanceReportsFolder();
                    reportsFolderEnhanced = true;
                }
            }
            else {
                alert('try using this on:\n1) a battle report\n2) a reports folder, with the "Attacks" filter on\n3) a reports folder, with the "Defenses" filter on');
            }
        }
        
        
        function initBRE() {
        
            /*==== contact information ====*/
            var narcismDiv = document.createElement('div');
            document.getElementById('content_value').insertBefore(narcismDiv, document.getElementById('content_value').firstChild);
            narcismDiv.innerHTML = 'BRE created by <a href="https://forum.tribalwars.net/index.php?members/28484">cheesasaurus</a>';
            narcismDiv.style.fontSize = '10px';
        
            /*==== help ====*/
            spawnLegacyHelpButton('https://forum.tribalwars.net/index.php?threads/256225/');
        }
        
        
        function enhanceReport() {
            let scraper = new BattleReportScraper_BattleReportScraper(document);
            let report = scraper.scrapeReport();
        
            let renamer = new ReportRenamer_ReportRenamer();
        
            $(renamer).on('report-renamed', function(e) {
                $('.quickedit[data-id="' + e.reportId + '"]')
                    .find('.quickedit-label')
                    .html(e.newName);
            });
        
            if (userConfig.get('BattleReportEnhancer.autoRename', false)) {
                renamer.rename(report, '');
            }
        
            enhanceBattleReport(document, report);
        
            (new ReportToolsWidget_ReportToolsWidget(report, renamer))
                .insertBefore($('#content_value').find('h2').eq(0));
        }
        
        
        function enhanceReportsFolder() {
            let renamer = new ReportRenamer_ReportRenamer();
        
            let oldReportsList = document.getElementById('report_list');
            let reportsForm = oldReportsList.parentNode;
          
            // scrape listed reports
            let reportScraper = new BattleReportCondensedScraper_BattleReportCondensedScraper(renamer);
            let reports = new Map();
            for (let report of reportScraper.scrapeReports(oldReportsList)) {
                reports.set(report.reportId, report);
            }
        
            // enhance list and add tools
            reportsForm.removeChild(oldReportsList);
        
            (new ReportsFolderWidget_ReportsFolderWidget(reports, renamer))
                .insertBefore(reportsForm.firstChild);
        }
        
        
        // register tool ///////////////////////////////////////////////////////
        
        let processFactory = new ProcessFactory["a" /* ProcessFactory */]({});
        
        function newDebugProcess() {
            let name = 'Tool: Battle Report Enhancer';
            return processFactory.create(name, processCfg, true);
        }
        
        
        window.TwCheese.registerTool({
            id: 'BRE',
            use: useTool,
            getDebugProcess: newDebugProcess
        });
        
        /***/ }),
        /* 14 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {
        
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        
        // EXTERNAL MODULE: ./src/Widget/AbstractWidget.js
        var AbstractWidget = __webpack_require__(2);
        
        // EXTERNAL MODULE: ./src/Util/UI.js
        var UI = __webpack_require__(3);
        
        // EXTERNAL MODULE: ./src/Models/Debug/DebugEvents.js
        var DebugEvents = __webpack_require__(1);
        
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
                            placeholder="${Object(UI["a" /* escapeHtml */])(option.text)}"
                            class="twcheese-debug-question-answer ${option.className}"
                            data-index="0"
                        >${Object(UI["a" /* escapeHtml */])(option.value)}</textarea>
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
                    return Object(UI["a" /* escapeHtml */])(value.toDebugString());
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
                return Object(UI["a" /* escapeHtml */])(value.toString());
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
        
        
        Object(UI["b" /* initCss */])(`
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
        
        
        Object(UI["b" /* initCss */])(`
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
        
        
        Object(UI["b" /* initCss */])(`
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
        
        
        Object(UI["b" /* initCss */])(`
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
        var ImageSrc = __webpack_require__(0);
        
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
        
        
        Object(UI["b" /* initCss */])(`
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