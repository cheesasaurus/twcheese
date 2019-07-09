import { Resource } from '/twcheese/src/Models/Resource.js';

class Resources {
    constructor(woodAmount, clayAmount, ironAmount) {
        this.wood = new Resource(Resource.TYPE_TIMBER, woodAmount);
        this.clay = new Resource(Resource.TYPE_CLAY, clayAmount);
        this.iron = new Resource(Resource.TYPE_IRON, ironAmount);
    }

    sum() {
        return this.wood + this.clay + this.iron;
    }

    add(other) {
        return new Resources(
            this.wood + other.wood,
            this.clay + other.clay,
            this.iron + other.iron
        );
    }

    /**
     * @param {Objecet} other 
     */
    equals(other) {
        return this.wood.valueOf() === other.wood.valueOf()
            && this.clay.valueOf() === other.clay.valueOf()
            && this.iron.valueOf() === other.iron.valueOf();
    }

    toArray() {
        return [this.wood.amount, this.clay.amount, this.iron.amount];
    }

}

export { Resources };