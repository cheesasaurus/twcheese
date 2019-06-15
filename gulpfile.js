const { series, src, dest } = require('gulp');
const { Transform } = require('stream');
const { PluginError } = require('plugin-error');

/**
 * @param {String|RegExp} searchPattern 
 */
let replaceWithFilename = function(searchPattern) {
    let PLUGIN_NAME = 'replaceWithFilename';
    return new Transform({
        objectMode: true,
        transform: function(file, encoding, callback) {
            let filename = file.path.replace(file.cwd, '').replace(/\\/g, '/');
        
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
                file.contents = Buffer.from(contents.replace(searchPattern, filename));
            }
            callback(null, file);
        }
    });
};

//'build/templates/launch-esm.js'

function testReplace() {
    return src('build/templates/launch-esm.js')
        .pipe(replaceWithFilename('___SCRIPT___'))
        .pipe(dest('temp/'));
}

exports.buildLaunchersESM = series(testReplace);