(async function() {
    let toolId = '___TOOL_ID___';

    if (typeof window.TwCheese === 'undefined') {
        ___TWCHEESE___

        await TwCheese.loadVendorLibs();
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