const gulp = require('gulp');
const { src, dest } = gulp;
const interpolate = require('../lib/gulp-interpolate.js');
const replaceContent = require('../lib/gulp-replace-content.js');
const rename = require('gulp-rename');
const fs = require('fs');
const YAML = require('yaml');

let templateDebugProcess = fs.readFileSync('build/templates/debug-process.js', 'utf8');

function yamlToJson(file) {
    let contents = fs.readFileSync(file.path, 'utf8');
    return JSON.stringify(YAML.parse(contents));
}

gulp.task('buildDebugProcessCfg', function() {
    return (src('src/ToolDebug/**/*.yml'))
        .pipe(replaceContent(templateDebugProcess))
        .pipe(interpolate([
            ['___OBJECT_LITERAL___', yamlToJson ]
        ]))
        .pipe(rename(path => path.extname = ".js"))
        .pipe(dest('dist/tool/cfg/debug/'));
});
