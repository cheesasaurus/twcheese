import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { requestDocument, gameUrl } from '/twcheese/src/Util/Network.js';
import { BattleReportScraper } from '/twcheese/src/Scrape/BattleReportScraper.js';


var language = { "twcheese": {} };
switch (game_data.market) {
    default:
        /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
        language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
        break;

    case 'cz':
        /*==== divokekmeny.cz/ ====*/
        language['twcheese']['noReportsSelected'] = 'Nejdříve si musíte vybrat, které zprávy přejmenovat.';
        break;

    case 'se':
        language['twcheese']['noReportsSelected'] = 'Du har inte valt några rapporter som skall döpas om.';
        break;

    /*==== fyletikesmaxes.gr/ ====*/
    case 'gr':
        language['twcheese']['noReportsSelected'] = 'Δεν έχεις επιλέξει  καμιά αναφορά για μετονομασία';
        break;

    /* Norwegian */
    case 'no':
        language['twcheese']['noReportsSelected'] = 'Du har ikke valgt hvilke rapporter som skal endres navn på.';
        break;
                        
}


class MassRenamerWidget extends AbstractWidget {

    /**
     * @param {Map.<number, BattleReportCondensed>} reports
     * @param {ReportRenamer} renamer
     * @param {ReportSelector} reportSelector
     * @param {DisplayConfigurer} displayConfigurer
     */
    constructor(reports, renamer, reportSelector, displayConfigurer) {
        super();
        this.reports = reports;
        this.renamer = renamer;
        this.reportSelector = reportSelector;
        this.displayConfigurer = displayConfigurer;

        this.initStructure();
        this.watchSelf();
    }

    initStructure() {
        this.$el = $(`
            <table class="vis">
                <tbody>
                    <tr>
                        <td>
                            <a class="twcheese-button-rename" href="#">&raquo; Rename</a>
                            <img src="/graphic/questionmark.png?1" width="13" height="13" title="rename selected reports to twCheese format">
                        </td>
                        <td style="textAlign: right;">Progress:</td>
                        <td style="width: 40px;"><span id="twcheese_progress_percent">0</span>%</td>
                        <td style="width: 136px;">(<span id="twcheese_progress_count">0</span>/<span id="twcheese_progress_count_max">0</span> reports)</td>
                        <td>time remaining: <span id="twcheese_time_remaining">00:00</span></td>
                    </tr>
                </tbody>
            </table>
        `.trim());

        this.$buttonRename = this.$el.find('.twcheese-button-rename');
        this.$progressCount = this.$el.find('#twcheese_progress_count');
        this.$targetCount = this.$el.find('#twcheese_progress_count_max');
        this.$progressPercent = this.$el.find('#twcheese_progress_percent');
        this.$timeRemaining = this.$el.find('#twcheese_time_remaining');
    }

    watchSelf() {
        this.$buttonRename.on('click', (e) => {
            e.preventDefault();
            this.massRename();
        });
    }

    async massRename() {
        let reportIds = this.reportSelector.getSelectedReportIds();
        let total = reportIds.length;
        let progress = 0;

        if (total === 0) {
            window.UI.ErrorMessage(language['twcheese']['noReportsSelected'], 3000);
            return;
        }

        this.$progressCount.text(0);
        this.$targetCount.text(total);
        
        var estimatedTimeRemaining;

        /*==== rename reports 1 by 1 ====*/

        for (let reportId of reportIds) {
            let startTime = performance.now();           

            try {
                let reportDoc = await requestDocument(gameUrl('report', {mode: game_data.mode, view: reportId}));

                let scraper = new BattleReportScraper(reportDoc);
                let fullReport = scraper.scrapeReport();
                let name = await this.renamer.rename(fullReport, '');
    
                $('.quickedit[data-id="' + reportId + '"]')
                    .find('.quickedit-label').html(name);
    
                /*==== update reports information so row can be redrawn with updated information====*/
    
                let oldReport = this.reports.get(reportId);
    
                let report = this.renamer.parseName(name);
                report.reportId = reportId;
                report.attackIcons = oldReport.attackIcons;
                report.dotColor = oldReport.dotColor;
                report.haulStatus = oldReport.haulStatus;
                report.isForwarded = oldReport.isForwarded;
                report.strTimeReceived = oldReport.strTimeReceived;
    
                this.reports.set(report.reportId, report);
    
    
                /*==== update progress display ====*/
                progress++;
                var millisElapsed = performance.now() - startTime;
                estimatedTimeRemaining = (millisElapsed * (total - progress)) / 1000;
                var minutesRemaining = Math.floor(estimatedTimeRemaining / 60);
                var secondsRemaining = Math.round(estimatedTimeRemaining - (minutesRemaining * 60));
                if (minutesRemaining < 10)
                    minutesRemaining = '0' + minutesRemaining;
                if (secondsRemaining < 10)
                    secondsRemaining = '0' + secondsRemaining;
                this.$timeRemaining.text(`${minutesRemaining}:${secondsRemaining}`);
                this.$progressCount.text(progress);
                this.$progressPercent.text(Math.round(progress / total * 100));
            }
            catch (e) {
                console.error('error renaming report:', e);
            }

        }
        
        this.displayConfigurer.refreshDisplay();
    }

}

export { MassRenamerWidget };