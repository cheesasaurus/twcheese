import { Config } from '/twcheese/src/Models/Config.js';
import { requestXml } from '/twcheese/src/Util/Network.js';


class RemoteConfig extends Config {

    /**
     * @param {string} url 
     */
    setUrl(url) {
        this.url = url;
        return this;
    }

    setTtl(seconds) {
        this.ttl = seconds * 1000;
        return this;
    }

    async ensureUpdated() {
        if (this.needsUpdate()) {
            await this.update();
        }    
    }

    needsUpdate() {
        let now = new Date().getTime();
        let ttl = this.ttl || 86400;
        return !this.timeUpdated || ttl < now - this.timeUpdated;
    }

    async update() {
        let xmlDoc = await requestXml(this.url);
        this.processXml(xmlDoc);
        this._save();
    }

    processXml(xmlDoc) {
        throw Error('not implemented');
    }

    /**
     * @protected
     * @return {object|null}
     */
    _loadCachedData() {
        let data = super._loadCachedData();
        if (data) {
            this.timeUpdated = data.timeUpdated;
        }
    }

    /**
     * @protected
     */
    _beforeSave() {
        this.timeUpdated = new Date().getTime();
    }

    /**
     * @protected
     * @return {object}
     */
    _getCacheableData() {
        return {
            props: this.props,
            timeUpdated: this.timeUpdated
        };
    }


}


export { RemoteConfig }