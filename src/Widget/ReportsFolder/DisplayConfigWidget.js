import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';


class DisplayConfigWidget extends AbstractWidget {

    /**
     * @param {DisplayConfigurer} displayConfigurer
     */
    constructor(displayConfigurer) {
        super();

        var reportsFolderSettingsDiv = document.createElement('div');
        reportsFolderSettingsDiv.id = 'twcheese_reportsFolderSettings';
        reportsFolderSettingsDiv.style.display = 'none';
        reportsFolderSettingsDiv.style.columnWidth = '200px';
        this.$el = $(reportsFolderSettingsDiv);
        
        function insertCheckbox(key, text) {
            let $el = $(`<div style="white-space:nowrap"><label><input type="checkbox"> ${text}</label></div>`);
            $el.find('input')
                .prop('checked', displayConfigurer.shouldShowColumn(key))
                .on('click', () => {
                    displayConfigurer.toggleColumn(key);
                });

            reportsFolderSettingsDiv.appendChild($el[0]);
        }

        for (let col of displayConfigurer.getHideableColumns()) {
            insertCheckbox(col.key, col.description);
        }
    }
}

export { DisplayConfigWidget };