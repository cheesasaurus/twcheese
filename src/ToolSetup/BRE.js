/* global $, game_data */
import { initCss } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { ReportRenamer } from '/twcheese/src/Models/ReportRenamer.js';
import { BattleReportScraper } from '/twcheese/src/Scrape/BattleReportScraper.js';
import { BattleReportCondensedScraper } from '/twcheese/src/Scrape/BattleReportCondensedScraper.js';
import { enhanceBattleReport } from '/twcheese/src/Transform/enhanceBattleReport.js';
import { ReportToolsWidget } from '/twcheese/src/Widget/ReportToolsWidget.js';
import { ReportsFolderWidget } from '/twcheese/src/Widget/ReportsFolder/ReportsFolderWidget.js';
import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';

import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';

/*==== styles ====*/

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
        language['twcheese']['Help'] = 'Help';
        break;

    case 'cz':
        /*==== divokekmeny.cz/ ====*/
        language['twcheese']['Help'] = 'Pomoc';
        break;

    case 'se':
        language['twcheese']['Help'] = 'Hjälp';
        break;

    /*==== fyletikesmaxes.gr/ ====*/
    case 'gr':
        language['twcheese']['Help'] = 'Βοήθεια';
        break;

    /* Norwegian */
    case 'no':
        language['twcheese']['Help'] = 'Hjelp';
        break;
                        
}



/*==== page modifier functions ====*/


/**
 * modifies page on the reports folder view
 * @param {HTMLDocument} gameDoc the document from game.php?screen=report&mode=attack
 * @param {ReportRenamer} renamer
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc, renamer) {
    let reportsTable = gameDoc.getElementById('report_list');
    let reportsForm = reportsTable.parentNode;

    /*==== scrape reports information ====*/    
    let reportScraper = new BattleReportCondensedScraper(renamer);
    let reports = new Map();
    for (let report of reportScraper.scrapeReports(reportsTable)) {
        reports.set(report.reportId, report);
    }

    /*==== remove old list ====*/
    reportsForm.removeChild(reportsTable);

    /*==== insert new list and tools ====*/
    (new ReportsFolderWidget(reports, renamer))
        .insertBefore(reportsForm.firstChild);
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