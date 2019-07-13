import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';


/**
 * scrapes listed reports from
 *     - game.php?screen=report&mode=attack
 *     - game.php?screen=report&mode=defense
 * 
 */
class BattleReportCondensedScraper {

    /**
     * @param {ReportRenamer} reportRenamer 
     */
    constructor(reportRenamer) {
        this.reportRenamer = reportRenamer;
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
        report.reportId = reportLink.href.match(/view=(\d+)/)[1];
        report.dotColor = reportIcons.find(img => img.src.includes('graphic/dots/')).src.match(/dots\/(.+).png/)[1];
        report.isForwarded = !!reportIcons.find(img => img.src.includes('graphic/forwarded.png'));
        report.isNew = $(row.cells[1]).text().trim().endsWith(textScraper.t('report.unread'));
        report.strTimeReceived = row.cells[2].innerHTML;

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
                    

        /*==== partial hauls ====*/

        // note: non-premium users don't get an icon showing partial/full haul
        let lootImg = reportIcons.find(img => img.src.includes('graphic/max_loot/'));
        if (lootImg) {
            if (lootImg.src.includes('max_loot/0.png')) {
                report.haulStatus = BattleReportCondensed.HAUL_STATUS_PARTIAL;
            } else {
                report.haulStatus = BattleReportCondensed.HAUL_STATUS_FULL;
            }
        }

        /*==== subject html ====*/
        var $subjectNode = $(row.cells[1]).clone();
        $subjectNode.find(`img[src*='graphic/max_loot/'], img[src*='graphic/dots/']`).remove();
        report.subjectHTML = $subjectNode.html();        

        return report;
    }

}


export { BattleReportCondensedScraper };