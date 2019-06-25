import { GithubService } from '/twcheese/src/Service/GithubService.js';
import { DataCollector } from '/twcheese/src/Models/Debug/DataCollector.js';

class BugReporter {
    constructor(process) {
        this.process = process;
    }

    buildReport() {
        return {
            title: '[Bug report] ' + this.process.name,
            dataCollected: (new DataCollector(this.process)).getCollectibleData()
        }
    }

    async submitReport(report) {
        let message = '```' + JSON.stringify(report.dataCollected, null, 2) +  '```';
        return await GithubService.createIssue(report.title, message);
    }

}

export { BugReporter };