import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { Command } from '/twcheese/src/Models/Command.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss } from '/twcheese/src/Util/UI.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { userConfig } from '/twcheese/src/Util/Config.js';

class HaulStatsWidget extends AbstractWidget {

    /**
     * @param {Command[]} commands 
     * @param {int|null} pageNumber 
     */
    constructor(commands, pageNumber) {
        super();
        this.commands = commands;
        this.pageNumber = pageNumber;

        this.initStructure();
        this.watchSelf();

        this.$to.find('option').last().prop('selected', true);
        this.updateSum();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$from = this.$el.find('#twcheese_pillaging_stats_from');
        this.$to = this.$el.find('#twcheese_pillaging_stats_to');
        this.$sum = this.$el.find('#twcheese_pillaging_results');
        this.$toggleIcon = this.$el.find('#twcheese_pillaging_stats_toggle');
        this.$content = this.$el.find('#twcheese_pillaging_stats_content');
    }

    createHtml() {
        let summationFromOptions = [];
        let summationToOptions = [];
        let hourlyBreakdowns = [];

        let startOfHour = TwCheeseDate.newServerDate().startOfHour();
        let latestCommandArrival;
        if (this.commands.length > 0) {
            latestCommandArrival = this.commands[this.commands.length - 1].arrival;
        }        
    
        while (startOfHour < latestCommandArrival) {
            let endOfHour = startOfHour.endOfHour();
            let hourOfDay = startOfHour.getServerHours();
            let dayHint = this.dayHint(startOfHour);
    
            summationFromOptions.push(`<option value=${startOfHour.getTime()}>${hourOfDay}:00 ${dayHint}</option>`);
            summationToOptions.push(`<option value="${endOfHour.getTime()}">${hourOfDay}:59 ${dayHint}</option>`);
    
            let result = Command.sumPropsFromTimeframe(this.commands, startOfHour, endOfHour);
            hourlyBreakdowns.push(`
                <tr>
                    <td>${hourOfDay}:00 - ${hourOfDay}:59 ${dayHint}</td>
                    <td>${result.haul.wood}</td>
                    <td>${result.haul.stone}</td>
                    <td>${result.haul.iron}</td>
                    <td>${result.sumLoot()}/${result.haulCapacity}</td>
                    <td>${result.calcHaulPercent()}%</td>
                </tr>
            `);
    
            startOfHour = startOfHour.addHours(1);
        }

        let pageInfo = this.pageNumber ? `from Page ${this.pageNumber}` : '';
    
        let collapsed = userConfig.get('HaulStatsWidget.collapseStats', false);
        let toggleIconSrc = collapsed ? ImageSrc.plus : ImageSrc.minus;
        let contentDisplay = collapsed ? 'none' : 'block';
    
        return `
            <div id="twcheese_pillaging_stats" class="vis widget">
                <h4>
                    Pillaging Statistics
                    <img id="twcheese_pillaging_stats_toggle" src="${toggleIconSrc}" style="float:right; cursor: pointer;">
                    <span style="font-size: 10px; font-style: normal; font-weight: normal; margin-right: 25px; float: right;">
                        created by <a target="_blank" href="https://forum.tribalwars.net/index.php?members/28484/">cheesasaurus</a>
                    </span>
                </h4>
                <div id="twcheese_pillaging_stats_content" style="display: ${contentDisplay};">
                    <!-- summation -->
                    <div class="twcheese-pillaging-stats-summation">
                        <div style="text-align: center; width: 100%; margin-top: 5px; margin-bottom: 5px;">
                            From <select id="twcheese_pillaging_stats_from">${summationFromOptions.join('')}</select>
                            to <select id="twcheese_pillaging_stats_to">${summationToOptions.join('')}</select>
                        </div>
                        <div id="twcheese_pillaging_results" style="text-align: center;">
                            Results displayed here...
                        </div>
                        <br/>
                    </div>
                    
                    <!-- hourly breakdown -->
                    <table class="twcheese-pillaging-stats-hourly-breakdown" width="100%">
                        <tbody>
                            <tr><td colspan="6" style="text-align: center; font-size: 16px;">Incoming Resources ${pageInfo}</td></tr>
                            <tr>
                                <th>Arrival</th>
                                <th><img src="${ImageSrc.wood}"></img></th>
                                <th><img src="${ImageSrc.stone}"></img></th>
                                <th><img src="${ImageSrc.iron}"></img></th>
                                <th colspan="2">Performance</th>
                            </tr>
                            ${hourlyBreakdowns.join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    /**
     * @param {TwCheeseDate} date
     * @return {string}
     */
    dayHint(date) {
        if (date.isTodayOnServer()) {
            return '';
        }
        else if (date.isTomorrowOnServer()) {
            return ' (tomorrow)';
        }
        return ' (' + date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) + ')';
    }

    watchSelf() {
        this.$toggleIcon.on('click', (e) => {
            e.preventDefault();
            this.toggleCollapse();
        });
        this.$to.on('change', (e) => this.updateSum());
        this.$from.on('change', (e) => this.updateSum());
    }

    /**
     *	change the results displayed in the summation section
     */
    updateSum() {
        let startTime = TwCheeseDate.newServerDate(parseInt(this.$from.val()));
        let endTime = TwCheeseDate.newServerDate(parseInt(this.$to.val()));
        if (startTime > endTime) {
            tmpTime = startTime;
            startTime = endTime;
            endTime = tmpTime;
        }
        let sum = Command.sumPropsFromTimeframe(this.commands, startTime, endTime);

        this.$sum.html(`
            <img src="${ImageSrc.wood}"> ${sum.haul.wood}
            <img src="${ImageSrc.stone}"> ${sum.haul.stone}
            <img src="${ImageSrc.iron}"> ${sum.haul.iron}
            &nbsp;&nbsp;| ${sum.sumLoot()}/${sum.haulCapacity} (${sum.calcHaulPercent()}%)
        `);
    }

    toggleCollapse() {
        let $toggleIcon = this.$toggleIcon;

        this.$content.toggle({
            duration: 200,
            start: function() {
                let willCollapse = $toggleIcon.attr('src').includes(ImageSrc.minus);
                $toggleIcon.attr('src', willCollapse ? ImageSrc.plus : ImageSrc.minus);
                userConfig.set('HaulStatsWidget.collapseStats', willCollapse);
            }
        });
    }

}


initCss(`
    .twcheese-pillaging-stats-summation {
        background-color: #f4e4bc
    }

    .twcheese-pillaging-stats-hourly-breakdown tr:nth-child(even) td {
        background: #FFE0A2;
    }
`);


export { HaulStatsWidget };