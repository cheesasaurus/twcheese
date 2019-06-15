const { series, parallel, src, dest } = require('gulp');
const beautify = require('gulp-jsbeautifier');
const interpolate = require('./build/lib/gulp-interpolate.js');
const replaceContent = require('./build/lib/gulp-replace-content.js');
const fs = require('fs');
const webpack = require('./build/lib/webpack-stream-keepname.js');


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

let replacements = new Map([
    ['___SCRIPT___', projectFilename],
    ['___TOOL_USE___', toolUse],
    ['___TWCHEESE___', twcheese],
    ['___HOSTING_ROOT___', hostingRoot]
]);

// build es module launchers

let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');

function buildEsModuleLaunchers() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(interpolate(replacements))
        .pipe(beautify())
        .pipe(dest('launch/esm/'));
}

// build dist

let compiledToolSetupDir = 'temp/webpack/';

let compiledToolSetup = function(file) {
    return fs.readFileSync(compiledToolSetupDir + file.relative, 'utf8');
}

function compileToolSetup() {
    return src('src/ToolSetup/example.js')
        .pipe(webpack({
            resolve: {
                alias: {
                    '/twcheese': __dirname
                }
            },
            optimization: {
                minimize: true
            },
            mode: 'production'
        }))
        .pipe(dest(compiledToolSetupDir));;
}

let templateDist= fs.readFileSync('build/templates/dist.js', 'utf8');

function applyDistTemplate() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateDist))
        .pipe(interpolate(replacements))
        .pipe(beautify())
        .pipe(interpolate([
            ['___COMPILED_TOOL_SETUP___', compiledToolSetup]
        ]))
        .pipe(dest('dist/'));
}

let buildDist = series(compileToolSetup, applyDistTemplate);

exports.buildEsModuleLaunchers = series(buildEsModuleLaunchers);
exports.buildDist = buildDist;
exports.default = parallel(buildEsModuleLaunchers, buildDist);