const fs = require('fs');

function domSample(filename) {
    let html = fs.readFileSync(`test/data/html/${filename}`).toString();
    return jQuery.parseHTML(html);
}

export { domSample };