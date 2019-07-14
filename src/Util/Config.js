import { Config } from '/twcheese/src/Models/Config.js';
import { RemoteConfig } from '/twcheese/src/Models/RemoteConfig.js';

let userConfig = new Config('twcheese.userConfig');

let gameConfig = (new RemoteConfig('twcheese.gameConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_config`)
    .setTtl(8 * 3600);

let buildingConfig = (new RemoteConfig('twcheese.buildingConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_building_info`)
    .setTtl(8 * 3600);

let troopConfig = (new RemoteConfig('twcheese.troopConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_unit_info`)
    .setTtl(8 * 3600);


async function ensureRemoteConfigsUpdated() {
    await Promise.all([
        gameConfig.ensureUpdated(),
        troopConfig.ensureUpdated(),
        buildingConfig.ensureUpdated()
    ]);
}
    

export {
    userConfig,
    gameConfig,
    buildingConfig,
    troopConfig,
    ensureRemoteConfigsUpdated
};