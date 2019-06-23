import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class DebugProcess {
    constructor(processName) {
        this.name = processName;
        this.phases = [];
        this.currentPhaseIndex = -1;
    }

    enqueuePhase(phase) {
        this.phases.push(phase);
        return this;
    }

    insertPhase(phase) {
        this.phases.splice(this.currentPhaseIndex + 1, 0, phase);
        return this;
    }

    start() {
        this.currentPhaseIndex = -1;
        this.goToNextPhase();
    }

    goToNextPhase() {
        if (!this.hasNextPhase()) {
            throw `there's no next phase`;
        }
        this.currentPhaseIndex++;
        // todo
        $(this).trigger(DebugEvents.PHASE_CHANGED);
    }

    hasNextPhase() {
        return this.currentPhaseIndex < this.phases.length - 1;
    }

    goToPrevPhase() {
        if (!this.hasPrevPhase()) {
            throw `there's no prev phase`;
        }
        this.currentPhaseIndex--;
        // todo
        $(this).trigger(DebugEvents.PHASE_CHANGED);
    }

    hasPrevPhase() {
        return this.currentPhaseIndex > 0;
    }

    getCurrentPhase() {
        return this.phases[this.currentPhaseIndex];
    }

    static create(processName) {
        return new DebugProcess(processName);
    }

}

export { DebugProcess };