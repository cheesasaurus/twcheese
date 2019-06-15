import { NumberDescriber } from '/twcheese/src/Models/Example.js';

let nd = new NumberDescriber();

window.TwCheese.actions.exampleEven = function() {
    alert(nd.describeEven());
}

window.TwCheese.actions.exampleOdd = function() {
    alert(nd.describeOdd());
}