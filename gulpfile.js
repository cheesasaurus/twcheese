const gulp = require('gulp');
const { series, parallel } = gulp;
const HubRegistry = require('gulp-hub');

let hub = new HubRegistry(['build/tasks/*.js']);
gulp.registry(hub);

gulp.task('buildAll', series(
    parallel(
        'buildEsModuleLaunchers',
        series('buildDist', 'buildDistLaunchers')
    ),
    series('buildQuickbarLinks')
));

gulp.task('default', series('buildAll'));