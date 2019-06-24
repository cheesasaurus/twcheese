import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { PhaseAttempt } from '/twcheese/src/Models/Debug/PhaseAttempt.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';
import { Question } from '/twcheese/src/Models/Debug/Question.js';
import { QuestionValue } from '/twcheese/src/Models/Debug/QuestionValue.js';
import { Option } from '/twcheese/src/Models/Debug/Option.js';


import { requestDocument } from '/twcheese/src/Util/Network.js';
import { scrapeCommand } from '/twcheese/src/Scrape/command.js';


async function trySelectCommandFromTable() {
    // "Select a problematic row"
    // todo
    // player selects a row

    // scrape url from row

    // todo: remove debug
    return new Promise(function(resolve) {
        let url = 'https://en108.tribalwars.net/game.php?village=20373&screen=info_command&id=1576301282&type=own';
        setTimeout(() => resolve(url), 750);
    });

    //return commandUrl;
}


async function tryScrapeCommandScreen(commandUrl) {
    let commandDoc = await requestDocument(commandUrl);
    return {
        document: commandDoc,
        command: scrapeCommand(commandDoc)
    };
}


let debugProcess = DebugProcess.create('Tool: OverviewHauls');
debugProcess.enqueuePhase(
    PhaseQuestion.create('Entry')
        .addQuestion(Question.create(`What's broken?`)
            .addOption(Option.create('Wrong values shown in commands list', 'wrong_values')
                .addFollowUp(PhaseAttempt.create('determine command url', trySelectCommandFromTable)
                    .onSuccess(function(commandUrl) {
                        debugProcess.insertPhase(PhaseAttempt.create('read selected command', async () => tryScrapeCommandScreen(commandUrl))
                            .onSuccess(function(d) {
                                debugProcess.insertPhase(PhaseQuestion.create('Command scraper')
                                    .lookAt(d.document)
                                    .addQuestion(QuestionValue.create('Arrival', d.command.arrival))
                                    .addQuestion(QuestionValue.create('Haul', d.command.haul))
                                    .addQuestion(QuestionValue.create('Haul capacity', d.command.haulCapacity)))
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