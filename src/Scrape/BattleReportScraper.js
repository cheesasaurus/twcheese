import { BattleReport } from '/twcheese/src/Models/BattleReport.js';
import { Player } from '/twcheese/src/Models/Player.js';
import { Village } from '/twcheese/src/Models/Village.js';
import { BuildingLevels } from '/twcheese/src/Models/Buildings.js';
import { StationedTroops } from '/twcheese/src/Models/StationedTroops.js';
import { TroopCounts, troopUtil } from '/twcheese/src/Models/Troops.js';
import { parseArrival } from '/twcheese/src/Scrape/time.js';
import { scrapeResources } from '/twcheese/src/Scrape/res.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';

/**
 * @param {HTMLTableCellElement} playerCell a cell containing a link to a player profile
 * @return {Player}
 */
function scrapePlayer(playerCell) {
    if (textScraper.includes(playerCell, 'report.deletedPlayer')) {
        return new Player(-1, $(playerCell).text());
    }
    else if (playerCell.innerHTML === '---') {
        return new Player(0, '---');
    }
    let playerLink = playerCell.firstChild;
    let id = parseInt(playerLink.href.match(/&id=(\d+)/)[1]);
    let name = playerLink.innerHTML;
    return new Player(id, name);
}


/**
 * @param {HTMLTableRowElement} troopRow a row of cells containing troop counts
 * @return {TroopCounts}
 */
function scrapeTroopCounts(troopRow) {
    let troops = new TroopCounts();
    let troopTypes = troopUtil.troopTypesOnWorld();
    for (let i = 0; i < troopTypes.length; i++) {
        if (typeof troopRow.cells[i] !== 'undefined') { // attacker can't have militia
            troops[troopTypes[i]] = parseInt(troopRow.cells[i].innerHTML);
        }        
    }
    return troops;
}


/**
 * @param {HTMLAnchorElement} link - a link to a village with the name and coordinates
 * @return {Village}
 */
function scrapeVillage(link) {
    let [, id] = link.href.match(/&id=(\d+)/);
    let [, x, y] = link.innerHTML.match(/\((\d+)\|(\d+)\)(?!.*\(.*?\))/);
    return new Village(parseInt(id), parseInt(x), parseInt(y));
}


/**
 * removes the label from a troop count row
 * @return	troopRowCopy:HTMLTableRowElement - a row of troop counts suitable for the twcheese_getTroopCount function
 * @param	troopRow:HTMLTableRowElement - the row of troop counts with the label
 */
function removeTroopsLabel(troopRow) {
    var troopRowCopy = document.createElement('tr');
    for (var i = 1; i < troopRow.cells.length; i++) {
        troopRowCopy.appendChild(document.createElement('td'));
        troopRowCopy.cells[i - 1].innerHTML = troopRow.cells[i].innerHTML;
    }
    return troopRowCopy;
}

/**
 * scrapes the page from game.php?screen=report&view={reportId}
 */
class BattleReportScraper {

    /**
     * @param {HTMLDocument} gameDoc
     */
    constructor(gameDoc) {
        this.gameDoc = gameDoc;
        this.$gameDoc = $(gameDoc);
        this.mainTable = this.$gameDoc.find('#attack_luck').parents('table')[0];
        this.luckTable = gameDoc.getElementById('attack_luck');
        this.attackerTable = gameDoc.getElementById('attack_info_att');
        this.attackerUnitsTable = gameDoc.getElementById('attack_info_att_units');
        this.defenderTable = gameDoc.getElementById('attack_info_def');
        this.defenderUnitsTable = gameDoc.getElementById('attack_info_def_units');
        this.resultsTable = gameDoc.getElementById('attack_results');
        this.supportKilledTable = gameDoc.getElementById('attack_away_units');
        this._validate();
    }

    _validate() {
        let shouldAlwaysBeThere = ['mainTable', 'luckTable', 'attackerTable', 'attackerUnitsTable', 'defenderTable'];
        for (let propName of shouldAlwaysBeThere) {
            if (!this[propName]) {
                throw Error(`BattleReportScraper failed: couldn't locate the ${propName}`);
            }
        }
    }

    scrapeReport() {
        let report = new BattleReport();

        report.attacker = this.getAttacker();
        report.attackerLosses = this.getAttackerLosses();
        report.attackerQuantity = this.getAttackerQuantity();
        report.attackerVillage = this.getAttackerVillage();
        report.battleTime = this.getBattleTime();
        report.buildingLevels = this.getBuildingLevels();
        report.catDamage = this.getCatDamage();
        report.defender = this.getDefender();
        report.defenderLosses = this.getDefenderLosses();
        report.defenderQuantity = this.getDefenderQuantity();
        report.defenderVillage = this.getDefenderVillage();
        report.dotColor = this.getDotColor();
        report.espionageLevel = this.getEspionageLevel();
        report.haul = this.getHaul();
        report.loyalty = this.getLoyalty();
        report.luck = this.getLuck();
        report.morale = this.getMorale();
        report.ramDamage = this.getRamDamage();
        report.reportId = this.getReportId();
        report.resources = this.getResources();        
        report.unitsOutside = this.getUnitsOutside();
        report.unitsInTransit = this.getUnitsInTransit();

        report.attackerSurvivors = report.attackerQuantity.subtract(report.attackerLosses);

        if (report.defenderQuantity) {
            report.defenderSurvivors = report.defenderQuantity.subtract(report.defenderLosses);
        }

        if (!report.buildingLevels && (report.ramDamage || report.catDamage)) {
            report.buildingLevels = new BuildingLevels('?');
            if (report.ramDamage) {
                report.buildingLevels.wall = report.ramDamage.levelAfter;
            }
            if (report.catDamage) {
                report.buildingLevels[report.catDamage.buildingType] = report.catDamage.levelAfter;
            }
        }



        return report;
    }

    /**
     * @return {Player}
     */
    getAttacker() {
        var playerCell = this.attackerTable.rows[0].cells[1];
        return scrapePlayer(playerCell);
    }

    /**
     * @return {TroopCounts}
     */
    getAttackerLosses() {
        return scrapeTroopCounts(removeTroopsLabel(this.attackerUnitsTable.rows[2]));
    }

    /**
     * @return {TroopCounts}
     */
    getAttackerQuantity() {
        return scrapeTroopCounts(removeTroopsLabel(this.attackerUnitsTable.rows[1]));
    }

    /**
     * @return {Village}
     */
    getAttackerVillage() {
        return scrapeVillage(this.attackerTable.rows[1].cells[1].firstChild.firstChild);
    }

    /**
     * @return {TwCheeseDate}
     */
    getBattleTime() {
        var text = $(this.mainTable.rows[1].cells[1]).text();
        return parseArrival(text, window.game_data.market);
    }

    /**
     * @return {BuildingLevels|null}
     */
    getBuildingLevels() {
        if (this.getEspionageLevel() < 2) {
            return null;
        }

        let levels = new BuildingLevels();
        let buildingData = JSON.parse(this.$gameDoc.find('#attack_spy_building_data').val());
        for (let building of buildingData) {
            levels[building.id] = parseInt(building.level);
        }
        return levels;
    }

    /**
     * @return {{buildingType:string, levelBefore:number, levelAfter:number} | null}
     */
    getCatDamage() {
        if (!this.resultsTable) {
            return null;
        }
        var thElements = this.resultsTable.getElementsByTagName('th');
        let catHeader = textScraper.first(thElements, 'report.catDamage');
        if (!catHeader) {
            return null;
        }
        let damageCell = catHeader.parentNode.cells[1];
        let buildingType = textScraper.buildingType(damageCell);
        let bElements = damageCell.getElementsByTagName('b');
        return {
            buildingType,
            levelBefore: parseInt(bElements[0].innerHTML),
            levelAfter: parseInt(bElements[1].innerHTML)
        };
    }

    /**
     * @return {Player}
     */
    getDefender() {
        var playerCell = this.defenderTable.rows[0].cells[1];
        return scrapePlayer(playerCell);
    }

    /**
     * @return {TroopCounts|null}
     */
    getDefenderLosses() {
        if (!this.defenderUnitsTable) {
            return null;
        }
        return scrapeTroopCounts(removeTroopsLabel(this.defenderUnitsTable.rows[2]));
    }

    /**
     * @return {TroopCounts|null}
     */
    getDefenderQuantity() {
        if (!this.defenderUnitsTable) {
            return null;
        }
        return scrapeTroopCounts(removeTroopsLabel(this.defenderUnitsTable.rows[1]));
    }

    /**
     * @return {Village}
     */
    getDefenderVillage() {
        return scrapeVillage(this.defenderTable.rows[1].cells[1].firstChild.firstChild);
    }

    /**
     * @return {string} color: blue, green, yellow, or red
     */
    getDotColor() {
        return $(this.mainTable.rows[0].cells[1])
            .find('img[src*="dots/"]')
            .attr('src')
            .match(/dots\/(.+).png/)[1];
    }

    /**
     * @return {number} espionageLevel
     *-------- level -------------
        * value	significance
        * 0		nothing scouted
        * 1		resources
        * 2		buildings
        * 3		external troops
        */
    getEspionageLevel() {
        var spied_resources = this.$gameDoc.find('#attack_spy_resources').length > 0;
        var spied_buildings = this.$gameDoc.find('#attack_spy_building_data').length > 0;
        var spied_external = this.$gameDoc.find('#attack_spy_away').length > 0;
        return Number(Number(spied_resources) + Number(spied_buildings) + Number(spied_external));
    }

    /**
     * @return {Resources|null}
     */
    getHaul() {
        if (!this.resultsTable) {
            return null;
        }
        var thElements = this.resultsTable.getElementsByTagName('th');
        let haulHeader = textScraper.first(thElements, 'report.haul');
        if (!haulHeader) {
            return null;
        }
        return scrapeResources(haulHeader.parentNode.cells[1]);
    }

    /**
     * @return {number}
     */
    getLuck() {
        var luckString = this.luckTable.getElementsByTagName('b')[0].innerHTML;
        return new Number(luckString.substring(0, luckString.indexOf('%')));
    }

    /**
     * @return {{before:number, after:number} | null}
     */
    getLoyalty() {
        if (!this.resultsTable) {
            return null;
        }
        var thElements = this.resultsTable.getElementsByTagName('th');
        let loyaltyHeader = textScraper.first(thElements, 'report.loyalty');
        if (!loyaltyHeader) {
            return null;
        }
        var bElements = loyaltyHeader.parentNode.getElementsByTagName('b');
        return {
            before: parseInt(bElements[0].innerHTML),
            after: parseInt(bElements[1].innerHTML)
        };
    }

    /**
     * @return {number|null}
     */
    getMorale() {
        let moraleContainer = this.gameDoc.getElementById('attack_moral'); // todo: there's no such thing
        if (!moraleContainer) {
            return null;            
        }
        var moraleString = moraleContainer.getElementsByTagName('h4')[0].innerHTML;
        return new Number(moraleString.substring(moraleString.indexOf(' ') + 1, moraleString.indexOf('%')));
    }

    /**
     * @return {{levelBefore:number, levelAfter:number} | null}
     */
    getRamDamage() {
        if (!this.resultsTable) {
            return null;
        }
        var thElements = this.resultsTable.getElementsByTagName('th');
        let ramHeader = textScraper.first(thElements, 'report.ramDamage');
        if (!ramHeader) {
            return null;
        }
        var bElements = ramHeader.parentNode.getElementsByTagName('b');
        return {
            levelBefore: parseInt(bElements[0].innerHTML),
            levelAfter: parseInt(bElements[1].innerHTML)
        };
    }

    /**
     * @return {number}
     */
    getReportId() {
        return parseInt(this.gameDoc.URL.match(/view=(\d+)/)[1]);
    }

    /**
     * @return {Resources|null}
     */
    getResources() {
        let resContainer = this.$gameDoc.find('#attack_spy_resources').find('td')[0];
        if (!resContainer) {
            return null;
        }
        return scrapeResources(resContainer);
    }

    /**
     * "Defender's troops in other villages"
     * Only visible if the village was conquered.
     * @return {StationedTroops[]}
     */
    getSupportKilled() {
        if (!this.supportKilledTable) {
            return [];
        }
        let supportKilled = [];
        for (let row of this.supportKilledTable.rows) {
            let troopCounts = scrapeTroopCounts(removeTroopsLabel(row));
            let village = scrapeVillage(row.cells[0].firstChild);
            supportKilled.push(new StationedTroops(troopCounts, village));
        }
        return supportKilled;
    }

    /**
     * only visible if the village was conquered
     * @return {TroopCounts|null}
     */
    getUnitsInTransit() {
        var h4elements = this.gameDoc.getElementsByTagName('h4');
        let transitHeader = textScraper.first(h4elements, 'report.unitsInTransit');
        if (!transitHeader) {
            return null;
        }
        return scrapeTroopCounts(transitHeader.nextSibling.nextSibling.rows[1]);
    }

    /**
     * @return {TroopCounts|null}
     */
    getUnitsOutside() {
        if (this.getEspionageLevel() < 3) {
            return null;
        }
        return scrapeTroopCounts(this.$gameDoc.find('#attack_spy_away').find('table')[0].rows[1]);
    }

}


export { BattleReportScraper };