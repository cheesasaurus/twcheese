import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { userConfig } from '/twcheese/src/Util/Config.js';
import { ReportRaiderWidget } from '/twcheese/src/Widget/ReportRaiderWidget.js';
import { ReportRenamerWidget } from '/twcheese/src/Widget/ReportRenamerWidget.js';
import { buildingUtil } from '/twcheese/src/Models/Buildings.js';
import { attackPrepUrl } from '/twcheese/src/Util/Network.js';


class ReportToolsWidget extends AbstractWidget {

    /**
     * @param {BattleReport} report 
     * @param {ReportRenamer} renamer 
     */
    constructor(report, renamer) {
        super();
        this.report = report;
        this.renamer = renamer;
        this.initStructure();
        this.watchSelf();
        this.applyUserConfig();
        this.initChildWidgets();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$content = this.$el.find('.widget_content');
        this.$toggleIcon = this.$el.find('.twcheese-toggle-icon');
        this.$raiderContainer = this.$el.find('.twcheese-raider-container');
        this.$renamerContainer = this.$el.find('.twcheese-renamer-container');
    }

    createHtml() {
        return `
            <div id="twcheese_show_report_tools" class="vis widget">
                <h4>
                    Report Tools
                    <img class="twcheese-toggle-icon" src="${ImageSrc.plus}" style="float:right; cursor:pointer;">
                </h4>
                <div class="widget_content" style="display: none">
                    <table id="twcheese_BRE_tools" border="1">
                        <tr>
                            <td class="twcheese-raider-container" valign="top"></td>
                            <td valign="top">
                                ${this.createDemolitionTableHtml()}
                            </td>
                        </tr>
                        <tr>
                            <td class="twcheese-renamer-container" colspan="2" valign="top"></td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }

    createDemolitionTableHtml() {
        let report = this.report;
        if (!report.buildingLevels) {
            return '';
        }

        if (report.buildingLevels) {
            let catHeaders = [];
            let ramHeaders = [];
            let catRowOne = [];
            let catRowTwo = [];
            let ramRowOne = [];
            let ramRowTwo = [];

            let suggestedCounts = report.suggestSiegeUnits();

            for (let buildingType of buildingUtil.buildingTypesOnWorld()) {
                let siegeWeapon = (buildingType === 'wall') ? 'ram' : 'catapult';

                let headerInnerHtml;
                if (game_data.market == 'uk') {
                    headerInnerHtml = '<img src="' + ImageSrc.buildingIcon(buildingType) + '" />';
                } else {
                    let troopCounts = {[siegeWeapon]: suggestedCounts.oneShotUpgraded[buildingType]};
                    let rallyPointUrl = attackPrepUrl(troopCounts, report.defenderVillage.id);
                    headerInnerHtml = '<a href="' + rallyPointUrl + '"><img src="' + ImageSrc.buildingIcon(buildingType) + '" /></a>';
                }
                let headers = (siegeWeapon === 'ram') ? ramHeaders : catHeaders;
                headers.push(`<td style="width: 35px;">${headerInnerHtml}</td>`);

                let rowOne = (siegeWeapon === 'ram') ? ramRowOne : catRowOne;
                let rowTwo = (siegeWeapon === 'ram') ? ramRowTwo : catRowTwo;
                rowOne.push(`<td>${suggestedCounts.oneShotScouted[buildingType]}</td>`);
                rowTwo.push(`<td>${suggestedCounts.oneShotUpgraded[buildingType]}</td>`);
            }

            let demolitionHtml = `
                <table id="twcheese_demolition_calculator">
                    <tr>
                        <td><span align="center"><h2>Demolition</h2></span></td>
                    </tr>
                    <tr>
                        <td>
                            <table id="twcheese_demolition_units" class="vis overview_table" style="border: 1px solid;">
                                <tr class="center">
                                    <td colspan="${catHeaders.length}">
                                        <img src="${ImageSrc.troopIcon('catapult')}" alt="catapults" />
                                    </td>
                                    <td colspan="${ramHeaders.length}">
                                        <img src="${ImageSrc.troopIcon('ram')}" alt="rams" />
                                    </td>
                                </tr>
                                <tr class="center">${catHeaders.join('') + ramHeaders.join('')}</tr>
                                <tr class="center">${catRowOne.join('') + ramRowOne.join('')}</tr>
                                <tr class="center">${catRowTwo.join('') + ramRowTwo.join('')}<tr/>
                            </table>
                        </td>
                    </tr>
                </table>
            `;

            return demolitionHtml.trim();
        }
    }

    watchSelf() {
        this.$toggleIcon.on('click', () => {
            this.toggleCollapsed();
        });
    }

    applyUserConfig() {
        if (!userConfig.get('ReportToolsWidget.collapse', false)) {
            this.toggleCollapsed();
        }
    }

    toggleCollapsed() {
        this.$content.toggle({
            duration: 200,
            start: () => {
                let willCollapse = this.$toggleIcon.attr('src').includes(ImageSrc.minus);
                this.$toggleIcon.attr('src', willCollapse ? ImageSrc.plus : ImageSrc.minus);
                userConfig.set('ReportToolsWidget.collapse', willCollapse);
            }
        });
    }

    initChildWidgets() {
        (new ReportRenamerWidget(this.renamer, this.report))
            .appendTo(this.$renamerContainer);

        (new ReportRaiderWidget(this.report))
            .appendTo(this.$raiderContainer);
    }

}


export { ReportToolsWidget };