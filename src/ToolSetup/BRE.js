/* global $, game_data */
import { initCss } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { BattleReport } from '/twcheese/src/Models/BattleReport.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { calcAttackerScore, calcDefenderScore } from '/twcheese/src/Models/KillScores.js';
import { calcLoyalty } from '/twcheese/src/Models/Loyalty.js';
import { TroopCounts, calcTravelDurations, troopTypes } from '/twcheese/src/Models/Troops.js';
import { buildingTypes } from '/twcheese/src/Models/Buildings.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { ReportRenamer } from '/twcheese/src/Models/ReportRenamer.js';
import { BattleReportScraper } from '/twcheese/src/Scrape/BattleReportScraper.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { enhanceBattleReport } from '/twcheese/src/Transform/enhanceBattleReport.js';
import { userConfig } from '/twcheese/src/Util/UserConfig.js';
import { requestDocument, gameUrl, attackPrepUrl } from '/twcheese/src/Util/Network.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';

import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';

/*==== styles ====*/

// jquery-ui
initCss(`
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
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-widget-header .ui-icon {
        background-image: url(${ImageSrc.jq.black});
    }
    .ui-state-default .ui-icon {
        background-image: url(${ImageSrc.jq.grey});
    }
    .ui-state-hover .ui-icon,
    .ui-state-focus .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-active .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-highlight .ui-icon {
        background-image: url(${ImageSrc.jq.blue});
    }
    .ui-state-error .ui-icon,
    .ui-state-error-text .ui-icon {
        background-image: url(${ImageSrc.jq.red});
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

    /* twcheese */
`);

// twcheese
initCss(`
    #twcheese_reportsFolder {
        margin-bottom: 30px;
    }
`);

// language /////////////////////////////////////////////////////////////////////

var language = { "twcheese": {} };
switch (game_data.market) {
    default:
        /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
        language['twcheese']['Building'] = 'Building';
        language['twcheese']['Help'] = 'Help';
        language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
        break;

    case 'cz':
        /*==== divokekmeny.cz/ ====*/
        language['twcheese']['Building'] = 'budově';
        language['twcheese']['Help'] = 'Pomoc';
        language['twcheese']['noReportsSelected'] = 'Nejdříve si musíte vybrat, které zprávy přejmenovat.';
        break;

    case 'se':
        language['twcheese']['Building'] = 'Byggnad';
        language['twcheese']['Help'] = 'Hjälp';
        language['twcheese']['noReportsSelected'] = 'Du har inte valt några rapporter som skall döpas om.';
        break;

    /*==== fyletikesmaxes.gr/ ====*/
    case 'gr':
        language['twcheese']['Building'] = 'Κτίριο';
        language['twcheese']['Help'] = 'Βοήθεια';
        language['twcheese']['noReportsSelected'] = 'Δεν έχεις επιλέξει  καμιά αναφορά για μετονομασία';
        break;

    /* Norwegian */
    case 'no':
        language['twcheese']['Building'] = 'Bygning';
        language['twcheese']['Help'] = 'Hjelp';
        language['twcheese']['noReportsSelected'] = 'Du har ikke valgt hvilke rapporter som skal endres navn på.';
        break;

    // Portugal
    case 'pt':        
        language['twcheese']['Building'] = 'Building';
        language['twcheese']['Help'] = 'Help';
        language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
                        
}

/*==== templates ====*/

/**
 *	settings for the display of various report attributes in the reports folder
 */
function twcheese_ReportsFolderDisplaySettings() {
    this.repeatLinks = 1;
    this.fullSubject = 1;
    this.note = 1;
    this.distance = 1;
    this.feint = 1;
    this.attacker = 1;
    this.defender = 1;
    this.attackerVillage = 1;
    this.defenderVillage = 1;
    this.deadNoble = 1;
    this.loyalty = 1;
    this.survivors = 1;
    this.resourcesTimber = 1;
    this.resourcesClay = 1;
    this.resourcesIron = 1;
    this.resourcesTotal = 1;
    this.timeLaunched = 1;
    this.timeReceived = 1;
    this.buildings = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
}


/*==== page modifier functions ====*/


/**
 * modifies report page, when viewing a single report.
 */
class BattleReportEnhancer {

    /**
    * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
    * @param {BattleReport} report
    * @param {ReportRenamer} renamer
    * @param {object} gameConfig
    * @param {object} twcheese_BRESettings
    */
    constructor(gameDoc, report, renamer, gameConfig, twcheese_BRESettings) {
        this.gameDoc = gameDoc;
        this.report = report;
        this.renamer = renamer;
        this.gameConfig = gameConfig;
        this.settings = twcheese_BRESettings;
    }


    includeReportTools() {
        let _this = this;
        let gameDoc = this.gameDoc;
        let report = this.report;
        let gameConfig = this.gameConfig;
        let settings = this.settings;
        var contentValueElement = gameDoc.getElementById('content_value');

        function toggleCollapse() {
            $widgetContent.toggle({
                duration: 200,
                start: function() {
                    let willCollapse = $toggleIcon.attr('src').includes(ImageSrc.minus);
                    $toggleIcon.attr('src', willCollapse ? ImageSrc.plus : ImageSrc.minus);
                    userConfig.set('ReportToolsWidget.collapse', willCollapse);
                }
            });
        };
        this.toggleReportTools = toggleCollapse;

        /*==== tools widget containers ====*/
        var toolContainer = document.createElement('div');
        toolContainer.className = 'vis widget';
        toolContainer.id = 'twcheese_show_report_tools';

        var titleBar = document.createElement('h4');
        titleBar.innerHTML = 'Report Tools';
        var toggleButton = document.createElement('img');
        toggleButton.src = ImageSrc.plus;
        toggleButton.style.cssFloat = 'right';
        toggleButton.style.cursor = 'pointer';
        toggleButton.onclick = toggleCollapse;
        var $toggleIcon = $(toggleButton);
        titleBar.appendChild(toggleButton);
        toolContainer.appendChild(titleBar);

        var widgetContent = document.createElement('div');
        widgetContent.className = 'widget_content';
        widgetContent.style.display = 'none';
        var $widgetContent = $(widgetContent);

        var toolTable = document.createElement('table');
        toolTable.id = 'twcheese_BRE_tools';
        toolTable.border = 1;
        toolTable.insertRow(-1);
        toolTable.rows[0].insertCell(-1); /* spot for raid calculator */
        toolTable.rows[0].cells[0].vAlign = 'top';
        toolTable.rows[0].insertCell(-1); /* spot for demolition information */
        toolTable.rows[0].cells[1].vAlign = 'top';
        toolTable.insertRow(-1);
        toolTable.rows[1].insertCell(-1); /* spot for renamer */
        toolTable.rows[1].cells[0].colSpan = 2;

        widgetContent.appendChild(toolTable);
        toolContainer.appendChild(widgetContent);

        contentValueElement.insertBefore(toolContainer, contentValueElement.getElementsByTagName('h2')[0]);

        /*==== raider table ====*/
        if (report.espionageLevel >= 1) {
            var raiderTable = document.createElement('table');
            raiderTable.id = 'twcheese_raider_calculator';
            raiderTable.insertRow(-1);
            raiderTable.rows[0].insertCell(-1);
            raiderTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Raiders</h2></span>';
            raiderTable.insertRow(-1);
            raiderTable.rows[1].align = 'center';
            raiderTable.rows[1].insertCell(-1);

            raiderTable.rows[1].cells[0].innerHTML = '';

            /*==== raid-category selection ====*/

            let raidModeOptions = [];
            if (report.espionageLevel >= 1) { // resources were scouted
                raidModeOptions.push(`<option value="scouted">raid scouted resources</option>`);
            }
            if (report.espionageLevel >= 2) { // buildings were scouted
                raidModeOptions.push(`<option value="predicted">raid predicted resources</option>`);
                raidModeOptions.push(`<option value="periodic">periodically raid resources</option>`);
            }
            let raidModeSelect = document.createElement('select');
            raidModeSelect.id = 'twcheese_raider_selection';
            raidModeSelect.innerHTML = raidModeOptions.join('');
            raidModeSelect.addEventListener('change', function() {
                _this.changeRaidMode(this.value);
            });
            raiderTable.rows[1].cells[0].appendChild(raidModeSelect);

            /*==== rally point link ====*/
            let rallyPointLink = document.createElement('a');
            rallyPointLink.href = gameUrl('place', {target: report.defenderVillage.id});
            rallyPointLink.innerHTML = '&raquo; Send troops';
            raiderTable.rows[1].cells[0].appendChild(rallyPointLink);

            /*==== haul Bonus ====*/
            let $haulBonus = $(`<div>Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size=5 value=0></input>%</div>`.trim());
            $haulBonus.find('#twcheese_raider_haulBonus').on('input', function() {
                _this.changeRaidMode(gameDoc.getElementById('twcheese_raider_selection').value);
            });
            raiderTable.rows[1].cells[0].appendChild($haulBonus[0]);

            /*==== Periodic Raider section ====*/
            var periodicDiv = document.createElement('div');
            periodicDiv.id = 'twcheese_periodic_options';
            periodicDiv.innerHTML = 'Period (hours):';
            var periodInput = document.createElement('input');
            periodInput.id = 'twcheese_period';
            periodInput.type = 'text';
            periodInput.size = 4;
            periodInput.maxLength = 4;
            periodInput.value = 8;
            periodInput.addEventListener('input', function() {
                let haulBonus = Number(document.getElementById('twcheese_raider_haulBonus').value);
                let raiders = report.calcRaidPeriodic(Number(this.value), gameConfig.speed, haulBonus);
                _this.setRaiders(raiders);
            });
            periodicDiv.appendChild(periodInput);

            raiderTable.rows[1].cells[0].appendChild(periodicDiv);

            /*==== button to use settings as default ====*/
            var setDefaultButton = document.createElement('button');
            setDefaultButton.innerHTML = 'Use current selection as default';
            setDefaultButton.onclick = function () {
                settings.haulBonus = document.getElementById('twcheese_raider_haulBonus').value;
                settings.period = gameDoc.getElementById('twcheese_period').value;
                settings.raid = gameDoc.getElementById('twcheese_raider_selection').value;
                twcheese_setBRESettings(settings);
                window.UI.InfoMessage('Settings Saved', 2000, 'success');
            };
            raiderTable.rows[1].cells[0].appendChild(setDefaultButton);

            /*==== units section ====*/
            var raiderUnitsTable = document.createElement('table');
            raiderUnitsTable.id = 'twcheese_raider_units';

            raiderUnitsTable.className = 'vis overview_table';
            raiderUnitsTable.style.borderStyle = 'solid';
            raiderUnitsTable.style.borderWidth = '1px';


            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[0].className = 'center';

            //==== icons ====
            let raiderTroopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy'];
            for (let troopType of raiderTroopTypes) {
                let cell = raiderUnitsTable.rows[0].insertCell(-1);
                cell.width = "35px";
                cell.innerHTML = `<img src="${ImageSrc.troopIcon(troopType)}" />`;
            }

            //==== looting suggestions ====
            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[1].className = 'center';
            for (let i = 0; i < 7; i++) {
                raiderUnitsTable.rows[1].insertCell(-1);
            }

            //==== travel times ====
            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[2].className = 'center';

            var travelTimes = calcTravelDurations(report.attackerVillage.distanceTo(report.defenderVillage), gameConfig.speed, gameConfig.unit_speed);

            for (let i = 0; i < 7; i++) {
                raiderUnitsTable.rows[2].insertCell(-1);
            }
            raiderUnitsTable.rows[2].cells[0].innerHTML = window.Format.timeSpan(travelTimes.spear);
            raiderUnitsTable.rows[2].cells[1].innerHTML = window.Format.timeSpan(travelTimes.sword);
            raiderUnitsTable.rows[2].cells[2].innerHTML = window.Format.timeSpan(travelTimes.axe);
            raiderUnitsTable.rows[2].cells[3].innerHTML = window.Format.timeSpan(travelTimes.archer);
            raiderUnitsTable.rows[2].cells[4].innerHTML = window.Format.timeSpan(travelTimes.light);
            raiderUnitsTable.rows[2].cells[5].innerHTML = window.Format.timeSpan(travelTimes.marcher);
            raiderUnitsTable.rows[2].cells[6].innerHTML = window.Format.timeSpan(travelTimes.heavy);

            raiderTable.insertRow(-1);
            raiderTable.rows[2].insertCell(-1);
            raiderTable.rows[2].align = 'center';
            raiderTable.rows[2].cells[0].appendChild(raiderUnitsTable);

            /*==== scout option ====*/
            if (game_data.market != 'uk') //uk rules forbid filling units into rally point
            {
                var raiderScoutTable = document.createElement('table');
                raiderScoutTable.id = 'twcheese_raider_scout';

                raiderScoutTable.className = 'vis overview_table';
                raiderScoutTable.style.borderStyle = 'solid';
                raiderScoutTable.style.borderWidth = '1px';

                raiderScoutTable.insertRow(-1);
                raiderScoutTable.rows[0].className = 'center';
                raiderScoutTable.rows[0].insertCell(-1);
                raiderScoutTable.rows[0].cells[0].width = "35px";
                raiderScoutTable.rows[0].cells[0].innerHTML = '<img src="' + ImageSrc.troopIcon('spy') + '" title="Number of scouts to send when a unit icon to the left is clicked" />';
                raiderScoutTable.insertRow(-1);
                raiderScoutTable.rows[1].className = 'center';
                raiderScoutTable.rows[1].insertCell(-1);

                var raiderScoutInput = document.createElement('input');
                raiderScoutInput.id = 'twcheese_raider_scouts';

                if (navigator.appName == 'Microsoft Internet Explorer') //internet buttsExplorer
                    raiderScoutInput.type = 'text';
                else
                    raiderScoutInput.type = 'number';
                raiderScoutInput.size = 3;
                raiderScoutInput.value = 0;
                raiderScoutInput.min = 0;
                raiderScoutTable.rows[1].cells[0].appendChild(raiderScoutInput);

                raiderScoutInput.onchange = function () {
                    _this.changeRaidMode(gameDoc.getElementById('twcheese_raider_selection').value)
                    localStorage.setItem('twcheese_report_raiderScouts', this.value);
                };

                raiderTable.rows[2].insertCell(-1);
                raiderTable.rows[2].cells[1].appendChild(raiderScoutTable);
            }

            toolTable.rows[0].cells[0].appendChild(raiderTable);
        }

        /*==== demolition table ====*/
        if (report.buildingLevels) {
            let catHeaders = [];
            let ramHeaders = [];
            let catRowOne = [];
            let catRowTwo = [];
            let ramRowOne = [];
            let ramRowTwo = [];

            let suggestedCounts = report.suggestSiegeUnits();

            for (let buildingType of buildingTypes) {
                let siegeWeapon = (buildingType === 'wall') ? 'ram' : 'catapult';

                let headerInnerHtml;
                if (game_data.market == 'uk') {
                    headerInnerHtml = '<img src="' + ImageSrc.buildingIcon(buildingType) + '" />';
                } else {
                    let troopCounts = {[siegeWeapon]: suggestedCounts.oneShotUpgraded[buildingType]};
                    let rallyPointUrl = attackPrepUrl(troopCounts, report.defenderVillage.id);
                    headerInnerHtml = '<a href="' + rallyPointUrl + '"><img src="' + ImageSrc.buildingIcon(buildingType) + '" /></a>';
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
                                        <img src="${ImageSrc.troopIcon('catapult')}" alt="catapults" />
                                    </td>
                                    <td colspan="${ramHeaders.length}">
                                        <img src="${ImageSrc.troopIcon('ram')}" alt="rams" />
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

            toolTable.rows[0].cells[1].appendChild($(demolitionHtml.trim())[0]);
        }

        /*==== renamer ====*/

        let renamer = this.renamer;
        let name = renamer.createName(report, '');

        let $renamer = $(`
            <div id="twcheese_renamer" align="center">
                <span align="center"><h2>Renamer</h2></span>
                note <input id="twcheese_note" type="text"/>
                <button>rename</button>
                <input id="twcheese_auto_rename" type="checkbox" />auto rename
                <img id="twcheese_autoRenameInfo" src="/graphic/questionmark.png?1" width="13" height="13" title="automatically rename reports when the BRE is used" />
                <br/> characters available: <span id="twcheese_availableCharacters">${renamer.availableChars(name)}</span>
                <br/><b>Preview: </b><span id="twcheese_rename_preview">${escapeHtml(name)}</span>
            </div>
        `.trim());

        toolTable.rows[1].cells[0].appendChild($renamer[0]);
        let noteInput = document.getElementById('twcheese_note');

        $('#twcheese_note').on('input', function() {
            let name = renamer.createName(report, noteInput.value);
            document.getElementById('twcheese_rename_preview').innerHTML = escapeHtml(name);
            document.getElementById('twcheese_availableCharacters').innerHTML = renamer.availableChars(name);
        });

        $renamer.find('button').on('click', function() {
            _this.renameReport(noteInput.value);
        });

        $('#twcheese_auto_rename').on('click', function() {
            settings.autoRename = gameDoc.getElementById('twcheese_auto_rename').checked;
            twcheese_setBRESettings(settings)
        });
        
    }


    /**
     * @param {string} note
     */
    renameReport(note) {
        let report = this.report;
        console.info('renaming report:', report);
        let newName = this.renamer.createName(report, note);

        var url = window.TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: report.reportId });
        window.TribalWars.post(url,
            {},
            { text: newName },
            function (data) {
                var $container = $('.quickedit[data-id="' + report.reportId + '"]');
                $container.find('.quickedit-label').html(newName);
            },
            {}
        );
    }


    /**
     * @param {string} mode - (scouted|predicted|periodic)
     */
    changeRaidMode(mode) {
        var haulBonus = Number(this.gameDoc.getElementById('twcheese_raider_haulBonus').value);
        let gameDoc = this.gameDoc;
        let report = this.report;
        let gameConfig = this.gameConfig;

        if (mode == 'scouted') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'scouted';
            let raiders = report.calcRaidScouted(haulBonus);
            this.setRaiders(raiders);
            gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
        }
        else if (mode == 'predicted') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'predicted';
            let raiders = report.calcRaidPredicted(window.game_data.village, TwCheeseDate.newServerDate(), gameConfig.speed, gameConfig.unit_speed, haulBonus);
            this.setRaiders(raiders);
            gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
        }
        else if (mode == 'periodic') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'periodic';
            let raiders = report.calcRaidPeriodic(Number(gameDoc.getElementById('twcheese_period').value), gameConfig.speed, haulBonus);
            this.setRaiders(raiders);
            gameDoc.getElementById('twcheese_periodic_options').style.display = '';
        }
    }


    /**
     * @param {TroopCounts} troopCounts
     */
    setRaiders(troopCounts) {
        let spyCount = this.gameDoc.getElementById('twcheese_raider_scouts').value;
        let attackUrl = (troopType, count) => {
            return attackPrepUrl({spy: spyCount, [troopType]: count}, this.report.defenderVillage.id);
        }

        let raiderTable = this.gameDoc.getElementById('twcheese_raider_units');
        let troopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy'];

        for (var i = 0; i < troopTypes.length; i++) {
            let troopType = troopTypes[i];
            raiderTable.rows[1].cells[i].innerHTML = troopCounts[troopType];
            if (window.game_data.market === 'uk') {
                continue;
            }
            let url = attackUrl(troopType, Math.round(troopCounts[troopType]));
            raiderTable.rows[0].cells[i].innerHTML = '<a href="' + url + '"><img src="' + ImageSrc.troopIcon(troopType) + '"/></a>';
        }
    }

}




/**
 * modifies page on the reports folder view
 * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
 * @param {ReportRenamer} renamer
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc, renamer, twcheese_reportsFolderDisplaySettings, gameConfig) {
    var pageMod = this;
    this.reports = new Array();

    /**
     *	mark checkboxes for reports with partial hauls
     */
    this.markPartialHauls = function () {
        for (var i = 0; i < partialHauls.length; i++)
            gameDoc.getElementsByName('id_' + partialHauls[i])[0].checked = true;
    };

    /**
     *	fills reportsTableBody with information
     */
    this.populateReportsTable = function () {
        for (let report of this.reports) {
            let row = reportsTableBody.insertRow(-1);
            row.twcheeseLabel = report.twcheeseLabel;

            /*==== basic cell ====*/
            let cell = row.insertCell(-1);
            cell.innerHTML = '<input name="id_' + report.reportId + '" type="checkbox">';
            cell.innerHTML += ' <img src="' + report.dotIcon + '"> ';
            if (report.lootIcon) {
                cell.innerHTML += '<img src="' + report.lootIcon + '"> ';
            }
            if (report.isForwarded) {
                cell.innerHTML += '<img src="graphic/forwarded.png?1" />';
            }
            cell.innerHTML += `<a href="${gameUrl('report', {mode:game_data.mode, view:report.reportId})}"> view</a>`;

            if (report.defender) {
                let isDefenderMe = report.defender.name == game_data.player.name;
                let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
                if (isDefenderMe || wasVillageConquered) {
                    cell.innerHTML += `<a href="${gameUrl('place', {mode:'units', village:report.defenderVillage.id})}">
                        <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc.buildingIcon('place')}" />
                    </a>`;
                }
            }

            /*==== repeat attack cell ====*/
            cell = row.insertCell(-1);
            if (report.attacker && report.attacker.name === game_data.player.name) {
                let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
                cell.innerHTML = '<a title="repeat attack, from current village" href="' + url + '"><img src="' + ImageSrc.attack + '" /></a>';
                if (report.twcheeseLabel) {
                    let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
                    cell.innerHTML += ' | <a title="repeat attack, from original village" href="' + url + '"><img src="' + ImageSrc.attack + '" /></a>';
                }
            }

            /*==== distance cell ====*/
            cell = row.insertCell(-1);
            if (report.defenderDistance) {
                cell.innerHTML = report.defenderDistance;
            }

            /*==== full subject cell ====*/
            cell = row.insertCell(-1);
            cell.innerHTML = report.subjectHTML;
            if (!report.twcheeseLabel) {
                cell.colSpan = 44;
            }

            if (report.twcheeseLabel) {
                /*==== note cell ====*/
                let cell = row.insertCell(-1);
                if (report.note) {
                    cell.innerHTML = report.note;
                }

                /*==== attacker cell ====*/
                cell = row.insertCell(-1);
                if (report.attacker) {
                    cell.innerHTML = report.attacker.name;
                }

                /*==== defender cell ====*/
                cell = row.insertCell(-1);
                if (report.defender) {
                    cell.innerHTML = report.defender.name;
                }

                /*==== origin cell ====*/
                cell = row.insertCell(-1);
                if (report.attackerVillage) {
                    cell.innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.attackerVillage.id + '" >' + report.attackerVillage.x + '|' + report.attackerVillage.y + '</a>';
                }

                /*==== target cell ====*/
                cell = row.insertCell(-1);
                if (report.defenderVillage) {
                    cell.innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.defenderVillage.id + '" >' + report.defenderVillage.x + '|' + report.defenderVillage.y + '</a>';
                }

                /*==== feint cell ====*/
                cell = row.insertCell(-1);
                if (report.isFeint) {
                    cell.innerHTML = '<img title="The attack contained only a small amount of units" style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/grey.png?1">';
                }

                /*==== deadNoble cell ====*/
                cell = row.insertCell(-1);
                if (report.deadNoble) {
                    if (report.attacker.name == game_data.player.name) {
                        cell.innerHTML = '<a href="/game.php?village=' + report.attackerVillage.id + '&screen=snob"><img src="' + ImageSrc.troopIcon('priest') + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/></a>';
                    }
                    else {
                        cell.innerHTML = '<img src="' + ImageSrc.troopIcon('priest') + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/>';
                    }
                }

                /*==== loyalty cell ====*/
                cell = row.insertCell(-1);
                if (report.loyalty) {
                    cell.innerHTML = '<span class="icon ally lead" title="Loyalty change"></span> ' + report.loyalty.after;
                }

                /*==== defender survivors ====*/
                for (let troopType of troopTypes) {
                    if (troopType === 'militia') {
                        continue;
                        // todo: change headers and display options to handle various troop types, instead of hardcoded
                    }
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.defenderSurvivors) {
                        let survivorCount = report.defenderSurvivors[troopType];
                        cell.innerHTML = survivorCount;
                        if (survivorCount === 0) {
                            cell.className = 'unit-item hidden';
                        }
                        cell.troopDigits = String(survivorCount).length;
                    }
                }

                /*==== buildings ====*/
                for (let buildingType of buildingTypes) {
                    if (buildingType === 'watchtower') {
                        continue;
                        // todo: change headers and display options to handle various building types, instead of hardcoded
                    }
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.buildingLevels) {
                        let level = report.buildingLevels[buildingType];
                        if (level !== '?') {
                            cell.innerHTML = level;
                        }
                        if (level === 0) {
                            cell.className = 'hidden';
                        }
                    }
                }

                /*==== wood, stone, iron ====*/
                for (let resType of Resources.TYPES) {
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.resources) {
                        let res = report.resources[resType];
                        cell.innerHTML = res.amount;
                        if (res.amount === 0) {
                            cell.className = 'hidden';
                        }
                        cell.resourceDigits = String(res).length;
                    }
                }

                /*==== resources total cell ====*/
                cell = row.insertCell(-1);
                cell.style.textAlign = 'center';
                if (report.resourcesTotal) {
                    cell.innerHTML = report.resourcesTotal;
                }
                if (report.resourcesTotal == 0) {
                    cell.className = 'hidden';
                }

                /*==== timeLaunched cell ====*/
                cell = row.insertCell(-1);
                if (report.timeLaunched) { // todo: consistent with enhanced report (report name needs more precise timestamp)
                    cell.innerHTML = report.timeLaunched.toHtml(false);
                }

                /*==== timeReceived cell ====*/
                cell = row.insertCell(-1);
                if (report.timeReceived) {
                    cell.innerHTML = report.timeReceived;
                }
            }
            else {
                /*==== timeReceived cell ====*/
                let cell = row.insertCell(-1);
                if (report.timeReceived) {
                    cell.innerHTML = report.timeReceived;
                }
            }

            row.twcheeseReport = report;
        }
        yTableEmulator.style.height = reportsTableBody.clientHeight + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
        this.alignForTroops();
        this.alignForResources();
    };

    /**
     *	@param	link:HTMLAnchor	a link to a report
     *	@return	reportId:Number the reportId of the linked report
     */
    this.scrapeReportId = function (link) {
        var address = link.href;
        return new Number(address.substring(address.indexOf('view=') + 5).match('[0-9]{1,}'));
    }

    /**
     *	marks checkboxes and hides certain displays in accordance with the user's Folder Display settings
     *	@param settings:twcheese_ReportsFolderDisplaySettings()
     */
    this.applySettings = function (settings) {
        var checkboxes = document.getElementById('twcheese_reportsFolderSettings').getElementsByTagName('input');

        if (settings.repeatLinks == 1)
            checkboxes[0].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(1);

        if (settings.distance == 1)
            checkboxes[2].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(2);

        if (settings.fullSubject == 1)
            checkboxes[4].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(3);

        if (settings.note == 1)
            checkboxes[6].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(4);

        if (settings.attacker == 1)
            checkboxes[8].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(5);

        if (settings.defender == 1)
            checkboxes[10].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(6);

        if (settings.attackerVillage == 1)
            checkboxes[12].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(7);

        if (settings.defenderVillage == 1)
            checkboxes[14].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(8);

        if (settings.feint == 1)
            checkboxes[16].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(9);

        if (settings.deadNoble == 1)
            checkboxes[18].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(10);

        if (settings.loyalty == 1)
            checkboxes[20].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(11);

        if (settings.survivors == 1)
            checkboxes[22].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideDefenseColumns();

        if (settings.resourcesTimber == 1)
            checkboxes[24].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(42);

        if (settings.resourcesClay == 1)
            checkboxes[26].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(43);

        if (settings.resourcesIron == 1)
            checkboxes[28].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(44);

        if (settings.resourcesTotal == 1)
            checkboxes[30].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(45);

        if (settings.timeLaunched == 1)
            checkboxes[32].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(46);

        if (settings.timeReceived == 1)
            checkboxes[34].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(47);

        var checkboxIndex;
        for (var i = 0; i < 18; i++) {
            checkboxIndex = i * 2 + 1;
            if (settings.buildings[i] == 1)
                checkboxes[checkboxIndex].checked = true;
            else
                document.getElementById('twcheese_reportsFolderDisplay').hideColumn(i + 24);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

        /*==== set display dimensions ====*/
        if (settings.displayWidth) {
            document.getElementById('twcheese_reportsFolderDisplay').style.width = settings.displayWidth;
            document.getElementById('twcheese_reportsFolderDisplay').style.height = settings.displayHeight;
            document.getElementById('twcheese_reportsFolderDisplay').fitDisplayComponents();

        }
    }

    /*==== find reports table ====*/
    /* note: premium players have a table with links to folders. regular players don't. But the layout seems to have changed again */
    var reportsTable;
    if (window.premium)
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];
    else
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];

    var reportsForm = reportsTable.parentNode;

    /*==== scrape reports information ====*/
    this.reports = new Array();
    var partialHauls = new Array();

    for (var i = 1; i < reportsTable.rows.length - 1; i++) {
        var report = renamer.parseName(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML);
        report.timeReceived = reportsTable.rows[i].cells[1].innerHTML;
        report.reportId = this.scrapeReportId(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0]);
        var reportIcons = [...reportsTable.rows[i].cells[1].getElementsByTagName('img')];

        /*==== defender distance from current village ====*/
        if (report.defenderVillage)
            try {
                report.defenderDistance = Math.round(report.defenderVillage.distanceTo(game_data.village) * 100) / 100;
            }
            catch (err) {
                console.error(err);
                report.defenderDistance = '?';
            }

        else
            report.defenderDistance = '?';

        /*==== dot color ====*/
        report.dotIcon = reportIcons.find(img => img.src.includes('graphic/dots/')).src;

        /*==== has it already been read? ====*/
        var cellText = $(reportsTable.rows[i].cells[0]).contents().filter(function () {
            return this.nodeType == 3;
        }).text();

        report.isNew = textScraper.includes(cellText, 'report.unread');

        /*==== partial hauls ====*/
        report.isFullHaul = false;
        report.isPartialHaul = false;

        // note: non-premium users don't get an icon showing partial/full haul
        let lootImg = reportIcons.find(img => img.src.includes('graphic/max_loot/'));
        if (lootImg) {
            if (lootImg.src.includes('max_loot/0.png')) {
                partialHauls.push(report.reportId);
                report.isPartialHaul = true;
            } else {
                report.isFullHaul = true;
            }
            report.lootIcon = lootImg.src;
        }

        /*==== forwarded ====*/
        report.isForwarded = !!reportIcons.find(img => img.src.includes('graphic/forwarded.png'));

        /*==== subject html ====*/
        var $subjectNode = $(reportsTable.rows[i].cells[1]).clone();
        $subjectNode.find(`img[src*='graphic/max_loot/'], img[src*='graphic/dots/']`).remove();
        report.subjectHTML = $subjectNode.html();

        /*==== timeReceived ====*/
        report.timeReceived = reportsTable.rows[i].cells[2].innerHTML;

        this.reports.push(report);
    }

    /*==== remove old table ====*/
    reportsTable.parentNode.removeChild(reportsTable);

    /*==== create twcheese reports folder ====*/
    var reportsFolder = document.createElement('div');
    reportsForm.insertBefore(reportsFolder, reportsForm.firstChild);
    reportsFolder.id = 'twcheese_reportsFolder';

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


    /*==== export repeatLinks div ====*/
    var reportsFolderExportContainer = document.createElement('table');
    reportsFolderToolbar.appendChild(reportsFolderExportContainer);
    reportsFolderExportContainer.id = 'twcheese_reportsFolderExport';
    reportsFolderExportContainer.style.display = 'none';

    reportsFolderExportContainer.insertRow(-1);
    reportsFolderExportContainer.rows[0].insertCell(-1);
    reportsFolderExportContainer.rows[0].insertCell(-1);
    reportsFolderExportContainer.rows[0].cells[0].innerHTML += '<textarea rows=10 cols=40 />';

    /*==== export repeatLinks configuration table ====*/
    var exportConfigTable = document.createElement('table');
    exportConfigTable.id = 'twcheese_exportConfigTable';
    reportsFolderExportContainer.rows[0].cells[1].appendChild(exportConfigTable);

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[0].appendChild(document.createElement('th'));
    exportConfigTable.rows[0].cells[0].innerHTML = 'Format';
    exportConfigTable.rows[0].appendChild(document.createElement('th'));
    exportConfigTable.rows[0].cells[1].innerHTML = 'Attacking Village';

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[1].insertCell(-1);
    exportConfigTable.rows[1].cells[0].innerHTML = `
        <input type="radio" name="twcheese-repeat-attack-export-format" checked="true" value="bbcode"/> BBCode
        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="plainLink"/> plain links
        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="html"/> HTML`;

    exportConfigTable.rows[1].insertCell(-1);
    exportConfigTable.rows[1].cells[1].innerHTML = `
        <input type="radio" name="twcheese-repeat-attack-export-village" checked="true" value="current"/> current village
        <br/><input type="radio" name="twcheese-repeat-attack-export-village" value="original"/> original village`;

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[2].insertCell(-1);
    exportConfigTable.rows[2].cells[0].colSpan = 2;
    exportConfigTable.rows[2].cells[0].innerHTML = 'Header: <input type="text" id="twcheese_export_header" value="new cheesy attack group" onclick="if(this.value==\'new cheesy attack group\')this.value=\'\';" />';

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[3].insertCell(-1);
    exportConfigTable.rows[3].cells[0].colSpan = 2;
    exportConfigTable.rows[3].cells[0].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderExport\').exportLinks();" > &raquo; Export</a>';

    reportsFolderExportContainer.exportLinks = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        let format = $("input[name='twcheese-repeat-attack-export-format']:checked").val();
        let attackingVillage = $("input[name='twcheese-repeat-attack-export-village']:checked").val();

        var header = document.getElementById('twcheese_export_header').value;


        function buildHeader() {
            switch (format) {
                case 'bbcode':
                    return `[b][u][size=12]${header}[/size][/u][/b]`;

                case 'plainLink':
                    return header;

                case 'html':
                    return [
                        '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
                        `\n<DT><H3>${header}</H3></DT>\n<DL><P>`
                    ].join('');
            }
        }


        function urlCurrentVillage(twcheeseReport) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: twcheeseReport.reportId});
        }

        function buildEntryCurrentVillage(twcheeseReport) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlCurrentVillage(twcheeseReport) + ']repeat attack ' + twcheeseReport.reportId + ' from (' + game_data.village.coord + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlCurrentVillage(twcheeseReport);

                case 'html':
                    let leadingZero = '';
                    if (twcheeseReport.defenderDistance < 10) {
                        leadingZero = '0';
                    }
                    return '\n<DT><A HREF="' + urlCurrentVillage(twcheeseReport) + '" >' + leadingZero + twcheeseReport.defenderDistance + ' Repeat Attack ' + twcheeseReport.reportId + ' from (' + game_data.village.coord + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')</A></DT>';                
            }
        }


        function urlOriginalVillage(twcheeseReport) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: twcheeseReport.reportId, village: twcheeseReport.attackerVillage.id});
        }

        function buildEntryOriginalVillage(twcheeseReport) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlOriginalVillage(twcheeseReport) + ']repeat attack ' + twcheeseReport.reportId + ' from (' + twcheeseReport.attackerVillage.x + '|' + twcheeseReport.attackerVillage.y + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlOriginalVillage(twcheeseReport);

                case 'html':
                    return '\n<DT><A HREF="' + urlOriginalVillage(twcheeseReport) + '" >Repeat Attack ' + twcheeseReport.reportId + ' from (' + twcheeseReport.attackerVillage.x + '|' + twcheeseReport.attackerVillage.y + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')</A></DT>';
            }
        }

        var exportString = buildHeader();

        for (let i = 1; i < reportsTable.rows.length; i++) {
            let twcheeseReport = reportsTable.rows[i].twcheeseReport;
            if (twcheeseReport.attacker.name !== game_data.player.name) {
                continue; // can't repeat somebody else's attack
            }
            if (attackingVillage == 'current') {
                exportString += buildEntryCurrentVillage(twcheeseReport);
            }
            else if (attackingVillage == 'original' && reportsTable.rows[i].twcheeseLabel) {
                exportString += buildEntryOriginalVillage(twcheeseReport);
            } 
        }

        if (format === 'html') {
            exportString += '\n</P></DL>';
        }

        document.getElementById('twcheese_reportsFolderExport').getElementsByTagName('textarea')[0].value = exportString;
    };


    /*==== display settings ====*/
    var reportsFolderSettingsDiv = document.createElement('div');
    reportsFolderToolbar.appendChild(reportsFolderSettingsDiv);
    reportsFolderSettingsDiv.id = 'twcheese_reportsFolderSettings';
    reportsFolderSettingsDiv.style.display = 'none';

    /*==== options table ====*/
    var reportsFolderSettingsTable = document.createElement('table');
    reportsFolderSettingsTable.width = '100%';
    reportsFolderSettingsDiv.appendChild(reportsFolderSettingsTable);
    reportsFolderSettingsTable.id = 'twcheese_reportsFolderSettingsTable';

    for (let i = 0; i < 19; i++) {
        reportsFolderSettingsTable.insertRow(-1);
        reportsFolderSettingsTable.rows[i].insertCell(-1);
        reportsFolderSettingsTable.rows[i].insertCell(-1);
    }

    /*==== repeatLinks option ====*/
    var checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(1,'repeatLinks')";
    reportsFolderSettingsTable.rows[0].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Links to Repeat';

    /*==== distance option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(2,'distance')";
    reportsFolderSettingsTable.rows[1].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Distance';

    /*==== fullSubject option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(3,'fullSubject')";
    reportsFolderSettingsTable.rows[2].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Full Subject';

    /*==== note option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(4,'note')";
    reportsFolderSettingsTable.rows[3].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Note';

    /*==== attacker option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(5,'attacker')";
    reportsFolderSettingsTable.rows[4].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Attacker';

    /*==== defender option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(6,'defender')";
    reportsFolderSettingsTable.rows[5].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Defender';

    /*==== attackerVillage option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(7,'attackerVillage')";
    reportsFolderSettingsTable.rows[6].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Attacker\'s Village';

    /*==== defenderVillage option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(8,'defenderVillage')";
    reportsFolderSettingsTable.rows[7].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Defender\'s Village';

    /*==== feint option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(9,'feint')";
    reportsFolderSettingsTable.rows[8].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Feint';

    /*==== deadNoble option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(10,'deadNoble')";
    reportsFolderSettingsTable.rows[9].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Dead Noble';

    /*==== loyalty option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(11,'loyalty')";
    reportsFolderSettingsTable.rows[10].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Loyalty';

    /*==== survivors option ====*/
    var survivorsScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsDefenseColumns()";
    reportsFolderSettingsTable.rows[11].cells[0].innerHTML += '<input onClick="' + survivorsScript + '" type="checkbox"/>Troops: remaining defense';

    /*==== resourcesTimber option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(42,'resourcesTimber')";
    reportsFolderSettingsTable.rows[12].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Timber';

    /*==== resourcesstone option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(43,'resourcesClay')";
    reportsFolderSettingsTable.rows[13].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Clay';

    /*==== resourcesIron option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(44,'resourcesIron')";
    reportsFolderSettingsTable.rows[14].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Iron';

    /*==== resourcesTotal option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(45,'resourcesTotal')";
    reportsFolderSettingsTable.rows[15].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Total';

    /*==== timeLaunched option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(46,'timeLaunched')";
    reportsFolderSettingsTable.rows[16].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Time: Launched';

    /*==== timeReceived option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(47,'timeReceived')";
    reportsFolderSettingsTable.rows[17].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Time: Received';

    /*=== building options ====*/
    for (let i = 0; i < 18; i++) {
        // todo: all buildings, not hardcoded
        checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(" + Number(i + 24) + ",'buildings[" + i + "]')";
        var targetCell = reportsFolderSettingsTable.rows[i].cells[1];
        targetCell.innerHTML = '<input onClick="' + checkboxScript + '" type="checkbox"/>';
        targetCell.innerHTML += language['twcheese']['Building'] + ': ' + textScraper.t(`buildings.${buildingTypes[i]}`);
    }


    /*==== reports display ====*/
    var reportsFolderDisplay = document.createElement('div');
    reportsFolder.appendChild(reportsFolderDisplay);
    reportsFolderDisplay.id = 'twcheese_reportsFolderDisplay';
    reportsFolderDisplay.style.overflow = 'hidden';
    reportsFolderDisplay.style.position = 'relative';
    reportsFolderDisplay.style.width = '646px';
    reportsFolderDisplay.style.height = '400px'; // I think this is what I should have used in the first place. TODO: test to ensure proper scrolling
    //reportsFolderDisplay.style.maxHeight = '400px';  //removed for resizable
    reportsFolderDisplay.style.minHeight = '100px';
    reportsFolderDisplay.style.minWidth = '100px';

    /*==== resizable functionality ====*/
    $(function () { $("#twcheese_reportsFolderDisplay").resizable(); });
    $('#twcheese_reportsFolderDisplay').resize(
        function () {
            try {
                document.getElementById('twcheese_reportsFolderDisplay').fitDisplayComponents();

                /*==== save settings ====*/
                var reportsFolderDisplay = document.getElementById('twcheese_reportsFolderDisplay');
                twcheese_reportsFolderDisplaySettings.displayWidth = reportsFolderDisplay.style.width;
                twcheese_reportsFolderDisplaySettings.displayHeight = reportsFolderDisplay.style.height;
                twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
            } catch (e) { console.error(e) }
        }
    );

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

    for (let i = 0; i < 37; i++) {
        reportsTableHeader.rows[0].appendChild(document.createElement('th'));
    }
    reportsTableHeader.rows[0].cells[12].colSpan = 12;
    reportsTableHeader.rows[0].cells[12].innerHTML = 'Defense Remaining';

    var cellIndex = 0;

    /*==== basic header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '120px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '120px';
    cellIndex++;

    /*==== repeat links header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Repeat';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== distance header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Distance';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '60px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '60px';
    cellIndex++;

    /*==== subject header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Subject';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '400px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '400px';
    cellIndex++;

    /*==== note header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Note';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '200px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '200px';
    cellIndex++;

    /*==== attacker header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Attacker';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '150px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '150px';
    cellIndex++;

    /*==== defender header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Defender';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '150px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '150px';
    cellIndex++;

    /*==== origin header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Origin';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '70px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '70px';
    cellIndex++;

    /*==== target header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Target';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '70px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '70px';
    cellIndex++;

    /*==== feint header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Feint';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== dead noble header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Noble';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== loyalty header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Loyalty';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== defense remaining ====*/
    var widthSum = 0;
    for (let i = 0; i < 12; i++) {
        let troopType = troopTypes[i];
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.troopIcon(troopType) + '" />';

        widthSum = widthSum + 20;
        cellIndex++;
    }
    reportsTableHeader.rows[0].cells[cellIndex - 12].style.width = widthSum + 'px';


    /*==== building levels ====*/
    for (let i = 0; i < 18; i++) {
        let buildingType = buildingTypes[i];
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.buildingIcon(buildingType) + '" />';
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '20px';
        cellIndex++;
    }

    /*==== wood header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.wood + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== stone header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.stone + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== wood header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.iron + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== total resources header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Total';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '40px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '40px';
    cellIndex++;

    /*==== timeLaunched header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Launched';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '170px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '170px';
    cellIndex++;

    /*==== timeReceived header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Received';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '140px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '140px';
    cellIndex++;

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
    for (let i = 0; i < reportsTableHeader.rows[1].cells.length; i++) {
        reportsTableBody.rows[0].insertCell(-1);
        reportsTableBody.rows[0].cells[i].style.width = reportsTableHeader.rows[1].cells[i].style.width;
    }
    reportsTableBody.rows[0].twcheeseLabel = true;

    /*==== y scroll panel====*/
    var yScrollPanel = document.createElement('div');
    yScrollPanel.id = 'twcheese_reportsDisplay_yScrollPanel';
    reportsFolderDisplay.appendChild(yScrollPanel);
    yScrollPanel.style.overflowY = 'scroll';
    yScrollPanel.style.overflowX = 'hidden';
    yScrollPanel.style.background = 'transparent';
    yScrollPanel.style.position = 'absolute';
    yScrollPanel.style.right = 0;
    //yScrollPanel.style.maxHeight = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
    yScrollPanel.style.height = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
    yScrollPanel.style.top = reportsTableHeaderDiv.clientHeight + "px";

    /*==== y table emulator ====*/
    var yTableEmulator = document.createElement('div');
    yTableEmulator.id = 'twcheese_reportsDisplay_y-table-emulator';
    yScrollPanel.appendChild(yTableEmulator);
    yTableEmulator.style.height = reportsTableBody.clientHeight;
    //if(navigator.appName.search('Internet Explorer') != -1)
    //yTableEmulator.style.height = '10000px';
    yTableEmulator.style.overflow = 'hidden';
    yTableEmulator.style.position = 'relative';
    yTableEmulator.innerHTML = '&nbsp;';


    /*==== x scroll panel ====*/
    var xScrollPanel = document.createElement('div');
    xScrollPanel.id = 'twcheese_reportsDisplay_xScrollPanel';
    reportsFolderDisplay.appendChild(xScrollPanel);
    xScrollPanel.style.height = '40px';
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

    /*==== scrolling functionality ====*/
    reportsTableBodyDiv.onscroll = function (e) {
        xScrollPanel.scrollTop = reportsTableBodyDiv.scrollTop;
    };

    yScrollPanel.onscroll = function (e) {
        reportsTableBodyDiv.scrollTop = yScrollPanel.scrollTop;
    };

    xScrollPanel.onscroll = function (e) {
        reportsTableBodyDiv.scrollLeft = xScrollPanel.scrollLeft;
        reportsTableHeaderDiv.scrollLeft = xScrollPanel.scrollLeft;
    };

    /*==== reports table functions ====*/
    var reportsTable = reportsFolderDisplay;

    reportsTable.toggleReportsDefenseColumns = function () {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        if (twcheese_reportsFolderDisplaySettings.survivors == 1) {
            /* hide */
            document.getElementById('twcheese_reportsFolderDisplay').hideDefenseColumns();
            twcheese_reportsFolderDisplaySettings.survivors = 0;
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }
        else {
            /* show */
            reportsTableHeader.rows[0].cells[12].style.display = "table-cell";
            for (var j = 12; j < 24; j++) {
                reportsTableHeader.rows[1].cells[j].style.display = "table-cell";
                for (var i = 0; i < reportsTableBody.rows.length; i++) {
                    if (!reportsTableBody.rows[i].twcheeseLabel)
                        reportsTableBody.rows[i].cells[3].colSpan += 1;
                    else
                        reportsTableBody.rows[i].cells[j].style.display = "table-cell";
                }
                var tableWidth = reportsTableHeader.style.width.split('px')[0];
                var columnWidth = reportsTableHeader.rows[1].cells[j].style.width.split('px')[0];
                tableWidth = Number(tableWidth) + Number(columnWidth);
                reportsTableHeader.style.width = tableWidth + 'px';
            }
            reportsTableBody.style.width = reportsTableHeader.style.width;

            twcheese_reportsFolderDisplaySettings.survivors = 1;
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.toggleReportsColumn = function (column, settingName) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');
        if (eval('twcheese_reportsFolderDisplaySettings.' + settingName) == 1) {
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(column);
            eval('twcheese_reportsFolderDisplaySettings.' + settingName + '= 0');
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }
        else {
            /* show */
            var tableWidth = reportsTableHeader.style.width.split('px')[0];
            var columnWidth = reportsTableHeader.rows[1].cells[column].style.width.split('px')[0];
            tableWidth = Number(tableWidth) + Number(columnWidth);

            /*==== header ====*/
            reportsTableHeader.style.width = tableWidth + 'px';
            if (column < 12)
                reportsTableHeader.rows[0].cells[column].style.display = "table-cell";
            else if (column >= 24)
                reportsTableHeader.rows[0].cells[column - 11].style.display = "table-cell";
            reportsTableHeader.rows[1].cells[column].style.display = "table-cell";

            /*==== body ====*/
            reportsTableBody.style.width = tableWidth + 'px';
            for (var i = 0; i < reportsTableBody.rows.length; i++) {
                if (!reportsTableBody.rows[i].twcheeseLabel && column > 2) {
                    if (column == 47) //timeReceived column
                        reportsTableBody.rows[i].cells[4].style.display = 'table-cell';
                    else
                        reportsTableBody.rows[i].cells[3].colSpan += 1;
                }
                else {
                    reportsTableBody.rows[i].cells[column].style.display = "table-cell";
                }
            }

            eval('twcheese_reportsFolderDisplaySettings.' + settingName + '= 1');
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.hideDefenseColumns = function () {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        reportsTableHeader.rows[0].cells[12].style.display = "none";
        for (var j = 12; j < 24; j++) {
            reportsTableHeader.rows[1].cells[j].style.display = "none";
            for (var i = 0; i < reportsTableBody.rows.length; i++) {
                if (!reportsTableBody.rows[i].twcheeseLabel)
                    reportsTableBody.rows[i].cells[3].colSpan -= 1;
                else
                    reportsTableBody.rows[i].cells[j].style.display = "none";
            }
            var tableWidth = reportsTableHeader.style.width.split('px')[0];
            var columnWidth = reportsTableHeader.rows[1].cells[j].style.width.split('px')[0];
            tableWidth = Number(tableWidth) - Number(columnWidth);
            reportsTableHeader.style.width = tableWidth + 'px';
        }
        reportsTableBody.style.width = reportsTableHeader.style.width;

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.hideColumn = function (column) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        var tableWidth = reportsTableHeader.style.width.split('px')[0];
        var columnWidth;

        /*==== header ====*/
        if (column < 12) {
            reportsTableHeader.rows[0].cells[column].style.display = "none";
            columnWidth = reportsTableHeader.rows[0].cells[column].style.width.split('px')[0];
        }
        else if (column >= 24) {
            reportsTableHeader.rows[0].cells[column - 11].style.display = "none";
            columnWidth = reportsTableHeader.rows[0].cells[column - 11].style.width.split('px')[0];

        }
        tableWidth = Number(tableWidth) - Number(columnWidth);
        reportsTableHeader.style.width = tableWidth + 'px';
        reportsTableHeader.rows[1].cells[column].style.display = "none";

        /*==== body ====*/
        reportsTableBody.style.width = tableWidth + 'px';
        for (var i = 0; i < reportsTableBody.rows.length; i++) {
            if (!reportsTableBody.rows[i].twcheeseLabel && column > 2) {
                if (column == 47) // timeReceived column
                    reportsTableBody.rows[i].cells[4].style.display = 'none';
                else
                    reportsTableBody.rows[i].cells[3].colSpan -= 1;
            }
            else {
                reportsTableBody.rows[i].cells[column].style.display = "none";
            }
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

    };

    /**
     *	note: changed from a loop to recursive method in 2.2 to allow redrawing of progress in IE via setTimeout method
     *	@param reports:Array(reportID:String)	an array of reportIDs for reports that still need to be renamed
     *	@param total:Number		the total amount of reports that will have been renamed
     */
    reportsTable.massRename = async function (reports, total) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        var inputs = reportsTable.getElementsByTagName('input');
        if (!reports) {
            reports = new Array(); //array of report IDs for reports to rename

            /*==== detect which reports need to be renamed ====*/
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    if (inputs[i].checked) {
                        reports.push(inputs[i].name.substring(3));
                    }
                }
            }
            document.getElementById('twcheese_progress_count_max').innerHTML = reports.length;
            total = reports.length;
        }
        var estimatedTimeRemaining;

        /*==== rename reports 1 by 1 ====*/
        if (reports.length == 0) {
            document.getElementById('twcheese_progress_count').innerHTML = 0;
            window.UI.ErrorMessage(language['twcheese']['noReportsSelected'], 3000);
        }
        else {
            var reportID = reports.shift();
            var startTime = performance.now();

            let reportDoc = await requestDocument(gameUrl('report', {mode: game_data.mode, view: reportID}));

            try {
                let scraper = new BattleReportScraper(reportDoc);
                var report = scraper.scrapeReport();
              
                report.timingInfo = report.calcTimingInfo(gameConfig.speed, gameConfig.unit_speed);

                var name = renamer.createName(report, '');

                var url = window.TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: report.reportId });
                window.TribalWars.post(url,
                    {},
                    { text: name },
                    function (data) {
                        var $container = $('.quickedit[data-id="' + report.reportId + '"]');
                        $container.find('.quickedit-label').html(name);
                    },
                    {}
                );

                /*==== update reports information so row can be redrawn with updated information====*/
                var oldReport = reportsTable.rows[document.getElementsByName('id_' + report.reportId)[0].parentNode.parentNode.rowIndex].twcheeseReport;
                report = renamer.parseName(name);
                report.reportId = reportID;
                report.twcheeseLabel = true;
                report.dotIcon = oldReport.dotIcon;
                report.isFullHaul = oldReport.isFullHaul;
                report.isPartialHaul = oldReport.isPartialHaul;
                report.lootIcon = oldReport.lootIcon;
                report.isForwarded = oldReport.isForwarded;
                report.timeReceived = oldReport.timeReceived;
                //report.subjectHTML = reportsTable.rows[document.getElementsByName('id_'+report.reportId)[0].parentNode.parentNode.rowIndex].cells[3].innerHTML;
                pageMod.reports[document.getElementsByName('id_' + report.reportId)[0].parentNode.parentNode.rowIndex - 1] = report;

                /*==== update progress display ====*/
                var millisElapsed = performance.now() - startTime;
                estimatedTimeRemaining = (millisElapsed * reports.length) / 1000;
                var minutesRemaining = Math.floor(estimatedTimeRemaining / 60);
                var secondsRemaining = Math.round(estimatedTimeRemaining - (minutesRemaining * 60));
                if (minutesRemaining < 10)
                    minutesRemaining = '0' + minutesRemaining;
                if (secondsRemaining < 10)
                    secondsRemaining = '0' + secondsRemaining;
                document.getElementById('twcheese_time_remaining').innerHTML = minutesRemaining; //minutes
                document.getElementById('twcheese_time_remaining').innerHTML += ':' + secondsRemaining; //seconds
                document.getElementById('twcheese_progress_count').innerHTML = Number(total - reports.length);
                document.getElementById('twcheese_progress_percent').innerHTML = Number(Math.round((total - reports.length) / total * 100));
            }
            catch (e) {
                console.error('error renaming report:', e);
            }

            if (reports.length > 0)
                setTimeout(function () { document.getElementById('twcheese_reportsFolderDisplay').massRename(reports, total) }, 1);
            else {
                /*==== update subject html ====*/
                for (let i = 1; i < reportsTable.rows.length; i++) {
                    pageMod.reports[i - 1].subjectHTML = reportsTable.rows[i].cells[3].innerHTML;
                }

                document.getElementById('twcheese_reportsFolderDisplay').refreshContents();
            }
        }
    };

    reportsTable.refreshContents = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length;) {
            reportsTable.deleteRow(1);
        }

        pageMod.populateReportsTable();
        pageMod.applySettings(twcheese_reportsFolderDisplaySettings);

        //yTableEmulator.style.height = reportsTableBody.clientHeight + 'px';
        //xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';				

        /*==== adjust scrollbars ====*/
        //document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        //document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

    };

    /**
     *	sets display components styles to fill the display zone and ensure scrolling functionality
     */
    reportsTable.fitDisplayComponents = function () {
        var displayZone = document.getElementById('twcheese_reportsFolderDisplay');
        var tableBody = document.getElementById('twcheese_reportsTable');
        tableBody.style.width = displayZone.style.width;
        tableBody.style.height = Number(Number(displayZone.style.height.substring(0, displayZone.style.height.indexOf('px'))) - 67) + 'px';
        document.getElementById('twcheese_reportsDisplay_yScrollPanel').style.height = tableBody.style.height;
    };

    reportsTable.selectNew = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isNew)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    }

    reportsTable.selectOld = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (!reportsTable.rows[i].twcheeseReport.isNew)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    }

    reportsTable.selectAll = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectNone = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = false;
        }
    };

    reportsTable.selectDotColor = function (dotColor) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.dotIcon.search(dotColor) != -1)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectForwarded = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isForwarded)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    /**
     *	@param type:Number - 0 for non full haul, 1 for full haul
     */
    reportsTable.selectLoot = function (type) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if ((reportsTable.rows[i].twcheeseReport.isFullHaul && type == 1) || (reportsTable.rows[i].twcheeseReport.isPartialHaul && type == 0))
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectFeint = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isFeint)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDeadNoble = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.deadNoble)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectLoyalty = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.loyalty)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectCleared = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isCleared)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectText = function (text) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.subject.toLowerCase().search(text) != -1)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectAttacker = function (attackerName) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attacker.name == attackerName)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDefender = function (defender) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defender.name == defender)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectAttackerVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attackerVillage.x == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.attackerVillage.y == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDefenderVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defenderVillage.x == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.defenderVillage.y == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    /**
     *	todo: fix buginess
     *	adjusts reports table width based on troop counts
     */
    this.alignForTroops = function () {
        var maxDigits = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
        for (var row = 1; row < reportsTableBody.rows.length; row++) {
            if (reportsTableBody.rows[row].twcheeseLabel && reportsTableBody.rows[row].twcheeseReport.defenderSurvivors) {
                let survivors = reportsTableBody.rows[row].twcheeseReport.defenderSurvivors.toArray();
                for (var i = 0; i < 12; i++) {
                    var digits = new String(survivors[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
            }
        }

        var totalWidth = 0;
        for (let i = 0; i < 12; i++) {
            let $headerCell = $(reportsTableHeader.rows[1].cells[i + 12]);
            let $bodyCell = $(reportsTableBody.rows[0].cells[i + 12]);
            let width = Math.max($headerCell.innerWidth(), $bodyCell.innerWidth());

            $headerCell.css({'min-width': width});
            $bodyCell.css({'min-width': width});

            totalWidth += $bodyCell.outerWidth();
        }
        totalWidth += 11 * 2; // border spacing between the 12 cells
        let padding = 3;
        reportsTableHeader.style.width = Number(Number(reportsTableHeader.style.width.split('px')[0]) - Number(reportsTableHeader.rows[0].cells[12].style.width.split('px')[0]) + totalWidth - 2*padding) + 'px';
        reportsTableHeader.rows[0].cells[12].style.width = Number(totalWidth - 2*padding) + 'px';
        reportsTableBody.style.width = reportsTableHeader.clientWidth + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
    };

    /**
     *	adjusts reportsTable width based on resources
     */
    this.alignForResources = function () {
        var maxDigits = new Array(2, 2, 2, 5);
        for (var row = 1; row < reportsTableBody.rows.length; row++) {
            if (reportsTableBody.rows[row].twcheeseLabel && reportsTableBody.rows[row].twcheeseReport.resources) {
                let res = reportsTableBody.rows[row].twcheeseReport.resources.toArray();
                for (var i = 0; i < 3; i++) {
                    let digits = new String(res[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
                let digits = new String(reportsTableBody.rows[row].twcheeseReport.resourcesTotal).length;
                if (digits > maxDigits[3])
                    maxDigits[3] = digits;
            }
        }

        reportsTableHeader.style.width = Number(Number(reportsTable.style.width.split('px')[0]) - 88) + 'px';
        for (let i = 0; i < 4; i++) {
            var width = maxDigits[i] * 8;
            if (width < 20)
                width = 20;
            reportsTableHeader.rows[1].cells[i + 42].style.width = width + 'px';
            reportsTableHeader.rows[0].cells[i + 31].style.width = width + 'px';
            reportsTableBody.rows[0].cells[i + 42].style.width = width + 'px';
            reportsTableHeader.style.width = Number(Number(reportsTableHeader.style.width.split('px')[0]) + width) + 'px';
        }
        reportsTableBody.style.width = reportsTableHeader.clientWidth + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
    };

    /*==== put report information into table ====*/
    this.populateReportsTable();

    /*==== reports selector bar ====*/
    var reportsSelectorBar = document.createElement('div');
    reportsFolder.appendChild(reportsSelectorBar);
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
            click: () => reportsFolderDisplay.selectAll(),
            html: 'all'
        }],
        ['none', {
            click: () => reportsFolderDisplay.selectNone(),
            html: 'none'
        }],
        ['new', {
            click: () => reportsFolderDisplay.selectNew(),
            html: 'new'
        }],
        ['old', {
            click: () => reportsFolderDisplay.selectOld(),
            html: 'old'
        }],
        ['dotGreen', {
            click: () => reportsFolderDisplay.selectDotColor('green'),
            html: imgHtml('graphic/dots/green.png')
        }],
        ['dotYellow', {
            click: () => reportsFolderDisplay.selectDotColor('yellow'),
            html: imgHtml('graphic/dots/yellow.png')
        }],
        ['dotRed', {
            click: () => reportsFolderDisplay.selectDotColor('red'),
            html: imgHtml('graphic/dots/red.png')
        }],
        ['dotBlue', {
            click: () => reportsFolderDisplay.selectDotColor('blue'),
            html: imgHtml('graphic/dots/blue.png')
        }],
        ['forwarded', {
            click: () => reportsFolderDisplay.selectForwarded(),
            html: imgHtml('graphic/forwarded.png')
        }],
        ['haulPartial', {
            click: () => reportsFolderDisplay.selectLoot(0),
            html: imgHtml('graphic/max_loot/0.png')
        }],
        ['haulFull', {
            click: () => reportsFolderDisplay.selectLoot(1),
            html: imgHtml('graphic/max_loot/1.png')
        }],
        ['feint', {
            click: () => reportsFolderDisplay.selectFeint(),
            html: imgHtml('graphic/dots/grey.png'),
            tooltip: 'feint'
        }],
        ['deadNoble', {
            click: () => reportsFolderDisplay.selectDeadNoble(),
            html: imgHtml(ImageSrc.troopIcon('priest')),
            tooltip: 'dead noble'
        }],
        ['loyalty', {
            click: () => reportsFolderDisplay.selectLoyalty(),
            html: '<span style="display:block; margin-left:auto; margin-right:auto" class="icon ally lead"/>',
            tooltip: 'loyalty change'
        }],
        ['cleared', {
            click: () => reportsFolderDisplay.selectCleared(),
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
            use: reportsFolderDisplay.selectText,
            sprite: [-140, 0]
        },
        {
            hintInput: 'attacker',
            hintButton: 'select attacking player',
            use: reportsFolderDisplay.selectAttacker,
            sprite: [-80, 0]
        },
        {
            hintInput: 'defender',
            hintButton: 'select defending player',
            use: reportsFolderDisplay.selectDefender,
            sprite: [-80, 0]
        },
        {
            hintInput: 'origin',
            hintButton: 'select attacking village',
            placeholder: 'x|y',
            use: reportsFolderDisplay.selectAttackerVillage,
            sprite: [-120, 0]
        },
        {
            hintInput: 'target',
            hintButton: 'select defending village',
            placeholder: 'x|y',
            use: reportsFolderDisplay.selectDefenderVillage,
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

    /*==== mass rename table ===*/

    // note: non-premium accounts cannot rename reports
    if (window.premium) {
        let $massRename = $(`
            <table class="vis">
                <tbody>
                    <tr>
                        <td>
                            <a href="#">&raquo; Rename</a>
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
        $massRename.find('a').on('click', (e) => {
            e.preventDefault();
            reportsFolderDisplay.massRename();
        });
        $massRename.appendTo(reportsFolder);
    }

}

/**
 *	@param	text:String	text to be displayed inside the button
 *	@param	address:String	(optional) if included, causes the button to open a new window when clicked, directing the page to the specified address
 */
function createFooterButton(text, address) {
    var twcheese_menu = document.createElement('div');
    twcheese_menu.style.textAlign = 'center';

    var twcheese_menu_text = document.createElement('p');
    twcheese_menu_text.style.fontSize = '9pt';
    twcheese_menu_text.innerHTML = text;
    /*twcheese_menu_text.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';*/
    twcheese_menu_text.style.fontWeight = '700';
    twcheese_menu_text.style.marginTop = '3px';
    twcheese_menu_text.style.color = '#422301';
    twcheese_menu.appendChild(twcheese_menu_text);

    twcheese_menu.style.background = `url("${ImageSrc.legacy.helpBackground}")`;
    twcheese_menu.style.height = '22px';
    twcheese_menu.style.width = '49px';
    twcheese_menu.style.display = 'block';
    twcheese_menu.style.position = 'fixed';
    twcheese_menu.style.left = '100%';
    twcheese_menu.style.top = '100%';
    twcheese_menu.style.marginTop = '-24px';
    twcheese_menu.style.marginLeft = '-52px';
    twcheese_menu.style.zIndex = '99999999999';

    twcheese_menu.onmouseover = function () { this.style.background = `url("${ImageSrc.legacy.helpBackgroundBright}")` };
    twcheese_menu.onmouseout = function () { this.style.background = `url("${ImageSrc.legacy.helpBackground}")` };

    if (address) {
        twcheese_menu.style.cursor = 'pointer';
        twcheese_menu.onclick = function () { window.open(address, 'twcheese_menu_window') };
    }
    else
        twcheese_menu.style.cursor = 'default';

    return document.body.appendChild(twcheese_menu);
};


/*==== other functions ====*/


/**
 *	requests the xml from a page
 *	@param {string} url
 *	@return	{XMLDocument}
 */
function twcheese_requestXML(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send("");
    return $.parseXML(xmlhttp.responseText);
}

/*==== storage functions ====*/

function twcheese_saveReportsFolderDisplaySettings(settings) {

    //localStorage.setItem('twcheese_reportsFolderDisplaySettings',escape(JSON.stringify(settings))); //old
    localStorage.setItem('twcheese_reportsFolderDisplaySettings', JSON.stringify(settings));
}

function twcheese_loadReportsFolderDisplaySettings() {
    if (!localStorage.getItem('twcheese_reportsFolderDisplaySettings')) {
        return new twcheese_ReportsFolderDisplaySettings();
    }
    else {
        var settings;
        if (localStorage.getItem('twcheese_reportsFolderDisplaySettings').search('%') != -1)
            settings = eval('(' + unescape(localStorage.getItem('twcheese_reportsFolderDisplaySettings')) + ')'); //old
        else
            settings = eval('(' + localStorage.getItem('twcheese_reportsFolderDisplaySettings') + ')'); //new
        return settings;
    }
}

function twcheese_getServerSettings() {
    let cacheKey = 'twcheese_game_config_bre';

    let cachedSettings = localStorage.getItem(cacheKey);
    if (cachedSettings) {
        return JSON.parse(cachedSettings);
    }

    let xmlDoc = twcheese_requestXML('https://' + document.domain + '/interface.php?func=get_config');
    let $cfg = $(xmlDoc);

    let floatVal = selector => parseFloat($cfg.find(selector).html());

    let settings = {
        speed: floatVal('speed'),
        unit_speed: floatVal('unit_speed'),
        archer: floatVal('game > archer'),
        knight: floatVal('game > knight'),
    };
    localStorage.setItem(cacheKey, JSON.stringify(settings));
    return settings;
}


function twcheese_getBRESettings() {
    let cachedSettings = localStorage.getItem('twcheese_bresettings');
    if (cachedSettings) {
        return JSON.parse(cachedSettings);
    }

    return {
        autoRename: false,
        period: 8,
        haulBonus: 0,
        raid: 'scouted'
    };
}

function twcheese_setBRESettings(breSettings) {
    localStorage.setItem('twcheese_bresettings', JSON.stringify(breSettings));
}

/*==== main ====*/

let initialized = false;
let reportEnhanced = false;
let reportsFolderEnhanced = false;

function useTool() {
    if (!initialized) {
        initBRE();
        initialized = true;
    }

    let gameConfig = twcheese_getServerSettings();

    if (game_data.screen == 'report' && document.URL.includes('&view=')) {
        // user is viewing single report
        if (!reportEnhanced) {
            enhanceReport(gameConfig);
            reportEnhanced = true;
        }
    }
    else if (game_data.screen == 'report' && (game_data.mode == 'attack' || game_data.mode == 'defense')) {
        // user is viewing reports folder with 'Attacks' or "Defenses" filter on
        if (!reportsFolderEnhanced) {
            enhanceReportsFolder(gameConfig);
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
    createFooterButton(language['twcheese']['Help'], 'https://forum.tribalwars.net/index.php?threads/256225/');
}


function enhanceReport(gameConfig) {
    let twcheese_BRESettings = twcheese_getBRESettings();

    /*==== calculate additional information ===*/
    let now = TwCheeseDate.newServerDate();
    let scraper = new BattleReportScraper(document);
    var report = scraper.scrapeReport();

    report.killScores = {
        attacker: null,
        defender: calcDefenderScore(report.attackerLosses)
    };
    if (report.defenderQuantity) {
        report.killScores.attacker = calcAttackerScore(report.defenderLosses);
    }
    if (report.loyalty)
        report.loyaltyExtra = calcLoyalty(gameConfig.speed, gameConfig.unit_speed, report.loyalty.after, report.battleTime, now, game_data.village, report.defenderVillage);
    report.timingInfo = report.calcTimingInfo(gameConfig.speed, gameConfig.unit_speed);

    /*==== add stuff to the page ====*/
    enhanceBattleReport(document, report);
    let renamer = new ReportRenamer();
    let pageMod = new BattleReportEnhancer(document, report, renamer, gameConfig, twcheese_BRESettings);
    pageMod.includeReportTools();

    /*==== auto rename ====*/
    if (twcheese_BRESettings.autoRename) {
        pageMod.renameReport('');
    }    

    /*==== set to user defaults ====*/
    if (report.espionageLevel >= 1) {
        document.getElementById('twcheese_period').value = twcheese_BRESettings.period;
        document.getElementById('twcheese_raider_haulBonus').value = twcheese_BRESettings.haulBonus;

        if (game_data.market != 'uk') {
            if (localStorage.getItem('twcheese_report_raiderScouts'))
                document.getElementById('twcheese_raider_scouts').value = localStorage.getItem('twcheese_report_raiderScouts');
        }

        pageMod.changeRaidMode(twcheese_BRESettings.raid);
    }

    document.getElementById('twcheese_auto_rename').checked = twcheese_BRESettings.autoRename;

    if (!userConfig.get('ReportToolsWidget.collapse', false)) {
        pageMod.toggleReportTools();
    }
        
}


function enhanceReportsFolder(gameConfig) {
    let twcheese_reportsFolderDisplaySettings = twcheese_loadReportsFolderDisplaySettings();
    twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
    let renamer = new ReportRenamer();
    let pageMod = new twcheese_BattleReportsFolderEnhancer(document, renamer, twcheese_reportsFolderDisplaySettings, gameConfig);
    pageMod.applySettings(twcheese_reportsFolderDisplaySettings);
}


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory({});

function newDebugProcess() {
    let name = 'Tool: Battle Report Enhancer';
    return processFactory.create(name, debugCfgDefault, true);
}


window.TwCheese.registerTool({
    id: 'BRE',
    use: useTool,
    getDebugProcess: newDebugProcess
});