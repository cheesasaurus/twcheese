const path = require('path');
const ROOT = path.resolve(__dirname, '../../');
const gulp = require('gulp');
const rimraf = require('rimraf');

let globs = [
    `${ROOT}/quickbar/**`,
    `${ROOT}/launch/**`,
    `${ROOT}/dist/**`,
    `${ROOT}/temp/**`
];

let rmrf = async function(glob) {
    return new Promise(function(resolve) {
        rimraf(glob, resolve);
    });
};

gulp.task('purge', async function() {
    return Promise.all(globs.map(rmrf));
});
