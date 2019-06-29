# Prototype checking

1. Don't use `instanceof` or other reference-based checks for non-global prototypes.
2. Don't use `.constructor.name`.

If you find yourself wanting class checks, consider refactoring.\
[https://en.wikipedia.org/wiki/Liskov_substitution_principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)


Forbidden:
```javascript
import { MyClass } from '/twcheese/src/MyClass.js';

if (something instanceof MyClass) {
    // stuff
}
```

I'll allow it:
```javascript
import { MyClass } from '/twcheese/src/MyClass.js';
import { Types } from '/twcheese/src/MyTypes.js'

if (something.type() === Types.MINE) {
    // stuff
}
```


## Why?
Each tool can be compiled into a standalone-script.
The compiler can mangle names, thus `.constructor.name` isn't reliable.

These standalone scripts declare modular classes within a scope unique to that script.
Using reference-based checks can break sidebar functionality.

Tool A:
```javascript
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';

window.TwCheese.registerTool('MyTool', {
    examplePhase: () => new PhaseQuestion('Gonna ask some questions');
})

```

Tool B:
```javascript
import { PhaseQuestion } from '/twcheese/src/Models/Debug/PhaseQuestion.js';

let phase = window.TwCheese.tools['MyTool'].examplePhase();

// If using es modules, this check evaluates to TRUE.
// If using compiled standalone scripts, this check evaluates to FALSE.
if (phase instanceof PhaseQuestion) {
    renderQuestions(phase.questions);
} else {
    throw Error(`I don't know what to do`);
}
```

