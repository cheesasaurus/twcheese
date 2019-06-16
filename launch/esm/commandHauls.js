(function() {
    let script = '/src/ToolSetup/commandHauls.js';

    let useTool = function() {
        if (game_data.screen === 'overview_villages' && game_data.mode === 'commands') {
            TwCheese.actions.promptCommandHauls();
        } else {
            alert('To use this, you must be on the commands overview. It\'s recommended to use the \'return\' filter, since outgoing troops don\'t carry resources :)');
        }
    };

    if (typeof window.TwCheese === 'undefined') {
        window.TwCheese = {
            ROOT: 'https://cheesasaurus.github.io/twcheese',
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

    if (TwCheese.scripts.includes(script)) {
        useTool();
    } else {
        TwCheese.prepareScript(script, useTool);
    }
})();