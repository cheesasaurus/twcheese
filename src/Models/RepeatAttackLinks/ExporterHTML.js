import { Exporter } from '/twcheese/src/Models/RepeatAttackLinks/Exporter.js';


class ExporterHTML extends Exporter {

    /**
     * @param {string} text
     * @return {string}
     */
    buildHeader(text) {
        return [
            '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
            `\n<DT><H3>${text}</H3></DT>\n<DL><P>`
        ].join('');
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryCurrentVillage(report) {
        let leadingZero = '';
        let distance = report.defenderDistance(game_data.village);
        if (distance < 10) {
            leadingZero = '0';
        }
        return '<DT><A HREF="' + this.urlCurrentVillage(report) + '" >' + leadingZero + distance + ' Repeat Attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryOriginalVillage(report) {
        return '<DT><A HREF="' + this.urlOriginalVillage(report) + '" >Repeat Attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';
    }

    /**
     * @return {string}
     */
    buildFooter() {
        return '</P></DL>';
    }

}


export { ExporterHTML };