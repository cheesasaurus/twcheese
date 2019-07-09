import { requestDocument } from '/twcheese/src/Util/Network.js';
import { scrapeCommand, scrapeCommandUrlFromRow } from '/twcheese/src/Scrape/command.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { scrapeErrorMessage } from '/twcheese/src/Scrape/error.js';

/**
 * @param {ProgressMonitor} progressMonitor
 * @return {Command[]} returning commands from the table
 */
async function appendHaulColsToCommandsTable(progressMonitor) {
    let commandsTable = document.getElementById('commands_table');
    if (!commandsTable) {
        return [];
    }

    $(commandsTable.rows[0]).append(`
        <th><img src="${ImageSrc.wood}" title="Wood" alt="Timber"></th>
        <th><img src="${ImageSrc.stone}" title="Clay" alt="Clay"></th>
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

        let commandUrl = scrapeCommandUrlFromRow(row);
        let doc = await requestDocument(commandUrl);
        let errorMessage = scrapeErrorMessage(doc);
        if (errorMessage) {
            $(row).append(`<td colspan="4" style="background-color:#FFCCAA; font-size:13px; font-weight:bold; color:#B40000;">${errorMessage}</td>`);
            progressMonitor.progressMade(1);
            continue;
        }

        try {
            let command = scrapeCommand(doc);
            let commandType = $(firstCell).find('.own_command').data('command-type');
            if (commandType === 'return') {            
                returningCommands.push(command);
            }
    
            $(row).append(`
                <td>${command.haul.wood}</td>
                <td>${command.haul.stone}</td>
                <td>${command.haul.iron}</td>
                <td>${command.haul.sum()}/${command.haulCapacity} (${command.calcHaulPercent()}%)</td>
            `);
        }
        catch(err) {
            console.error(err);
            $(row).append(`<td>?</td><td>?</td><td>?</td><td>?</td>`);
        }
        progressMonitor.progressMade(1);
    }

    return returningCommands;
};

export { appendHaulColsToCommandsTable };