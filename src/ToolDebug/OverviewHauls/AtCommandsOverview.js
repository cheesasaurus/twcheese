import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { PhaseAttempt } from '/twcheese/src/Models/Debug/PhaseAttempt.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';
import { QuestionSelect } from '/twcheese/src/Models/Debug/QuestionSelect.js';
import { QuestionFreeForm } from '/twcheese/src/Models/Debug/QuestionFreeForm.js';
import { QuestionValue } from '/twcheese/src/Models/Debug/QuestionValue.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';
import { BugReporter } from '/twcheese/src/Models/Debug/BugReporter.js';

import { fadeGameContentExcept, unfadeGameContent, Mousetrap } from '/twcheese/src/Util/UI.js';
import { requestDocument } from '/twcheese/src/Util/Network.js';
import { scrapeCommand, scrapeCommandUrlFromRow } from '/twcheese/src/Scrape/command.js';


async function trySelectCommandFromTable(ctrl) {
    let $commandsTable = $('#commands_table');
    let $commandRows = $commandsTable.children().children();

    fadeGameContentExcept($commandsTable);
    $(document).scrollTop($commandsTable.offset().top);

    let mousetrap = (new Mousetrap()).spawn();
    mousetrap
        .on('mouseover', $commandRows, function() {
            $(this).css({outline: '3px solid magenta'});
        })
        .on('mouseout', $commandRows, function() {
            $(this).css({outline: 'none'})
        });

    let cleanup = function() {
        unfadeGameContent();
        mousetrap.destruct();
        $commandRows.css({outline: 'none'});
    };

    $(ctrl).on(DebugEvents.USER_REJECTED, function() {
        cleanup();
    });

    return new Promise(function(resolve, reject) {
        let handleRowSelected = function() {
            cleanup();
            try {
                resolve(scrapeCommandUrlFromRow(this));
            } catch (err) {
                reject(err);
            }
        }
        mousetrap.on('click', $commandRows, handleRowSelected);
    });
}


async function tryScrapeCommandScreen(commandUrl) {
    let commandDoc = await requestDocument(commandUrl);
    return {
        document: commandDoc,
        command: scrapeCommand(commandDoc)
    };
}

function summarizeTryScrapeCommandScreen(d) {
    let document = d.document;
    if (document instanceof window.HTMLDocument) {
        document = document.documentElement.outerHTML;
    }
    return {
        document: document,
        command: d.command
    }
}


let debugProcess = DebugProcess.create('Tool: OverviewHauls');
let bugReporter = new BugReporter(debugProcess);

debugProcess.enqueuePhase(
    PhaseQuestion.create('Entry')
        .addQuestion(QuestionSelect.create(`What's broken?`)
            .addOption(Option.create('Wrong values shown in commands list', 'wrong_values')
                .addFollowUp(PhaseAttempt.create('determine command url', trySelectCommandFromTable)
                    .setInstructions('Select a problematic row.')
                    .onSuccess(function(commandUrl) {
                        debugProcess.insertPhase(PhaseAttempt.create('read selected command', async () => await tryScrapeCommandScreen(commandUrl))
                            .setDataSummarizer(summarizeTryScrapeCommandScreen)
                            .onSuccess(function(d) {
                                debugProcess.insertPhase(PhaseQuestion.create('Command scraper')
                                    .lookAt(() => d.document.documentElement.outerHTML)
                                    .addQuestion(QuestionValue.create('Arrival', () => d.command.arrival))
                                    .addQuestion(QuestionValue.create('Haul', () => d.command.haul))
                                    .addQuestion(QuestionValue.create('Haul capacity', () => d.command.haulCapacity))
                                )
                            })
                        )
                    })
                )
            )
            .addOption(Option.create('Something else', 'other'))
        )
    )
    .enqueuePhase(PhaseQuestion.create('extra info')
        .addQuestion(QuestionFreeForm.create('Additional information', 'e.g. "iron isn\'t shown"'))
    )
    .enqueuePhase(PhaseReport.create(bugReporter));

export { debugProcess };