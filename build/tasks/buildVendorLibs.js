const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest, series } = gulp;
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const interpolate = require(`${ROOT}/build/lib/gulp-interpolate.js`);
const fs = require('fs');
const { prependToEachLine } = require(`${ROOT}/build/lib/string.js`);


function concatLibs() {
    return src('vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(dest('temp/'));
}


function concatenatedLibs() {
    return fs.readFileSync(`${ROOT}/temp/vendor.js`, 'utf8');
}


function applyTemplate() {
    return src('build/templates/vendor.js')
        .pipe(interpolate([
            ['___VENDOR_CODE___', () => prependToEachLine(' '.repeat(4), concatenatedLibs())]
        ]))
        .pipe(minify({
            preserveComments: 'some',
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(dest('dist/'));
}


gulp.task('buildVendorLibs', series(concatLibs, applyTemplate));