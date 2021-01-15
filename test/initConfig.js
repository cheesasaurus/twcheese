import {
    gameConfig,
    buildingConfig,
    troopConfig
} from '/twcheese/src/Util/Config.js';

const fs = require('fs');

let troopCachedData = JSON.parse(fs.readFileSync('test/data/config/troops-no-archer.json').toString().trim());
troopConfig.initProps(troopCachedData.props);