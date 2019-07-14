import { RemoteConfig } from '/twcheese/src/Models/RemoteConfig.js';


let buildingConfig = (new RemoteConfig('twcheese.buildingConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_building_info`)
    .setTtl(8 * 3600);


export { buildingConfig };