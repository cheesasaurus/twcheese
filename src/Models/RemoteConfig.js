import { Config } from '/twcheese/src/Models/Config.js';
import { requestXml } from '/twcheese/src/Util/Network.js';


function parseXmlNode(node) {
    if (node.children.length === 0) {
        return parseFloat(node.innerHTML) || null;
    }
    let object = {};
    for (let childNode of node.children) {
        object[childNode.tagName] = parseXmlNode(childNode);
    }
    return object;
}


class RemoteConfig extends Config {

    /**
     * @param {string} url 
     */
    setUrl(url) {
        this.url = url;
        return this;
    }

    /**
     * @param {number} seconds 
     */
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
        this._processXml(xmlDoc);
        this._save();
    }

    /**
     * @protected
     * @param {XMLDocument} xmlDoc 
     */
    _processXml(xmlDoc) {
        this.props = parseXmlNode(xmlDoc).config;
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
        return Object.assign({}, super._getCacheableData(), {
            timeUpdated: this.timeUpdated
        });
    }

}


export { RemoteConfig }