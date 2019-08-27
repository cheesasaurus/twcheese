import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ScavengeTroopsAssignerPreferences } from '/twcheese/src/Models/ScavengeTroopsAssignerPreferences.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';


class ScavengePreferencesWidget extends AbstractWidget {

    /**
     * @param {ScavengeTroopsAssignerPreferences} preferences
     * @param {Map<ScavengeOption>} scavengeOptions
     */
    constructor(preferences, scavengeOptions) {
        super();
        this.preferences = preferences;
        this.scavengeOptions = scavengeOptions;
        this.initStructure();
        this.watchSelf();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$options = this.$el.find('.options-section input');
        // todo
    }

    createHtml() {
        return `<div class="twcheese-scavenge-preferences-widget">
            <h3>Preferences</h3>

            ${this.createOptionsSectionHtml()}

        </div>`;
        // todo
    }

    createOptionsSectionHtml() {
        let optionsArr = [...this.scavengeOptions.values()];

        return `
            <table class="vis options-section">
                <tr><th colspan="2">Options to use</th></tr>
                ${optionsArr.map(option => this.createOptionRowHtml(option)).join('')}
            </table>
        `;
    }

    createOptionRowHtml(option) {
        let checked = '';
        if (this.preferences.isOptionAllowed(option.id)) {
            checked = 'checked';
        }

        return `<tr>
            <td>
                <label>
                    <input type="checkbox" ${checked} data-option-id="${option.id}">
                    <img src="${ImageSrc.scavengeOption(option.id)}">
                    <span>${option.getName()}</span>
                </label>
            </td>
            <td>(${option.getLootPercent()}% carry capacity)</td>
        </tr>`;
    }

    watchSelf() {
        let prefs = this.preferences;

        this.$options.on('change', function() {
            let $option = $(this);
            prefs.setOptionAllowed($option.data('optionId'), $option.prop('checked'));
        });

        // todo
    }

}


initCss(`
    .twcheese-scavenge-preferences-widget td {
        height: 22px;
    }

    .twcheese-scavenge-preferences-widget .options-section input,
    .twcheese-scavenge-preferences-widget .options-section span {
        vertical-align: middle;
    }

    .twcheese-scavenge-preferences-widget .options-section img {
        vertical-align: middle;
        width: 18px;
        height: 18px;
    }
    
`);

export { ScavengePreferencesWidget };