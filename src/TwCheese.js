if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: '___HOSTING_ROOT___',
        toolsLoaded: [],
        actions: {},
        loadTool: function(toolId, onready) {
            let module = document.createElement('script');
            module.type = 'module';
            module.onload = () => {
                this.markToolLoaded(toolId);
                onready();
            }    
            module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
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