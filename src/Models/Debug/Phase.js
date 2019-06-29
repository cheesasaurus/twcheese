
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

    getType() {
        throw Error('notimplemented');
    }

    start() {
        throw Error('not implemented');
    }

    checkCompletionReady() {
        throw Error('not implemented');
    }

    getThingsToFollowUpOn() {
        throw Error('not implemented');
    }

    getSummary() {
        throw Error('not implemented');
    }
    
}

export { Phase };