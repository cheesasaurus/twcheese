
class DataCollector {
    constructor(debugProcess) {
        this.process = debugProcess;
        this.censoredProps = ['csrf', 'birthdate'];
    }

    getCollectibleData() {
        return this.scrub(this.buildData());
    }

    buildData() {
        return {
            process: this.process.getSummarySoFar(),
            gameData: window.game_data,
            contentHtml: document.getElementById('content_value').outerHTML
        }
    }

    scrub(d) {
        if (typeof d === 'object' && d !== null) {
            for (let key of Object.keys(d)) {
                if (this.censoredProps.includes(key)) {
                    d[key] = 'CENSORED';
                } else {
                    d[key] = this.scrub(d[key]);
                }
            }
        }
        if (typeof d === 'string') {
            return this.censorCsrfInString(d);
        }
        return d;
    }

    censorCsrfInString(s) {
        return s.replace(/((&|&amp;)h=)(\w+)/g, '$1CENSORED')
            .replace(/(csrf_token = ')(\w+)/g, '$1CENSORED')
            .replace(/("csrf":")(\w+)/g, '$1CENSORED');
    }
}

export { DataCollector };