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
import { ImageSrc } from '/twcheese/src/Util/UI.js';
import { HaulStatsWidget } from '/twcheese/src/Widget/HaulStatsWidget.js';
import { promptLoadHauls } from '/twcheese/src/Prompt/promptLoadHauls.js';


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
    promptLoadHauls(enhanceScreenWithHaulInfo);
}