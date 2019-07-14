import { RemoteConfig } from '/twcheese/src/Models/RemoteConfig.js';


let troopConfig = (new RemoteConfig('twcheese.troopConfig'))
    .setUrl(`https://${document.domain}/interface.php?func=get_unit_info`)
    .setTtl(8 * 3600);


export { troopConfig };