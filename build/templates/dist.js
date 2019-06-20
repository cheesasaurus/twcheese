/*! Tool setup compiled from ___SCRIPT___
 *---------------------------------------------------------------------*/
(function() {
    let toolId = '___TOOL_ID___';

    ___TWCHEESE___

    if (!TwCheese.hasTool(toolId)) {        
        ___COMPILED_TOOL_SETUP___
    }

    TwCheese.useTool(toolId);
})();