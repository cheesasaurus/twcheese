(function() {
    let tool = '___TOOL_ID___';

    let useTool = function() {
        ___TOOL_USE___
    };

    ___TWCHEESE___
    
    if (TwCheese.isToolLoaded(tool)) {
        useTool();
    } else {
        TwCheese.loadTool(tool, useTool);
    }
})();