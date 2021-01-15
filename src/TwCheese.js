
function handleJqXhrError(reject) {
    return function(jqxhr) {
        reject(new Error(`[${jqxhr.status} ${jqxhr.statusText}] ${this.type} ${this.url}`));
    }
}


window.TwCheese = {
    ROOT: '___HOSTING_ROOT___',
    version: '___VERSION___',
    tools: {},
    lastToolUsedId: null,

    async loadVendorLibs() {
        return new Promise((resolve, reject) => {
            $.ajax(`${this.ROOT}/dist/vendor.js`, {
                complete: resolve,
                error: handleJqXhrError(reject),
                dataType: "script"
            });
        });
    },

    async loadVendorLibsMinified(cacheBuster) {
        return new Promise((resolve, reject) => {
            $.ajax(`${this.ROOT}/dist/vendor.min.js?${cacheBuster}`, {
                cache: true,
                complete: resolve,
                error: handleJqXhrError(reject),
                dataType: "script"
            });
        });
    },

    async loadTool(toolId) {
        return new Promise((resolve) => {
            let module = document.createElement('script');
            module.type = 'module';
            module.onload = resolve;
            module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
            document.head.appendChild(module);
        });
    },

    async loadToolCompiled(toolId, cacheBuster) {
        return new Promise((resolve, reject) => {
            $.ajax(`${this.ROOT}/dist/tool/setup-only/${toolId}.min.js?${cacheBuster}`, {
                cache: true,
                complete: resolve,
                error: handleJqXhrError(reject),
                dataType: "script"
            });
        });         
    },

    hasTool(toolId) {
        return typeof this.tools[toolId] !== 'undefined';
    },

    registerTool(tool) {
        this.tools[tool.id] = tool;
    },

    useTool(toolId) {
        this.lastToolUsedId = toolId;
        this.tools[toolId].use();
    },

    tryUseTool(toolId) {
        if (!this.hasTool(toolId)) {
            return false;
        }
        this.useTool(toolId);
        return true;
    },

    newDebugProcess(toolId) {
        if (!this.hasTool(toolId)) {
            return null;
        }
        return this.tools[toolId].getDebugProcess();
    }

};