import { Exporter } from '/twcheese/src/Models/RepeatAttackLinks/Exporter.js';


class ExporterPlainText extends Exporter {

    /**
     * @param {string} text
     * @return {string}
     */
    buildHeader(text) {
        return text;
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryCurrentVillage(report) {
        return this.urlCurrentVillage(report);
    }

    /**
     * @param {BattleReportCondensed} report
     * @return {string}
     */
    buildEntryOriginalVillage(report) {
        return this.urlOriginalVillage(report);
    }

    /**
     * @return {string}
     */
    buildFooter() {
        return '';
    }

}


export { ExporterPlainText };