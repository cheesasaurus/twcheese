/*! Tool setup compiled from ___SCRIPT___
 *---------------------------------------------------------------------*/
(function() {
    let toolId = '___TOOL_ID___';

    if (typeof window.TwCheese === 'undefined') {
        ___TWCHEESE___

        ___VENDOR_LIBS___
    }

    if (!TwCheese.hasTool(toolId)) {
        let sidebarInitd = TwCheese.hasTool('Sidebar');
        
        ___COMPILED_TOOL_SETUP___

        if (!sidebarInitd) {
            TwCheese.useTool('Sidebar');
        }    
    }

    TwCheese.useTool(toolId);
})();