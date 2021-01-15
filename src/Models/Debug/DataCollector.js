
class DataCollector {
    constructor(debugProcess) {
        this.process = debugProcess;
        this.censoredProps = new Set(['csrf', 'birthdate']);
    }

    getCollectibleData() {
        return this.scrub(this.buildData());
    }

    buildData() {
        let nav = window.navigator;

        return {
            process: this.process.getSummarySoFar(),
            contentHtml: document.getElementById('contentContainer').outerHTML,
            navigator: {
                appCodeName: nav.app,
                appName: nav.appName,
                appVersion: nav.appVersion,
                platfrom: nav.platfrom,
                userAgent: nav.userAgent,
                languages: $.extend(true, [], nav.languages),
                oscpu: nav.oscpu
            },
            gameData: $.extend(true, {}, window.game_data)
        }
    }

    scrub(d) {
        if (typeof d === 'object' && d !== null) {
            for (let key of Object.keys(d)) {
                if (this.censoredProps.has(key)) {
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
            .replace(/(\?h=)(\w+)(&|&amp;)/g, '$1CENSORED$3')
            .replace(/(csrf_token = ')(\w+)/g, '$1CENSORED')
            .replace(/("csrf":")(\w+)/g, '$1CENSORED');
    }
}

export { DataCollector };