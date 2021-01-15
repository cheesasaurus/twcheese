let prependToEachLine = function(prepend, str) {
    let lines = str.split("\n");

    let prep = new Array(lines.length * 3 - 1);
    for (let i = 0; i < prep.length; i += 3) {
        prep[i] = prepend;
        prep[i + 1] = lines[i / 3];
        if (i + 2 < prep.length) {
            prep[i + 2] = "\n";
        }        
    }
    return prep.join('');
}

module.exports.prependToEachLine = prependToEachLine;