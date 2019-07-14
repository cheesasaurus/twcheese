/* global $, game_data */
import { initCss } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { BattleReport } from '/twcheese/src/Models/BattleReport.js';
import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { troopTypes, TroopCalculator } from '/twcheese/src/Models/Troops.js';
import { buildingTypes } from '/twcheese/src/Models/Buildings.js';
import { ReportRenamer } from '/twcheese/src/Models/ReportRenamer.js';
import { BattleReportScraper } from '/twcheese/src/Scrape/BattleReportScraper.js';
import { BattleReportCondensedScraper } from '/twcheese/src/Scrape/BattleReportCondensedScraper.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { enhanceBattleReport } from '/twcheese/src/Transform/enhanceBattleReport.js';
import { ReportRaiderWidget } from '/twcheese/src/Widget/ReportRaiderWidget.js';
import { ReportRenamerWidget } from '/twcheese/src/Widget/ReportRenamerWidget.js';
import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
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


class BattleReportTools {

    /**
    * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
    * @param {BattleReport} report
    * @param {ReportRenamer} renamer
    */
    constructor(gameDoc, report, renamer) {
        this.gameDoc = gameDoc;
        this.report = report;
        this.renamer = renamer;

        this.raiderTroopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy']
            .filter(troopType => TroopCalculator.existsOnWorld(troopType));

        this.renamerWidget = new ReportRenamerWidget(this.renamer, this.report);
    }


    includeReportTools() {
        let gameDoc = this.gameDoc;
        let report = this.report;
        var contentValueElement = gameDoc.getElementById('content_value');

        let $toolContainer = $(`
            <div id="twcheese_show_report_tools" class="vis widget">
                <h4>
                    Report Tools
                    <img class="twcheese-toggle-icon" src="${ImageSrc.plus}" style="float:right; cursor:pointer;">
                </h4>
                <div class="widget_content" style="display: none">
                    <table id="twcheese_BRE_tools" border="1">
                        <tr>
                            <td valign="top">
                                <!-- raid calculator goes here -->
                            </td>
                            <td valign="top">
                                ${this.createDemolitionTableHtml()}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" valign="top">
                                <!-- renamer goes here -->
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `.trim());

        let $toggleIcon = $toolContainer.find('.twcheese-toggle-icon');
        let $widgetContent = $toolContainer.find('.widget_content');
        let toolTable = $widgetContent.find('#twcheese_BRE_tools')[0];

        this.toggleReportTools = function() {
            $widgetContent.toggle({
                duration: 200,
                start: function() {
                    let willCollapse = $toggleIcon.attr('src').includes(ImageSrc.minus);
                    $toggleIcon.attr('src', willCollapse ? ImageSrc.plus : ImageSrc.minus);
                    userConfig.set('ReportToolsWidget.collapse', willCollapse);
                }
            });
        };
        $toggleIcon.on('click', () => this.toggleReportTools());

        if (report.espionageLevel >= 1) {
            let raiderWidget = new ReportRaiderWidget(this.report);
            raiderWidget.appendTo($(toolTable.rows[0].cells[0]));
        }
        this.renamerWidget.appendTo($(toolTable.rows[1].cells[0]));

        contentValueElement.insertBefore($toolContainer[0], contentValueElement.getElementsByTagName('h2')[0]);
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

            return demolitionHtml.trim();
        }
    }

}




/**
 * modifies page on the reports folder view
 * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
 * @param {ReportRenamer} renamer
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc, renamer, twcheese_reportsFolderDisplaySettings) {
    var pageMod = this;
    this.reports = new Array();

    /**
     *	fills reportsTableBody with information
     */
    this.populateReportsTable = function () {
        for (let report of this.reports) {
            let row = reportsTableBody.insertRow(-1);
            row.twcheeseShowDetails = report.attackerName && report.defenderName && report.attackerVillage && report.defenderVillage;

            /*==== basic cell ====*/
            let cell = row.insertCell(-1);
            cell.innerHTML = '<input name="id_' + report.reportId + '" type="checkbox">';
            cell.innerHTML += ' <img src="' + ImageSrc.dotIcon(report.dotColor) + '"> ';
            if (report.haulStatus !== BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
                cell.innerHTML += '<img src="' + report.haulStatusIconSrc() + '"> ';
            }
            if (report.isForwarded) {
                cell.innerHTML += '<img src="graphic/forwarded.png?1" />';
            }
            cell.innerHTML += `<a href="${gameUrl('report', {mode:game_data.mode, view:report.reportId})}"> view</a>`;

            if (report.defenderName && report.defenderVillage) {
                let isDefenderMe = report.defenderName == game_data.player.name;
                let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
                if (isDefenderMe || wasVillageConquered) {
                    cell.innerHTML += `<a href="${gameUrl('place', {mode:'units', village:report.defenderVillage.id})}">
                        <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc.buildingIcon('place')}" />
                    </a>`;
                }
            }

            /*==== repeat attack cell ====*/
            cell = row.insertCell(-1);
            if (report.attackerName === game_data.player.name) {
                let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
                cell.innerHTML = '<a title="repeat attack, from current village" href="' + url + '"><img src="' + ImageSrc.attack + '" /></a>';
                if (report.attackerVillage && report.attackerVillage.id) {
                    let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
                    cell.innerHTML += ' | <a title="repeat attack, from original village" href="' + url + '"><img src="' + ImageSrc.attack + '" /></a>';
                }
            }

            /*==== distance cell ====*/
            cell = row.insertCell(-1);
            cell.innerHTML = report.defenderDistance(game_data.village);

            /*==== full subject cell ====*/
            cell = row.insertCell(-1);
            cell.innerHTML = report.subject;
            if (!row.twcheeseShowDetails) {
                cell.colSpan = 44;
            }

            if (row.twcheeseShowDetails) {
                /*==== note cell ====*/
                let cell = row.insertCell(-1);
                if (report.note) {
                    cell.innerHTML = report.note;
                }

                /*==== attacker cell ====*/
                cell = row.insertCell(-1);
                if (report.attackerName) {
                    cell.innerHTML = report.attackerName;
                }

                /*==== defender cell ====*/
                cell = row.insertCell(-1);
                if (report.defenderName) {
                    cell.innerHTML = report.defenderName;
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
                if (report.wasAttackFeint) {
                    cell.innerHTML = '<img title="The attack contained only a small amount of units" style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/grey.png?1">';
                }

                /*==== deadNoble cell ====*/
                cell = row.insertCell(-1);
                if (report.attackerNobleDied) {
                    if (report.attackerVillage && report.attackerName === game_data.player.name) {
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
                if (report.resources) {
                    let sum = report.resources.sum();
                    cell.innerHTML = sum;
                    if (sum === 0) {
                        cell.className = 'hidden'
                    }
                }

                /*==== timeLaunched cell ====*/
                cell = row.insertCell(-1);
                if (report.timeLaunched) {
                    cell.innerHTML = report.timeLaunched.toHtml(false);
                }

                /*==== timeReceived cell ====*/
                cell = row.insertCell(-1);
                if (report.strTimeReceived) {
                    cell.innerHTML = report.strTimeReceived;
                }
            }
            else {
                /*==== timeReceived cell ====*/
                let cell = row.insertCell(-1);
                if (report.strTimeReceived) {
                    cell.innerHTML = report.strTimeReceived;
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
    let reportScraper = new BattleReportCondensedScraper(renamer);
    this.reports = reportScraper.scrapeReports(reportsTable);

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
                    let distance = twcheeseReport.defenderDistance(game_data.village);
                    if (distance < 10) {
                        leadingZero = '0';
                    }
                    return '\n<DT><A HREF="' + urlCurrentVillage(twcheeseReport) + '" >' + leadingZero + distance + ' Repeat Attack ' + twcheeseReport.reportId + ' from (' + game_data.village.coord + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')</A></DT>';                
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
            if (!twcheeseReport.defenderVillage) {
                continue; // not enough information
            }
            if (twcheeseReport.attackerName !== game_data.player.name) {
                continue; // can't repeat somebody else's attack
            }
            if (attackingVillage == 'current') {
                exportString += buildEntryCurrentVillage(twcheeseReport);
            }
            else if (attackingVillage == 'original' && twcheeseReport.attackerVillage) {
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
    reportsTableBody.rows[0].twcheeseShowDetails = true;

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
                    if (!reportsTableBody.rows[i].twcheeseShowDetails)
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
                if (!reportsTableBody.rows[i].twcheeseShowDetails && column > 2) {
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
                if (!reportsTableBody.rows[i].twcheeseShowDetails)
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
            if (!reportsTableBody.rows[i].twcheeseShowDetails && column > 2) {
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
            var reportId = reports.shift();
            var startTime = performance.now();

            let reportDoc = await requestDocument(gameUrl('report', {mode: game_data.mode, view: reportId}));

            try {
                let scraper = new BattleReportScraper(reportDoc);
                let fullReport = scraper.scrapeReport();
                let name = await renamer.rename(fullReport, '');

                $('.quickedit[data-id="' + reportId + '"]')
                    .find('.quickedit-label').html(name);

                /*==== update reports information so row can be redrawn with updated information====*/
                let row = document.getElementsByName('id_' + reportId)[0].parentNode.parentNode;
                let oldReport = row.twcheeseReport;

                let report = renamer.parseName(name);
                report.reportId = reportId;
                report.dotColor = oldReport.dotColor;
                report.haulStatus = oldReport.haulStatus;
                report.isForwarded = oldReport.isForwarded;
                report.strTimeReceived = oldReport.strTimeReceived;

                row.twcheeseReport = report;
                pageMod.reports[row.rowIndex - 1] = report;


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
            if (reportsTable.rows[i].twcheeseReport.dotColor === dotColor)
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
     * @param {number} haulStatus 0 for non full haul, 1 for full haul
     */
    reportsTable.selectLoot = function (haulStatus) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        
        for (let row of reportsTable.rows) {
            if (typeof row.twcheeseReport === 'undefined') {
                continue; // e.g. header row
            }
            let report = row.twcheeseReport;
            if (report.haulStatus === haulStatus) {
                document.getElementsByName('id_' + report.reportId)[0].checked = true;
            }
        }
    };

    reportsTable.selectFeint = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.wasAttackFeint)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDeadNoble = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attackerNobleDied)
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
            if (reportsTable.rows[i].twcheeseReport.wasDefenderCleared())
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
            if (reportsTable.rows[i].twcheeseReport.attackerName === attackerName)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDefender = function (defenderName) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defenderName === defenderName)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectAttackerVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (!twcheeseReport.attackerVillage) {
                continue;
            }
            if (reportsTable.rows[i].twcheeseReport.attackerVillage.x == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.attackerVillage.y == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportId)[0].checked = true;
        }
    };

    reportsTable.selectDefenderVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (!twcheeseReport.defenderVillage) {
                continue;
            }
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
            let report = reportsTableBody.rows[row].twcheeseReport;
            if (report.defenderSurvivors) {
                let survivors = report.defenderSurvivors.toArray();
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
            let report = reportsTableBody.rows[row].twcheeseReport;
            if (report.resources) {
                let res = report.resources.toArray();
                for (var i = 0; i < 3; i++) {
                    let digits = new String(res[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
                let digits = new String(report.resources.sum()).length;
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
            click: () => reportsFolderDisplay.selectLoot(BattleReportCondensed.HAUL_STATUS_PARTIAL),
            html: imgHtml('graphic/max_loot/0.png')
        }],
        ['haulFull', {
            click: () => reportsFolderDisplay.selectLoot(BattleReportCondensed.HAUL_STATUS_FULL),
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


/*==== main ====*/

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
    createFooterButton(language['twcheese']['Help'], 'https://forum.tribalwars.net/index.php?threads/256225/');
}


function enhanceReport() {
    let scraper = new BattleReportScraper(document);
    let report = scraper.scrapeReport();

    let renamer = new ReportRenamer();

    $(renamer).on('report-renamed', function(e) {
        $('.quickedit[data-id="' + e.reportId + '"]')
            .find('.quickedit-label')
            .html(e.newName);
    });

    if (userConfig.get('BattleReportEnhancer.autoRename', false)) {
        renamer.rename(report, '');
    }

    enhanceBattleReport(document, report);
    let pageMod = new BattleReportTools(document, report, renamer);
    pageMod.includeReportTools();

    if (!userConfig.get('ReportToolsWidget.collapse', false)) {
        pageMod.toggleReportTools();
    }
}


function enhanceReportsFolder() {
    let twcheese_reportsFolderDisplaySettings = twcheese_loadReportsFolderDisplaySettings();
    twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
    let renamer = new ReportRenamer();
    let pageMod = new twcheese_BattleReportsFolderEnhancer(document, renamer, twcheese_reportsFolderDisplaySettings);
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