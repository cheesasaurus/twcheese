const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest, series } = gulp;
const minify = require('gulp-minify');
const fs = require('fs');
const webpack = require('webpack');


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
        .pipe(minify({
            preserveComments: 'some',
            noSource: true, // Because the non-minified file is already there. It's whats being minified!
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(dest(`${ROOT}/dist/tool/setup-only/`));
}



gulp.task('buildToolSetup', series(compileToolSetup, minifyToolSetup));
