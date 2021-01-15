const path = require('path');
const ROOT = path.resolve(__dirname, '../');

const fs = require('fs');
const { prependToEachLine } = require(`${ROOT}/build/lib/string.js`);
const exec = require(`${ROOT}/build/lib/exec.js`);

let hostingRoot = fs.readFileSync(`${ROOT}/conf/host`, 'utf8').trim();

let headerTemplate = fs.readFileSync(`${ROOT}/build/templates/header`, 'utf8');
let license = fs.readFileSync(`${ROOT}/build/templates/gpl-3.0`, 'utf8');
headerTemplate = headerTemplate.replace('___LICENSE___', prependToEachLine(' * ', license));

let toolDoc = function(file) {
    return fs.readFileSync(`${ROOT}/src/ToolDoc/${file.stem}`, 'utf8');
}

let _version;
let version = async function () {
    if (typeof _version === 'undefined') {
        _version = (await exec('git', ['describe', '--tags'])).trim();
    }
    return _version;
}

module.exports = {
    hostingRoot: hostingRoot,
    templates: {
        header: headerTemplate
    },
    interpolate: new Map([
        ['___FILE___', (file) => file.relative ],
        ['___SCRIPT___', (file) => file.path.replace(file.cwd, '').replace(/\\/g, '/') ],
        ['___TOOL_ID___', (file) => file.stem ],
        ['___TOOL_DOC___', (file) => prependToEachLine(' * ', toolDoc(file)) ],
        ['___TWCHEESE___', fs.readFileSync(`${ROOT}/src/TwCheese.js`, 'utf8') ],
        ['___HOSTING_ROOT___', hostingRoot],
        ['___VERSION___', version]
    ])
};
