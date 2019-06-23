import { SidebarWidget } from '/twcheese/src/Widget/SidebarWidget.js';

TwCheese.registerTool({
    id: 'Sidebar',
    use: () => {
        let widget = new SidebarWidget();
        widget.appendTo($('body'));
    },
    getDebugProcess: () => null
});
