import { gameUrl } from '/twcheese/src/Util/Network.js';


class Exporter {

    /**
     * @param {BattleReportCondensed[]} reports 
     * @param {string} attackFrom
     * @param {string} headerText
     * @return {string}
     */
    buildExportText(reports, attackFrom, headerText) {
        let exportText = this.buildHeader(headerText);

        for (let report of reports) {
            if (!report.defenderVillage) {
                continue; // not enough information
            }
            if (report.attackerName !== game_data.player.name) {
                continue; // can't repeat somebody else's attack
            }
            if (attackFrom === Exporter.ATTACK_FROM_CURRENT) {
                exportText += "\n" + this.buildEntryCurrentVillage(report);
            }
            else if (attackFrom === Exporter.ATTACK_FROM_ORIGINAL && report.attackerVillage) {
                exportText += "\n" + this.buildEntryOriginalVillage(report);
            } 
        }

        exportText += "\n" + this.buildFooter();
        return exportText;
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    urlCurrentVillage(report) {
        return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    urlOriginalVillage(report) {
        return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
    }

    /**
     * @abstract
     * @param {string} text
     * @return {string}
     */
    buildHeader(text) {
        throw Error('not implemented');
    }

    /**
     * @abstract
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryCurrentVillage(report) {
        throw Error('not implemented');
    }

    /**
     * @abstract
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryOriginalVillage(report) {
        throw Error('not implemented');
    }

    /**
     * @abstract
     * @return {string}
     */
    buildFooter() {
        throw Error('not implemented');
    }

}

Exporter.ATTACK_FROM_CURRENT = 'current';
Exporter.ATTACK_FROM_ORIGINAL = 'original';


export { Exporter };