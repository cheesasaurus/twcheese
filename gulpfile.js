const { series, src, dest } = require('gulp');
const interpolate = require('./build/lib/gulp-interpolate.js');
const replaceContent = require('./build/lib/gulp-replace-content.js');
const fs = require('fs');


let projectFilename = function(file) {
    return file.path
            .replace(file.cwd, '')
            .replace(/\\/g, '/');
}


let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');
let esmReplacements = new Map([
    ['___SCRIPT___', projectFilename],
    [/useTool/g, 'blahBlahBlucci']
]);


function testSpawnTemplates() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(interpolateFilename('___SCRIPT___'))
        .pipe(dest('temp/'));
}

function testInterpolate() {
    return src('build/templates/launch-esm.js')
        .pipe(interpolate(esmReplacements))
        .pipe(dest('temp/'));
}

exports.testInterpolate = series(testInterpolate);
exports.testSpawnTemplates = series(testSpawnTemplates);