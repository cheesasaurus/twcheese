

function getProp(object, propPath, defaultValue) {
    let tokens = propPath.split('.');
    for (let i = 0; i < tokens.length - 1; i++) {
        let token = tokens[i];
        if (typeof object[token] !== 'object' || token === null) {
            return defaultValue;
        }
        object = object[token];
    }
    return object[tokens[tokens.length - 1]];
}


function setProp(object, propPath, value) {
    let tokens = propPath.split('.');
    for (let i = 0; i < tokens.length - 1; i++) {
        let token = tokens[i];
        if (typeof object[token] !== 'object' || token === null) {
            object[token] = {};
        }
        object = object[token];
    }
    object[tokens[tokens.length - 1]] = value;
}


export { getProp, setProp };