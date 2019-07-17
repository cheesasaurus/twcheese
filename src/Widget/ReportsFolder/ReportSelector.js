
class ReportSelector {

    /**
     * @param {ReportListWidget} reportListWidget
     */
    constructor(reportListWidget) {
        this.widget = reportListWidget;
    }

    /**
     * @return {number[]}
     */
    getSelectedReportIds() {
        return this.widget.getSelectedReportIds();
    }

    selectNew() {
        this.widget.selectMatchingReports(report => report.isNew);
    }

    selectOld() {
        this.widget.selectMatchingReports(report => !report.isNew);
    }

    selectAll() {
        this.widget.selectMatchingReports(report => true);
    }

    selectNone() {
        this.widget.deselectAllReports();
    }

    selectDotColor(dotColor) {
        this.widget.selectMatchingReports(report => report.dotColor === dotColor);
    }

    selectForwarded() {
        this.widget.selectMatchingReports(report => report.isForwarded);
    }

    /**
     * @param {number} haulStatus 0 for non full haul, 1 for full haul
     */
    selectLoot(haulStatus) {
        this.widget.selectMatchingReports(report => report.haulStatus === haulStatus);
    }

    selectFeint() {
        this.widget.selectMatchingReports(report => report.wasAttackFeint);
    }

    selectDeadNoble() {
        this.widget.selectMatchingReports(report => report.attackerNobleDied);
    }

    selectLoyalty() {
        this.widget.selectMatchingReports(report => report.loyalty !== null);
    }

    selectCleared() {
        this.widget.selectMatchingReports(report => report.wasDefenderCleared());
    }

    selectText(text) {
        let textLower = text.toLowerCase();
        this.widget.selectMatchingReports(report => report.subject.toLowerCase().includes(textLower));
    }

    selectAttacker(attackerName) {
        let nameLower = attackerName.toLowerCase();
        this.widget.selectMatchingReports(report => report.attackerName && report.attackerName.toLowerCase().includes(nameLower));
    }

    selectDefender(defenderName) {
        let nameLower = defenderName.toLowerCase();
        this.widget.selectMatchingReports(report => report.defenderName && report.defenderName.toLowerCase().includes(nameLower));
    }

    selectAttackerVillage(coordinates) {
        let [, x, y] = coordinates.match(/(\d+)\|(\d+)/);
        x = parseInt(x);
        y = parseInt(y);

        this.widget.selectMatchingReports(report => {
            if (!report.attackerVillage) {
                return false;
            }

            return report.attackerVillage.x === x
                && report.attackerVillage.y === y;
        });
    }

    selectDefenderVillage(coordinates) {
        let [, x, y] = coordinates.match(/(\d+)\|(\d+)/);
        x = parseInt(x);
        y = parseInt(y);

        this.widget.selectMatchingReports(report => {
            if (!report.defenderVillage) {
                return false;
            }
            
            return report.defenderVillage.x === x
                && report.defenderVillage.y === y;
        });
    }

}

export { ReportSelector };