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
        let obj = this.props;
        let tokens = prop.split('.');
        for (let i = 0; i < tokens.length - 1; i++) {
            let token = tokens[i];
            if (typeof obj[token] !== 'object' || token === null) {
                return defaultValue;
            }
            obj = obj[token];
        }
        return obj[tokens[tokens.length - 1]];
    }

    set(prop, value) {
        let obj = this.props;
        let tokens = prop.split('.');
        for (let i = 0; i < tokens.length - 1; i++) {
            let token = tokens[i];
            if (typeof obj[token] !== 'object' || token === null) {
                obj[token] = {};
            }
            obj = obj[token];
        }
        obj[tokens[tokens.length - 1]] = value;
        this.save();
    }
}

export { Config };