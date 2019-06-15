(function() {
    let script = '/build/templates/launch-esm.js';

    let useTool = function() {
        ___TOOL_USE___
    };

    ___TWCHEESE___
    
    if (TwCheese.scripts.includes(script)) {
        console.log('using...'); // TODO: remove this after tested
        useTool();
    } else {
        console.log('preparing script...'); // TODO: remove this after tested
        TwCheese.prepareScript(script, useTool);
    }
})();