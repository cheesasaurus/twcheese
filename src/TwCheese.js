if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: '___HOSTING_ROOT___',
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