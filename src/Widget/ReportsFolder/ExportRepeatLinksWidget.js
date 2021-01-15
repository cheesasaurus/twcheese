import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ExporterBBCode } from '/twcheese/src/Models/RepeatAttackLinks/ExporterBBCode.js';
import { ExporterPlainText } from '/twcheese/src/Models/RepeatAttackLinks/ExporterPlainText.js';
import { ExporterHTML } from '/twcheese/src/Models/RepeatAttackLinks/ExporterHTML.js';


class ExportRepeatLinksWidget extends AbstractWidget {

    /**
     * @param {Map.<BattleReportCondensed>} reports 
     */
    constructor(reports) {
        super();
        this.reports = reports;
        this.defaultHeader = 'new cheesy attack group';

        this.exporters = {
            bbcode: new ExporterBBCode(),
            plainLink: new ExporterPlainText(),
            html: new ExporterHTML()
        };

        this.initStructure();
        this.watchSelf();
        this.updateExportText();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$exportText = this.$el.find('.twcheese-export-text');
        this.$buttonCopy = this.$el.find('.twcheese-button-copy');
        this.$headerInput = this.$el.find('#twcheese_export_header');
        this.$formatOptions = this.$el.find("input[name='twcheese-repeat-attack-export-format']");
        this.$attackingVillageOptions = this.$el.find("input[name='twcheese-repeat-attack-export-village']");
    }

    createHtml() {
        return `
            <table id="twcheese_reportsFolderExport" style="display: none;">
                <td>
                    <textarea class="twcheese-export-text" rows="10" cols="40" readonly="true" />
                </td>
                <td>
                    <table id="twcheese_exportConfigTable">
                        <tr>
                            <th>Format</th>
                            <th>Attacking Village</th>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" name="twcheese-repeat-attack-export-format" checked="true" value="bbcode"/> BBCode
                                <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="plainLink"/> plain links
                                <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="html"/> HTML
                            </td>
                            <td>
                                <input type="radio" name="twcheese-repeat-attack-export-village" checked="true" value="current"/> current village
                                <br/><input type="radio" name="twcheese-repeat-attack-export-village" value="original"/> original village
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                Header: <input type="text" id="twcheese_export_header" value="${this.defaultHeader}" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center; padding-top: 20px;">
                                <a class="twcheese-button-copy btn btn-default" href="#">Copy to clipboard</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </table>
        `;
    }

    watchSelf() {
        this.$headerInput.on('click', () => {
            if (this.$headerInput.val() === this.defaultHeader) {
                this.$headerInput.val('');
            }
            this.updateExportText();
        });

        this.$headerInput.on('input', (e) => {
            this.updateExportText();
        });

        this.$formatOptions.on('change', (e) => {
            this.updateExportText();
        });

        this.$attackingVillageOptions.on('change', (e) => {
            this.updateExportText();
        });

        this.$buttonCopy.on('click', (e) => {
            e.preventDefault();
            this.$exportText.select();
            document.execCommand('copy');
            window.UI.SuccessMessage('Copied to clipboard');
        });
    }

    updateExportText() {
        let format = this.$formatOptions.filter(':checked').val();
        let attackFrom = this.$attackingVillageOptions.filter(':checked').val();
        let headerText = this.$headerInput.val();

        let exporter = this.exporters[format];
        let exportText = exporter.buildExportText(this.reports.values(), attackFrom, headerText);
        this.$exportText.val(exportText);
    }

}

export { ExportRepeatLinksWidget };