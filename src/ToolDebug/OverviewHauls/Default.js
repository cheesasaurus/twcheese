import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';
import { BugReporter } from '/twcheese/src/Models/Debug/BugReporter.js';
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';
import { QuestionFreeForm } from '/twcheese/src/Models/Debug/QuestionFreeForm.js';
import { PhaseReport } from '/twcheese/src/Models/Debug/PhaseReport.js';

let debugProcess = DebugProcess.create('Tool: OverviewHauls');
let bugReporter = new BugReporter(debugProcess);

debugProcess
    .enqueuePhase(PhaseQuestion.create('Entry')
        .addQuestion(QuestionFreeForm.create(`What's broken?`, 'e.g. "it freezes when loading hauls"'))
    )
    .enqueuePhase(PhaseReport.create(bugReporter));

export { debugProcess };