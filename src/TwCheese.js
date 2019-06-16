if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: '___HOSTING_ROOT___',
        toolsLoaded: [],
        actions: {},
        loadTool: function(url, onready) {
            let module = document.createElement('script');
            module.type = 'module';
            module.onload = () => {
                this.markToolLoaded(url);
                onready();
            }    
            module.src = this.ROOT + url;
            document.head.appendChild(module);
        },
        isToolLoaded: function(url) {
            return this.toolsLoaded.includes(url);
        },
        markToolLoaded: function(url) {
            this.toolsLoaded.push(url);
        }
    };
}