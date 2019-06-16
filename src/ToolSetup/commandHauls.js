/*	twcheese_commandHauls.js
 *	Commands Overview - show returning hauls
 *	market: uk, us, en, {all}
 *	author Nick Toby (cheesasaurus@gmail.com)

 *	use script on: game.php?screen=overview_villages&mode=commands&type=return (the commands overview, with the return filter on)
 *	effect: includes 'haul' as part of the information for the listed commands. Also shows statistics about the incoming resources
 
 *	Copyright (C) 2011  Nick Toby

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/
 */

import { requestDocumentBody } from '/twcheese/src/Util/Network.js';
import { userConfig } from '/twcheese/src/Util/UserConfig.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { Command } from '/twcheese/src/Models/Command.js';
import { ProgressMonitor } from '/twcheese/src/Models/ProgressMonitor.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';
import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { ImageSrc, initCss, fadeGameContent, unfadeGameContent } from '/twcheese/src/Util/UI.js';


function popupShowHaulsPrompt() {
    let popupHtml = `
        <div id="twcheese_showHaulsPrompt" class="twcheese-popup" style="width: 500px;">
            <div style="height: 100%; width: 100%; background: url('${ImageSrc.popupBackground}')">
                <div style="background: no-repeat url('${ImageSrc.servant}');">
                    <div id="twcheese_servant_text">
                        <p style="font-size: 16px;">My liege,</p>
                        <p>Dost thou wish hauls to be included on thine screen?</p>
                    </div>
                    <div class="quest-goal">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td id="twcheese_servant_info_prompt" class="twcheese-servant-info">
                                        <h5>Load haul information?</h5>
                                        <p>This could take a while if you have a lot of commands.</p>
                                        <div class="confirmation-buttons">
                                            <button id="twcheese_hauls_prompt_confirm" class="btn btn-confirm-yes">Yes</button>
                                            <button id="twcheese_hauls_prompt_cancel" class="btn btn-default">Cancel</button>
                                        </div>
                                    </td>
                                    <td id="twcheese_servant_info_loading" class="twcheese-servant-info" style="display: none;">
                                        <h5>Loading hauls</h5>
                                        <div style="margin-top: 10px;">
                                            <span id="twcheese_hauls_loading_bar">
                                                <div class="filler"></div>
                                            </span>
                                            <span id="twcheese_hauls_loading_text">999/1000</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    initCss(`
        #twcheese_servant_text {
            box-sizing: border-box;
            height: 100px;
            margin-left: 120px;
            padding-top: 10px;
        }
        #twcheese_hauls_loading_bar {
            display: inline-block;
            border: 2px solid black;
            background-color: darkgrey;
            width: 200px;
            height: 16px;
            vertical-align: middle;
            margin-left: 60px;
        }
        #twcheese_hauls_loading_bar .filler {
            display: block;
            width: 0;
            height: 100%;
            background-color: darkorange;
            -webkit-transition-duration: 300ms;
            -mos-transition-duration: 300ms;
            -o-transition-duration: 300ms;
            transition-duration: 300ms;
        }
        #twcheese_hauls_loading_text {
            display: inline-block;
            line-height: 16px;
            vertical-align: middle;
            font-size: 10px;
            margin: 5px;
            width: 60px;
            text-align: left;
        }
        .twcheese-servant-info {
            text-align: center;
            height: 80px;
        }
    `);

    $('body').append(popupHtml);
    fadeGameContent();

    // init progress bar
    let $progressBarFiller = $('#twcheese_hauls_loading_bar').find('.filler');
    let $progressText = $('#twcheese_hauls_loading_text');
    let updateProgress = function(progress, goal) {
        let percent = 100 * progress / goal;
        $progressBarFiller.css({width: `${percent}%`});
        $progressText.html(`${progress}/${goal}`);
    }

    $('#twcheese_hauls_prompt_confirm').on('click', async function(e) {
        e.preventDefault();
        document.getElementById('twcheese_servant_text').innerHTML = '<br/>May the cheese be with you.';
        $('#twcheese_servant_info_prompt').hide();
        $('#twcheese_servant_info_loading').show();

        let progressMonitor = new ProgressMonitor();
        progressMonitor.onChange((e) => updateProgress(e.progress, e.goal));

        await enhanceScreenWithHaulInfo(progressMonitor);

        $('#twcheese_showHaulsPrompt').remove();
        unfadeGameContent();
    });

    $('#twcheese_hauls_prompt_cancel').on('click', function(e) {
        e.preventDefault();
        $('#twcheese_showHaulsPrompt').remove();
        unfadeGameContent();
    });
};

/**
 *	creates a widget with statistics about the returning hauls
 *	@param {Command[]} commands
 *  @param {boolean} collapsed
 */
function createPillagingStatsWidget(commands, collapsed) {

    function buildDayHint(date) {
        if (date.isTodayOnServer()) {
            return '';
        }
        else if (date.isTomorrowOnServer()) {
            return ' (tomorrow)';
        }
        return ' (' + date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) + ')';
    }
    
    let summationFromOptions = [];
    let summationToOptions = [];
    let hourlyBreakdowns = [];

    let latestCommandArrival = commands[commands.length - 1].arrival;
    let startOfHour = TwCheeseDate.newServerDate().startOfHour();

    while (startOfHour < latestCommandArrival) {
        let endOfHour = startOfHour.endOfHour();
        let hourOfDay = startOfHour.getServerHours();
        let dayHint = buildDayHint(startOfHour);

        summationFromOptions.push(`<option value=${startOfHour.getTime()}>${hourOfDay}:00 ${dayHint}</option>`);
        summationToOptions.push(`<option value="${endOfHour.getTime()}">${hourOfDay}:59 ${dayHint}</option>`);

        let result = Command.sumPropsFromTimeframe(commands, startOfHour, endOfHour);
        hourlyBreakdowns.push(`
            <tr>
                <td>${hourOfDay}:00 - ${hourOfDay}:59 ${dayHint}</td>
                <td>${result.timber}</td>
                <td>${result.clay}</td>
                <td>${result.iron}</td>
                <td>${result.sumLoot()}/${result.haulCapacity}</td>
                <td>${result.calcHaulPercent()}%</td>
            </tr>
        `);

        startOfHour = startOfHour.addHours(1);
    }

    let pageNumber = scrapePageNumber();
    let pageInfo = pageNumber ? `from Page ${pageNumber}` : '';

    let toggleIconSrc = collapsed ? ImageSrc.plus : ImageSrc.minus;
    let contentDisplay = collapsed ? 'none' : 'block';

    let html = `
        <div id="twcheese_pillaging_stats" class="vis widget">
            <h4>
                Pillaging Statistics
                <img id="twcheese_pillaging_stats_toggle" src="${toggleIconSrc}" style="float:right; cursor: pointer;">
                <span style="font-size: 8px; font-style: normal; font-weight: normal; margin-right: 25px; float: right;">
                    created by <a href="http://forum.tribalwars.net/member.php?u=28484">cheesasaurus</a>
                </span>
            </h4>
            <div id="twcheese_pillaging_stats_content" style="display: ${contentDisplay};">
                <!-- summation -->
                <div>
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
                            <th><img src="${ImageSrc.timber}"></img></th>
                            <th><img src="${ImageSrc.clay}"></img></th>
                            <th><img src="${ImageSrc.iron}"></img></th>
                            <th colspan="2">Performance</th>
                        </tr>
                        ${hourlyBreakdowns.join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    $('.modemenu:eq(1)').after(html);

    initCss(`
        .twcheese-pillaging-stats-hourly-breakdown tr:nth-child(even) td {
            background: #FFE0A2;
        }
    `);

    /**
     *	changes the results displayed in the summation section of the pillaging stats widget
     */
    let showResults = function () {
        var startTime = TwCheeseDate.newServerDate(Number(document.getElementById('twcheese_pillaging_stats_from').value));
        var endTime = TwCheeseDate.newServerDate(Number(document.getElementById('twcheese_pillaging_stats_to').value));
        if (startTime > endTime) {
            tmpTime = startTime;
            startTime = endTime;
            endTime = tmpTime;
        }
        var results = Command.sumPropsFromTimeframe(commands, startTime, endTime);

        $('#twcheese_pillaging_results').html(`
            <img src="${ImageSrc.timber}"> ${results.timber}
            <img src="${ImageSrc.clay}"> ${results.clay}
            <img src="${ImageSrc.iron}"> ${results.iron}
            &nbsp;&nbsp;| ${results.sumLoot()}/${results.haulCapacity} (${results.calcHaulPercent()}%)
        `);
    };

    let toggleCollapse = function() {
        let icon = document.getElementById('twcheese_pillaging_stats_toggle');
        let content = $('#twcheese_pillaging_stats_content');

        content.toggle({
            duration: 200,
            start: function() {
                let willCollapse = icon.src.includes(ImageSrc.minus);
                icon.src = willCollapse ? ImageSrc.plus : ImageSrc.minus;
                userConfig.set('commandHauls.collapseStats', willCollapse);
            }
        });
    }

    /*==== initialize interactive components ====*/
    $('#twcheese_pillaging_stats_toggle').on('click', function(e) {
        e.preventDefault();
        toggleCollapse();
    });
    document.getElementById('twcheese_pillaging_stats_from').onchange = showResults;
    document.getElementById('twcheese_pillaging_stats_to').onchange = showResults;
    document.getElementById('twcheese_pillaging_stats_to').childNodes[document.getElementById('twcheese_pillaging_stats_to').childNodes.length - 1].selected = "selected";
    showResults();
};


/**
 * @param {ProgressMonitor} progressMonitor
 * @return {Command[]} returning commands from the table
 */
async function appendHaulColsToCommandsTable(progressMonitor) {
    let commandsTable = document.getElementById('commands_table');

    $(commandsTable.rows[0]).append(`
        <th><img src="${ImageSrc.timber}" title="Wood" alt="Timber"></th>
        <th><img src="${ImageSrc.clay}" title="Clay" alt="Clay"></th>
        <th><img src="${ImageSrc.iron}" title="Iron" alt="Iron"></th>
        <th>Performance</th>
    `);

    let commandCount = $(commandsTable).find('.rename-icon').length;
    progressMonitor.goalDetermined(commandCount);
    let returningCommands = [];

    for (let row of commandsTable.rows) {
        let firstCell = row.cells[0];
        if (firstCell.tagName.toLowerCase() === 'th') {
            // no command here! this is a header row. e.g. the "select all" bar
            row.cells[row.cells.length - 1].colSpan += 4;
            continue;
        }

        let commandUrl = firstCell.getElementsByTagName('a')[0].href;
        let command = scrapeCommand(await requestDocumentBody(commandUrl));
        let commandType = $(firstCell).find('.own_command').data('command-type');
        if (commandType === 'return') {            
            returningCommands.push(command);
        }

        $(row).append(`
            <td>${command.timber}</td>
            <td>${command.clay}</td>
            <td>${command.iron}</td>
            <td>${command.sumLoot()}/${command.haulCapacity} (${command.calcHaulPercent()}%)</td>
        `);

        progressMonitor.progressMade(1);
    }

    return returningCommands;
};


let haulsIncluded = false;

async function enhanceScreenWithHaulInfo(progressMonitor) {
    let returningCommands = await appendHaulColsToCommandsTable(progressMonitor);

    let collapseStats = userConfig.get('commandHauls.collapseStats', false);
    createPillagingStatsWidget(returningCommands, collapseStats);

    haulsIncluded = true;
};

window.TwCheese.actions.promptCommandHauls = function() {
    if (haulsIncluded) {
        UI.InfoMessage('This is already active.', 3000, 'error');
        return;
    }
    popupShowHaulsPrompt();
}