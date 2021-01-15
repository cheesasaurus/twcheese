import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { Resources } from '/twcheese/src/Models/Resources.js';
import { buildingUtil } from '/twcheese/src/Models/Buildings.js';
import { troopUtil } from '/twcheese/src/Models/Troops.js';
import { BattleReportCondensed } from '/twcheese/src/Models/BattleReportCondensed.js';
import { textScraper } from '/twcheese/src/Scrape/TextScraper.js';
import { gameUrl } from '/twcheese/src/Util/Network.js';


var language = { "twcheese": {} };
switch (game_data.market) {
    default:
        /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
        language['twcheese']['Building'] = 'Building';
        break;

    case 'cz':
        /*==== divokekmeny.cz/ ====*/
        language['twcheese']['Building'] = 'budově';
        break;

    case 'se':
        language['twcheese']['Building'] = 'Byggnad';
        break;

    /*==== fyletikesmaxes.gr/ ====*/
    case 'gr':
        language['twcheese']['Building'] = 'Κτίριο';
        break;

    /* Norwegian */
    case 'no':
        language['twcheese']['Building'] = 'Bygning';
        break;
                        
}


function centeredImg(src, tooltip = '') {
    return `<img style="display:block; margin-left:auto; margin-right:auto" src="${src}" title="${tooltip}">`;
}


function villageLink(village) {
    let url = gameUrl('info_village', {id: village.id});
    return `<a href="${url}">${village.x}|${village.y}</a>`;
}


class ColumnCategories extends Map {

    getHideableCategories() {
        return this.toArray().filter(category => category.hideable);
    }

    toArray() {
        return [...this.values()];
    }
}


let cfg = [
    {
        key: 'essential',
        hideable: false,
        cols: [{
            width: 120,
            header: '',
            createCellHtml(report) {
                let icons = [`<img src="${ImageSrc.dotIcon(report.dotColor)}">`];
                if (report.haulStatus !== BattleReportCondensed.HAUL_STATUS_UNKNOWN) {
                    icons.push(`<img src="${report.haulStatusIconSrc()}">`);
                }
                if (report.isForwarded) {
                    icons.push('<img src="graphic/forwarded.png?1">');
                }
                let html = `<input name="id_${report.reportId}" type="checkbox"> ${icons.join(' ')}
                    <a href="${gameUrl('report', {mode:game_data.mode, view:report.reportId})}"> view</a>
                `;
                if (report.defenderName && report.defenderVillage) {
                    let isDefenderMe = report.defenderName == game_data.player.name;
                    let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
                    if (isDefenderMe || wasVillageConquered) {
                        html += `<a href="${gameUrl('place', {mode:'units', village:report.defenderVillage.id})}">
                            <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc.buildingIcon('place')}" />
                        </a>`;
                    }
                }
                return html;
            }
        }]
    },

    {
        key: 'attackIcons',
        hideable: true,
        description: 'Attack icons',
        cols: [{
            width: 50,
            header: '',
            createCellHtml: (report) => {
                return report.attackIcons.getIcons().map(icon => {
                    return `<img title="${escapeHtml(icon.description)}" src="${icon.src}">`
                }).join(' ');
            }
        }]
    },

    {
        key: 'distance',
        hideable: true,
        description: 'Distance',
        cols: [{
            width: 60,
            header: 'Distance',
            createCellHtml: (report) => report.defenderDistance(game_data.village)
        }]
    },

    {
        key: 'repeatLinks',
        hideable: true,
        description: 'Links to repeat attack',
        cols: [{
            width: 50,
            header: 'Repeat',
            createCellHtml(report) {
                if (report.attackerName !== game_data.player.name) {
                    return '';
                }
                let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId});
                let html = `<a title="repeat attack, from current village" href="${url}"><img src="${ImageSrc.attack}"></a>`;
                if (report.attackerVillage && report.attackerVillage.id) {
                    let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportId, village: report.attackerVillage.id});
                    html += ` | <a title="repeat attack, from original village" href="${url}"><img src="${ImageSrc.attack}"></a>`;
                }
                return html;
            }
        }]
    },
    
    {
        key: 'fullSubject',
        hideable: true,
        startHidden: true,
        description: 'Full subject',
        cols: [{
            width: 400,
            header: 'Subject',
            createCellHtml: (report) => report.subject
        }]
    },
    {
        key: 'note',
        hideable: true,
        startHidden: true,
        description: 'Note',
        cols: [{
            width: 200,
            header: 'Note',
            createCellHtml: (report) => report.note || ''
        }]
    },
    {
        key: 'attackerName',
        hideable: true,
        description: 'Attacker',
        cols: [{
            width: 150,
            header: 'Attacker',
            createCellHtml: (report) => report.attackerName || ''
        }]
    },
    {
        key: 'defenderName',
        hideable: true,
        description: 'Defender',
        cols: [{
            width: 150,
            header: 'Defender',
            createCellHtml: (report) => report.defenderName || ''
        }]
    },
    {
        key: 'attackerVillage',
        hideable: true,
        description: `Attacker's village`,
        cols: [{
            width: 70,
            header: 'Origin',
            createCellHtml(report) {
                if (!report.attackerVillage) {
                    return '';
                }
                return villageLink(report.attackerVillage);
            }
        }]
    },
    {
        key: 'defenderVillage',
        hideable: true,
        description: `Defender's village`,
        cols: [{
            width: 70,
            header: 'Target',
            createCellHtml(report) {
                if (!report.defenderVillage) {
                    return '';
                }
                return villageLink(report.defenderVillage);
            }
        }]
    },
    {
        key: 'feint',
        hideable: true,
        description: 'Feint',
        cols: [{
            width: 50,
            header: 'Feint',
            createCellHtml(report) {
                if (report.wasAttackFeint) {
                    return centeredImg('graphic/dots/grey.png?1', 'The attack contained only a small amount of units');
                }
                return '';
            }
        }]
    },
    {
        key: 'deadNoble',
        hideable: true,
        description: 'Attacking noble died',
        cols: [{
            width: 50,
            header: 'Noble',
            createCellHtml(report) {
                if (!report.attackerNobleDied) {
                    return '';
                }
                let img = centeredImg(ImageSrc.troopIcon('priest'), 'An attacking nobleman died.');
                if (report.attackerVillage && report.attackerName === game_data.player.name) {
                    let url = gameUrl('snob', {village: report.attackerVillage.id});
                    return `<a href="${url}">${img}</a>`;
                }
                return img;
            }
        }]
    },
    {
        key: 'loyalty',
        hideable: true,
        description: 'Loyalty reported',
        cols: [{
            width: 50,
            header: 'Loyalty',
            createCellHtml(report) {
                if (report.loyalty) {
                    return '<span class="icon ally lead" title="Loyalty change"></span> ' + report.loyalty.after;
                }
                return '';
            }
        }]
    },
    {
        key: 'defenderSurvivors',
        hideable: true,
        description: 'Troops: Defense remaining',
        title: 'Defense remaining',
        cols: troopUtil.troopTypesOnWorld().map(troopType => {
            return {
                width: 20,
                align: 'center',
                header: centeredImg(ImageSrc.troopIcon(troopType)),
                createCellHtml(report) {
                    if (!report.defenderSurvivors) {
                        return '';
                    }
                    let survivorCount = report.defenderSurvivors[troopType];
                    return survivorCount;
                },
                cssClass(report) {
                    if (!report.defenderSurvivors) {
                        return '';
                    }
                    let survivorCount = report.defenderSurvivors[troopType];
                    return (survivorCount === 0) ? 'unit-item hidden' : '';
                }
            };
        })
    },

    ...buildingUtil.buildingTypesOnWorld().map(function(buildingType) {
        return {
            key: 'buildingLevels.' + buildingType,
            hideable: true,
            description: language['twcheese']['Building'] + ': ' + textScraper.t(`buildings.${buildingType}`),
            cols: [{
                width: 20,
                align: 'center',
                header: centeredImg(ImageSrc.buildingIcon(buildingType)),
                createCellHtml(report) {
                    if (!report.buildingLevels) {
                        return '';
                    }
                    let level = report.buildingLevels[buildingType];
                    if (level === '?') {
                        return '';
                    }
                    return level;
                },
                cssClass(report) {
                    if (!report.buildingLevels) {
                        return '';
                    }
                    let level = report.buildingLevels[buildingType];
                    return ['?', 0].includes(level) ? 'hidden' : '';
                }
            }]
        };
    }),

    ...Resources.TYPES.map(function(resType) {
        let resName = {wood:'Timber', stone:'Clay', iron:'Iron'}[resType];
        return {
            key: `resources.${resType}`,
            hideable: true,
            description: `Resources: ${resName}`,
            cols: [{
                width: 16,
                align: 'center',
                header: centeredImg(ImageSrc[resType]),
                createCellHtml(report) {
                    if (!report.resources) {
                        return '';                        
                    }
                    return window.Format.number(report.resources[resType].amount);
                },
                cssClass(report) {
                    if (!report.resources) {
                        return '';                        
                    }
                    return (report.resources[resType].amount === 0) ? 'hidden' : '';
                }
            }]
        };
    }),

    {
        key: 'resources.sum',
        hideable: true,
        description: 'Resources: Total',
        cols: [{
            width: 40,
            align: 'center',
            header: 'Total',
            createCellHtml(report) {
                if (!report.resources) {
                    return '';                        
                }
                return window.Format.number(report.resources.sum());
            },
            cssClass(report) {
                if (!report.resources) {
                    return '';                        
                }
                return (report.resources.sum() === 0) ? 'hidden' : '';
            }
        }]
    },
    {
        key: 'timelaunched',
        hideable: true,
        description: 'Time: Attack launched',
        cols: [{
            width: 170,
            header: 'Launched',
            createCellHtml(report) {
                if (!report.timeLaunched) {
                    return '';
                }
                return report.timeLaunched.toHtml(false);
            }
        }]
    },
    {
        key: 'strTimeReceived',
        hideable: true,
        description: 'Time: Report received',
        cols: [{
            width: 140,
            header: 'Received',
            createCellHtml: (report) => report.strTimeReceived || ''
        }]
    }
];

let columnCategories = new ColumnCategories();
for (let category of cfg) {
    columnCategories.set(category.key, category);
}

export { columnCategories };