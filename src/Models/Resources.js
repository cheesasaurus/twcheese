import { Resource } from '/twcheese/src/Models/Resource.js';

class Resources {
    constructor(woodAmount = 0, stoneAmount = 0, ironAmount = 0) {
        this.wood = new Resource(Resource.TYPE_TIMBER, woodAmount);
        this.stone = new Resource(Resource.TYPE_CLAY, stoneAmount);
        this.iron = new Resource(Resource.TYPE_IRON, ironAmount);
    }

    sum() {
        return this.wood + this.stone + this.iron;
    }

    add(other) {
        return new Resources(
            this.wood + other.wood,
            this.stone + other.stone,
            this.iron + other.iron
        );
    }

    multiply(factor) {
        return new Resources(
            this.wood * factor,
            this.stone * factor,
            this.iron * factor
        );
    }

    cap(maxAmount) {
        return new Resources(
            Math.min(this.wood, maxAmount),
            Math.min(this.stone, maxAmount),
            Math.min(this.iron, maxAmount)
        );
    }

    /**
     * @param {Objecet} other 
     */
    equals(other) {
        return this.wood.valueOf() === other.wood.valueOf()
            && this.stone.valueOf() === other.stone.valueOf()
            && this.iron.valueOf() === other.iron.valueOf();
    }

    toArray() {
        return [this.wood.amount, this.stone.amount, this.iron.amount];
    }

}

Resources.TYPES = [Resource.TYPE_TIMBER, Resource.TYPE_CLAY, Resource.TYPE_IRON];

export { Resources };