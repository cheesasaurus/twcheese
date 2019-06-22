import { Resource } from '/twcheese/src/Models/Resource.js';

class Resources {
    constructor(timberAmount, clayAmount, ironAmount) {
        this.timber = new Resource(Resource.TYPE_TIMBER, timberAmount);
        this.clay = new Resource(Resource.TYPE_CLAY, clayAmount);
        this.iron = new Resource(Resource.TYPE_IRON, ironAmount);
    }

    /**
     * @param {Objecet} other 
     */
    equals(other) {
        return this.timber.valueOf() === other.timber.valueOf()
            && this.clay.valueOf() === other.clay.valueOf()
            && this.iron.valueOf() === other.iron.valueOf();
    }

}

export { Resources };