const { Transform } = require('stream');
const { PluginError } = require('plugin-error');

const PLUGIN_NAME = 'interpolate-filename';

/**
 * Search file content for a pattern and replace occurrences with the filename
 * @param {String|RegExp} searchPattern
 */
module.exports = function(searchPattern) {
    if (!searchPattern instanceof RegExp) {
        searchPattern = new RegExp(searchPattern, 'g');
    }

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
