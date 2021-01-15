import { DataCollector } from '/twcheese/src/Models/Debug/DataCollector.js';
import { API } from '/twcheese/conf/API.js';

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
        let message = [
            '|game version|world|player|twcheese|',
            '|---|---|---|---|',
            `|${game_data.majorVersion}|${game_data.world}|${game_data.player.name}|${window.TwCheese.version}|`,
            '```' + JSON.stringify(report.dataCollected, null, 2) +  '```'
        ].join("\n");
        return await this.createIssue(report.title, message);
    }

    async createIssue(title, message) {
        let response = await fetch(API.bugReport.url, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                message: message
            })
        });
        if (!response.ok) {
            throw new Error(`Failed to create issue. [${response.status}: ${response.statusText}]`);
        }
        return await response.json();
    }

}

export { BugReporter };