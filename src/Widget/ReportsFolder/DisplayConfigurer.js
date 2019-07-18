import { ReportListWidget } from '/twcheese/src/Widget/ReportsFolder/ReportListWidget.js';
import { columnCategories } from '/twcheese/src/Widget/ReportsFolder/columnCategories.js';
import { userConfig } from '/twcheese/src/Util/Config.js';


class DisplayConfigurer {
    /**
     * @param {ReportListWidget} reportListWidget 
     */
    constructor(reportListWidget) {
        this.widget = reportListWidget;
    }

    /**
     * @param {string} key 
     * @return {boolean}
     */
    shouldShowColumn(key) {
        return userConfig.get(`ReportListWidget.showCols.${key}`, true);
    }

    /**
     * @param {string} key 
     */
    toggleColumn(key) {
        this.widget.toggleReportsColumns(key);
    }

    /**
     * @return {{key:string, description:string}}
     */
    getHideableColumns() {
        return columnCategories
            .filter(category => category.hideable)
            .map(category => {
                return {
                    key: category.key,
                    description: category.description
                }
            });
    }

    refreshDisplay() {
        this.widget.refreshContents();
    }

}

export { DisplayConfigurer };