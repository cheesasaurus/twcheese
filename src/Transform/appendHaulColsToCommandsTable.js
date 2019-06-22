import { requestDocumentBody } from '/twcheese/src/Util/Network.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';

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

export { appendHaulColsToCommandsTable };