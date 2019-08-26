import { ScavengeOption } from '/twcheese/src/Models/ScavengeOption.js';


/**
 * @param {HTMLDocument} gameDoc
 * @return {Map<number, ScavengeOption>}
 */
function scrapeScavengeModels(gameDoc) {
    let data = scrapeScavengeData(gameDoc);
    let optionBases = data.optionsConfig;

    let options = new Map();
    for (let optionId of Object.keys(optionBases)) {
        options.set(parseInt(optionId), new ScavengeOption(optionBases[optionId]));
    }

    return {
        options,
        sendableTroopTypes: Object.keys(data.troops)
    };
}


/**
 * @param {HTMLDocument} gameDoc 
 */
function scrapeScavengeData(gameDoc) {
    let jsCode = findScavengeScreenJsCode(gameDoc);

    let paramCode = findScavengeScreenParamCode(jsCode);
    let dataFromParams = parseScavengeScreenParamCode(paramCode);
    
    let villageCode = findVillageCode(jsCode);

    return {
        optionsConfig: dataFromParams.optionsConfig,
        troops: dataFromParams.troops,
        village: JSON.parse(villageCode)
    };
}


/**
 * @param {HTMLDocument} gameDoc 
 */
function findScavengeScreenJsCode(gameDoc) {
    let scripts = gameDoc.getElementsByTagName('script');
    
    for (let script of scripts) {
        let code = script.innerHTML;
        if (code.includes('new ScavengeScreen')) {
            return code;
        }
    }
}


/**
 * @param {string} jsCode
 * @return {string}
 */
function findScavengeScreenParamCode(jsCode) {
    let search = 'new ScavengeScreen';
    let startIndex = jsCode.indexOf(search) + search.length;
    return wrappedCode(jsCode, startIndex, '(', ')');
}


/**
 * @param {string} paramCode 
 */
function parseScavengeScreenParamCode(paramCode) {
    let optionsConfigStartIndex = paramCode.indexOf('{');
    let optionsConfigCode = wrappedCode(paramCode, optionsConfigStartIndex, '{', '}');

    let troopsCode;
    let troopsStartIndex = optionsConfigStartIndex + optionsConfigCode.length;
    for (; troopsStartIndex < paramCode.length; troopsStartIndex++) {
        if (paramCode[troopsStartIndex] === '{') {
            troopsCode = wrappedCode(paramCode, troopsStartIndex, '{', '}');
            break;
        }
    }

    return {
        optionsConfig: JSON.parse(optionsConfigCode),
        troops: JSON.parse(troopsCode)
    };
}


/**
 * @param {string} jsCode
 * @return {string}
 */
function findVillageCode(jsCode) {
    let search = 'var village = ';
    let startIndex = jsCode.indexOf(search) + search.length;
    return wrappedCode(jsCode, startIndex, '{', '}');
}


/**
 * @param {string} string 
 * @param {number} firstParenIndex 
 * @param {string} openingChar 
 * @param {string} closingChar 
 * @return {string}
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


export {
    scrapeScavengeModels,
    scrapeScavengeData,
    wrappedCode,
    findScavengeScreenJsCode,
    findScavengeScreenParamCode,
    parseScavengeScreenParamCode,
    findVillageCode
};