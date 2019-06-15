const { series, src, dest } = require('gulp');
const interpolateFilename = require('./build/lib/gulp-interpolate-filename.js');

//'build/templates/launch-esm.js'

function testReplace() {
    return src('build/templates/launch-esm.js')
        .pipe(interpolateFilename('___SCRIPT___'))
        .pipe(dest('temp/'));
}

exports.buildLaunchersESM = series(testReplace);