const path = require('path');
const ROOT = path.resolve(__dirname, '../../');

const gulp = require('gulp');
const { src, dest } = gulp;
const fs = require('fs');
const crypto = require('crypto');
const header = require('gulp-header');
const beautify = require('gulp-jsbeautifier');
const interpolate = require('../lib/gulp-interpolate.js');
const replaceContent = require('../lib/gulp-replace-content.js');


const config = require('../tasks.config.js');
let templateLaunchOptimal = fs.readFileSync('build/templates/launch-optimal.js', 'utf8').toString();

let fileHash = function(filePath) {
    let contents = fs.readFileSync(filePath, 'utf8').toString();
    return crypto.createHash('md5').update(contents).digest('hex').toString();
}

gulp.task('buildOptimalLaunchers', function() {
    return src(['src/ToolSetup/*.js', '!src/ToolSetup/Sidebar.js'])
        .pipe(replaceContent(templateLaunchOptimal))
        .pipe(header(config.templates.header))
        .pipe(interpolate(config.interpolate))
        .pipe(interpolate(new Map([
            ['___VENDOR_HASH___', () => fileHash(`${ROOT}/dist/vendor.min.js`) ],
            ['___SIDEBAR_HASH___', () => fileHash(`${ROOT}/dist/tool/setup-only/Sidebar.min.js`) ],
            ['___TOOL_SETUP_HASH___', (file) => fileHash(`${ROOT}/dist/tool/setup-only/${file.stem}.min.js`) ]
        ])))
        .pipe(beautify())
        .pipe(dest('launch/'));
});
