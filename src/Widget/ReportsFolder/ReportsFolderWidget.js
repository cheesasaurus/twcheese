import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { DisplayConfigurer } from '/twcheese/src/Widget/ReportsFolder/DisplayConfigurer.js';
import { DisplayConfigWidget } from '/twcheese/src/Widget/ReportsFolder/DisplayConfigWidget.js';
import { ExportRepeatLinksWidget } from '/twcheese/src/Widget/ReportsFolder/ExportRepeatLinksWidget.js';
import { ReportListWidget } from '/twcheese/src/Widget/ReportsFolder/ReportListWidget.js';
import { ReportSelector } from '/twcheese/src/Widget/ReportsFolder/ReportSelector.js';
import { ReportSelectorWidget } from '/twcheese/src/Widget/ReportsFolder/ReportSelectorWidget.js';
import { MassRenamerWidget } from '/twcheese/src/Widget/ReportsFolder/MassRenamerWidget.js';
import { initCss } from '/twcheese/src/Util/UI.js';


class ReportsFolderWidget extends AbstractWidget {
    constructor(reports, renamer) {
        super();
        this.reports = reports;

        let reportListWidget = new ReportListWidget(this.reports);
        let displayConfigurer = new DisplayConfigurer(reportListWidget);
        let reportSelector = new ReportSelector(reportListWidget);

        /*==== create twcheese reports folder ====*/
        var reportsFolder = document.createElement('div');
        reportsFolder.id = 'twcheese_reportsFolder';
        this.$el = $(reportsFolder);

        /*==== reports folder toolbar ====*/
        var reportsFolderToolbar = document.createElement('div');
        reportsFolder.appendChild(reportsFolderToolbar);
        reportsFolderToolbar.id = 'twcheese_reportsFolderToolbar';

        reportsFolderToolbar.currentPanel = 'none';
        reportsFolderToolbar.toggleDisplayConfig = function () {
            if (this.currentPanel == 'displayConfig') {
                document.getElementById('twcheese_displayConfig_tab').className = '';
                document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
                this.currentPanel = 'none';
            }
            else {
                document.getElementById('twcheese_displayConfig_tab').className = 'selected';
                document.getElementById('twcheese_export_tab').className = '';
                document.getElementById('twcheese_reportsFolderSettings').style.display = '';
                document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
                this.currentPanel = 'displayConfig';
            }
        };

        reportsFolderToolbar.toggleExport = function () {
            if (this.currentPanel == 'exportLinks') {
                document.getElementById('twcheese_export_tab').className = '';
                document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
                this.currentPanel = 'none';
            }
            else {
                document.getElementById('twcheese_export_tab').className = 'selected';
                document.getElementById('twcheese_displayConfig_tab').className = '';
                document.getElementById('twcheese_reportsFolderExport').style.display = '';
                document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
                this.currentPanel = 'exportLinks';
            }
        };

        /*==== toolbar tabs ====*/
        reportsFolderToolbar.innerHTML += `
            <table style="border-style:solid; border-width:0px;" class="vis modemenu">
                <tbody>
                    <tr>
                        <td id="twcheese_displayConfig_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleDisplayConfig();">
                            <a>configure display</a>
                        </td>
                        <td id="twcheese_export_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleExport();">
                            <a>export repeat-attack links</a>
                        </td>
                    </tr>
                </tbody>
            </table>`;


        /*==== export links to repeat attacks ====*/
        let exportLinksWidget = new ExportRepeatLinksWidget(this.reports);
        exportLinksWidget.appendTo(reportsFolderToolbar);

        /*==== display settings ====*/
        (new DisplayConfigWidget(displayConfigurer))
            .appendTo(reportsFolderToolbar);

        /*==== reports display ====*/
        reportListWidget
            .appendTo(reportsFolder);

        /*==== reports selector bar ====*/
        (new ReportSelectorWidget(reportSelector))
            .appendTo(reportsFolder);

        /*==== mass renamer ====*/
        (new MassRenamerWidget(this.reports, renamer, reportSelector, displayConfigurer))
            .appendTo(reportsFolder);

    }
}


initCss(`
    #twcheese_reportsFolder {
        margin-bottom: 30px;
    }
`);


export { ReportsFolderWidget };