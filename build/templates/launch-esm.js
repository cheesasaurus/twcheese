(function() {
    let script = '___SCRIPT___';

    let useTool = function() {
        ___TOOL_USE___
    };

    ___TWCHEESE___
    
    if (TwCheese.scripts.includes(script)) {
        useTool();
    } else {
        TwCheese.prepareScript(script, useTool);
    }
})();