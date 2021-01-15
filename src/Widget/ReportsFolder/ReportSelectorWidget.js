import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';


class ReportSelectorWidget extends AbstractWidget {
    /**
     * @param {ReportSelector} reportSelector 
     */
    constructor(reportSelector) {
        super();

        var reportsSelectorBar = document.createElement('div');
        this.$el = $(reportsSelectorBar);
        reportsSelectorBar.id = 'twcheese_reportsSelectorBar';
        reportsSelectorBar.style.borderStyle = 'solid';
        reportsSelectorBar.style.borderWidth = '1px';

        /*==== label ====*/
        var reportsSelectorBarLabel = document.createElement('div');
        reportsSelectorBar.appendChild(reportsSelectorBarLabel);
        reportsSelectorBarLabel.style.backgroundColor = 'rgb(193, 162, 100) !important';
        reportsSelectorBarLabel.style.backgroundImage = 'linear-gradient(rgb(229,194,126), rgb(193,162,100))';
        reportsSelectorBarLabel.style.backgroundRepeat = 'repeat-x';
        reportsSelectorBarLabel.style.fontSize = '9pt';
        reportsSelectorBarLabel.style.fontWeight = '700';
        reportsSelectorBarLabel.innerHTML = 'SELECT';
        reportsSelectorBarLabel.style.height = '18px';
        reportsSelectorBarLabel.style.paddingLeft = '3px';

        /*==== clicky table ====*/
        var selectorClickyTable = document.createElement('table');
        reportsSelectorBar.appendChild(selectorClickyTable);
        selectorClickyTable.className = 'vis';
        selectorClickyTable.insertRow(-1);

        let imgHtml = src => `<img style="display:block; margin-left:auto; margin-right:auto" src="${src}"/>`;

        let clickyOptions = new Map([
            ['all', {
                click: () => reportSelector.selectAll(),
                html: 'all'
            }],
            ['none', {
                click: () => reportSelector.selectNone(),
                html: 'none'
            }],
            ['new', {
                click: () => reportSelector.selectNew(),
                html: 'new'
            }],
            ['old', {
                click: () => reportSelector.selectOld(),
                html: 'old'
            }],
            ['dotGreen', {
                click: () => reportSelector.selectDotColor('green'),
                html: imgHtml('graphic/dots/green.png')
            }],
            ['dotYellow', {
                click: () => reportSelector.selectDotColor('yellow'),
                html: imgHtml('graphic/dots/yellow.png')
            }],
            ['dotRed', {
                click: () => reportSelector.selectDotColor('red'),
                html: imgHtml('graphic/dots/red.png')
            }],
            ['dotBlue', {
                click: () => reportSelector.selectDotColor('blue'),
                html: imgHtml('graphic/dots/blue.png')
            }],
            ['forwarded', {
                click: () => reportSelector.selectForwarded(),
                html: imgHtml('graphic/forwarded.png')
            }],
            ['haulPartial', {
                click: () => reportSelector.selectLoot(BattleReportCondensed.HAUL_STATUS_PARTIAL),
                html: imgHtml('graphic/max_loot/0.png')
            }],
            ['haulFull', {
                click: () => reportSelector.selectLoot(BattleReportCondensed.HAUL_STATUS_FULL),
                html: imgHtml('graphic/max_loot/1.png')
            }],
            ['feint', {
                click: () => reportSelector.selectFeint(),
                html: imgHtml('graphic/dots/grey.png'),
                tooltip: 'feint'
            }],
            ['deadNoble', {
                click: () => reportSelector.selectDeadNoble(),
                html: imgHtml(ImageSrc.troopIcon('priest')),
                tooltip: 'dead noble'
            }],
            ['loyalty', {
                click: () => reportSelector.selectLoyalty(),
                html: '<span style="display:block; margin-left:auto; margin-right:auto" class="icon ally lead"/>',
                tooltip: 'loyalty change'
            }],
            ['cleared', {
                click: () => reportSelector.selectCleared(),
                html: 'defenseless'
            }]
        ]);

        for (let [descriptor, option] of clickyOptions) {
            let optionEl = $(`<a href="#">${option.html}</a>`)[0];
            if (option.tooltip) {
                optionEl.title = option.tooltip;
            }
            optionEl.addEventListener('click', function(e) {
                e.preventDefault();
                option.click();
            });

            let cell = selectorClickyTable.rows[0].insertCell(-1);
            cell.style.width = '25px';
            cell.style.textAlign = 'center';        
            cell.appendChild(optionEl);
        }

        /*==== input table ====*/
        var selectorInputTable = document.createElement('table');
        reportsSelectorBar.appendChild(selectorInputTable);
        selectorInputTable.className = 'vis';
        selectorInputTable.insertRow(-1);

        let inputOptions = [
            {
                hintInput: 'contains text',
                hintButton: 'select text',
                use: (text) => reportSelector.selectText(text),
                sprite: [-140, 0]
            },
            {
                hintInput: 'attacker',
                hintButton: 'select attacking player',
                use: (attackerName) => reportSelector.selectAttacker(attackerName),
                sprite: [-80, 0]
            },
            {
                hintInput: 'defender',
                hintButton: 'select defending player',
                use: (defenderName) => reportSelector.selectDefender(defenderName),
                sprite: [-80, 0]
            },
            {
                hintInput: 'origin',
                hintButton: 'select attacking village',
                placeholder: 'x|y',
                use: (coords) => reportSelector.selectAttackerVillage(coords),
                sprite: [-120, 0]
            },
            {
                hintInput: 'target',
                hintButton: 'select defending village',
                placeholder: 'x|y',
                use: (coords) => reportSelector.selectDefenderVillage(coords),
                sprite: [-120, 0]
            }
        ];

        for (let option of inputOptions) {
            let input = document.createElement('input');
            input.type = 'text';
            input.size = 10;
            input.value = option.hintInput;
            input.placeholder = option.placeholder || '';
            let alreadyCleared = false;
            input.addEventListener('mousedown', function() {
                if (alreadyCleared) {
                    return;
                }
                this.value = '';
                alreadyCleared = true;
            });

            let $button = $(`<a href="#" title="${option.hintButton}"></a>`)
                .on('click', function(e) {
                    e.preventDefault();
                    option.use(input.value);
                });

            let $buttonIcon = $('<span>&nbsp;</span>')
                .css({
                    display: 'inline-block',
                    background: `url(graphic/bbcodes/bbcodes.png) no-repeat ${option.sprite[0]}px ${option.sprite[1]}px`,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    margin: 3,
                    width: 20,
                    height: 20
                });

            $button.append($buttonIcon);

            let cell = selectorInputTable.rows[0].insertCell(-1);
            cell.appendChild(input);
            cell.appendChild($button[0]);
        }
    }


}


export { ReportSelectorWidget };