import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { userConfig } from '/twcheese/src/Util/Config.js';
import { TroopCounts, calcTravelDurations, TroopCalculator } from '/twcheese/src/Models/Troops.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { gameUrl, attackPrepUrl } from '/twcheese/src/Util/Network.js';


class ReportRaiderWidget extends AbstractWidget {
    constructor(report) {
        super();
        this.report = report;

        this.raiderTroopTypes = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy']
            .filter(troopType => TroopCalculator.existsOnWorld(troopType));

        this.initStructure();
        this.watchSelf();
        this.applyUserConfig();
    }

    initStructure() {
        let report = this.report;

        var raiderTable = document.createElement('table');
        raiderTable.id = 'twcheese_raider_calculator';
        raiderTable.insertRow(-1);
        raiderTable.rows[0].insertCell(-1);
        raiderTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Raiders</h2></span>';
        raiderTable.insertRow(-1);
        raiderTable.rows[1].align = 'center';
        raiderTable.rows[1].insertCell(-1);

        raiderTable.rows[1].cells[0].innerHTML = '';

        /*==== raid-category selection ====*/

        let raidModeOptions = [];
        if (report.espionageLevel >= 1) { // resources were scouted
            raidModeOptions.push(`<option value="scouted">raid scouted resources</option>`);
        }
        if (report.espionageLevel >= 2) { // buildings were scouted
            raidModeOptions.push(`<option value="predicted">raid predicted resources</option>`);
            raidModeOptions.push(`<option value="periodic">periodically raid resources</option>`);
        }
        let raidModeSelect = document.createElement('select');
        raidModeSelect.id = 'twcheese_raider_selection';
        raidModeSelect.innerHTML = raidModeOptions.join('');
        raiderTable.rows[1].cells[0].appendChild(raidModeSelect);

        /*==== rally point link ====*/
        let rallyPointLink = document.createElement('a');
        rallyPointLink.href = gameUrl('place', {target: report.defenderVillage.id});
        rallyPointLink.innerHTML = '&raquo; Send troops';
        raiderTable.rows[1].cells[0].appendChild(rallyPointLink);

        /*==== haul Bonus ====*/
        let $haulBonus = $(`<div>Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size=5 value=0></input>%</div>`.trim());
        raiderTable.rows[1].cells[0].appendChild($haulBonus[0]);

        /*==== Periodic Raider section ====*/
        var periodicDiv = document.createElement('div');
        periodicDiv.id = 'twcheese_periodic_options';
        periodicDiv.innerHTML = 'Period (hours):';
        var periodInput = document.createElement('input');
        periodInput.id = 'twcheese_period';
        periodInput.type = 'text';
        periodInput.size = 4;
        periodInput.maxLength = 4;
        periodInput.value = 8;
        periodicDiv.appendChild(periodInput);

        raiderTable.rows[1].cells[0].appendChild(periodicDiv);

        /*==== button to use settings as default ====*/
        var setDefaultButton = document.createElement('button');
        setDefaultButton.innerHTML = 'Use current selection as default';
        raiderTable.rows[1].cells[0].appendChild(setDefaultButton);

        /*==== units section ====*/
        var raiderUnitsTable = document.createElement('table');
        raiderUnitsTable.id = 'twcheese_raider_units';

        raiderUnitsTable.className = 'vis overview_table';
        raiderUnitsTable.style.borderStyle = 'solid';
        raiderUnitsTable.style.borderWidth = '1px';

        raiderUnitsTable.insertRow(-1);
        raiderUnitsTable.rows[0].className = 'center';

        //==== icons ====
        for (let troopType of this.raiderTroopTypes) {
            let cell = raiderUnitsTable.rows[0].insertCell(-1);
            cell.width = "35px";
            cell.innerHTML = `<img src="${ImageSrc.troopIcon(troopType)}" />`;
        }

        //==== looting suggestions ====
        raiderUnitsTable.insertRow(-1);
        raiderUnitsTable.rows[1].className = 'center';
        for (let i = 0; i < 7; i++) {
            raiderUnitsTable.rows[1].insertCell(-1);
        }

        //==== travel times ====
        raiderUnitsTable.insertRow(-1);
        raiderUnitsTable.rows[2].className = 'center';

        var travelTimes = calcTravelDurations(report.attackerVillage.distanceTo(report.defenderVillage));

        for (let troopType of this.raiderTroopTypes) {
            let cell = raiderUnitsTable.rows[2].insertCell(-1);
            cell.innerHTML = window.Format.timeSpan(travelTimes[troopType]);
        }

        raiderTable.insertRow(-1);
        raiderTable.rows[2].insertCell(-1);
        raiderTable.rows[2].align = 'center';
        raiderTable.rows[2].cells[0].appendChild(raiderUnitsTable);

        /*==== scout option ====*/
        if (game_data.market != 'uk') //uk rules forbid filling units into rally point
        {
            var raiderScoutTable = document.createElement('table');
            raiderScoutTable.id = 'twcheese_raider_scout';

            raiderScoutTable.className = 'vis overview_table';
            raiderScoutTable.style.borderStyle = 'solid';
            raiderScoutTable.style.borderWidth = '1px';

            raiderScoutTable.insertRow(-1);
            raiderScoutTable.rows[0].className = 'center';
            raiderScoutTable.rows[0].insertCell(-1);
            raiderScoutTable.rows[0].cells[0].width = "35px";
            raiderScoutTable.rows[0].cells[0].innerHTML = '<img src="' + ImageSrc.troopIcon('spy') + '" title="Number of scouts to send when a unit icon to the left is clicked" />';
            raiderScoutTable.insertRow(-1);
            raiderScoutTable.rows[1].className = 'center';
            raiderScoutTable.rows[1].insertCell(-1);

            var raiderScoutInput = document.createElement('input');
            raiderScoutInput.id = 'twcheese_raider_scouts';

            if (navigator.appName == 'Microsoft Internet Explorer')
                raiderScoutInput.type = 'text';
            else
                raiderScoutInput.type = 'number';
            raiderScoutInput.size = 3;
            raiderScoutInput.value = 0;
            raiderScoutInput.min = 0;
            raiderScoutTable.rows[1].cells[0].appendChild(raiderScoutInput);

            raiderTable.rows[2].insertCell(-1);
            raiderTable.rows[2].cells[1].appendChild(raiderScoutTable);
        }

        this.$el = $(raiderTable);
        this.$raidMode = this.$el.find('#twcheese_raider_selection');
        this.$haulBonus = this.$el.find('#twcheese_raider_haulBonus');
        this.$period = this.$el.find('#twcheese_period');
        this.$periodContainer = this.$el.find('#twcheese_periodic_options');
        this.$scouts = this.$el.find('#twcheese_raider_scouts');
        this.$buttonSetDefault = $(setDefaultButton); // todo
        this.raiderUnitsTable = this.$el.find('#twcheese_raider_units')[0]; // todo
    }

    watchSelf() {
        this.$raidMode.on('change', () => {
            this.changeRaidMode(this.$raidMode.val());
        });

        this.$haulBonus.on('input', () => {
            this.changeRaidMode(this.$raidMode.val()); // relying on side effect: recalcs + updates raiders displayed
        });

        this.$period.on('input', () => {
            let haulBonus = parseFloat(this.$haulBonus.val());
            let period = parseFloat(this.$period.val());
            let raiders = this.report.calcRaidPeriodic(period, haulBonus);
            this.setRaiders(raiders);
        });

        this.$scouts.on('input', () => {
            let scouts = parseInt(this.$scouts.val());
            userConfig.set('ReportToolsWidget.raidScouts', scouts);
            this.changeRaidMode(this.$raidMode.val());  // relying on side effect: recalcs + updates raiders displayed
        });

        this.$buttonSetDefault.on('click', () => {
            let raidMode = this.$raidMode.val();
            userConfig.set('ReportToolsWidget.raidMode', raidMode); // todo: change config name from ReportToolsWidget to ReportRaiderWidget

            let haulBonus = parseFloat(this.$haulBonus.val());
            userConfig.set('ReportToolsWidget.haulBonus', parseFloat(haulBonus));

            let period = parseFloat(this.$period.val());
            userConfig.set('ReportToolsWidget.raidPeriodHours', parseFloat(period));

            window.UI.SuccessMessage('Settings Saved', 2000);
        });
    }

    applyUserConfig() {
        let haulBonus = userConfig.get('ReportToolsWidget.haulBonus', 0);
        this.$haulBonus.val(haulBonus);

        let period = userConfig.get('ReportToolsWidget.raidPeriodHours', 8);
        this.$period.val(period);        

        let scouts = userConfig.get('ReportToolsWidget.raidScouts', 0);
        this.$scouts.val(scouts);
        
        let raidMode = userConfig.get('ReportToolsWidget.raidMode', 'scouted');
        this.changeRaidMode(raidMode);
    }


    /**
     * @param {string} mode - (scouted|predicted|periodic)
     */
    changeRaidMode(mode) {
        let haulBonus = parseFloat(this.$haulBonus.val());
        let period = parseFloat(this.$period.val());
        let report = this.report;
        this.$raidMode.val(mode);

        if (mode == 'scouted') {            
            let raiders = report.calcRaidScouted(haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.hide();
        }
        else if (mode == 'predicted') {
            let raiders = report.calcRaidPredicted(window.game_data.village, TwCheeseDate.newServerDate(), haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.hide();
        }
        else if (mode == 'periodic') {
            let raiders = report.calcRaidPeriodic(period, haulBonus);
            this.setRaiders(raiders);
            this.$periodContainer.show();
        }
    }


    /**
     * @param {TroopCounts} troopCounts
     */
    setRaiders(troopCounts) {
        let spyCount = parseInt(this.$scouts.val());
        let attackUrl = (troopType, count) => {
            return attackPrepUrl({spy: spyCount, [troopType]: count}, this.report.defenderVillage.id);
        }

        let raiderTable = this.raiderUnitsTable;

        for (let [i, troopType] of Object.entries(this.raiderTroopTypes)) {
            raiderTable.rows[1].cells[i].innerHTML = troopCounts[troopType];
            if (window.game_data.market === 'uk') {
                continue;
            }
            let url = attackUrl(troopType, Math.round(troopCounts[troopType]));
            raiderTable.rows[0].cells[i].innerHTML = '<a href="' + url + '"><img src="' + ImageSrc.troopIcon(troopType) + '"/></a>';
        }
    }

}

export { ReportRaiderWidget };