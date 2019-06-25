if (typeof window.TwCheese === 'undefined') {
    window.TwCheese = {
        ROOT: '___HOSTING_ROOT___',
        actions: {},
        tools: {},
        lastToolUsedId: null,
        loadTool: async function(toolId) {
            return new Promise((resolve) => {
                let module = document.createElement('script');
                module.type = 'module';
                module.onload = () => {
                    resolve();
                }    
                module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
                document.head.appendChild(module);
            });            
        },
        hasTool: function(toolId) {
            return typeof this.tools[toolId] !== 'undefined';
        },
        registerTool: function(tool) {
            this.tools[tool.id] = tool;
        },
        useTool: function(toolId) {
            this.lastToolUsedId = toolId;
            this.tools[toolId].use();
        },
        tryUseTool: function(toolId) {
            if (!this.hasTool(toolId)) {
                return false;
            }
            this.useTool(toolId);
            return true;
        },
        newDebugProcess: function(toolId) {
            if (!this.hasTool(toolId)) {
                return null;
            }
            return this.tools[toolId].getDebugProcess();
        }
    };
}