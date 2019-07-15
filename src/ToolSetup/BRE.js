/* global $, game_data */
import { initCss } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { buildingUtil } from '/twcheese/src/Models/Buildings.js';
import { ReportRenamer } from '/twcheese/src/Models/ReportRenamer.js';
import { BattleReportScraper } from '/twcheese/src/Scrape/BattleReportScraper.js';
import { BattleReportCondensedScraper } from '/twcheese/src/Scrape/BattleReportCondensedScraper.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { enhanceBattleReport } from '/twcheese/src/Transform/enhanceBattleReport.js';
import { ReportToolsWidget } from '/twcheese/src/Widget/ReportToolsWidget.js';
import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { requestDocument, gameUrl } from '/twcheese/src/Util/Network.js';
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
                        
}


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


/*==== page modifier functions ====*/


/**
 * modifies page on the reports folder view
 * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
 * @param {ReportRenamer} renamer
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc, renamer) {
    var pageMod = this;
    this.reports = new Array();

    this.columnIndexes = new Map();

    function centeredImg(src, tooltip = '') {
        return `<img style="display:block; margin-left:auto; margin-right:auto" src="${src}" title="${tooltip}">`;
    }

    function villageLink(village) {
        let url = gameUrl('info_village', {id: village.id});
        return `<a href="${url}">${village.x}|${village.y}</a>`;
    }

    this.columnCategories = [
        {
            key: 'essential',
            hideable: false,
            cols: [{
                width: 120,
                header: '',
                createCellHtml(report) {
                    let icons = [`<img src="${ImageSrc.dotIcon(report.dotColor)}">`];
                    if (report.haulStatus !== BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
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
                                <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc.buildingIcon('place')}" />
                            </a>`;
                        }
                    }
                    return html;
                }
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
                    let html = `<a title="repeat attack, from current village" href="${url}"><img src="${ImageSrc.attack}"></a>`;
                    if (report.attackerVillage && report.attackerVillage.id) {
                        let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
                        html += ` | <a title="repeat attack, from original village" href="${url}"><img src="${ImageSrc.attack}"></a>`;
                    }
                    return html;
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
            key: 'fullSubject',
            hideable: true,
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
                    let img = centeredImg(ImageSrc.troopIcon('priest'), 'An attacking nobleman died.');
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
            cols: window.game_data.units.map(troopType => {
                return {
                    width: 20,
                    align: 'center',
                    header: centeredImg(ImageSrc.troopIcon(troopType)),
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
                description: language['twcheese']['Building'] + ': ' + textScraper.t(`buildings.${buildingType}`),
                cols: [{
                    width: 20,
                    align: 'center',
                    header: centeredImg(ImageSrc.buildingIcon(buildingType)),
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

        ...Resources.TYPES.map(function(resType) {
            let resName = {wood:'Timber', stone:'Clay', iron:'Iron'}[resType];
            return {
                key: `resources.${resType}`,
                hideable: true,
                description: `Resources: ${resName}`,
                cols: [{
                    width: 16,
                    align: 'center',
                    header: centeredImg(ImageSrc[resType]),
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


    /**
     *	fills reportsTableBody with information
     */
    this.populateReportsTable = function () {
        let minimal = new Set(['essential', 'repeatLinks', 'distance', 'fullSubject', 'strTimeReceived']);

        let fallbackSubjectColSpan = this.columnCategories.reduce(function(acc, category) {
            if (category.key !== 'fullSubject' && minimal.has(category.key)) {
                return acc;
            }
            return acc + category.cols.length;
        }, 0);


        for (let report of this.reports) {
            let row = reportsTableBody.insertRow(-1);
            row.twcheeseReport = report;
            let hasDecentInfo = report.attackerName && report.defenderName && report.attackerVillage && report.defenderVillage;

            for (let category of this.columnCategories) {
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
        yTableEmulator.style.height = reportsTableBody.clientHeight + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
    };

    /**
     *	marks checkboxes and hides certain displays in accordance with the user's Folder Display settings
     */
    this.applySettings = function() {
        let checkboxes = document.getElementById('twcheese_reportsFolderSettings').getElementsByTagName('input');
        for (let checkbox of checkboxes) {
            let settingName = checkbox.dataset.settingName;
            if (userConfig.get(`ReportListWidget.showCols.${settingName}`, true)) {
                checkbox.checked = true;
            } else {
                reportsTable.hideColumns(settingName);
            }
        }

        let reportsFolderDisplay = document.getElementById('twcheese_reportsFolderDisplay');
        reportsFolderDisplay.style.width = userConfig.get('ReportListWidget.size.width', '720px');
        reportsFolderDisplay.style.height = userConfig.get('ReportListWidget.size.height', '250px');
        reportsFolderDisplay.fitDisplayComponents();

        reportsFolderDisplay.adjustScrollbars();
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
    reportsFolderSettingsDiv.style.columnWidth = 200 + 'px';
    
    function insertCheckbox(key, text) {
        let $el = $(`<div style="white-space:nowrap"><label><input data-setting-name="${key}" type="checkbox"> ${text}</label></div>`);
        $el.find('input').on('click', () => {
            reportsTable.toggleReportsColumns(key);
        });
        reportsFolderSettingsDiv.appendChild($el[0]);
    }
    
    for (let category of this.columnCategories) {
        if (!category.hideable) {
            continue;
        }
        insertCheckbox(category.key, category.description);
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
                let reportsFolderDisplay = document.getElementById('twcheese_reportsFolderDisplay');
                reportsFolderDisplay.fitDisplayComponents();

                userConfig.set('ReportListWidget.size.width', reportsFolderDisplay.style.width);
                userConfig.set('ReportListWidget.size.height', reportsFolderDisplay.style.height);
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
    reportsTableHeader.insertRow(-1);

    let cellIndex = 0;
    for (let category of this.columnCategories) {
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

    let columnIndexes = this.columnIndexes;

    reportsFolderDisplay.adjustScrollbars = function() {
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };


    reportsTable.toggleReportsColumns = function (settingName) {
        let configKey = `ReportListWidget.showCols.${settingName}`;
        let show = !userConfig.get(configKey, true);
        userConfig.set(configKey, show);

        for (let i of columnIndexes.get(settingName)) {
            if (show) {
                reportsTable.showColumn(i);
            } else {
                reportsTable.hideColumn(i);
            }
        }
        reportsFolderDisplay.adjustScrollbars();
    };


    reportsTable.hideColumns = function (settingName) {
        for (let i of columnIndexes.get(settingName)) {
            reportsTable.hideColumn(i);
        }
    };


    reportsTable.showColumn = function(column) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        var tableWidth = reportsTableHeader.style.width.split('px')[0];        

        /*==== header ====*/
        let alignmentTh = cellAtIndex(reportsTableHeader.rows[0], column);
        let columnWidth = alignmentTh.style.width.split('px')[0];
        tableWidth = parseFloat(tableWidth) + parseFloat(columnWidth);
        reportsTableHeader.style.width = tableWidth + 'px';

        alignmentTh.style.display = "table-cell";
        cellAtIndex(reportsTableHeader.rows[1], column).style.display = "table-cell";
        reportsTableHeader.rows[2].cells[column].style.display = "table-cell";

        /*==== body ====*/
        reportsTableBody.style.width = tableWidth + 'px';
        for (let row of reportsTableBody.rows) {
            let cell = cellAtIndex(row, column);

            if (cell.initialColSpan && cell.initialColSpan > 1) {
                cell.colSpan += 1;
            } else {
                cell.style.display = 'table-cell';
            }
        }
    };


    reportsTable.hideColumn = function(column) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        var tableWidth = reportsTableHeader.style.width.split('px')[0];

        /*==== header ====*/
        let alignmentTh = cellAtIndex(reportsTableHeader.rows[0], column);
        let columnWidth = alignmentTh.style.width.split('px')[0];
        tableWidth = parseFloat(tableWidth) - parseFloat(columnWidth);
        reportsTableHeader.style.width = tableWidth + 'px';

        alignmentTh.style.display = "none";
        cellAtIndex(reportsTableHeader.rows[1], column).style.display = "none";
        reportsTableHeader.rows[2].cells[column].style.display = "none";

        /*==== body ====*/
        reportsTableBody.style.width = tableWidth + 'px';
        for (let row of reportsTableBody.rows) {
            let cell = cellAtIndex(row, column);

            if (cell.initialColSpan && cell.initialColSpan > 1) {
                cell.colSpan -= 1;
            } else {
                cell.style.display = 'none';
            }
        }
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
        pageMod.applySettings();

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
     *	adjusts reports table width based on troop counts
     */
    this.alignForTroops = function () {
        let colIndexes = this.columnIndexes.get('defenderSurvivors');

        let maxChars = Array(colIndexes.length).fill(2);

        for (let r = 1; r < reportsTableBody.rows.length; r++) {
            let row = reportsTableBody.rows[r];
            if (!row.twcheeseReport.defenderSurvivors) {
                continue;
            }
            for (let [i, col] of Object.entries(colIndexes)) {
                let chars = String(row.cells[col].innerHTML).length;
                maxChars[i] = Math.max(chars, maxChars[i]);
            }
        }

        this.alignCols(colIndexes, maxChars);
    };

    /**
     *	adjusts reportsTable width based on resources
     */
    this.alignForResources = function () {
        let colIndexes = [
            ...this.columnIndexes.get('resources.wood'),
            ...this.columnIndexes.get('resources.stone'),
            ...this.columnIndexes.get('resources.iron'),
            ...this.columnIndexes.get('resources.sum'),
        ];

        let maxChars = [2, 2, 2, 2];

        for (let r = 1; r < reportsTableBody.rows.length; r++) {
            let row = reportsTableBody.rows[r];
            if (!row.twcheeseReport.resources) {
                continue;
            }
            for (let [i, col] of Object.entries(colIndexes)) {
                let chars = row.cells[col].innerText.length;
                maxChars[i] = Math.max(chars, maxChars[i]);
            }
        }

        this.alignCols(colIndexes, maxChars);
    };

    this.alignCols = function(colIndexes, maxChars) {
        let charWidth = 8;
        let widthSum = 0;
        for (let [i, col] of Object.entries(colIndexes)) {
            let width = charWidth * maxChars[i];
            width = Math.max(20, width);
            widthSum += width;

            let alignmentTh = reportsTableHeader.rows[0].cells[col];
            let bodyCell = reportsTableBody.rows[0].cells[col];

            alignmentTh.style.width = width + 'px';
            bodyCell.style.width = width + 'px';
        }

        let padding = 3 * 2 * colIndexes.length;
        let borderSpacing = 2 * (colIndexes.length - 1);
        let width = widthSum + borderSpacing + padding;
        
        let titleTh = cellAtIndex(reportsTableHeader.rows[1], colIndexes[0]);
        titleTh.style.width = width + 'px';
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

    (new ReportToolsWidget(report, renamer))
        .insertBefore($('#content_value').find('h2').eq(0));
}


function enhanceReportsFolder() {
    let renamer = new ReportRenamer();
    let pageMod = new twcheese_BattleReportsFolderEnhancer(document, renamer);
    pageMod.applySettings();
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