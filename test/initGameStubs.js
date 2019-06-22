const fs = require('fs');

window.TwCheese = {
    ROOT: fs.readFileSync('conf/host').toString().trim()
};

window.server_utc_diff = 3600;

window.Timing = {
    getCurrentServerTime: () => 1560761394661
};
