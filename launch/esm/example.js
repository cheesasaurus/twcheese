// todo: build pipeline
(function() {
    // line generated based on file name of /src/ToolUse/example.js
    // every file in ToolUse/ must have a corresponding file in ToolSetup/
    let script = '/src/ToolSetup/example.js';

    let useTool = function() {
        // content from /src/ToolSetup/example.js
        // wrapped in function "useTool"
        if (game_data.player.id % 2 === 0) {
            TwCheese.actions.exampleEven();
        } else {
            TwCheese.actions.exampleOdd();
        }
    };

    // content from src/TwCheese.js
    if (typeof window.TwCheese === 'undefined') {
        window.TwCheese = {
            ROOT: 'https://playground/twcheese', // pipeline should set ROOT, by replacing ___REPLACE_ME___
            // ROOT: 'https://cheesasaurus.github.io/twcheese', // TODO: ROOT should be easily configurable somewhere, somehow
            scripts: [],
            actions: {},
            prepareScript: function(script, onready) {
                let module = document.createElement('script');
                module.type = 'module';
                module.onload = () => {
                    console.log('loaded module successfully');
                    this.scripts.push(script);
                    onready();
                }    
                module.src = this.ROOT + script;
                document.head.appendChild(module);
            }        
        };
    }

    // this is just part of the template for esm/{file}.js
    if (TwCheese.scripts.includes(script)) {
        console.log('using...');
        useTool();
    } else {
        console.log('preparing script...');
        TwCheese.prepareScript(script, useTool);
    }
})();
// wrapped in iife
