const path = require('path');
const ROOT = path.resolve(__dirname, '../../');
const gulp = require('gulp');
const clean = require('clean-directory');

let dirs = [
    `${ROOT}/quickbar/`,
    `${ROOT}/launch/`,
    `${ROOT}/dist/`,
    `${ROOT}/temp/`
];

let cleanAsync = async function(dir) {
    return new Promise(function(resolve) {
        clean(dir, [], {}, resolve);
    });
};

gulp.task('purge', async function() {
    return Promise.all(dirs.map(cleanAsync));
});
