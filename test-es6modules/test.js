import { sayHello as greeting } from '/twcheese/test-es6modules/modules/Enter.js';
import * as exit from '/twcheese/test-es6modules/modules/Exit.js';

TwCheese.actions.doSomething = function() {
    greeting();
    exit.sayAdios();
}
