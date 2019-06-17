const gulp = require('gulp');
const { src, dest } = gulp;
const fs = require('fs');
const header = require('gulp-header');
const beautify = require('gulp-jsbeautifier');
const interpolate = require('../lib/gulp-interpolate.js');
const replaceContent = require('../lib/gulp-replace-content.js');


const config = require('../tasks.config.js');
let templateLaunchESM = fs.readFileSync('build/templates/launch-esm.js', 'utf8');

gulp.task('buildEsModuleLaunchers', function() {
    return src('src/ToolSetup/*.js')
        .pipe(replaceContent(templateLaunchESM))
        .pipe(header(config.templates.header))
        .pipe(interpolate(config.interpolate))
        .pipe(beautify())
        .pipe(dest('launch/esm/'));
});
