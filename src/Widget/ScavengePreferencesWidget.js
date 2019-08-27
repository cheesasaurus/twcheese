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
        this.$targetDuration = this.$el.find('.target-duration');
        this.$options = this.$el.find('.options-section input');
        // todo
    }

    createHtml() {
        return `<div class="twcheese-scavenge-preferences-widget">
            <h3>Preferences</h3>
            ${this.createTimingSectionHtml()}
            <br/>
            ${this.createOptionsSectionHtml()}

        </div>`;
        // todo
    }

    createTimingSectionHtml() {
        let overallSeconds = this.preferences.targetDurationSeconds;
        let hours = Math.floor(overallSeconds / 3600);
        let minutes = String(Math.floor(overallSeconds / 60) % 60).padStart(2, '0');
        let pattern = "\\d+:\\d{2}";

        return `
            <table class="vis timing-section">
                <tr><th>Timing</th></tr>
                <tr>
                    <td>
                        Target duration:
                        <input type="text" class="target-duration" value="${hours}:${minutes}" placeholder="2:00" required pattern="${pattern}">
                        hours:minutes
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="mode" value="${ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON}">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="mode" value="${ScavengeTroopsAssignerPreferences.MODE_ADDICT}">
                    </td>
                </tr>
            </table>
        `;
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

        this.$targetDuration.on('change', function() {
            if (!this.checkValidity()) {
                return;
            }
            let [, hours, minutes] = this.value.match(/(\d+):(\d+)/);

            let durationSeconds = parseInt(hours)*3600 + parseInt(minutes)*60;
            if (durationSeconds < 3600) {
                this.setCustomValidity('must be at least 1 hour');
                return;
            } else {
                this.setCustomValidity('');
            }

            prefs.setTargetDuration(durationSeconds);
        });

        this.$options.on('change', function() {
            let $option = $(this);
            prefs.setOptionAllowed($option.data('optionId'), $option.prop('checked'));
        });

        // todo
    }

}


initCss(`
    .twcheese-scavenge-preferences-widget .options-section,
    .twcheese-scavenge-preferences-widget .timing-section {
        width: 100%;
    }

    .twcheese-scavenge-preferences-widget .target-duration {
        width: 50px;
    }

    .twcheese-scavenge-preferences-widget .options-section td {
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