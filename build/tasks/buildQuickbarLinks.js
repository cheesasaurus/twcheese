const gulp = require('gulp');
const { src, dest } = gulp;
const interpolate = require('../lib/gulp-interpolate.js');
const replaceContent = require('../lib/gulp-replace-content.js');
const rename = require('gulp-rename');
const fs = require('fs');
const config = require('../tasks.config.js');

let templateQuickbarLinks = fs.readFileSync('build/templates/quickbar-links', 'utf8');

gulp.task('buildQuickbarLinks', function() {
    return (src('launch/*.js'))
        .pipe(replaceContent(templateQuickbarLinks))
        .pipe(interpolate([
            ['___HOSTING_ROOT___', config.hostingRoot],
            ['___FILE___', (file) => file.relative]
        ]))
        .pipe(rename((path) => path.extname = ""))
        .pipe(dest('quickbar/'));
});
