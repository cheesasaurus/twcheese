const { series, parallel, src, dest } = require('gulp');
const beautify = require('gulp-jsbeautifier');
const header = require('gulp-header');
const interpolate = require('./build/lib/gulp-interpolate.js');
const replaceContent = require('./build/lib/gulp-replace-content.js');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const { prependToEachLine } = require('./build/lib/string.js');


let projectFilename = function(file) {
    return file.path
            .replace(file.cwd, '')
            .replace(/\\/g, '/');
}

let toolUse = function(file) {
    return fs.readFileSync(`src/ToolUse/${file.relative}`, 'utf8');
}

let toolDoc = function(file) {
    return fs.readFileSync(`src/ToolDoc/${file.stem}`, 'utf8');
}

let twcheese = fs.readFileSync('src/TwCheese.js', 'utf8');
let hostingRoot = fs.readFileSync('conf/host', 'utf8');

let headerTemplate = fs.readFileSync('build/templates/header', 'utf8');
let license = fs.readFileSync('build/templates/gpl-3.0', 'utf8');
headerTemplate = headerTemplate.replace('___LICENSE___', prependToEachLine(' * ', license));

let replacements = new Map([
    ['___SCRIPT___', projectFilename],
    ['___TOOL_USE___', toolUse],
    ['___TWCHEESE___', twcheese],
    ['___HOSTING_ROOT___', hostingRoot],
    ['___TOOL_DOC___', (file) => prependToEachLine(' * ', toolDoc(file))]
]);

// build es module launchers

let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');

function buildEsModuleLaunchers() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(header(headerTemplate))
        .pipe(interpolate(replacements))
        .pipe(beautify())
        .pipe(dest('launch/esm/'));
}

// build dist

let compiledToolSetupDir = './temp/webpack/';

let compiledToolSetup = function(file) {
    return fs.readFileSync(compiledToolSetupDir + file.relative, 'utf8');
}

function compileToolSetup(done) {    
    fs.readdir('./src/ToolSetup', function(err, items) {
        let webpackConfigs = [];
        for (item of items) {
            webpackConfigs.push({
                entry: './src/ToolSetup/' + item,
                output: {
                    path: path.resolve(compiledToolSetupDir),
                    filename: item
                },
                resolve: {
                    alias: {
                        '/twcheese': __dirname
                    }
                },
                optimization: {
                    minimize: false
                },
                mode: 'production'
            });
        }
        webpack(webpackConfigs, (err, stats) => done());
    });
}

let templateDist= fs.readFileSync('build/templates/dist.js', 'utf8');

function applyDistTemplate() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateDist))
        .pipe(header(headerTemplate))
        .pipe(interpolate(replacements))
        .pipe(beautify())
        .pipe(interpolate([
            ['___COMPILED_TOOL_SETUP___', (file) => prependToEachLine(' '.repeat(8), compiledToolSetup(file))]
        ]))
        .pipe(dest('dist/'));
}

let buildDist = series(compileToolSetup, applyDistTemplate);

exports.buildEsModuleLaunchers = series(buildEsModuleLaunchers);
exports.buildDist = buildDist;
exports.default = parallel(buildEsModuleLaunchers, buildDist);