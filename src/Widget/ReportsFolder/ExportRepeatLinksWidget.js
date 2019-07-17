import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { gameUrl } from '/twcheese/src/Util/Network.js';


class ExportRepeatLinksWidget extends AbstractWidget {

    /**
     * @param {Map.<BattleReportCondensed>} reports 
     */
    constructor(reports) {
        super();
        this.reports = reports;
        this.defaultHeader = 'new cheesy attack group';

        this.initStructure();
        this.watchSelf();
        this.updateExportText();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$exportText = this.$el.find('.twcheese-export-text');
        this.$buttonExport = this.$el.find('.twcheese-button-export');
        this.$headerInput = this.$el.find('#twcheese_export_header');
        this.$formatOptions = this.$el.find("input[name='twcheese-repeat-attack-export-format']");
        this.$attackingVillageOptions = this.$el.find("input[name='twcheese-repeat-attack-export-village']");
    }

    createHtml() {
        return `
            <table id="twcheese_reportsFolderExport" style="display: none;">
                <td>
                    <textarea class="twcheese-export-text" rows=10 cols=40 />
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
    }

    updateExportText() {
        let format = this.$formatOptions.filter(':checked').val();
        let attackingVillage = this.$attackingVillageOptions.filter(':checked').val();
        let header = this.$headerInput.val();


        function buildHeader() {
            switch (format) {
                case 'bbcode':
                    return `[b][u][size=12]${header}[/size][/u][/b]`;

                case 'plainLink':
                    return header;

                case 'html':
                    return [
                        '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
                        `\n<DT><H3>${header}</H3></DT>\n<DL><P>`
                    ].join('');
            }
        }


        function urlCurrentVillage(report) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
        }

        function buildEntryCurrentVillage(report) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlCurrentVillage(report) + ']repeat attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlCurrentVillage(report);

                case 'html':
                    let leadingZero = '';
                    let distance = report.defenderDistance(game_data.village);
                    if (distance < 10) {
                        leadingZero = '0';
                    }
                    return '\n<DT><A HREF="' + urlCurrentVillage(report) + '" >' + leadingZero + distance + ' Repeat Attack ' + report.reportId + ' from (' + game_data.village.coord + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';                
            }
        }


        function urlOriginalVillage(report) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
        }

        function buildEntryOriginalVillage(report) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlOriginalVillage(report) + ']repeat attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlOriginalVillage(report);

                case 'html':
                    return '\n<DT><A HREF="' + urlOriginalVillage(report) + '" >Repeat Attack ' + report.reportId + ' from (' + report.attackerVillage.x + '|' + report.attackerVillage.y + ') to (' + report.defenderVillage.x + '|' + report.defenderVillage.y + ')</A></DT>';
            }
        }

        var exportString = buildHeader();

        for (let report of this.reports.values()) {
            if (!report.defenderVillage) {
                continue; // not enough information
            }
            if (report.attackerName !== game_data.player.name) {
                continue; // can't repeat somebody else's attack
            }
            if (attackingVillage == 'current') {
                exportString += buildEntryCurrentVillage(report);
            }
            else if (attackingVillage == 'original' && report.attackerVillage) {
                exportString += buildEntryOriginalVillage(report);
            } 
        }

        if (format === 'html') {
            exportString += '\n</P></DL>';
        }

        this.$exportText.val(exportString);
    }

}

export { ExportRepeatLinksWidget };