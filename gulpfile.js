const { series, src, dest } = require('gulp');
const interpolateFilename = require('./build/lib/gulp-interpolate-filename.js');
const replaceContent = require('./build/lib/gulp-replace-content.js');
const fs = require('fs');


let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');

function testSpawnTemplates() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(interpolateFilename('___SCRIPT___'))
        .pipe(dest('temp/'));
}

function testInterpolate() {
    return src('build/templates/launch-esm.js')
        .pipe(interpolateFilename('___SCRIPT___'))
        .pipe(dest('temp/'));
}

exports.testInterpolate = series(testInterpolate);
exports.testSpawnTemplates = series(testSpawnTemplates);