import { getProp, setProp} from '/twcheese/src/Util/Object.js';


class Config {
    constructor(id) {
        this.id = id;
        this.props = {};
        this._loadCachedData();
    }

    get(prop, defaultValue) {
        return getProp(this.props, prop, defaultValue);
    }

    set(prop, value) {
        setProp(this.props, prop, value);
        this._save();
    }

    initProps(props) {
        this.props = props;
    }

    /**
     * @protected
     * @return {object|null}
     */
    _loadCachedData() {
        let saved = window.localStorage.getItem(this.id);
        if (saved) {
            let data = JSON.parse(saved);

            // should ideally be data.props
            // But for backwards compatibility, the data could be the props too.
            this.props = data.props || data;
            return data;
        }
        return null;
    }

    /**
     * @final
     * @protected
     */
    _save() {
        this._beforeSave();
        window.localStorage.setItem(this.id, JSON.stringify(this._getCacheableData()));
    }

    /**
     * @protected
     */
    _beforeSave() {
        
    }

    /**
     * @protected
     * @return {object}
     */
    _getCacheableData() {
        return {
            props: this.props
        };
    }

}

export { Config };