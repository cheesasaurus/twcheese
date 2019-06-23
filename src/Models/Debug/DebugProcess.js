import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';


class DebugProcess {
    constructor(processName) {
        this.name = processName;
        this.phases = [];
        this.currentPhaseIndex = -1;
    }

    enqueuePhase(phase) {
        this.phases.push(phase);
        this.watchPhase(phase);
        return this;
    }

    insertPhase(phase) {
        this.phases.splice(this.currentPhaseIndex + 1, 0, phase);
        this.watchPhase(phase);
        return this;
    }

    watchPhase(phase) {
        let events = [
            DebugEvents.PHASE_COMPLETION_READY,
            DebugEvents.PHASE_COMPLETION_NOT_READY,
            DebugEvents.PHASE_CHANGED
        ];

        $(phase).on(events.join(' '), (e) => $(this).trigger(e.type, e));
    }

    start() {
        this.currentPhaseIndex = -1;
        this.goToNextPhase();
    }

    goToNextPhase() {
        this.removeFuturePhasesFollowingUpOnIrrelevantThings();
        if (!this.hasNextPhase()) {
            throw `there's no next phase`;
        }
        this.currentPhaseIndex++;
        // todo
        $(this).trigger(DebugEvents.PHASE_CHANGED);
        this.getCurrentPhase().checkCompletionReady();
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

    removeFuturePhasesFollowingUpOnIrrelevantThings() {
        let relevantThings = this.getRelevantThingsToFollowUpOn();

        for (let i = this.currentPhaseIndex + 1; i < this.phases.length; i++) {
            let phase = this.phases[i];
            if (phase.followsUpOn && !relevantThings.includes(phase.followsUpOn)) {
                this.phases.splice(i, 1);
                i--;
            }
        }
    }

    getRelevantThingsToFollowUpOn() {
        return this.phases.slice(0, this.currentPhaseIndex + 1)
            .reduce((acc, phase) => acc.concat(phase.getThingsToFollowUpOn()), []);
    }

    static create(processName) {
        return new DebugProcess(processName);
    }

}

export { DebugProcess };