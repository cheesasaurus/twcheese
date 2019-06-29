const { Transform } = require('stream');
const { PluginError } = require('plugin-error');

const PLUGIN_NAME = 'interpolate';

/**
 * @param {string} string
 * @param {Map} replacements
 * @param {Vinyl} file
 * @return {string}
 */
let interpolate = async function(string, replacements, file) {
    for (let [pattern, replacement] of replacements) {
        if (!(pattern instanceof RegExp)) {
            pattern = new RegExp(pattern, 'g');
        }
        if (typeof replacement === 'function') {
            replacement = await replacement(file);
        }
        string = string.replace(pattern, replacement);
    }
    return string;
}


/**
 * @callback createReplacement
 * @param {Vinyl} file
 * @return string
 */

/**
 * @param {Map.<string|RegExp, string|createReplacement>} replacements mapping of patterns to replacements
 * 
 *      A pattern can be a string or RegExp.
 * 
 *      A replacement can be a string or function. If it's a function, it will be passed one param:
 *          - the Vinyl being processed
 */
module.exports = function(replacements) {
    return new Transform({
        objectMode: true,
        transform: async function(file, encoding, callback) {
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
                let oldContent = file.contents.toString();                
                file.contents = Buffer.from(await interpolate(oldContent, replacements, file));
            }
            callback(null, file);
        }
    });
};
