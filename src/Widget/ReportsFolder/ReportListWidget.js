import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { columnCategories } from '/twcheese/src/Widget/ReportsFolder/columnCategories.js';
import { userConfig } from '/twcheese/src/Util/Config.js';
import { initCss } from '/twcheese/src/Util/UI.js';


function cellAtIndex(row, i) {
    let endIndex = -1;
    for (let cell of row.cells) {
        let initialColSpan = cell.initialColSpan || cell.colSpan;
        endIndex += initialColSpan;
        if (endIndex >= i) {
            return cell;
        }
    }
}


class ReportListWidget extends AbstractWidget {
    /**
     * @param {Map.<number, BattleReportCondensed>} reports 
     */
    constructor(reports) {
        super();
        this.reports = reports;
        this.columnIndexes = new Map();

        this.initStructure();
        this.$el.resizable();
        this.watchSelf();
    }

    initStructure() {
        var reportsFolderDisplay = document.createElement('div');
        reportsFolderDisplay.id = 'twcheese_reportsFolderDisplay';
        reportsFolderDisplay.style.overflow = 'hidden';
        reportsFolderDisplay.style.position = 'relative';
        reportsFolderDisplay.style.width = '646px';
        reportsFolderDisplay.style.height = '400px';
        reportsFolderDisplay.style.minHeight = '100px';
        reportsFolderDisplay.style.minWidth = '100px';        

        /*==== reports table header ====*/
        var reportsTableHeaderDiv = document.createElement('div');
        reportsFolderDisplay.appendChild(reportsTableHeaderDiv);
        reportsTableHeaderDiv.style.overflow = 'hidden';

        var reportsTableHeader = document.createElement('table');
        reportsTableHeaderDiv.appendChild(reportsTableHeader);
        reportsTableHeader.style.tableLayout = 'fixed';
        reportsTableHeader.style.width = '2370px';
        reportsTableHeader.id = 'twcheese_reportsTable_header';

        /*==== create headers ====*/
        reportsTableHeader.insertRow(-1);
        reportsTableHeader.insertRow(-1);
        reportsTableHeader.insertRow(-1);

        let cellIndex = 0;
        for (let category of columnCategories.values()) {
            let titleTh = document.createElement('th');
            titleTh.innerHTML = category.title || '';
            titleTh.initialColSpan = category.cols.length;
            titleTh.colSpan = category.cols.length;
            reportsTableHeader.rows[1].appendChild(titleTh);

            let widthSum = 0;
            let colIndexes = [];
            for (let col of category.cols) {
                let alignmentTh = document.createElement('th');
                alignmentTh.style.width = col.width + 'px';
                alignmentTh.style.paddingTop = 0;
                alignmentTh.style.paddingBottom = 0;
                reportsTableHeader.rows[0].appendChild(alignmentTh);

                let lowerTh = document.createElement('th');
                lowerTh.innerHTML = col.header;
                reportsTableHeader.rows[2].appendChild(lowerTh);

                widthSum += col.width;
                colIndexes.push(cellIndex);
                cellIndex++;
            }
            let borderSpacing = 2 * (category.cols.length - 1);
            titleTh.style.width = (widthSum + borderSpacing) + 'px';
            this.columnIndexes.set(category.key, colIndexes);
        }

        /*==== reports table body ====*/
        var reportsTableBodyDiv = document.createElement('div');
        reportsFolderDisplay.appendChild(reportsTableBodyDiv);
        reportsTableBodyDiv.style.overflow = 'hidden';
        reportsTableBodyDiv.style.height = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
        reportsTableBodyDiv.style.width = '646px';
        reportsTableBodyDiv.id = 'twcheese_reportsTable';


        var reportsTableBody = document.createElement('table');
        reportsTableBodyDiv.appendChild(reportsTableBody);
        reportsTableBody.style.tableLayout = 'fixed';
        reportsTableBody.style.width = '2370px';
        reportsTableBody.id = 'twcheese_reportsTable_body';
        reportsTableBody.className = 'vis';

        /*==== create first row to match widths to header table ====*/
        reportsTableBody.insertRow(-1);
        for (let alignmentTh of reportsTableHeader.rows[0].cells) {
            let alignmentCell = reportsTableBody.rows[0].insertCell(-1);
            alignmentCell.style.width = alignmentTh.style.width;
            alignmentCell.style.paddingTop = 0;
            alignmentCell.style.paddingBottom = 0;
        }

        /*==== y scroll panel====*/
        var yScrollPanel = document.createElement('div');
        yScrollPanel.id = 'twcheese_reportsDisplay_yScrollPanel';
        reportsFolderDisplay.appendChild(yScrollPanel);
        yScrollPanel.style.overflowY = 'scroll';
        yScrollPanel.style.overflowX = 'hidden';
        yScrollPanel.style.background = 'transparent';
        yScrollPanel.style.position = 'absolute';
        yScrollPanel.style.right = 0;
        yScrollPanel.style.scrollbarWidth = 'thin';

        /*==== y table emulator ====*/
        var yTableEmulator = document.createElement('div');
        yTableEmulator.id = 'twcheese_reportsDisplay_y-table-emulator';
        yScrollPanel.appendChild(yTableEmulator);
        yTableEmulator.style.overflow = 'hidden';
        yTableEmulator.style.position = 'relative';
        yTableEmulator.innerHTML = '&nbsp;';

        /*==== x scroll panel ====*/
        var xScrollPanel = document.createElement('div');
        xScrollPanel.id = 'twcheese_reportsDisplay_xScrollPanel';
        reportsFolderDisplay.appendChild(xScrollPanel);
        xScrollPanel.style.height = '40px';
        xScrollPanel.style.width = `calc(100% - 18px)`;
        xScrollPanel.style.marginTop = '-23px';
        xScrollPanel.style.overflowX = 'scroll';
        xScrollPanel.style.overflowY = 'hidden';
        xScrollPanel.style.marginTop = 'expression(\'0px\')';// IE 7 fix
        xScrollPanel.style.height = 'expression(\'17px\')'; // IE 7 fix

        /*==== x table emulator ====*/
        var xTableEmulator = document.createElement('div');
        xTableEmulator.id = 'twcheese_reportsDisplay_x-table-emulator';
        xScrollPanel.appendChild(xTableEmulator);
        xTableEmulator.style.width = reportsTableHeader.clientWidth + 'px';
        xTableEmulator.innerHTML = '&nbsp;';
        
        this.$el = $(reportsFolderDisplay);
        this.$head = this.$el.find('#twcheese_reportsTable_header');
        this.$body = this.$el.find('#twcheese_reportsTable_body');
        this.$bodyPane = this.$el.find('#twcheese_reportsTable');
        this.$xBodyEmulator = this.$el.find('#twcheese_reportsDisplay_x-table-emulator');
        this.$yBodyEmulator = this.$el.find('#twcheese_reportsDisplay_y-table-emulator');
        this.$xScrollPanel = this.$el.find('#twcheese_reportsDisplay_xScrollPanel');
        this.$yScrollPanel = this.$el.find('#twcheese_reportsDisplay_yScrollPanel');
    }


    afterInsert() {
        let $headContainer = this.$head.parent();
        this.$yScrollPanel.css({
            top: $headContainer.outerHeight() + 2
        });
        this.populateReportsTable();
        this.applySettings();
    }


    watchSelf() {
        this.$el.on('resize', (e) => {
            this.fitDisplayComponents();
            userConfig.set('ReportListWidget.size.width', this.$el.width());
            userConfig.set('ReportListWidget.size.height', this.$el.height());
        });

        this.$bodyPane.on('scroll', (e) => {
            this.$xScrollPanel.scrollTop(this.$bodyPane.scrollTop());
        });

        this.$yScrollPanel.on('scroll', (e) => {
            this.$bodyPane.scrollTop(this.$yScrollPanel.scrollTop());
        });

        this.$xScrollPanel.on('scroll', (e) => {
            this.$bodyPane.scrollLeft(this.$xScrollPanel.scrollLeft());
            this.$head.parent().scrollLeft(this.$xScrollPanel.scrollLeft());
        });

        this.$bodyPane.on('wheel', (e) => {
            e.preventDefault();
            let deltaY = 90 * Math.sign(e.originalEvent.deltaY);
            
            let timeStart = performance.now();
            let animDurationMs = 250;
            let y = 0;

            let scrollStep = () => {
                let msElapsed = performance.now() - timeStart;
                let targetY = deltaY * Math.min(1, msElapsed / animDurationMs);
                let stepY = targetY - y;

                y += stepY;
                this.$yScrollPanel[0].scrollTop += stepY;
                this.$bodyPane[0].scrollTop += stepY;

                if (msElapsed < animDurationMs) {
                    window.requestAnimationFrame(scrollStep);
                }
            }
            window.requestAnimationFrame(scrollStep);
        });
    }


    /**
     * fills body with information
     */
    populateReportsTable() {
        let minimal = new Set(['essential', 'attackIcons', 'repeatLinks', 'distance', 'fullSubject', 'strTimeReceived']);

        let fallbackSubjectColSpan = columnCategories.toArray().reduce(function(acc, category) {
            if (category.key !== 'fullSubject' && minimal.has(category.key)) {
                return acc;
            }
            return acc + category.cols.length;
        }, 0);

        for (let report of this.reports.values()) {
            let row = this.$body[0].insertRow(-1);
            row.twcheeseReport = report;
            let hasDecentInfo = report.attackerName && report.defenderName && report.attackerVillage && report.defenderVillage;

            for (let category of columnCategories.values()) {
                if (!hasDecentInfo && !minimal.has(category.key)) {
                    continue;
                }
                for (let col of category.cols) {
                    let cell = row.insertCell(-1);
                    cell.innerHTML = col.createCellHtml(report);
                    if (typeof col.align === 'string') {
                        cell.style.textAlign = col.align;
                    }
                    if (typeof col.cssClass === 'function') {
                        cell.className = col.cssClass(report);
                    }
                    if (!hasDecentInfo && category.key === 'fullSubject') {
                        cell.initialColSpan = fallbackSubjectColSpan;
                        cell.colSpan = cell.initialColSpan;
                    }                    
                }                
            }
        }
        
        this.alignForTroops();
        this.alignForResources();
        this.adjustScrollbars();
    }


    /**
     * hides columns and resizes to user's preferences
     */
    applySettings() {
        for (let category of columnCategories.values()) {
            if (!userConfig.get(`ReportListWidget.showCols.${category.key}`, !category.startHidden)) {
                this.hideColumns(category.key);
            }
        }

        this.$el.css({
            width: userConfig.get('ReportListWidget.size.width', '720px'),
            height: userConfig.get('ReportListWidget.size.height', '250px')
        });
                
        this.fitDisplayComponents();
        this.adjustScrollbars();
    }


    adjustScrollbars() {
        this.$xBodyEmulator.width(this.$body.width());
        this.$yBodyEmulator.height(this.$body.height());
    }


    toggleReportsColumns(settingName) {
        let startHidden = columnCategories.get(settingName).startHidden;
        let configKey = `ReportListWidget.showCols.${settingName}`;
        let show = !userConfig.get(configKey, !startHidden);
        userConfig.set(configKey, show);

        for (let i of this.columnIndexes.get(settingName)) {
            if (show) {
                this.showColumn(i);
            } else {
                this.hideColumn(i);
            }
        }
        this.adjustScrollbars();
    }


    hideColumns(settingName) {
        for (let i of this.columnIndexes.get(settingName)) {
            this.hideColumn(i);
        }
    }


    showColumn(column) {
        var body = this.$body[0];
        var head = this.$head[0];

        var tableWidth = head.style.width.split('px')[0];        

        /*==== header ====*/
        let alignmentTh = cellAtIndex(head.rows[0], column);
        let columnWidth = alignmentTh.style.width.split('px')[0];
        tableWidth = parseFloat(tableWidth) + parseFloat(columnWidth);
        head.style.width = tableWidth + 'px';

        alignmentTh.style.display = "table-cell";
        cellAtIndex(head.rows[1], column).style.display = "table-cell";
        head.rows[2].cells[column].style.display = "table-cell";

        /*==== body ====*/
        body.style.width = tableWidth + 'px';
        for (let row of body.rows) {
            let cell = cellAtIndex(row, column);

            if (cell.initialColSpan && cell.initialColSpan > 1) {
                cell.colSpan += 1;
            } else {
                cell.style.display = 'table-cell';
            }
        }
    }


    hideColumn(column) {
        var body = this.$body[0];
        var head = this.$head[0];

        var tableWidth = head.style.width.split('px')[0];

        /*==== header ====*/
        let alignmentTh = cellAtIndex(head.rows[0], column);
        let columnWidth = alignmentTh.style.width.split('px')[0];
        tableWidth = parseFloat(tableWidth) - parseFloat(columnWidth);
        head.style.width = tableWidth + 'px';

        alignmentTh.style.display = "none";
        cellAtIndex(head.rows[1], column).style.display = "none";
        head.rows[2].cells[column].style.display = "none";

        /*==== body ====*/
        body.style.width = tableWidth + 'px';
        for (let row of body.rows) {
            let cell = cellAtIndex(row, column);

            if (cell.initialColSpan && cell.initialColSpan > 1) {
                cell.colSpan -= 1;
            } else {
                cell.style.display = 'none';
            }
        }
    }


    getSelectedReportIds() {
        return this.$body.find('input:checked')
            .toArray()
            .map(el => parseInt(el.name.match(/\d+/)[0]));
    }

    refreshContents() {
        this.$body.find('tr:not(:first)').remove();    
        this.populateReportsTable();
        this.applySettings();    
    }

    /**
     * sets display components styles to fill the display zone and ensure scrolling functionality
     */
    fitDisplayComponents() {
        let bodyPaneHeight = this.$el.height() - 67;

        this.$bodyPane.css({
            width: this.$el.width(),
            height: bodyPaneHeight
        });
        
        this.$yScrollPanel.css({height: bodyPaneHeight});
    }


    /**
     * adjust widths for troop counts
     */
    alignForTroops() {
        let colIndexes = this.columnIndexes.get('defenderSurvivors');

        let maxChars = Array(colIndexes.length).fill(2);

        for (let r = 1; r < this.$body[0].rows.length; r++) {
            let row = this.$body[0].rows[r];
            if (!row.twcheeseReport.defenderSurvivors) {
                continue;
            }
            for (let [i, col] of Object.entries(colIndexes)) {
                let chars = String(row.cells[col].innerHTML).length;
                maxChars[i] = Math.max(chars, maxChars[i]);
            }
        }

        this.alignCols(colIndexes, maxChars);
    }


    /**
     * adjust widths for resources
     */
    alignForResources() {
        let colIndexes = [
            ...this.columnIndexes.get('resources.wood'),
            ...this.columnIndexes.get('resources.stone'),
            ...this.columnIndexes.get('resources.iron'),
            ...this.columnIndexes.get('resources.sum'),
        ];

        let maxChars = [2, 2, 2, 2];

        for (let r = 1; r < this.$body[0].rows.length; r++) {
            let row = this.$body[0].rows[r];
            if (!row.twcheeseReport.resources) {
                continue;
            }
            for (let [i, col] of Object.entries(colIndexes)) {
                let chars = row.cells[col].innerText.length;
                maxChars[i] = Math.max(chars, maxChars[i]);
            }
        }

        this.alignCols(colIndexes, maxChars);
    }


    alignCols(colIndexes, maxChars) {
        let charWidth = 8;
        let widthSum = 0;
        for (let [i, col] of Object.entries(colIndexes)) {
            let width = charWidth * maxChars[i];
            width = Math.max(20, width);
            widthSum += width;

            let alignmentTh = this.$head[0].rows[0].cells[col];
            let bodyCell = this.$body[0].rows[0].cells[col];

            alignmentTh.style.width = width + 'px';
            bodyCell.style.width = width + 'px';
        }

        let padding = 3 * 2 * colIndexes.length;
        let borderSpacing = 2 * (colIndexes.length - 1);
        let width = widthSum + borderSpacing + padding;
        
        let titleTh = cellAtIndex(this.$head[0].rows[1], colIndexes[0]);
        titleTh.style.width = width + 'px';
    }


    selectMatchingReports(isReportMatch) {
        for (let report of this.reports.values()) {
            if (isReportMatch(report)) {
                $(`input[name='id_${report.reportId}']`).prop('checked', true);
            }
        }
    }

    deselectAllReports() {
        for (let report of this.reports.values()) {
            $(`input[name='id_${report.reportId}']`).prop('checked', false);
        }
    }

}





// jquery-ui. Used for resizable
initCss(`
    .ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }

    /* Icons
    ----------------------------------*/

    .ui-icon {
        display: block;
        text-indent: -99999px;
        overflow: hidden;
        background-repeat: no-repeat;
    }

    .ui-icon {
        width: 16px;
        height: 16px;
    }
    .ui-icon,
    .ui-widget-content .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-widget-header .ui-icon {
        background-image: url(${ImageSrc.jq.black});
    }
    .ui-state-default .ui-icon {
        background-image: url(${ImageSrc.jq.grey});
    }
    .ui-state-hover .ui-icon,
    .ui-state-focus .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-active .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-highlight .ui-icon {
        background-image: url(${ImageSrc.jq.blue});
    }
    .ui-state-error .ui-icon,
    .ui-state-error-text .ui-icon {
        background-image: url(${ImageSrc.jq.red});
    }

    /* Overlays */
    .ui-widget-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .ui-resizable {
        position: relative;
    }
    .ui-resizable-handle {
        position: absolute;
        font-size: 0.1px;
        display: block;
    }
    .ui-resizable-disabled .ui-resizable-handle,
    .ui-resizable-autohide .ui-resizable-handle {
        display: none;
    }
    .ui-resizable-n {
        cursor: n-resize;
        height: 7px;
        width: 100%;
        top: -5px;
        left: 0;
    }
    .ui-resizable-s {
        cursor: s-resize;
        height: 7px;
        width: 100%;
        bottom: -5px;
        left: 0;
    }
    .ui-resizable-e {
        cursor: e-resize;
        width: 7px;
        right: -5px;
        top: 0;
        height: 100%;
    }
    .ui-resizable-w {
        cursor: w-resize;
        width: 7px;
        left: -5px;
        top: 0;
        height: 100%;
    }
    .ui-resizable-se {
        cursor: se-resize;
        width: 12px;
        height: 12px;
        right: 1px;
        bottom: 1px;
    }
    .ui-resizable-sw {
        cursor: sw-resize;
        width: 9px;
        height: 9px;
        left: -5px;
        bottom: -5px;
    }
    .ui-resizable-nw {
        cursor: nw-resize;
        width: 9px;
        height: 9px;
        left: -5px;
        top: -5px;
    }
    .ui-resizable-ne {
        cursor: ne-resize;
        width: 9px;
        height: 9px;
        right: -5px;
        top: -5px;
    }
`);


export { ReportListWidget };