
class Phase {
    constructor(phaseName) {
        this.name = phaseName;
        this.followsUpOn = null;
        this.autoComplete = false;
    }

    setFollowsUpOn(option) {
        this.followsUpOn = option;
    }

    setAutoComplete(auto) {
        this.autoComplete = auto;
    }

    start() {
        throw 'not implemented';
    }

    checkCompletionReady() {
        throw 'not implemented';
    }

    getThingsToFollowUpOn() {
        throw 'not implemented';
    }

    getSummary() {
        throw 'not implemented';
    }
    
}

export { Phase };