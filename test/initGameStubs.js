const fs = require('fs');

window.TwCheese = {
    ROOT: fs.readFileSync('conf/host').toString().trim()
};

window.image_base = 'https://dsen.innogamescdn.com/asset/5cfabaf2/graphic/';
window.server_utc_diff = 3600;

window.game_data = {
    market: 'en'
};

window.Timing = {
    getCurrentServerTime: () => 1560761394661
};
