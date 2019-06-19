import { NumberDescriber } from '/twcheese/src/Models/Example.js';

let nd = new NumberDescriber();

window.TwCheese.registerTool('example', function() {
    if (game_data.player.id % 2 === 0) {
        alert(nd.describeEven());
    } else {
        alert(nd.describeOdd());
    }
});
