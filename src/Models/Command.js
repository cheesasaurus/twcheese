import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { Resources } from '/twcheese/src/Models/Resources.js';

class Command {
    constructor() {
        this.arrival = TwCheeseDate.newServerDate();
        this.haul = new Resources(0, 0, 0);
        this.haulCapacity = 0;
    }

    sumLoot() {
        return this.haul.sum();
    }

    calcHaulPercent() {
        if (this.haulCapacity === 0) {
            return 0;
        }
        return Math.round(100 * this.sumLoot() / this.haulCapacity);
    }

    arrivesDuring(fromTime, toTime) {
        return this.arrival >= fromTime && this.arrival <= toTime;
    }

    /**
     * @param {Object} other 
     */
    equals(other) {
        return this.arrival.equals(other.arrival)
            && this.haul.equals(other.haul)
            && this.haulCapacity === other.haulCapacity;
    }

    static sumProps(commands) {
        let sum = new Command();

        for (let command of commands) {
            sum.haul = sum.haul.add(command.haul);
            sum.haulCapacity += command.haulCapacity;
        }
        return sum;
    }

    static sumPropsFromTimeframe(commands, fromTime, toTime) {
        let relevantCommands = commands.filter(command => command.arrivesDuring(fromTime, toTime));
        return Command.sumProps(relevantCommands);
    }
}

export { Command };