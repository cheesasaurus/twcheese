// twcheese isn't using typescript.
//
// This file is just for reference,
// to help you make things look/swim/quack like a duck.

import { Phase } from '/twcheese/src/Models/Debug/Phase.js';


interface IThingToFollowUpOn {
    followUpPhases: Array<Phase>;
    addFollowUp(phase: Phase);
}
