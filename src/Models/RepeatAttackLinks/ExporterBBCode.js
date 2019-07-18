import { Exporter } from '/twcheese/src/Models/RepeatAttackLinks/Exporter.js';


class ExporterBBCode extends Exporter {

    /**
     * @param {string} text
     * @return {string}
     */
    buildHeader(text) {
        return `[b][u][size=12]${text}[/size][/u][/b]`;
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryCurrentVillage(report) {
        return '[url=' + this.urlCurrentVillage(report) + ']repeat attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryOriginalVillage(report) {
        return '[url=' + this.urlOriginalVillage(report) + ']repeat attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';
    }

    /**
     * @return {string}
     */
    buildFooter() {
        return '';
    }

}


export { ExporterBBCode };