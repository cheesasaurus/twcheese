import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { Village } from '/twcheese/src/Models/Village.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { BuildingLevels } from '/twcheese/src/Models/Buildings.js';
import { TroopCounts } from '/twcheese/src/Models/Troops.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { postToGame } from '/twcheese/src/Util/Network.js';

class ReportRenamer {

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
        let fallbackReport = new BattleReportCondensed();        
        fallbackReport.subject = reportName;
        return fallbackReport;        
    }

    /**
     * @param {string} reportName 
     * @return {BattleReportCondensed}
     */
    parseDefaultName(reportName) {
        let report = new BattleReportCondensed();
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
        let report = new BattleReportCondensed();
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
            report.buildingLevels = BuildingLevels.fromArray(JSON.parse(matches[1]));
        }

        // set resources
        matches = reportName.match(/_r(\[\S+\])/);
        if (matches) {
            let r = JSON.parse(matches[1]);
            report.resources = new Resources(r[0], r[1], r[2]);
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
            report.timeLaunched = TwCheeseDate.newServerDate(parseInt(matches[1]) * 1000);
        }

        report.attackerNobleDied = reportName.includes('_x');
        report.wasAttackFeint = reportName.includes('_f');
        return report;
    }

    availableChars(name) {
        return 255 - name.length;
    }

}

export { ReportRenamer };