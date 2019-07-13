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
        var report = this.reportRenamer.parseName(row.cells[1].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML);
        report.reportId = this.scrapeReportId(row.cells[1].getElementsByTagName('a')[0]);
        var reportIcons = [...row.cells[1].getElementsByTagName('img')];

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
        report.dotColor = reportIcons.find(img => img.src.includes('graphic/dots/')).src.match(/dots\/(.+).png/)[1];

        /*==== has it already been read? ====*/
        var cellText = $(row.cells[0]).contents().filter(function () {
            return this.nodeType == 3;
        }).text();

        report.isNew = textScraper.includes(cellText, 'report.unread');

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

        /*==== forwarded ====*/
        report.isForwarded = !!reportIcons.find(img => img.src.includes('graphic/forwarded.png'));

        /*==== subject html ====*/
        var $subjectNode = $(row.cells[1]).clone();
        $subjectNode.find(`img[src*='graphic/max_loot/'], img[src*='graphic/dots/']`).remove();
        report.subjectHTML = $subjectNode.html();

        /*==== timeReceived ====*/
        report.strTimeReceived = row.cells[2].innerHTML;

        return report;
    }

    /**
     *	@param	link:HTMLAnchor	a link to a report
     *	@return	reportId:Number the reportId of the linked report
     */
    scrapeReportId(link) {
        var address = link.href;
        return new Number(address.substring(address.indexOf('view=') + 5).match('[0-9]{1,}'));
    }


}


export { BattleReportCondensedScraper };