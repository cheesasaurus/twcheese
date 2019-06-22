import { DebugProcess } from '/twcheese/src/Debug/DebugProcess.js';
import { PhaseQuestion } from '/twcheese/src/Debug/PhaseQuestion.js';
import { PhaseAttempt } from '/twcheese/src/Debug/PhaseAttempt.js';
import { Question } from '/twcheese/src/Debug/Question.js';
import { QuestionValue } from '/twcheese/src/Debug/QuestionValue.js';
import { Option } from '/twcheese/src/Debug/Option.js';


import { requestDocumentBody } from '/twcheese/src/Util/Network.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';


async function trySelectCommandFromTable() {
    // todo
    // player selects a row

    // scrape url from row

    resolve(commandUrl);
}


async function tryScrapeCommandScreen(commandUrl) {
    let commandDocBody = await requestDocumentBody(commandUrl); // todo: request full document instead, then get body from that, for the scraper

    return {
        document: scrapeCommand(commandDocBody), // todo: full document instead
        command: command
    };
}


let process = DebugProcess.create('OverviewHauls')
    .enqueuePhase(
        PhaseQuestion.create('Entry')
            .addQuestion(Question.create(`What's wrong?`))
                .addOption(Option.create('Wrong values are shown in the commands list', 'wrong_values', 'twcheese-debug-option-TODO'))
                    .addFollowUp(PhaseAttempt.create('select a problematic row', trySelectCommandFromTable)
                        .onSuccess(function(commandUrl) {
                            process.insertPhase(PhaseAttempt.create('read selected command', async () => tryScrapeCommandScreen(commandUrl))
                                .onSuccess(function(d) {
                                    process.insertPhase(PhaseQuestion.create('Command reader')
                                        .lookAt(d.document)
                                        .addQuestion(QuestionValue.create('Arrival', d.command.arrival))
                                        .addQuestion(QuestionValue.create('Haul', d.command.haul))
                                        .addQuestion(QuestionValue.create('Haul capacity', d.command.haulCapacity)))
                                })
                            )    
                        })
                    )
                .addOption(Option.create('Something else', 'other', 'twcheese-debug-option-TODO'))
    )
    .enqueuePhase(
        PhaseQuestion.create('Command reader')
            .addQuestion(QuestionValue.create('Arrival', command.arrival))
            .addQuestion(QuestionValue.create('Haul', command.haul))
            .addQuestion(QuestionValue.create('Haul capacity', command.haulCapacity))
    )
    .enqueuePhase(PhaseReport.create(process));
