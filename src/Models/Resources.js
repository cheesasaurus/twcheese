import { Resource } from '/twcheese/src/Models/Resource.js';

class Resources {
    constructor(timberAmount, clayAmount, ironAmount) {
        this.timber = new Resource(Resource.TYPE_TIMBER, timberAmount);
        this.clay = new Resource(Resource.TYPE_CLAY, clayAmount);
        this.iron = new Resource(Resource.TYPE_IRON, ironAmount);
    }

    sum() {
        return this.timber + this.clay + this.iron;
    }

    add(other) {
        return new Resources(
            this.timber + other.timber,
            this.clay + other.clay,
            this.iron + other.iron
        );
    }

    /**
     * @param {Objecet} other 
     */
    equals(other) {
        return this.timber.valueOf() === other.timber.valueOf()
            && this.clay.valueOf() === other.clay.valueOf()
            && this.iron.valueOf() === other.iron.valueOf();
    }

    toIntArray() {
        return [this.timber.amount, this.clay.amount, this.iron.amount];
    }

}

export { Resources };