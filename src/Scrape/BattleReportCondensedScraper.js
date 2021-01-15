import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { AttackIconsScraper } from '/twcheese/src/Scrape/AttackIconsScraper.js';


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
        this.attackIconsScraper = new AttackIconsScraper();
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
            return BattleReportCondensed.HAUL_STATUS_UNKNOWN
        }
        if (lootImg.src.includes('max_loot/0.png')) {
            return BattleReportCondensed.HAUL_STATUS_PARTIAL;
        }
        return BattleReportCondensed.HAUL_STATUS_FULL;        
    }

}


export { BattleReportCondensedScraper };