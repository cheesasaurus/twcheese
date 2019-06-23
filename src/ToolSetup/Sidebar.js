import { SidebarWidget } from '/twcheese/src/Widget/SidebarWidget.js';


TwCheese.registerTool('Sidebar', function() {
    let widget = new SidebarWidget();
    widget.appendTo($('body'));
});