import { ImageSrc } from '/twcheese/conf/ImageSrc.js';

class Resource {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
    }

    valueOf() {
        return this.amount;
    }

    toString() {
        return this.amount;
    }

    toDebugString() {
        return this.amount;
    }

    imageSrc() {
        return ImageSrc[this.type];
    }

}

Resource.TYPE_TIMBER = 'timber';
Resource.TYPE_CLAY = 'clay';
Resource.TYPE_IRON = 'iron';

export { Resource };