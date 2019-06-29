/*!
 * ___TOOL_ID___ tool compiled from:
 *     ___SCRIPT___
 * Sidebar compiled from:
 *     src/ToolSetup/Sidebar.js
 * Vendor libs from:
 *     vendor/
 *---------------------------------------------------------------------*/
(async function() {
    let toolId = '___TOOL_ID___';

    if (typeof window.TwCheese === 'undefined') {
        ___TWCHEESE___
        
        await TwCheese.loadVendorLibsMinified('___VENDOR_HASH___');
        await TwCheese.loadToolCompiled('Sidebar', '___SIDEBAR_HASH___');
        TwCheese.useTool('Sidebar');
    }
    
    if (TwCheese.hasTool(toolId)) {
        TwCheese.useTool(toolId);
    } else {
        await TwCheese.loadToolCompiled(toolId, '___TOOL_SETUP_HASH___');
        TwCheese.useTool(toolId);
    }
})();