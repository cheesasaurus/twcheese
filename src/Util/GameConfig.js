import { RemoteConfig } from '/twcheese/src/Models/RemoteConfig.js';


let gameConfig = (new RemoteConfig('twcheese.gameConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_config`)
    .setTtl(8 * 3600);


export { gameConfig };