const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest, series } = gulp;
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
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
        .pipe(dest('dist/'));
}


function minify() {
    return src('dist/vendor.js')
    .pipe(uglify({
        output: {
            comments: 'some'
        }
    }))
    .pipe(rename(function(path) {
        path.extname = '.min.js';
    }))
    .pipe(dest('dist/'));
}


gulp.task('buildVendorLibs', series(concatLibs, applyTemplate, minify));