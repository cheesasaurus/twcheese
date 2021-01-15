

class ScavengeOption {

    constructor(base) {
        this.base = base;
        this.id = base.id;
    }

    getName() {
        return this.base.name;
    }

    getLootPercent() {
        return this.base.loot_factor * 100;
    }

    getLootFactor() {
        return this.base.loot_factor;
    }

    calcDurationSeconds(squadCapacity) {
        let base = (squadCapacity ** 2) * this.getLootPercent() * this.base.loot_factor;
        let preDuration = Math.pow(base, this.base.duration_exponent) + this.base.duration_initial_seconds
        return Math.round(preDuration * this.base.duration_factor);
    }

    calcTargetCapacity(durationSeconds) {
        let preDuration = durationSeconds / this.base.duration_factor;
        let base = (preDuration - this.base.duration_initial_seconds) ** (1 / this.base.duration_exponent);
        return Math.round(Math.sqrt(base / this.getLootPercent() / this.base.loot_factor));
    }

}


export { ScavengeOption };