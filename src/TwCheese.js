window.TwCheese = {
    ROOT: '___HOSTING_ROOT___',
    version: '___VERSION___',
    actions: {},
    tools: {},
    lastToolUsedId: null,

    loadVendorLibs: async function() {
        return new Promise((resolve) => {
            $.ajax(`${this.ROOT}/dist/vendor.js`, { complete: resolve });
        });
    },
    loadVendorLibsMinified: async function(cacheBuster) {
        return new Promise((resolve) => {
            $.ajax(`${this.ROOT}/dist/vendor.min.js?${cacheBuster}`, {
                cache: true,
                complete: resolve
            });
        });
    },
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
    loadToolCompiled: async function(toolId, cacheBuster) {
        return new Promise((resolve) => {
            $.ajax(`${this.ROOT}/dist/tool/setup-only/${toolId}.min.js?${cacheBuster}`, {
                cache: true,
                complete: resolve
            });
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