class ProgressMonitor {
    constructor() {
        this.progress = 0;
        this.goal = 0;
        this.progressHandlers = [];
    }

    goalDetermined(size) {
        this.goal = size;
        this.notifyChange();
    }

    progressMade(size) {
        this.progress += size;
        this.notifyChange();
    }

    notifyChange() {
        for (let handler of this.progressHandlers) {
            handler({progress: this.progress, goal: this.goal});
        }
    }

    onChange(handler) {
        this.progressHandlers.push(handler);
    }
}

export { ProgressMonitor }