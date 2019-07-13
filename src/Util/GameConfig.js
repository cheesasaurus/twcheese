import { RemoteConfig } from '/twcheese/src/Models/RemoteConfig.js';


class GameConfig extends RemoteConfig {
    processXml(xmlDoc) {
        let $xml = $(xmlDoc);
        let floatVal = selector => parseFloat($xml.find(selector).html());
        
        this.props = {
            speed: floatVal('speed'),
            unit_speed: floatVal('unit_speed'),
            archer: floatVal('game > archer'),
            knight: floatVal('game > knight'),
        };
    }
}


let gameConfig = (new GameConfig())
    .setUrl(`https://${document.domain}/interface.php?func=get_config`)
    .setTtl(8 * 3600);


export { gameConfig };