
class DebugProcess {
    constructor(processName) {
        this.name = processName;
        this.phases = [];
        this.currentPhaseIndex = -1;
    }

    enqueuePhase(phase) {
        this.phases.push(phase);
    }

    insertPhase(phase) {
        this.phases.splice(this.currentPhaseIndex + 1, 0, phase);
    }

    static create(processName) {
        return new DebugProcess(processName);
    }
}

export { DebugProcess };