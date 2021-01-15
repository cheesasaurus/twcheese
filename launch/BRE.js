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
/*!
 * BRE tool compiled from:
 *     /src/ToolSetup/BRE.js
 * Sidebar compiled from:
 *     src/ToolSetup/Sidebar.js
 * Vendor libs from:
 *     vendor/
 *---------------------------------------------------------------------*/
(async function() {
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

        await TwCheese.loadVendorLibsMinified('a2b0f8e1635207439b95aa79f918de49');
        await TwCheese.loadToolCompiled('Sidebar', 'b020ae3be1df353f2aefbc1f2662d0cf');
        TwCheese.useTool('Sidebar');
    }

    if (TwCheese.hasTool(toolId)) {
        TwCheese.useTool(toolId);
    } else {
        await TwCheese.loadToolCompiled(toolId, '97bf585a024b37528645c4b620730b4b');
        TwCheese.useTool(toolId);
    }
})();