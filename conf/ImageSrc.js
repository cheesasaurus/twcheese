let game = window.image_base;
let self = window.TwCheese.ROOT + '/assets/images/';

let ImageSrc = {
    plus: game + 'plus.png',
    minus: game + 'minus.png',
    wood: game + 'holz.png',
    stone: game + 'lehm.png',
    iron: game + 'eisen.png',
    attack: game + 'command/attack.png',
    haulPartial: game + 'max_loot/0.png',
    haulFull: game + 'max_loot/1.png',
    info: game + 'questionmark.png',
    attackSentViaFa: game + 'command/farm.png',
    attackSizeSmall: game + 'command/attack_small.png',
    attackSizeMedium: game + 'command/attack_medium.png',
    attackSizeLarge: game + 'command/attack_large.png',
    attackContainsSnob: game + 'command/snob.png',
    attackContainsSpy: game + 'command/spy.png',
    attackContainsKnight: game + 'command/knight.png',
    popupBackground: game + 'popup/content_background.png',
    popupBorder: game + 'popup/border.png',
    servant: game + 'paladin_new.png',
    loadingSpinner: game + 'throbber.gif',
    calendar: self + 'calendar.png',
    sidebarMain: self + 'sidebar/gear.png',
    sidebarBug: self + 'sidebar/bug.png',
    sidebarGithub: self + 'sidebar/github.png',
    jq: {
        blue: self + 'jquery/ui-icons_2e83ff_256x240.png',
        black: self + 'jquery/ui-icons_222222_256x240.png',
        darkGrey: self + 'jquery/ui-icons_454545_256x240.png',
        grey: self + 'jquery/ui-icons_888888_256x240.png',
        red: self + 'jquery/ui-icons_cd0a0a_256x240.png'
    },
    legacy: {
        helpBackground: self + 'legacy/help_background.png',
        helpBackgroundBright: self + 'legacy/help_background_highlight.png'
    },    
    buildingIcon: buildingType => game + `buildings/${buildingType}.png`,
    troopIcon: troopType => game + `unit/unit_${troopType}.png`,
    dotIcon: color => game + `dots/${color}.png`,
    scavengeOption: optionId => game + `scavenging/options/${optionId}.png`,
};

export { ImageSrc };
