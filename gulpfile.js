const { series, src, dest } = require('gulp');
const { Transform } = require('stream');
// const { through2 } = require('through2');

let replaceTokenWithFilename = new Transform({objectMode: true});
replaceTokenWithFilename._transform = function(file, encoding, callback) {
    let error = null;

    if (file.isNull()) {
        return callback(null, file);
    }
    else if (file.isStream()) {
        // file.contents is a Stream - https://nodejs.org/api/stream.html
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

        // or, if you can handle Streams:
        //file.contents = file.contents.pipe(...
        //return callback(null, file);
    }
    else if (file.isBuffer()) {
        let contents = file.contents.toString();
        file.contents = Buffer.from(contents.replace('___SCRIPT___', file.relative));
    }
    console.log(file.isStream(), file.isBuffer());
    callback(error, file);
}

//'build/templates/launch-esm.js'

function testReplace() {
    return src('build/templates/launch-esm.js')
        .pipe(replaceTokenWithFilename)
        .pipe(dest('temp/'));
}

exports.buildLaunchersESM = series(testReplace);