import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { userConfig } from '/twcheese/src/Util/Config.js';
import { TroopCounts, calcTravelDurations, troopUtil } from '/twcheese/src/Models/Troops.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { gameUrl, attackPrepUrl } from '/twcheese/src/Util/Network.js';


class ReportRaiderWidget extends AbstractWidget {
    constructor(report) {
        super();
        this.report = report;

        this.raiderTroopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy']
            .filter(troopType => troopUtil.existsOnWorld(troopType));

        this.initStructure();
        this.watchSelf();
        this.applyUserConfig();

        if (!this.mayFillRallyPoint()) {
            this.$scoutsContainer.hide();
        }
    }

    mayFillRallyPoint() {
        // uk rules forbid filling units into rally point
        return window.game_data.market !== 'uk';
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$raidMode = this.$el.find('#twcheese_raider_selection');
        this.$haulBonus = this.$el.find('#twcheese_raider_haulBonus');
        this.$period = this.$el.find('#twcheese_period');
        this.$periodContainer = this.$el.find('#twcheese_periodic_options');
        this.$scouts = this.$el.find('#twcheese_raider_scouts');
        this.$scoutsContainer = this.$el.find('#twcheese_raider_scout');
        this.$buttonSetDefault = this.$el.find('.twcheese-button-set-default');

        let raiderUnitsTable = this.$el.find('#twcheese_raider_units')[0];
        this.$raiderLinks = $(raiderUnitsTable.rows[0]).find('a');
        this.$raiderTroopCounts = $(raiderUnitsTable.rows[1].cells);
    }

    createHtml() {
        let report = this.report;
        let travelTimes = calcTravelDurations(report.attackerVillage.distanceTo(report.defenderVillage));
        let rallyPointUrl = gameUrl('place', {target: report.defenderVillage.id});

        let raidModeOptions = [];
        if (report.espionageLevel >= 1) { // resources were scouted
            raidModeOptions.push(`<option value="scouted">raid scouted resources</option>`);
        }
        if (report.espionageLevel >= 2) { // buildings were scouted
            raidModeOptions.push(`<option value="predicted">raid predicted resources</option>`);
            raidModeOptions.push(`<option value="periodic">periodically raid resources</option>`);
        }        

        let iconCells = [];
        let troopCountCells = [];
        let travelTimeCells = [];
        for (let troopType of this.raiderTroopTypes) {
            if (this.mayFillRallyPoint()) {
                iconCells.push(`<td width="35px"><a><img src="${ImageSrc.troopIcon(troopType)}"></a></td>`);
            } else {
                iconCells.push(`<td width="35px"><img src="${ImageSrc.troopIcon(troopType)}"></td>`);
            }
            troopCountCells.push('<td></td>');
            travelTimeCells.push(`<td>${window.Format.timeSpan(travelTimes[troopType])}</td>`);
        }

        return `
            <table id="twcheese_raider_calculator">
                <tr>
                    <td><span align="center"><h2>Raiders</h2></span></td>
                </tr>
                <tr align="center">
                    <td>
                        <select id="twcheese_raider_selection">
                            ${raidModeOptions.join('')}
                        </select>
                        <a href="${rallyPointUrl}">&raquo; Send troops</a>
                        <div>
                            Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size="5" value="0"/>%
                        </div>
                        <div id="twcheese_periodic_options">
                            Period (hours): <input id="twcheese_period" type="text" size="4" value="8"/>
                        </div>
                        <button class="twcheese-button-set-default">Use current selection as default</button>
                    </td>
                </tr>
                <tr align="center">
                    <td>
                        <table id="twcheese_raider_units" class="vis overview_table" style="border: 1px solid">
                            <tr class="center">${iconCells.join('')}</tr>
                            <tr class="center">${troopCountCells.join('')}</tr>
                            <tr class="center">${travelTimeCells.join('')}</tr>
                        </table>
                    </td>
                    <td>
                        <table id="twcheese_raider_scout" class="vis overview_table" style="border: 1px solid">
                            <tr class="center">
                                <td width="35px">
                                    <img src="${ImageSrc.troopIcon('spy')}" title="Number of scouts to send when a unit icon to the left is clicked">
                                </td>
                            </tr>
                            <tr class="center">
                                <td>
                                    <input id="twcheese_raider_scouts" type="number" size="3" value="0" min="0">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    watchSelf() {
        this.$raidMode.on('change', () => {
            this.updateRaiders();
        });

        this.$haulBonus.on('input', () => {
            this.updateRaiders();
        });

        this.$period.on('input', () => {
            this.updateRaiders();
        });

        this.$scouts.on('input', () => {
            userConfig.set('ReportRaiderWidget.raidScouts', this.getScouts());
            this.updateRaiders();
        });

        this.$buttonSetDefault.on('click', () => {
            userConfig.set('ReportRaiderWidget.raidMode', this.getRaidMode());
            userConfig.set('ReportRaiderWidget.haulBonus', this.getHaulBonus());
            userConfig.set('ReportRaiderWidget.raidPeriodHours', this.getPeriod());
            window.UI.SuccessMessage('Settings Saved', 2000);
        });
    }

    applyUserConfig() {
        let haulBonus = userConfig.get('ReportRaiderWidget.haulBonus', 0);
        this.$haulBonus.val(haulBonus);

        let period = userConfig.get('ReportRaiderWidget.raidPeriodHours', 8);
        this.$period.val(period);        

        let scouts = userConfig.get('ReportRaiderWidget.raidScouts', 0);
        this.$scouts.val(scouts);
        
        let raidMode = userConfig.get('ReportRaiderWidget.raidMode', 'scouted');
        this.$raidMode.val(raidMode);

        this.updateRaiders();
    }

    updateRaiders() {
        let mode = this.getRaidMode();
        let haulBonus = this.getHaulBonus();
        let period = this.getPeriod();
        let report = this.report;

        if (mode === 'scouted') {            
            let raiders = report.calcRaidScouted(haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.hide();
        }
        else if (mode === 'predicted') {
            let raiders = report.calcRaidPredicted(window.game_data.village, TwCheeseDate.newServerDate(), haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.hide();
        }
        else if (mode === 'periodic') {
            let raiders = report.calcRaidPeriodic(period, haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.show();
        }
    }

    /**
     * @param {TroopCounts} troopCounts
     */
    setRaiders(troopCounts) {
        let spyCount = this.getScouts();
        let attackUrl = (troopType, count) => {
            return attackPrepUrl({spy: spyCount, [troopType]: count}, this.report.defenderVillage.id);
        }

        for (let [i, troopType] of Object.entries(this.raiderTroopTypes)) {
            let troopCount = troopCounts[troopType];
            this.$raiderTroopCounts.eq(i).text(troopCount);
            if (!this.mayFillRallyPoint()) {
                continue;
            }
            let url = attackUrl(troopType, Math.round(troopCount));
            this.$raiderLinks.eq(i).attr('href', url);
        }
    }

    getRaidMode() {
        return this.$raidMode.val();
    }

    getHaulBonus() {
        return parseFloat(this.$haulBonus.val()) || 0;
    }

    getPeriod() {
        return parseFloat(this.$period.val()) || 0;
    }

    getScouts() {
        return parseFloat(this.$scouts.val()) || 0;
    }

}

export { ReportRaiderWidget };