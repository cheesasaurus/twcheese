
class Phase {
    constructor(phaseName) {
        this.phaseName = phaseName;
        this.followsUpOn = null;
        this.autoComplete = false;
    }

    setFollowsUpOn(option) {
        this.followsUpOn = option;
    }

    setAutoComplete(auto) {
        this.autoComplete = auto;
    }

    checkCompletionReady() {
        throw 'not implemented';
    }

    getThingsToFollowUpOn() {
        throw 'not implemented';
    }
    
}

export { Phase };