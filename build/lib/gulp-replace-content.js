const { Transform } = require('stream');
const { PluginError } = require('plugin-error');

const PLUGIN_NAME = 'replace-content';

/**
 * Replace entire content of file
 * @param {String} newContent
 */
module.exports = function(newContent) {
    return new Transform({
        objectMode: true,
        transform: function(file, encoding, callback) {        
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
                file.contents = Buffer.from(newContent);
            }
            callback(null, file);
        }
    });
};
