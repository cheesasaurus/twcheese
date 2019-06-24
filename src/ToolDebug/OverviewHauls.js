import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { PhaseAttempt } from '/twcheese/src/Models/Debug/PhaseAttempt.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';
import { Question } from '/twcheese/src/Models/Debug/Question.js';
import { QuestionValue } from '/twcheese/src/Models/Debug/QuestionValue.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';

import { fadeGameContentExcept, unfadeGameContent } from '/twcheese/src/Util/UI.js';
import { requestDocument } from '/twcheese/src/Util/Network.js';
import { scrapeCommand, scrapeCommandUrlFromRow } from '/twcheese/src/Scrape/command.js';


async function trySelectCommandFromTable() {
    let $commandsTable = $('#commands_table');

    fadeGameContentExcept($commandsTable);
    $(document).scrollTop($commandsTable.offset().top);

    let handleMouseover = function() {
        $(this).css({outline: '3px solid magenta'});
    };

    let handleMouseout = function() {
        $(this).css({outline: 'none'});
    };

    let $ownRows = $commandsTable.children().children();
    $ownRows.on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

    return new Promise(function(resolve) {
        let handleRowSelected = function() {
            unfadeGameContent();

            $ownRows.off('mouseover', handleMouseover)
                .off('mouseout', handleMouseout)
                .off('click', handleRowSelected)
                .css({outline: 'none'});

            let url = scrapeCommandUrlFromRow(this);
            resolve(url);
        }

        $ownRows.on('click', handleRowSelected);
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
debugProcess.enqueuePhase(
    PhaseQuestion.create('Entry')
        .addQuestion(Question.create(`What's broken?`)
            .addOption(Option.create('Wrong values shown in commands list', 'wrong_values')
                .addFollowUp(PhaseAttempt.create('determine command url', trySelectCommandFromTable)
                    .setInstructions('Select a problematic row.')
                    .onSuccess(function(commandUrl) {
                        debugProcess.insertPhase(PhaseAttempt.create('read selected command', async () => tryScrapeCommandScreen(commandUrl))
                            .setDataSummarizer(summarizeTryScrapeCommandScreen)
                            .onSuccess(function(d) {
                                debugProcess.insertPhase(PhaseQuestion.create('Command scraper')
                                    .lookAt(d.document)
                                    .addQuestion(QuestionValue.create('Arrival', d.command.arrival))
                                    .addQuestion(QuestionValue.create('Haul', d.command.haul))
                                    .addQuestion(QuestionValue.create('Haul capacity', d.command.haulCapacity))
                                )
                            })
                        )    
                    })
                )
            )    
            .addOption(Option.create('Something else', 'other', 'twcheese-debug-option-TODO'))
        )    
    )
    .enqueuePhase(PhaseReport.create(debugProcess));

export { debugProcess };