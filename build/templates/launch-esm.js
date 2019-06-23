(function() {
    let toolId = '___TOOL_ID___';

    ___TWCHEESE___

    if (!TwCheese.hasTool('Sidebar')) {
        TwCheese.loadTool('Sidebar', () => TwCheese.useTool('Sidebar'));
    }
    
    if (TwCheese.hasTool(toolId)) {
        TwCheese.useTool(toolId);
    } else {
        TwCheese.loadTool(toolId, () => TwCheese.useTool(toolId) );
    }
})();