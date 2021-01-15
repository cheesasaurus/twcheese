const fs = require('fs');
const { JSDOM } = require('jsdom');

function domSample(filename) {
    let html = fs.readFileSync(`test/data/html/${filename}`).toString();
    return JSDOM.fragment(html).firstChild;
}

export { domSample };