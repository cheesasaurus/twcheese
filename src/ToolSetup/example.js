import { NumberDescriber } from '/twcheese/src/Models/Example.js';

let nd = new NumberDescriber();

function useTool() {
    if (game_data.player.id % 2 === 0) {
        alert(nd.describeEven());
    } else {
        alert(nd.describeOdd());
    }
}


window.TwCheese.registerTool({
    id: 'example',
    use: useTool,
    getDebugProcess: () => null
});