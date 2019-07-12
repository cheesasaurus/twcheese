import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { BattleReport } from '/twcheese/src/Models/BattleReport.js';
import { Player } from '/twcheese/src/Models/Player.js';
import { Village } from '/twcheese/src/Models/Village.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { BuildingLevels } from '/twcheese/src/Models/Buildings.js';
import { TroopCounts } from '/twcheese/src/Models/Troops.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { postToGame } from '/twcheese/src/Util/Network.js';

class ReportRenamer {
    constructor(gameConfig) {
        this.gameConfig = gameConfig;
    }

    /**
     * @param {BattleReport} report 
     * @param {string} note
     * @return {Promise}
     * @resolve {string} new name
     */
    async rename(report, note) {
        let newName = this.createName(report, note);
        await postToGame('report', { ajaxaction: 'edit_subject', report_id: report.reportId }, { text: newName });
        return newName;
    }

    /**
     * @param {BattleReport} report 
     * @param {string} note
     * @return {string}
     */
    createName(report, note = '') {
        var newName = 'twCheese: ';
        newName += report.attacker.name.replace(textScraper.t('report.deletedPlayer'), '') + ' ';
        newName += '(' + report.attackerVillage.x + '|' + report.attackerVillage.y + ',' + report.attackerVillage.id + ')';
        newName += report.defender.name.replace(textScraper.t('report.deletedPlayer'), '');
        newName += '(' + report.defenderVillage.x + '|' + report.defenderVillage.y + ',' + report.defenderVillage.id + ')';
    
        let timingInfo = report.calcTimingInfo(this.gameConfig.speed, this.gameConfig.unit_speed);
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
     * @return {BattleReport}
     */
    parseName(reportName) {
        var report = new BattleReport();
        report.twcheeseLabel = false;
    
        /*=== remove the unnecessary whitespace at the beginning ====*/
        while (reportName.search('	') != -1) {
            reportName = reportName.replace('	', '');
        }
        while (reportName.search('\n') != -1) {
            reportName = reportName.replace('\n', '');
        }
        report.subject = reportName;
    
        var pattern = /\(.*?\)/gi;
        var data = reportName.match(pattern);
        if (data) {
            if (reportName.split(' ')[0] == 'twCheese:') {
                report.twcheeseLabel = true;
                reportName = reportName.replace('twCheese: ', '');
            }
    
            /*==== set attacker ====*/
            try {
                report.attacker = new Player(0, 0);
                var attackerString = reportName.split('(')[0];
                attackerString = attackerString.substring(0, attackerString.lastIndexOf(' '));
                report.attacker.name = attackerString;
            }
            catch (err) {
                report.attacker = null;
            }
    
    
            report.attackerVillage = new Village(0, 0, 0);
            report.defenderVillage = new Village(0, 0, 0);
            if (report.twcheeseLabel) /* report named with twCheese format */ {
                /*==== set attacker village ====*/
                try {
                    data[0] = data[0].substring(data[0].lastIndexOf('(') + 1, data[0].lastIndexOf(')'));
                    report.attackerVillage.x = data[0].split(',')[0].split('|')[0];
                    report.attackerVillage.y = data[0].split(',')[0].split('|')[1];
                    report.attackerVillage.id = data[0].split(',')[1];
                }
                catch (err) {
                    console.warn('swallowed:', err);
                }
    
                /*==== set defender village ====*/
                try {
                    data[1] = data[1].substring(data[1].lastIndexOf('(') + 1, data[1].lastIndexOf(')'));
                    report.defenderVillage.x = data[1].split(',')[0].split('|')[0];
                    report.defenderVillage.y = data[1].split(',')[0].split('|')[1];
                    report.defenderVillage.id = data[1].split(',')[1];
                }
                catch (err) {
                    report.defenderVillage = null;
                }
    
                try {
                    /*==== set note ====*/
                    report.note = false;
                    if (reportName.search('_n:') != -1) {
                        report.note = reportName.substring(reportName.indexOf('_n:') + 3);
                        reportName = reportName.substring(0, reportName.indexOf('_n:'));
                    }
    
                    /*==== set buildings ====*/
                    report.buildingLevels = false;
                    if (reportName.search('_b') != -1) {
                        let text = reportName.substring(reportName.indexOf('_b') + 2);
                        text = text.substring(0, text.indexOf(']') + 1);
                        //if(text.search('\\?') != -1)
                        //{
                        text = text.substring(1, text.length - 1);
                        report.buildingLevels = BuildingLevels.fromArray(text.split(','));
                        //}
                        //else
                        //report.buildingLevels = eval(text);
                    }
    
                    /*==== set resources ====*/
                    report.resources = false;
                    report.resourcesTotal = false;
                    if (reportName.search('_r') != -1) {
                        let text = reportName.substring(reportName.indexOf('_r') + 2);
                        text = text.substring(0, text.indexOf(']') + 1);
                        let res = eval(text); // todo: no eval
                        report.resources = new Resources(res[0], res[1], res[2]);
                        report.resourcesTotal = report.resources.sum(); // todo: this probably isn't needed
                    }
    
                    /*==== set defense ====*/
                    report.defenderSurvivors = null;
                    if (reportName.search('_d') != -1) {
                        let text = reportName.substring(reportName.indexOf('_d') + 2);
                        text = text.substring(0, text.indexOf(']') + 1);
                        report.defenderSurvivors = TroopCounts.fromArray(JSON.parse(text));
                    }
    
                    /*==== set loyalty ====*/
                    report.loyalty = null;
                    if (reportName.search('_l:') != -1) {
                        let text = reportName.substring(reportName.indexOf('_l:') + 3);
                        text = text.substring(0, text.indexOf('.'));
                        report.loyalty = { after: parseInt(text) };
                    }
    
                    /*==== set attackerNobleDied ====*/
                    report.attackerNobleDied = false;
                    if (reportName.search('_x') != -1)
                        report.attackerNobleDied = true;
    
                    /*==== set feint ====*/
                    report.wasAttackFeint = false;
                    if (reportName.search('_f') != -1)
                        report.wasAttackFeint = true;
    
                    /*==== set timeLaunched ====*/
                    report.timeLaunched = false;
                    if (reportName.search('_t:') != -1) {
                        let text = reportName.substring(reportName.indexOf('_t:') + 3);
                        text = text.substring(0, text.indexOf('.'));
                        report.timeLaunched = TwCheeseDate.newServerDate(parseInt(text) * 1000);
                    }
    
                    /*==== set defender ====*/
                    report.defender = false;
                    let text = reportName.substring(reportName.indexOf(')') + 1);
                    text = text.substring(0, text.indexOf('('));
                    report.defender = new Player(0, text);
                }
                catch (err) {
                    console.warn('swallowed', err);
                }
            }
            else {
                /*==== set defender village ====*/
                try {
    
                    var defIndex;
                    if (reportName.charAt(reportName.length - 1) == ')') /* report was renamed by the game based on the command name */
                        defIndex = data.length - 2
                    else
                        defIndex = data.length - 1
    
                    data[defIndex] = data[defIndex].substring(data[defIndex].lastIndexOf('(') + 1, data[defIndex].lastIndexOf(')'));
                    report.defenderVillage.x = data[defIndex].split(',')[0].split('|')[0];
                    report.defenderVillage.y = data[defIndex].split(',')[0].split('|')[1];
                }
                catch (err) {
                    report.defenderVillage = null;
                }
            }
        }
        return report;
    }

    availableChars(name) {
        return 255 - name.length;
    }

}

export { ReportRenamer };