(async function() {
    let toolId = '___TOOL_ID___';

    ___TWCHEESE___

    if (!TwCheese.hasTool('Sidebar')) {
        await TwCheese.loadTool('Sidebar');
        TwCheese.useTool('Sidebar');
    }
    
    if (TwCheese.hasTool(toolId)) {
        TwCheese.useTool(toolId);
    } else {
        await TwCheese.loadTool(toolId);
        TwCheese.useTool(toolId);
    }
})();