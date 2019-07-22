
/**
 * @param {HTMLDocument} gameDoc 
 */
function scrapeScavengeData(gameDoc) {
    let code = findScavengeScreenDataCode(gameDoc);

    let dataFromParams = parseScavengeScreenDataCode(code);

    return {
        optionsConfig: dataFromParams.optionsConfig,
        troops: dataFromParams.troops,
        // todo: village. was changed in the update a couple hours ago, so it's no longer passed as a param
    };
}


/**
 * @param {string} code 
 */
function parseScavengeScreenDataCode(code) {
    let optionsConfigStartIndex = code.indexOf('{');
    let optionsConfigCode = wrappedCode(code, optionsConfigStartIndex, '{', '}');

    let troopsCode;
    let troopsStartIndex = optionsConfigStartIndex + optionsConfigCode.length;
    for (; troopsStartIndex < code.length; troopsStartIndex++) {
        if (code[troopsStartIndex] === '{') {
            troopsCode = wrappedCode(code, troopsStartIndex, '{', '}');
            break;
        }
    }

    return {
        optionsConfig: JSON.parse(optionsConfigCode),
        troops: JSON.parse(troopsCode)
    };
}


/**
 * @param {HTMLDocument} gameDoc 
 */
function findScavengeScreenDataCode(gameDoc) {
    let scripts = gameDoc.getElementsByTagName('script');
    
    for (let script of scripts) {
        let code = script.innerHTML;
        let search = 'new ScavengeScreen';
        let startIndex = code.indexOf(search);
        if (startIndex !== -1) {
            startIndex += search.length;
            return wrappedCode(code, startIndex, '(', ')');
        }
    }
}


/**
 * @param {string} string 
 * @param {number} firstParenIndex 
 * @param {string} openingChar 
 * @param {string} closingChar 
 */
function wrappedCode(string, firstParenIndex, openingChar = '(', closingChar = ')') {
    let openingParens = 1;
    let closingParens = 0;
    let lastParenIndex = -1;
    
    for (let i = firstParenIndex + 1; i < string.length; i++) {
        let char = string[i];
        if (char === openingChar) {
            openingParens++;
        }
        if (char === closingChar) {
            closingParens++;
            lastParenIndex = i;
        }
        if (closingParens === openingParens) {
            return string.substring(firstParenIndex, lastParenIndex + 1);
        }
    }
}


export { scrapeScavengeData, findScavengeScreenDataCode, wrappedCode, parseScavengeScreenDataCode };