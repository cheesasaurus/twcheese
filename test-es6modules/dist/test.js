import { sayHello } from '../../../twcheese/test-es6modules/modules/Enter.js';
import { sayAdios } from '../../../twcheese/test-es6modules/modules/Exit.js';

TwCheese.actions.doSomething = function() {
    sayHello();
    sayAdios();
};
