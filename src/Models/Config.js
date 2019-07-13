import { getProp, setProp} from '/twcheese/src/Util/Object.js';


class Config {
    constructor(id) {
        this.id = id;
        this.props = {};
        this.load();
    }

    load() {
        let saved = localStorage.getItem(this.id);
        if (saved) {
            this.props = JSON.parse(saved);
        }
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this.props));
    }

    get(prop, defaultValue) {
        return getProp(this.props, prop, defaultValue);
    }

    set(prop, value) {
        setProp(this.props, prop, value);
        this.save();
    }
}

export { Config };