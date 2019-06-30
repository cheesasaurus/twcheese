import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
const assert = require('assert');

let pf = new ProcessFactory();

// actions ///////////////////////////////////////////

let actions = {

    outputSixtyNine: {
        async execute() {
            return 69;
        }
        // if summarizeResult isn't specified, the raw result will be used as the summary
    },

    addOne: {
        async execute(input) {
            if (typeof input === 'undefined') {
                return 1;
            }
            return input + 1;
        },

        summarizeResult(valueReturnedFromExecute) {
            return {
                sum: valueReturnedFromExecute
            }
        }
    },

    addOneAfterThreeSeconds: {
        async execute(input, ctrl) {
            return new Promise((resolve, reject) => {
                let t = setTimeout(() => resolve(input + 1), 3000);

                ctrl.on(DebugEvents.USER_REJECTED, function() {
                    console.log('abortion requested')
                    clearTimeout(t);
                    reject('user rejected');
                });                
            });
        },
        summarizeResult(valuePassedToResolve) {
            return {
                sum: valuePassedToResolve
            }
        }
    }

};


// cfg ///////////////////////////////////////

let cfg = {
    phases: [
        {
            type: 'PhaseAttempt',
            internalName: 'first phase',
            action: 'outputSixtyNine',
            success: [
                {
                    type: 'PhaseAttempt',
                    internalName: `Add 1 to 69 (output of the parent phase's action)`,
                    action: 'addOne'
                },
                {
                    type: 'PhaseAttempt',
                    internalName: `Add 1 to 69 (output of the parent phase's action)... eventually`,
                    action: 'addOneAfterThreeSeconds',
                    success: [
                        {
                            type: 'PhaseAttempt',
                            internalName: `Add 1 to 70 (output of the parent phase's action)`,
                            action: 'addOne'
                        }
                    ]
                }
            ]
        },
        {
            type: 'PhaseAttempt',
            internalName: 'add 1 to nothing (there are no parent phases)',
            action: 'addOne'
        }
    ]
};

// test /////////////////////////////////////////////////////////


describe('ProcessFactory.create', function() {
    xit('should work', function() {
        let actual = pf.create(cfg, actions);
        // todo
    });
});


describe('ProcessFactory.createFromYAML', function() {
    xit('should work', function() {
        // todo
    });
});