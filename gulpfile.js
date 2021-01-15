const gulp = require('gulp');
const { series, parallel } = gulp;
const HubRegistry = require('gulp-hub');

let hub = new HubRegistry(['build/tasks/*.js']);
gulp.registry(hub);

gulp.task('buildAll', series(
    'purge',
    'buildDebugProcessCfg',
    parallel(
        'buildVendorLibs',
        'buildToolSetup'
    ),
    parallel(
        'buildEsModuleLaunchers',
        'buildOptimalLaunchers',
        'buildDist'
    ),
    'buildQuickbarLinks'
));

gulp.task('default', series('buildAll'));