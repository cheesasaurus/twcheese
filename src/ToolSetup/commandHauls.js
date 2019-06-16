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
import { Command } from '/twcheese/src/Models/Command.js';
import { ProgressMonitor } from '/twcheese/src/Models/ProgressMonitor.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';
import { scrapePageNumber } from '/twcheese/src/Scrape/pagination.js';
import { ImageSrc, initCss, fadeGameContent, unfadeGameContent } from '/twcheese/src/Util/UI.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';


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

    (new HaulStatsWidget(returningCommands, scrapePageNumber()))
        .insertAfter($('.modemenu:eq(1)'));

    haulsIncluded = true;
};

window.TwCheese.actions.promptCommandHauls = function() {
    if (haulsIncluded) {
        UI.InfoMessage('This is already active.', 3000, 'error');
        return;
    }
    popupShowHaulsPrompt();
}