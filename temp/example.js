(function() {
    let script = '/src/ToolSetup/example.js';

    let useTool = function() {
        if (game_data.player.id % 2 === 0) {
    TwCheese.actions.exampleEven();
} else {
    TwCheese.actions.exampleOdd();
}

    };

    if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: 'https://playground/twcheese',
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
        console.log('using...'); // TODO: remove this after tested
        useTool();
    } else {
        console.log('preparing script...'); // TODO: remove this after tested
        TwCheese.prepareScript(script, useTool);
    }
})();