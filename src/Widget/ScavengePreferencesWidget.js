import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ScavengeTroopsAssignerPreferences } from '/twcheese/src/Models/ScavengeTroopsAssignerPreferences.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';


class ScavengePreferencesWidget extends AbstractWidget {

    /**
     * @param {ScavengeTroopsAssignerPreferences} preferences
     * @param {Map<ScavengeOption>} scavengeOptions
     * @param {string[]} sendableTroopTypes
     */
    constructor(preferences, scavengeOptions, sendableTroopTypes) {
        super();
        this.preferences = preferences;
        this.scavengeOptions = scavengeOptions;
        this.sendableTroopTypes = sendableTroopTypes;
        this.initStructure();
        this.watchSelf();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$targetDuration = this.$el.find('.target-duration');
        this.$options = this.$el.find('.options-section input');
        this.$modes = this.$el.find(`input[name='mode']`);
        this.$troopsAllowed = this.$el.find('.troop-allowed');
        this.$troopsReserved = this.$el.find('.troop-reserved');
        // todo
    }

    createHtml() {
        return `<div class="twcheese-scavenge-preferences-widget">
            <h3>Preferences</h3>
            ${this.createTimingSectionHtml()}
            <br/>
            ${this.createOptionsSectionHtml()}
            <br/>
            <table style="width: 100%;">
                <tr>
                    <td>${this.createTroopsSectionHtml()}</td>
                    <td>${this.createTroopsOrderSectionHtml()}</td>
                </tr>
            </table>

        </div>`;
        // todo
    }

    createTimingSectionHtml() {
        let overallSeconds = this.preferences.targetDurationSeconds;
        let hours = Math.floor(overallSeconds / 3600);
        let minutes = String(Math.floor(overallSeconds / 60) % 60).padStart(2, '0');
        let durationPattern = "\\d+:\\d{2}";

        let mode = this.preferences.mode;
        let modeSane = ScavengeTroopsAssignerPreferences.MODE_SANE_PERSON;
        let modeAddict = ScavengeTroopsAssignerPreferences.MODE_ADDICT;        
        let checkSane = (mode === modeSane) ? 'checked' : '';
        let checkAddict = (mode === modeAddict) ? 'checked' : '';

        return `
            <table class="vis timing-section">
                <tr><th>Timing</th></tr>
                <tr>
                    <td>
                        Target duration:
                        <input type="text" class="target-duration" value="${hours}:${minutes}" placeholder="2:00" required pattern="${durationPattern}">
                        hours:minutes
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="mode" value="${modeSane}" ${checkSane}>
                        Max-out duration of best options first.
                        <br/><span class="hint">(recommended if you'll be afk)</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="mode" value="${modeAddict}" ${checkAddict}>
                        Aim for same duration across all options.
                        <br/><span class="hint">(recommended if you can immediately resend whenever)</span>
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

    createTroopsSectionHtml() {
        // todo
        return `
            <table class="vis troops-section">
                <tr>
                    <th>Use</th>
                    <th>Reserved</th>
                </tr>
                ${this.sendableTroopTypes.map(type => this.createTroopRowHtml(type)).join('')}
            </table>
        `;
    }

    createTroopRowHtml(troopType) {
        let checked = this.preferences.isTroopTypeAllowed(troopType) ? 'checked' : '';
        let reservedCount = this.preferences.getReservedCount(troopType);
        
        return `<tr>
            <td>
                <input class="troop-allowed" type="checkbox" value="${troopType}" ${checked}>
                <img src="${ImageSrc.troopIcon(troopType)}">
            </td>
            <td><input class="troop-reserved" data-troop-type="${troopType}" type="number" min="0" value="${reservedCount}"></td>
        </tr>`;
    }

    createTroopsOrderSectionHtml() {
        // todo
        return `
            <table class="vis troop-order-section">
                <tr><th>Order</th></tr>
            </table>
        `;
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

        this.$modes.on('change', () => {
            let mode = this.$modes.filter(':checked').val();
            prefs.setMode(mode);
        });

        this.$troopsAllowed.on('change', function() {
            let $this = $(this);
            prefs.setTroopAllowed($this.val(), $this.prop('checked'));
        });

        this.$troopsReserved.on('input', function() {
            if (!this.checkValidity()) {
                return;
            }
            prefs.setReservedCount(this.dataset.troopType, this.value);
        });

        // todo
    }

}


initCss(`

    .twcheese-scavenge-preferences-widget .options-section,
    .twcheese-scavenge-preferences-widget .timing-section,
    .twcheese-scavenge-preferences-widget .troops-section,
    .twcheese-scavenge-preferences-widget .troop-order-section {
        width: 100%;
        /*background-color: #edd8ad;*/
    }

    .twcheese-scavenge-preferences-widget .target-duration {
        width: 50px;
    }

    .twcheese-scavenge-preferences-widget .timing-section .hint {
        font-size: x-small;
        margin-left: 25px;
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

    .twcheese-scavenge-preferences-widget .troops-section td {
        height: 26px;
    }

    .twcheese-scavenge-preferences-widget .troops-section td:first-child {
        width: 45px;
    }   

    .twcheese-scavenge-preferences-widget .troops-section img,
    .twcheese-scavenge-preferences-widget .troops-section input {
        vertical-align: middle;
    }
    
`);

export { ScavengePreferencesWidget };