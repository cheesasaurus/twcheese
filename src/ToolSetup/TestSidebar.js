import { SidebarWidget } from '/twcheese/src/Widget/SidebarWidget.js';
import { DebugProcess } from '/twcheese/src/Models/Debug/DebugProcess.js';




TwCheese.registerTool('TestSidebar', function() {
    let widget = new SidebarWidget(new DebugProcess('Example'));
    widget.appendTo($('body'));
});