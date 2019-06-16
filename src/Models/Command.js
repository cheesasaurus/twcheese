import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';

class Command {
    constructor() {
        this.arrival = TwCheeseDate.newServerDate();
        this.timber = 0;
        this.clay = 0;
        this.iron = 0;
        this.haulCapacity = 0;
    } 

    sumLoot() {
        return this.timber + this.clay + this.iron;
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

    static sumProps(commands) {
        let sum = new Command();

        for (let command of commands) {
            sum.timber += command.timber;
            sum.clay += command.clay;
            sum.iron += command.iron;
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