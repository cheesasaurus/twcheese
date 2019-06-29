const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest, series } = gulp;
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const fs = require('fs');
const webpack = require('webpack');

const config = require('../tasks.config.js');


function compileToolSetup(done) {
    fs.readdir(`${ROOT}/src/ToolSetup`, function(err, items) {
        let webpackConfigs = [];
        for (item of items) {
            webpackConfigs.push({
                entry: path.resolve(`${ROOT}/src/ToolSetup`, item),
                output: {
                    path: `${ROOT}/dist/tool/setup-only/`,
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


function minifyToolSetup() {
    return src([`${ROOT}/dist/tool/setup-only/*.js`])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            output: {
                comments: 'some'
            }
        }))
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(sourcemaps.write('sourcemaps', {
            sourceMappingURLPrefix: `${config.hostingRoot}/dist/tool/setup-only`
        }))
        .pipe(dest(`${ROOT}/dist/tool/setup-only/`));
}



gulp.task('buildToolSetup', series(compileToolSetup, minifyToolSetup));
