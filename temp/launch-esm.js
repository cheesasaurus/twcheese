(function() {
    let script = '/build/templates/launch-esm.js';

    let blahBlahBlucci = function() {
        ___TOOL_USE___
    };

    ___TWCHEESE___
    
    if (TwCheese.scripts.includes(script)) {
        console.log('using...'); // TODO: remove this after tested
        blahBlahBlucci();
    } else {
        console.log('preparing script...'); // TODO: remove this after tested
        TwCheese.prepareScript(script, blahBlahBlucci);
    }
})();