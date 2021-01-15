const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest, series } = gulp;
const beautify = require('gulp-jsbeautifier');
const header = require('gulp-header');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const fs = require('fs');
const webpack = require('webpack');
const interpolate = require(`${ROOT}/build/lib/gulp-interpolate.js`);
const replaceContent = require(`${ROOT}/build/lib/gulp-replace-content.js`);
const { prependToEachLine } = require(`${ROOT}/build/lib/string.js`);

const config = require(`${ROOT}/build/tasks.config.js`);
let stagingDir = `${ROOT}/temp/webpack/`;

function compileToolSetup(done) {
    fs.readdir(`${ROOT}/src/ToolSetup`, function(err, items) {
        let webpackConfigs = [];
        for (item of items) {
            if (item === 'Sidebar.js') {
                continue;
            }
            webpackConfigs.push({
                entry: [
                    path.resolve(`${ROOT}/src/ToolSetup`, item),
                    `${ROOT}/src/ToolSetup/Sidebar.js`
                ],
                output: {
                    path: stagingDir,
                    filename: item
                },
                resolve: {
                    alias: {
                        '/twcheese': ROOT
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

let compiledToolSetup = function(file) {
    return fs.readFileSync(stagingDir + file.relative, 'utf8');
}

let templateDist= fs.readFileSync(`${ROOT}/build/templates/dist.js`, 'utf8');

let _vendorLibsIndented;
let vendorLibsIndented = function() {
    if (typeof _vendorLibsIndented === 'undefined') {
        let vendorLibs = fs.readFileSync(`${ROOT}/dist/vendor.js`, 'utf8');
        _vendorLibsIndented = prependToEachLine(' '.repeat(8), vendorLibs);
    }
    return _vendorLibsIndented;
}


function applyDistTemplate() {
    return src([`${ROOT}/src/ToolSetup/*.js`, `!${ROOT}/src/ToolSetup/Sidebar.js`])
        .pipe(replaceContent(templateDist))
        .pipe(header(config.templates.header))
        .pipe(interpolate(config.interpolate))
        .pipe(beautify())
        .pipe(interpolate([
            ['___COMPILED_TOOL_SETUP___', (file) => prependToEachLine(' '.repeat(8), compiledToolSetup(file))],
            ['___VENDOR_LIBS___', vendorLibsIndented]
        ]))
        .pipe(dest(`${ROOT}/dist/tool/`));
}


function minify() {
    return src(`${ROOT}/dist/tool/*.js`)
        .pipe(uglify({
            output: {
                comments: 'some'
            }
        }))
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(dest(`${ROOT}/dist/tool/`));
}


gulp.task('buildDist', series(compileToolSetup, applyDistTemplate, minify));
