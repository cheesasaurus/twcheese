(function() {
    let script = '/test-es6modules/test.js';

    let action = function() {
        TwCheese.actions.doSomething();
    };

    // the rest is boilerplate

    if (typeof window.TwCheese === 'undefined') {
        window.TwCheese = {
            // ROOT: 'https://playground/twcheese',
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
        console.log('doing action...');
        action();
    } else {
        console.log('preparing script...');
        TwCheese.prepareScript(script, action);
    }
})();
