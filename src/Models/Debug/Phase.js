
class Phase {
    constructor(phaseName) {
        this.phaseName = phaseName;
        this.followsUpOn = null;
    }

    setFollowsUpOn(option) {
        this.followsUpOn = option;
    }
}

export { Phase };