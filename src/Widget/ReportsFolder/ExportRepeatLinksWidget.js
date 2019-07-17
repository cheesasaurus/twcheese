import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { gameUrl } from '/twcheese/src/Util/Network.js';


class ExportRepeatLinksWidget extends AbstractWidget {

    /**
     * @param {Map.<BattleReportCondensed>} reports 
     */
    constructor(reports) {
        super();
        this.reports = reports;

        this.initStructure();
        this.watchSelf();
    }

    initStructure() {
        /*==== export repeatLinks div ====*/
        var reportsFolderExportContainer = document.createElement('table');
        reportsFolderExportContainer.id = 'twcheese_reportsFolderExport';
        reportsFolderExportContainer.style.display = 'none';

        reportsFolderExportContainer.insertRow(-1);
        reportsFolderExportContainer.rows[0].insertCell(-1);
        reportsFolderExportContainer.rows[0].insertCell(-1);
        reportsFolderExportContainer.rows[0].cells[0].innerHTML += '<textarea rows=10 cols=40 />';

        /*==== export repeatLinks configuration table ====*/
        var exportConfigTable = document.createElement('table');
        exportConfigTable.id = 'twcheese_exportConfigTable';
        reportsFolderExportContainer.rows[0].cells[1].appendChild(exportConfigTable);

        exportConfigTable.insertRow(-1);
        exportConfigTable.rows[0].appendChild(document.createElement('th'));
        exportConfigTable.rows[0].cells[0].innerHTML = 'Format';
        exportConfigTable.rows[0].appendChild(document.createElement('th'));
        exportConfigTable.rows[0].cells[1].innerHTML = 'Attacking Village';

        exportConfigTable.insertRow(-1);
        exportConfigTable.rows[1].insertCell(-1);
        exportConfigTable.rows[1].cells[0].innerHTML = `
            <input type="radio" name="twcheese-repeat-attack-export-format" checked="true" value="bbcode"/> BBCode
            <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="plainLink"/> plain links
            <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="html"/> HTML`;

        exportConfigTable.rows[1].insertCell(-1);
        exportConfigTable.rows[1].cells[1].innerHTML = `
            <input type="radio" name="twcheese-repeat-attack-export-village" checked="true" value="current"/> current village
            <br/><input type="radio" name="twcheese-repeat-attack-export-village" value="original"/> original village`;

        exportConfigTable.insertRow(-1);
        exportConfigTable.rows[2].insertCell(-1);
        exportConfigTable.rows[2].cells[0].colSpan = 2;
        exportConfigTable.rows[2].cells[0].innerHTML = 'Header: <input type="text" id="twcheese_export_header" value="new cheesy attack group" />';

        exportConfigTable.insertRow(-1);
        exportConfigTable.rows[3].insertCell(-1);
        exportConfigTable.rows[3].cells[0].colSpan = 2;
        exportConfigTable.rows[3].cells[0].innerHTML = '<a class="twcheese-button-export" href="#"> &raquo; Export</a>';

        this.$el = $(reportsFolderExportContainer);
        this.$buttonExport = this.$el.find('.twcheese-button-export');
        this.$headerInput = this.$el.find('#twcheese_export_header');

    }

    watchSelf() {
        this.$headerInput.on('click', function() {
            if (this.value === 'new cheesy attack group') {
                this.value = '';
            }
        });

        this.$buttonExport.on('click', (e) => {
            e.preventDefault();
            this.exportLinks();
        });
    }

    exportLinks() {
        let format = $("input[name='twcheese-repeat-attack-export-format']:checked").val();
        let attackingVillage = $("input[name='twcheese-repeat-attack-export-village']:checked").val();

        var header = document.getElementById('twcheese_export_header').value;


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

        document.getElementById('twcheese_reportsFolderExport').getElementsByTagName('textarea')[0].value = exportString;
    }

}

export { ExportRepeatLinksWidget };