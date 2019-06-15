const { series, src, dest } = require('gulp');
const beautify = require('gulp-jsbeautifier');
const interpolate = require('./build/lib/gulp-interpolate.js');
const replaceContent = require('./build/lib/gulp-replace-content.js');
const fs = require('fs');


let projectFilename = function(file) {
    return file.path
            .replace(file.cwd, '')
            .replace(/\\/g, '/');
}

let toolUse = function(file) {
    return fs.readFileSync(`src/ToolUse/${file.relative}`, 'utf8');
}

let twcheese = fs.readFileSync('src/TwCheese.js', 'utf8');
let hostingRoot = fs.readFileSync('conf/host', 'utf8');

// build esm launchers

let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');
let esmReplacements = new Map([
    ['___SCRIPT___', projectFilename],
    ['___TOOL_USE___', toolUse],
    ['___TWCHEESE___', twcheese],
    ['___HOSTING_ROOT___', hostingRoot]
]);

function buildEsModuleLaunchers() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(interpolate(esmReplacements))
        .pipe(beautify())
        .pipe(dest('launch/esm/'));
}

// todo: build dist

exports.buildEsModuleLaunchers = series(buildEsModuleLaunchers);