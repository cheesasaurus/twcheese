import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
const assert = require('assert');

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
    },

    explode: {
        async execute() {
            blowUpInYourFace();
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
                            action: 'addOne',
                            success: [
                                {
                                    type: 'PhaseQuestion',
                                    internalName: 'very important questions',
                                    lookAt: 'parentResult',
                                    questions: [
                                        {
                                            type: 'QuestionValue',
                                            ask: '70 + 1',
                                            examine: 'parentResult'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: 'PhaseAttempt',
            internalName: 'add 1 to nothing (there are no parent phases)',
            action: 'addOne'
        },
        {
            type: 'PhaseQuestion',
            internalName: 'very important questions',
            questions: [
                {
                    type: 'QuestionSelect',
                    ask: `Who's the best?`,
                    options: [
                        {
                            answer: 'cheesasaurus',
                            value: 'goddamn right'
                        },
                        {
                            answer: 'somebody else',
                            value: 'WRONG',
                            followUp: [
                                {
                                    type: 'PhaseAttempt',
                                    internalName: 'Kablooie',
                                    action: 'explode'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'QuestionFreeForm',
                    ask: 'What do you get when you cross an owl with a bungie cord?',
                    placeholderText: 'my ass. nyah haha haha haha',
                    minResponseLength: 10
                }
            ]
        }
    ]
};


// test /////////////////////////////////////////////////////////


describe('ProcessFactory.create', function() {
    xit('should work', function() {
        console.log('== example process =============');
        let pf = new ProcessFactory(actions);
        let actual = pf.create('test', cfg);

        // stringify, and eyeball it
        let cache = new Set();
        let replacer = function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) {
                    return `[circular reference] ${value.name || value.value}`;
                }
                cache.add(value);
            }
            return value;
        };
        console.log(JSON.stringify(actual, replacer, 2));

        // todo: write assertions... if something breaks and its not obvious what/where
    });
});
