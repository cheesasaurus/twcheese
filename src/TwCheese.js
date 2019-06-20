if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: '___HOSTING_ROOT___',
        actions: {},
        tools: {},
        loadTool: function(toolId, onready) {
            let module = document.createElement('script');
            module.type = 'module';
            module.onload = () => {
                onready();
            }    
            module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
            document.head.appendChild(module);
        },
        hasTool: function(toolId) {
            return typeof this.tools[toolId] === 'function';
        },
        registerTool: function(toolId, func) {
            this.tools[toolId] = func;
        },
        useTool: function(toolId) {
            this.tools[toolId]();
        },
        tryUseTool: function(toolId) {
            if (!this.hasTool(toolId)) {
                return false;
            }
            this.useTool(toolId);
            return true;
        }
    };
}