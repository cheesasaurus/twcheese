/* global $, game_data */
import { initCss, escapeHtml } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { Player } from '/twcheese/src/Models/Player.js';
import { Village } from '/twcheese/src/Models/Village.js';
import { calcKillScores } from '/twcheese/src/Models/KillScores.js';
import { calcLoyalty } from '/twcheese/src/Models/Loyalty.js';
import { TroopCounts, calcTravelDurations, troopTypes } from '/twcheese/src/Models/Troops.js';
import { BuildingLevels, buildingTypes } from '/twcheese/src/Models/Buildings.js';
import { TwCheeseDate } from '/twcheese/src/Models/TwCheeseDate.js';
import { parseArrival } from '/twcheese/src/Scrape/time.js';
import { scrapeResources } from '/twcheese/src/Scrape/res.js';
import { userConfig } from '/twcheese/src/Util/UserConfig.js';
import { requestDocument, gameUrl, attackPrepUrl } from '/twcheese/src/Util/Network.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';

import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/BRE/Default.js';


/*==== imagePaths ====*/
{
    var imagePaths = new Array();

    /*==== specific ====*/
    imagePaths['spear'] = 'https://' + document.domain + '/graphic/unit/unit_spear.png?1';
    imagePaths['sword'] = 'https://' + document.domain + '/graphic/unit/unit_sword.png?1';
    imagePaths['axe'] = 'https://' + document.domain + '/graphic/unit/unit_axe.png?1';
    imagePaths['archer'] = 'https://' + document.domain + '/graphic/unit/unit_archer.png?1';
    imagePaths['scout'] = '/graphic/unit/unit_spy.png?1';
    imagePaths['lcav'] = 'https://' + document.domain + '/graphic/unit/unit_light.png?1';
    imagePaths['acav'] = 'https://' + document.domain + '/graphic/unit/unit_marcher.png?1';
    imagePaths['hcav'] = 'https://' + document.domain + '/graphic/unit/unit_heavy.png?1';
    imagePaths['ram'] = 'https://' + document.domain + '/graphic/unit/unit_ram.png?1';
    imagePaths['catapult'] = 'https://' + document.domain + '/graphic/unit/unit_catapult.png?1';

    imagePaths['hq'] = 'https://' + document.domain + '/graphic/buildings/main.png?1';
    imagePaths['barracks'] = 'https://' + document.domain + '/graphic/buildings/barracks.png?1';
    imagePaths['stable'] = 'https://' + document.domain + '/graphic/buildings/stable.png?1';
    imagePaths['workshop'] = 'https://' + document.domain + '/graphic/buildings/garage.png?1';
    imagePaths['church'] = 'https://' + document.domain + '/graphic/buildings/church.png?1';
    imagePaths['church_f'] = 'https://' + document.domain + '/graphic/buildings/church.png?1';
    imagePaths['academy'] = 'https://' + document.domain + '/graphic/buildings/snob.png?1';
    imagePaths['smithy'] = 'https://' + document.domain + '/graphic/buildings/smith.png?1';
    imagePaths['rally'] = 'https://' + document.domain + '/graphic/buildings/place.png?1';
    imagePaths['statue'] = 'https://' + document.domain + '/graphic/buildings/statue.png?1';
    imagePaths['market'] = 'https://' + document.domain + '/graphic/buildings/market.png?1';
    imagePaths['timber'] = 'https://' + document.domain + '/graphic/buildings/wood.png?1';
    imagePaths['clay'] = 'https://' + document.domain + '/graphic/buildings/stone.png?1';
    imagePaths['iron'] = 'https://' + document.domain + '/graphic/buildings/iron.png?1';
    imagePaths['warehouse'] = 'https://' + document.domain + '/graphic/buildings/storage.png?1';
    imagePaths['farm'] = 'https://' + document.domain + '/graphic/buildings/farm.png?1';
    imagePaths['hiding'] = 'https://' + document.domain + '/graphic/buildings/hide.png?1';
    imagePaths['wall'] = 'https://' + document.domain + '/graphic/buildings/wall.png?1';

    imagePaths['repeatFromCurrent'] = 'https://' + document.domain + '/graphic/command/attack.png?1';
    imagePaths['repeatFromOriginal'] = 'https://' + document.domain + '/graphic/command/attack.png?1';

    /*==== for looping ====*/
    imagePaths['units'] = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    imagePaths['units'][0] = 'https://' + document.domain + '/graphic/unit/unit_spear.png?1';
    imagePaths['units'][1] = 'https://' + document.domain + '/graphic/unit/unit_sword.png?1';
    imagePaths['units'][2] = 'https://' + document.domain + '/graphic/unit/unit_axe.png?1';
    imagePaths['units'][3] = 'https://' + document.domain + '/graphic/unit/unit_archer.png?1';
    imagePaths['units'][4] = 'https://' + document.domain + '/graphic/unit/unit_spy.png?1';
    imagePaths['units'][5] = 'https://' + document.domain + '/graphic/unit/unit_light.png?1';
    imagePaths['units'][6] = 'https://' + document.domain + '/graphic/unit/unit_marcher.png?1';
    imagePaths['units'][7] = 'https://' + document.domain + '/graphic/unit/unit_heavy.png?1';
    imagePaths['units'][8] = 'https://' + document.domain + '/graphic/unit/unit_ram.png?1';
    imagePaths['units'][9] = 'https://' + document.domain + '/graphic/unit/unit_catapult.png?1';
    imagePaths['units'][10] = 'https://' + document.domain + '/graphic/unit/unit_knight.png?1';
    imagePaths['units'][11] = 'https://' + document.domain + '/graphic/unit/unit_snob.png?1';

    imagePaths['buildings'] = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    imagePaths['buildings'][0] = 'https://' + document.domain + '/graphic/buildings/main.png?1';
    imagePaths['buildings'][1] = 'https://' + document.domain + '/graphic/buildings/barracks.png?1';
    imagePaths['buildings'][2] = 'https://' + document.domain + '/graphic/buildings/stable.png?1';
    imagePaths['buildings'][3] = 'https://' + document.domain + '/graphic/buildings/garage.png?1';
    imagePaths['buildings'][4] = 'https://' + document.domain + '/graphic/buildings/church.png?1';
    imagePaths['buildings'][5] = 'https://' + document.domain + '/graphic/buildings/church.png?1';
    imagePaths['buildings'][6] = 'https://' + document.domain + '/graphic/buildings/snob.png?1';
    imagePaths['buildings'][7] = 'https://' + document.domain + '/graphic/buildings/smith.png?1';
    imagePaths['buildings'][8] = 'https://' + document.domain + '/graphic/buildings/place.png?1';
    imagePaths['buildings'][9] = 'https://' + document.domain + '/graphic/buildings/statue.png?1';
    imagePaths['buildings'][10] = 'https://' + document.domain + '/graphic/buildings/market.png?1';
    imagePaths['buildings'][11] = 'https://' + document.domain + '/graphic/buildings/wood.png?1';
    imagePaths['buildings'][12] = 'https://' + document.domain + '/graphic/buildings/stone.png?1';
    imagePaths['buildings'][13] = 'https://' + document.domain + '/graphic/buildings/iron.png?1';
    imagePaths['buildings'][14] = 'https://' + document.domain + '/graphic/buildings/farm.png?1';
    imagePaths['buildings'][15] = 'https://' + document.domain + '/graphic/buildings/storage.png?1';
    imagePaths['buildings'][16] = 'https://' + document.domain + '/graphic/buildings/hide.png?1';
    imagePaths['buildings'][17] = 'https://' + document.domain + '/graphic/buildings/wall.png?1';

    imagePaths['priest'] = '/graphic/unit/unit_priest.png?1';
    imagePaths['plus'] = 'graphic/plus.png';
    imagePaths['minus'] = 'graphic/minus.png';
    imagePaths['rename'] = 'graphic/rename.png';
}

/*==== styles ====*/

// jquery-ui
initCss(`
    .ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }

    /* Icons
    ----------------------------------*/

    .ui-icon {
        display: block;
        text-indent: -99999px;
        overflow: hidden;
        background-repeat: no-repeat;
    }

    .ui-icon {
        width: 16px;
        height: 16px;
    }
    .ui-icon,
    .ui-widget-content .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-widget-header .ui-icon {
        background-image: url(${ImageSrc.jq.black});
    }
    .ui-state-default .ui-icon {
        background-image: url(${ImageSrc.jq.grey});
    }
    .ui-state-hover .ui-icon,
    .ui-state-focus .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-active .ui-icon {
        background-image: url(${ImageSrc.jq.darkGrey});
    }
    .ui-state-highlight .ui-icon {
        background-image: url(${ImageSrc.jq.blue});
    }
    .ui-state-error .ui-icon,
    .ui-state-error-text .ui-icon {
        background-image: url(${ImageSrc.jq.red});
    }

    /* Overlays */
    .ui-widget-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .ui-resizable {
        position: relative;
    }
    .ui-resizable-handle {
        position: absolute;
        font-size: 0.1px;
        display: block;
    }
    .ui-resizable-disabled .ui-resizable-handle,
    .ui-resizable-autohide .ui-resizable-handle {
        display: none;
    }
    .ui-resizable-n {
        cursor: n-resize;
        height: 7px;
        width: 100%;
        top: -5px;
        left: 0;
    }
    .ui-resizable-s {
        cursor: s-resize;
        height: 7px;
        width: 100%;
        bottom: -5px;
        left: 0;
    }
    .ui-resizable-e {
        cursor: e-resize;
        width: 7px;
        right: -5px;
        top: 0;
        height: 100%;
    }
    .ui-resizable-w {
        cursor: w-resize;
        width: 7px;
        left: -5px;
        top: 0;
        height: 100%;
    }
    .ui-resizable-se {
        cursor: se-resize;
        width: 12px;
        height: 12px;
        right: 1px;
        bottom: 1px;
    }
    .ui-resizable-sw {
        cursor: sw-resize;
        width: 9px;
        height: 9px;
        left: -5px;
        bottom: -5px;
    }
    .ui-resizable-nw {
        cursor: nw-resize;
        width: 9px;
        height: 9px;
        left: -5px;
        top: -5px;
    }
    .ui-resizable-ne {
        cursor: ne-resize;
        width: 9px;
        height: 9px;
        right: -5px;
        top: -5px;
    }

    /* twcheese */
`);

// twcheese
initCss(`
    #twcheese_reportsFolder {
        margin-bottom: 30px;
    }
`);

// language /////////////////////////////////////////////////////////////////////

try {
    var language = { "buildings": [], "months": [], "report": [], "twcheese": [] };
    switch (game_data.market) {
        default:
            /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
            language['buildings'][0] = 'Headquarters';
            language['buildings'][1] = 'Barracks';
            language['buildings'][2] = 'Stable';
            language['buildings'][3] = 'Workshop';
            language['buildings'][4] = 'Church';
            language['buildings'][5] = 'First church';
            language['buildings'][6] = 'Academy';
            language['buildings'][7] = 'Smithy';
            language['buildings'][8] = 'Rally point';
            language['buildings'][9] = 'Statue';
            language['buildings'][10] = 'Market';
            language['buildings'][11] = 'Timber camp';
            language['buildings'][12] = 'Clay pit';
            language['buildings'][13] = 'Iron mine';
            language['buildings'][14] = 'Farm';
            language['buildings'][15] = 'Warehouse';
            language['buildings'][16] = 'Hiding place';
            language['buildings'][17] = 'Wall';

            language['months'][0] = 'Jan';
            language['months'][1] = 'Feb';
            language['months'][2] = 'Mar';
            language['months'][3] = 'Apr';
            language['months'][4] = 'May';
            language['months'][5] = 'Jun';
            language['months'][6] = 'Jul';
            language['months'][7] = 'Aug';
            language['months'][8] = 'Sep';
            language['months'][9] = 'Oct';
            language['months'][10] = 'Nov';
            language['months'][11] = 'Dec';

            language['report']['catDamage'] = 'Damage by catapults:';
            language['report']['ramDamage'] = 'Damage by rams:';
            language['report']['farmAssistant'] = 'Possible resources:';
            language['report']['haul'] = 'Haul:';
            language['report']['loyalty'] = 'Loyalty:';
            language['report']['timeSent'] = 'Battle time';
            language['report']['unitsInTransit'] = 'Defender\'s troops, that were in transit';
            language['report']['deletedPlayer'] = '(deleted)';
            language['report']['unread'] = '(new)';

            language['twcheese']['Building'] = 'Building';
            language['twcheese']['Help'] = 'Help';
            language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
            break;

        case 'cz':
            /*==== divokekmeny.cz/ ====*/
            language['buildings'][0] = 'Hlavní budova';
            language['buildings'][1] = 'Kasárna';
            language['buildings'][2] = 'Stáj';
            language['buildings'][3] = 'Dílna';
            language['buildings'][4] = 'Kostel';
            language['buildings'][5] = 'První kostel';
            language['buildings'][6] = 'Panský dvůr';
            language['buildings'][7] = 'Kovárna';
            language['buildings'][8] = 'Nádvoří';
            language['buildings'][9] = 'Socha';
            language['buildings'][10] = 'Tržiště';
            language['buildings'][11] = 'Dřevorubec';
            language['buildings'][12] = 'Lom na těžbu hlíny';
            language['buildings'][13] = 'Železný důl';
            language['buildings'][14] = 'Selský dvůr';
            language['buildings'][15] = 'Skladiště';
            language['buildings'][16] = 'Skrýš';
            language['buildings'][17] = 'Hradby';

            language['months'][0] = 'Jan';
            language['months'][1] = 'Feb';
            language['months'][2] = 'Mar';
            language['months'][3] = 'Apr';
            language['months'][4] = 'May';
            language['months'][5] = 'Jun';
            language['months'][6] = 'Jul';
            language['months'][7] = 'Aug';
            language['months'][8] = 'Sep';
            language['months'][9] = 'Oct';
            language['months'][10] = 'Nov';
            language['months'][11] = 'Dec';

            language['report']['catDamage'] = 'Škoda vzniklá střelbou z katapultu:';
            language['report']['ramDamage'] = 'Škoda vzniklá beranidlem:';
            language['report']['farmAssistant'] = 'Vyšpehované suroviny:';
            language['report']['haul'] = 'Kořist:';
            language['report']['loyalty'] = 'Oddanost:';
            language['report']['timeSent'] = 'Odesláno';
            language['report']['unitsInTransit'] = 'Vojsko obránce, které bylo na cestě';
            language['report']['deletedPlayer'] = '(deleted)'; //todo: translate
            language['report']['unread'] = '(new)'; //todo: translate

            language['twcheese']['Building'] = 'budově';
            language['twcheese']['Help'] = 'Pomoc';
            language['twcheese']['noReportsSelected'] = 'Nejdříve si musíte vybrat, které zprávy přejmenovat.';
            break;

        case 'se':
            language['buildings'][0] = 'Högkvarter';
            language['buildings'][1] = 'Barack';
            language['buildings'][2] = 'Stall';
            language['buildings'][3] = 'Verkstad';
            language['buildings'][4] = 'Kyrka';
            language['buildings'][5] = 'Första Kyrkan';
            language['buildings'][6] = 'Akademi';
            language['buildings'][7] = 'Smedja';
            language['buildings'][8] = 'Samlingsplats';
            language['buildings'][9] = 'Staty';
            language['buildings'][10] = 'Marknad';
            language['buildings'][11] = 'Sågverk';
            language['buildings'][12] = 'Lergrop';
            language['buildings'][13] = 'Järngruva';
            language['buildings'][14] = 'Farm';
            language['buildings'][15] = 'Förråd';
            language['buildings'][16] = 'Gömställe';
            language['buildings'][17] = 'Mur';

            language['months'][0] = 'Jan';
            language['months'][1] = 'Feb';
            language['months'][2] = 'Mar';
            language['months'][3] = 'Apr';
            language['months'][4] = 'Maj';
            language['months'][5] = 'Jun';
            language['months'][6] = 'Jul';
            language['months'][7] = 'Aug';
            language['months'][8] = 'Sep';
            language['months'][9] = 'Okt';
            language['months'][10] = 'Nov';
            language['months'][11] = 'Dec';

            language['report']['catDamage'] = 'Skada gjord av katapulter:';
            language['report']['ramDamage'] = 'Skada gjorda av Murbräckan:';
            language['report']['farmAssistant'] = 'Resurser spejade:';
            language['report']['haul'] = 'Byte:';
            language['report']['loyalty'] = 'Lojalitet:';
            language['report']['timeSent'] = 'Skickat';
            language['report']['unitsInTransit'] = 'Enheter utanför byn';
            language['report']['deletedPlayer'] = '(borttaget)';
            language['report']['unread'] = '(new)'; //todo: translate

            language['twcheese']['Building'] = 'Byggnad';
            language['twcheese']['Help'] = 'Hjälp';
            language['twcheese']['noReportsSelected'] = 'Du har inte valt några rapporter som skall döpas om.';
            break;

        /*==== fyletikesmaxes.gr/ ====*/
        case 'gr':
            language['buildings'][0] = 'Επιτελείο';
            language['buildings'][1] = 'Στρατώνας';
            language['buildings'][2] = 'Στάβλος';
            language['buildings'][3] = 'Εργαστήριο';
            language['buildings'][4] = 'Εκκλησία';
            language['buildings'][5] = 'ΠρώτηΕκκλησία';
            language['buildings'][6] = 'Ακαδημία';
            language['buildings'][7] = 'Οπλοποιείο';
            language['buildings'][8] = 'ΜέροςΣυγκέντρωσης';
            language['buildings'][9] = 'Άγαλμα';
            language['buildings'][10] = 'Αγορά';
            language['buildings'][11] = 'Ξυλουργείο';
            language['buildings'][12] = 'Λατομείο';
            language['buildings'][13] = 'Σιδηρωρυχείο';
            language['buildings'][14] = 'Αγρόκτημα';
            language['buildings'][15] = 'Αποθήκη';
            language['buildings'][16] = 'Κρυψώνα';
            language['buildings'][17] = 'Τείχος';

            language['months'][0] = 'Ιαν';
            language['months'][1] = 'Φεβ';
            language['months'][2] = 'Μαρ';
            language['months'][3] = 'Απρ';
            language['months'][4] = 'Μαι';
            language['months'][5] = 'Ιον';
            language['months'][6] = 'Ιολ';
            language['months'][7] = 'Αυγ';
            language['months'][8] = 'Σεπ';
            language['months'][9] = 'Οκτ';
            language['months'][10] = 'Νοε';
            language['months'][11] = 'Δεκ';

            language['report']['catDamage'] = 'Ζημία που έκαναν οι καταπέλτες:';
            language['report']['ramDamage'] = 'Ζημιά που προκλήθηκε από τον πολιορκητικό κριό:';
            language['report']['farmAssistant'] = 'Πιθανοί πόροι:';
            language['report']['haul'] = 'Αλλαγή:';
            language['report']['loyalty'] = 'Πίστη:';
            language['report']['timeSent'] = 'Απεσταλμένο';
            language['report']['unitsInTransit'] = 'Στρατεύματα αμυνόμενου που ήταν σε μεταφορά';
            language['report']['deletedPlayer'] = '(διεγραμμένο)';
            language['report']['unread'] = '(νέο)';

            language['twcheese']['Building'] = 'Κτίριο';
            language['twcheese']['Help'] = 'Βοήθεια';
            language['twcheese']['noReportsSelected'] = 'Δεν έχεις επιλέξει  καμιά αναφορά για μετονομασία';
            break;

        /* the market where Arma plays :D */
        case 'hr':
            language['buildings'][0] = 'Sjedište';
            language['buildings'][1] = 'Vojarna';
            language['buildings'][2] = 'Štala';
            language['buildings'][3] = 'Radionica';
            language['buildings'][4] = 'Crkva';
            language['buildings'][5] = 'Prva crkva';
            language['buildings'][6] = 'Akademija';
            language['buildings'][7] = 'Kovačnica';
            language['buildings'][8] = 'Okupljalište';
            language['buildings'][9] = 'Spomenik';
            language['buildings'][10] = 'Tržnica';
            language['buildings'][11] = 'Drvosječa';
            language['buildings'][12] = 'Glinokop';
            language['buildings'][13] = 'Rudnik željeza';
            language['buildings'][14] = 'Farma';
            language['buildings'][15] = 'Spremište';
            language['buildings'][16] = 'Skrovište';
            language['buildings'][17] = 'Zid';

            language['months'][0] = 'Sij';
            language['months'][1] = 'Vel';
            language['months'][2] = 'Ožu';
            language['months'][3] = 'Tra';
            language['months'][4] = 'Svi';
            language['months'][5] = 'Lip';
            language['months'][6] = 'Srp';
            language['months'][7] = 'Kol';
            language['months'][8] = 'Ruj';
            language['months'][9] = 'Lis';
            language['months'][10] = 'Stu';
            language['months'][11] = 'Pro';

            language['report']['catDamage'] = 'Šteta nanešena katapultima:	';
            language['report']['ramDamage'] = 'Šteta nanešena ovnovima:';
            language['report']['farmAssistant'] = 'Moguće sirovine:';
            language['report']['haul'] = 'Nosivost:';
            language['report']['loyalty'] = 'Odanost:';
            language['report']['timeSent'] = 'Poslano';
            language['report']['unitsInTransit'] = 'Obrambene postrojbe koje su bile na putu';
            language['report']['deletedPlayer'] = '(obrisano)';
            break;

        /* Norwegian */
        case 'no':
            language['buildings'][0] = 'Hovedkvarter';
            language['buildings'][1] = 'Brakker';
            language['buildings'][2] = 'Stall';
            language['buildings'][3] = 'Verksted';
            language['buildings'][4] = 'Kirke';
            language['buildings'][5] = 'Første Kirke';
            language['buildings'][6] = 'Akademi';
            language['buildings'][7] = 'Smie';
            language['buildings'][8] = 'Samlingsplass';
            language['buildings'][9] = 'Statue';
            language['buildings'][10] = 'Marked';
            language['buildings'][11] = 'Hogstfelt';
            language['buildings'][12] = 'Leirgrav';
            language['buildings'][13] = 'Jerngruve';
            language['buildings'][14] = 'Gård';
            language['buildings'][15] = 'Varehus';
            language['buildings'][16] = 'Skjulested';
            language['buildings'][17] = 'Mur';

            language['months'][0] = 'Jan';
            language['months'][1] = 'Feb';
            language['months'][2] = 'Mar';
            language['months'][3] = 'Apr';
            language['months'][4] = 'Mai';
            language['months'][5] = 'Jun';
            language['months'][6] = 'Jul';
            language['months'][7] = 'Aug';
            language['months'][8] = 'Sep';
            language['months'][9] = 'Okt';
            language['months'][10] = 'Nov';
            language['months'][11] = 'Des';

            language['report']['catDamage'] = 'Skade forårsaket av katapulter:';
            language['report']['ramDamage'] = 'Skade forårsaket av rambukker:';
            language['report']['farmAssistant'] = 'Speidede ressurser:';
            language['report']['haul'] = 'Bytte';
            language['report']['loyalty'] = 'Lojalitet:';
            language['report']['timeSent'] = 'Sendt';
            language['report']['unitsInTransit'] = 'Forsvarer';
            language['report']['timeSent'] = 'Kamptid';
            language['report']['unitsInTransit'] = 'Antall';
            language['report']['deletedPlayer'] = '(slettet)';
            language['report']['unread'] = '(ny)';


            language['twcheese']['Building'] = 'Bygning';
            language['twcheese']['Help'] = 'Hjelp';
            language['twcheese']['noReportsSelected'] = 'Du har ikke valgt hvilke rapporter som skal endres navn på.';
            break;

        // Portugal
        case 'pt':
            language['buildings'][0] = 'Edifício Principal';
            language['buildings'][1] = 'Quartel';
            language['buildings'][2] = 'Estábulo';
            language['buildings'][3] = 'Oficina';
            language['buildings'][4] = 'Igreja';
            language['buildings'][5] = 'Primeira Igreja';
            language['buildings'][6] = 'Academia';
            language['buildings'][7] = 'Ferreiro';
            language['buildings'][8] = 'Praça de Reuniões';
            language['buildings'][9] = 'Estátua';
            language['buildings'][10] = 'Mercado';
            language['buildings'][11] = 'Bosque';
            language['buildings'][12] = 'Poço de Argila';
            language['buildings'][13] = 'Mina de Ferro';
            language['buildings'][14] = 'Fazenda';
            language['buildings'][15] = 'Armazém';
            language['buildings'][16] = 'Esconderijo';
            language['buildings'][17] = 'Muralha';
                    
            language['months'][0] = 'jan';
            language['months'][1] = 'fev';
            language['months'][2] = 'mar';
            language['months'][3] = 'abr';
            language['months'][4] = 'mai';
            language['months'][5] = 'jun';
            language['months'][6] = 'jul';
            language['months'][7] = 'ago';
            language['months'][8] = 'set';
            language['months'][9] = 'out';
            language['months'][10] = 'nov';
            language['months'][11] = 'dez';
        
            language['report']['catDamage'] = 'Dano provocado por catapultas:';
            language['report']['ramDamage'] = 'Dano provocado por aríetes:';
            language['report']['farmAssistant'] = 'Possíveis recursos:';
            language['report']['haul'] = 'Busca minuciosa:';
            language['report']['loyalty'] = 'Lealdade:';
            language['report']['timeSent'] = 'Tempo de batalha';
            language['report']['unitsInTransit'] = 'Unidades fora da aldeia';
            language['report']['deletedPlayer'] = '(eliminado)';
            language['report']['unread'] = '(novo)';
        
            language['twcheese']['Building'] = 'Building';
            language['twcheese']['Help'] = 'Help';
            language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
                            
    }
} catch (e) { console.error(e) }

/*==== templates ====*/

/**
 * Reinforcements template
 * @attribute {TroopCounts} troops
 * @attribute {Village} village	- the information about the village being supported.
 */
function twcheese_Reinforcements() {
    this.troops = new TroopCounts();
    this.village = new Village(0, 0, 0);
}

/**
 *	object representation of a battle report
 */
function twcheese_BattleReport() {
    this.attacker;
    this.attackerLosses;
    this.attackerQuantity;
    this.attackerVillage;
    this.buildingLevels;
    this.catDamage;
    this.defender;
    this.defenderLosses;
    this.defenderQuantity;
    this.defenderVillage;
    this.dot;
    this.espionageLevel;
    this.haul;
    this.loyalty;
    this.luck;
    this.morale;
    this.ramDamage;
    this.reportID;
    this.resources;
    this.sent;
    this.unitsInTransit;
    this.unitsOutside;
}

/**
 *	settings for the display of various report attributes in the reports folder
 */
function twcheese_ReportsFolderDisplaySettings() {
    this.repeatLinks = 1;
    this.fullSubject = 1;
    this.note = 1;
    this.distance = 1;
    this.feint = 1;
    this.attacker = 1;
    this.defender = 1;
    this.attackerVillage = 1;
    this.defenderVillage = 1;
    this.deadNoble = 1;
    this.loyalty = 1;
    this.survivors = 1;
    this.resourcesTimber = 1;
    this.resourcesClay = 1;
    this.resourcesIron = 1;
    this.resourcesTotal = 1;
    this.timeLaunched = 1;
    this.timeReceived = 1;
    this.buildings = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
}

/*==== report scraper functions ====*/

/**
 * @param	playerCell:HTMLTableCellElement - a cell containing a link to a player profile
 * @return {Player}
 */
function scrapePlayer(playerCell) {
    if (playerCell.innerHTML.search(language['report']['deletedPlayer']) != -1) {
        return new Player(-1, playerCell.innerHTML);
    }
    else if (playerCell.innerHTML == '---') {
        return new Player(0, '---');
    }
    var playerLink = playerCell.firstChild;
    var player = new Player();
    player.id = Number(playerLink.href.match(/&id=[0-9]{1,}/)[0].substring(4));
    player.name = playerLink.innerHTML;
    return player;
}


/**
 * @param {HTMLTableRowElement} troopRow a row of cells containing troop counts
 * @return {TroopCounts}
 */
function scrapeTroopCounts(troopRow) {
    let troops = new TroopCounts();
    let unitTypes =  window.game_data.units;
    for (let i = 0; i < unitTypes.length; i++) {
        if (typeof troopRow.cells[i] !== 'undefined') { // attacker can't have militia
            troops[unitTypes[i]] = parseInt(troopRow.cells[i].innerHTML);
        }        
    }
    return troops;
}

/**
 * @param {HTMLAnchorElement} villageLink - a link to a village with the name and coordinates
 * @return {Village}
 */
function scrapeVillage(villageLink) {
    var x = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('(') + 1, villageLink.innerHTML.lastIndexOf('|')));
    var y = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('|') + 1, villageLink.innerHTML.lastIndexOf(')')));
    var id = Number(villageLink.href.match(/&id=[0-9]{1,}/)[0].substring(4))
    return new Village(id, x, y);
}

/**
 * removes the label from a troop count row
 * @return	troopRowCopy:HTMLTableRowElement - a row of troop counts suitable for the twcheese_getTroopCount function
 * @param	troopRow:HTMLTableRowElement - the row of troop counts with the label
 */
function twcheese_removeTroopsLabel(troopRow) {
    var troopRowCopy = document.createElement('tr');
    for (var i = 1; i < troopRow.cells.length; i++) {
        troopRowCopy.appendChild(document.createElement('td'));
        troopRowCopy.cells[i - 1].innerHTML = troopRow.cells[i].innerHTML;
    }
    return troopRowCopy;
}

/**
 *	Report Scraper Template
 *	scrapes a battle report for information
 *	@param	gameDocument:HTMLDocument
 */
function twcheese_BattleReportScraper(gameDocument) {
    try {
        this.gameDocument = gameDocument;
        this.$gameDoc = $(gameDocument);
        this.attackerTable = gameDocument.getElementById('attack_info_att');
        this.attackerUnitsTable = gameDocument.getElementById('attack_info_att_units');
        this.defenderTable = gameDocument.getElementById('attack_info_def');
        this.defenderUnitsTable = gameDocument.getElementById('attack_info_def_units');
        this.resultsTable = gameDocument.getElementById('attack_results');
        this.supportKilledTable = gameDocument.getElementById('attack_away_units');

        /* functions */

        /**
         * @return {Player}
         */
        this.getAttacker = function () {
            if (this.attackerTable) {
                var playerCell = this.attackerTable.rows[0].cells[1];
                return scrapePlayer(playerCell);
            }
        };

        /**
         * @return {TroopCounts}
         */
        this.getAttackerLosses = function () {
            if (this.attackerUnitsTable)
                return scrapeTroopCounts(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[2]));
        };

        /**
         * @return {TroopCounts}
         */
        this.getAttackerQuantity = function () {
            if (this.attackerUnitsTable)
                return scrapeTroopCounts(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[1]));
        };

        /**
         * @return {Village}
         */
        this.getAttackerVillage = function () {
            if (this.attackerTable)
                return scrapeVillage(this.attackerTable.rows[1].cells[1].firstChild.firstChild);
        };

        /**
         * @return {BuildingLevels|false}
         */
        this.getBuildingLevels = function () {
            if (this.getEspionageLevel() < 2) {
                return false;
            }

            let levels = new BuildingLevels();
            let buildingData = JSON.parse(this.$gameDoc.find('#attack_spy_building_data').val());
            for (let building of buildingData) {
                levels[building.id] = parseInt(building.level);
            }
            return levels;
        };

        /**
         *	@return catDamage:Array(buildingIndex:Number,beforeLevel:Number,afterLevel:Number)
         *	if no catapult damage was done, returns boolean false
         */
        this.getCatDamage = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == language['report']['catDamage']) {
                        var catDamage = new Array(0, 0, 0);
                        //var buildingNames = new Array('village headquarters','barracks','stable','workshop','church','first church','academy','smithy','rally point','statue','market','timber camp','clay pit','iron mine','farm','warehouse','hiding place','wall');
                        var damageCell = thElements[i].parentNode.cells[1];
                        for (var n = 0; n < 18; n++) {
                            //var searchText = damageCell.innerHTML.toLowerCase();
                            //if(searchText.search(buildingNames[n]) != -1)
                            if (damageCell.innerHTML.search(language['buildings'][n]) != -1)
                                catDamage[0] = n;
                        }
                        catDamage[1] = new Number(damageCell.getElementsByTagName('b')[0].innerHTML);
                        catDamage[2] = new Number(damageCell.getElementsByTagName('b')[1].innerHTML);
                        return catDamage;
                    }
                }
            }
            return false;
        };

        /**
         * @return {Player}
         */
        this.getDefender = function () {
            if (this.defenderTable) {
                var playerCell = this.defenderTable.rows[0].cells[1];
                return scrapePlayer(playerCell);
            }
        };

        /**
         * @return {TroopCounts|false}
         * if no information about the strength of the enemy's army could be collected, returns boolean false
         */
        this.getDefenderLosses = function () {
            if (this.defenderUnitsTable)
                return scrapeTroopCounts(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[2]));
            else
                return false;
        };

        /**
         * @return {TroopCounts|false}
         * if no information about the strength of the enemy's army could be collected, returns boolean false
         */
        this.getDefenderQuantity = function () {
            if (this.defenderUnitsTable)
                return scrapeTroopCounts(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[1]));
            else
                return false;
        };

        /**
         * @return {Village}
         */
        this.getDefenderVillage = function () {
            if (this.defenderTable)
                return scrapeVillage(this.defenderTable.rows[1].cells[1].firstChild.firstChild);
        };

        /**
         * @return	color:String - blue, green, yellow, or red
         */
        this.getDotColor = function () {
            var images = gameDocument.getElementsByTagName('img');
            for (var i = 0; i < images.length; i++) {
                if (images[i].src.search('dots') != -1)
                    return images[i].src.substring(images[i].src.indexOf('dots') + 5, images[i].src.indexOf('.png'));
            }
        };

        /**
         * @return	espionageLevel:Number
         *-------- level -------------
         * value	significance
         * 0		nothing scouted
         * 1		resources
         * 2		buildings
         * 3		external troops
         */
        this.getEspionageLevel = function () {
            var spied_resources = this.$gameDoc.find('#attack_spy_resources').length > 0;
            var spied_buildings = this.$gameDoc.find('#attack_spy_building_data').length > 0;
            var spied_external = this.$gameDoc.find('#attack_spy_away').length > 0;
            return Number(Number(spied_resources) + Number(spied_buildings) + Number(spied_external));
        };

        /**
         * @return	resources:Array(timber:Number,clay:Number,iron:Number)
         */
        this.getHaul = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == language['report']['haul']) {
                        return scrapeResources(thElements[i].parentNode.cells[1]).toArray();
                    }
                }
            }
            return false;
        };

        /**
         * @return	luck:Number
         */
        this.getLuck = function () {
            if (gameDocument.getElementById('attack_luck')) {
                var luckString = this.gameDocument.getElementById('attack_luck').getElementsByTagName('b')[0].innerHTML;
                return new Number(luckString.substring(0, luckString.indexOf('%')));
            }
        };

        /**
         * @return	loyalty:Array(from:Number,to:Number)
         * if no change was detected, returns boolean false
         */
        this.getLoyalty = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == language['report']['loyalty']) {
                        var bElements = thElements[i].parentNode.getElementsByTagName('b');
                        return new Array(bElements[0].innerHTML, bElements[1].innerHTML);
                    }
                }
            }
            return false;
        };

        /**
         * @return	morale:Number
         */
        this.getMorale = function () {
            if (gameDocument.getElementById('attack_moral')) {
                var moraleString = this.gameDocument.getElementById('attack_moral').getElementsByTagName('h4')[0].innerHTML;
                return new Number(moraleString.substring(moraleString.indexOf(' ') + 1, moraleString.indexOf('%')));
            }
        };

        /**
         *	@return ramDamage:Array(beforeLevel:Number,afterLevel:Number)
         *	if no ram damage was done, returns boolean false
         */
        this.getRamDamage = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == language['report']['ramDamage']) {
                        var ramDamage = new Array(0, 0);
                        var damageCell = thElements[i].parentNode.cells[1];
                        ramDamage[0] = new Number(damageCell.getElementsByTagName('b')[0].innerHTML);
                        ramDamage[1] = new Number(damageCell.getElementsByTagName('b')[1].innerHTML);
                        return ramDamage;
                    }
                }
            }

            return false;
        };

        /**
         * @return	reportID:Number
         */
        this.getReportId = function () {
            //var id = Number(this.gameDocument.URL.match(/&id=[0-9]{1,}/)[0].substring(4))
            //var text = this.gameDocument.URL.substring(this.gameDocument.URL.indexOf('view=') + 5);
            //alert(text.match());
            //alert(Number(this.gameDocument.URL.substring(this.gameDocument.URL.indexOf('view=') + 5).match('[1-9]{1,}')));
            return new Number(this.gameDocument.URL.substring(this.gameDocument.URL.indexOf('view=') + 5).match('[0-9]{1,}'));
        };

        /**
         * @return	resources:Array(timber:Number,clay:Number,iron:Number)
         */
        this.getResources = function () {
            if (this.$gameDoc.find('#attack_spy_resources').length > 0)

                return scrapeResources(this.$gameDoc.find('#attack_spy_resources').find('td')[0]).toArray();
            else
                return false;
        };


        /**
         * @return {TwCheeseDate}
         */
        this.getSent = function () {
            var text = $(this.$gameDoc.find('#attack_luck').parents('table')[0].rows[1].cells[1]).text(); //from the element with the battle time

            if (game_data.market == 'cz') {
                // todo: extract to parseArrival
                var targetString = text;
                let [day, monthNumber, yearShort, hours, minutes, seconds] = targetString.match(/[0-9]{1,}/g);
                let year = '20' + yearShort;
                let month = monthNumber - 1;
                return TwCheeseDate.newServerDate(year, month, day, hours, minutes, seconds);
            }
            return parseArrival(text, window.game_data.market);
        };

        /**
         * @return	reinforcements:Array(reinforcement0:Reinforcements, reinforcement1:Reinforcements, reinforcement2:Reinforcements...)
         * if no "Defender's troops in other villages" were killed, returns boolean false
         */
        this.getSupportKilled = function () {
            if (this.supportKilledTable) {
                var reinforcements = new Array();
                for (var i = 1; i < this.supportKilledTable.rows.length; i++) {
                    var currentReinforcement = new twcheese_Reinforcements();
                    currentReinforcement.troops = scrapeTroopCounts(twcheese_removeTroopsLabel(this.supportKilledTable.rows[i]));
                    currentReinforcement.village = scrapeVillage(this.supportKilledTable.rows[i].cells[0].firstChild);
                    reinforcements.push(currentReinforcement);
                }
                return reinforcements;
            }
            else
                return false;
        };

        /**
         * @return {TroopCounts|false}
         * returns boolean false if no units In transit were detected
         */
        this.getUnitsInTransit = function () {
            var h4elements = gameDocument.getElementsByTagName('h4');
            for (var i = 0; i < h4elements.length; i++) {
                if (h4elements[i].innerHTML.search(language['report']['unitsInTransit']) != -1)
                    return scrapeTroopCounts(h4elements[i].nextSibling.nextSibling.rows[1]);
            }
            return false;
        };

        /**
         * @return {TroopCounts|false}
         * returns boolean false if no units outside were detected
         */
        this.getUnitsOutside = function () {
            try {
                if (this.getEspionageLevel() == 3) {
                    return scrapeTroopCounts(this.$gameDoc.find('#attack_spy_away').find('table')[0].rows[1]);
                }
                else
                    return false;
            } catch (e) { console.error(e); }
        };
    }
    catch (err) {
        console.err('Report Scraper initialization error:', err);
    }
}

/**
 *	scrapes a battle report for information and returns the information as an object representation of the report
 *	@param	gameDocument:HTMLDocument
 *	@return report:twcheese_BattleReport
 */
function twcheese_scrapeBattleReport(gameDoc) {
    try {

        var reportScraper = new twcheese_BattleReportScraper(gameDoc);

        var report = new twcheese_BattleReport;
        report.attacker = reportScraper.getAttacker();
        report.attackerLosses = reportScraper.getAttackerLosses();
        report.attackerQuantity = reportScraper.getAttackerQuantity();
        report.attackerVillage = reportScraper.getAttackerVillage();
        report.buildingLevels = reportScraper.getBuildingLevels();
        report.catDamage = reportScraper.getCatDamage();
        report.defender = reportScraper.getDefender();
        report.defenderLosses = reportScraper.getDefenderLosses();
        report.defenderQuantity = reportScraper.getDefenderQuantity();
        report.defenderVillage = reportScraper.getDefenderVillage();
        report.dot = reportScraper.getDotColor();
        report.espionageLevel = reportScraper.getEspionageLevel();
        report.haul = reportScraper.getHaul();
        report.loyalty = reportScraper.getLoyalty();
        report.luck = reportScraper.getLuck();
        report.morale = reportScraper.getMorale();
        report.ramDamage = reportScraper.getRamDamage();
        report.reportID = reportScraper.getReportId();
        report.resources = reportScraper.getResources();
        report.sent = reportScraper.getSent();
        report.unitsOutside = reportScraper.getUnitsOutside();
        report.unitsInTransit = reportScraper.getUnitsInTransit();

        if (report.ramDamage) {
            if (!report.buildingLevels) {
                report.buildingLevels = new BuildingLevels('?');
            }    
            report.buildingLevels.wall = report.ramDamage[1];
        }
        if (report.catDamage) {
            if (!report.buildingLevels) {
                report.buildingLevels = new BuildingLevels('?');
            }
            report.buildingLevels[BuildingLevels.typeAt(report.catDamage[0])] = report.catDamage[2];
        }

        return report;
    } catch (e) { console.error(e) }
}


/*==== page modifier functions ====*/


/**
 *	modifies report page
 *	@param	gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
 *	@param	report:twcheese_BattleReport	the report data to use
 */
function twcheese_BattleReportEnhancer(gameDoc, report, gameConfig, twcheese_BRESettings) {
    var contentValueElement = gameDoc.getElementById('content_value');
    var pageMod = this;


    this.includeReportTools = function () {

        function toggleCollapse() {
            $widgetContent.toggle({
                duration: 200,
                start: function() {
                    let willCollapse = $toggleIcon.attr('src').includes(ImageSrc.minus);
                    $toggleIcon.attr('src', willCollapse ? ImageSrc.plus : ImageSrc.minus);
                    userConfig.set('ReportToolsWidget.collapse', willCollapse);
                }
            });
        };
        this.toggleReportTools = toggleCollapse;

        /*==== tools widget containers ====*/
        var toolContainer = document.createElement('div');
        toolContainer.className = 'vis widget';
        toolContainer.id = 'twcheese_show_report_tools';

        var titleBar = document.createElement('h4');
        titleBar.innerHTML = 'Report Tools';
        var toggleButton = document.createElement('img');
        toggleButton.src = ImageSrc.plus;
        toggleButton.style.cssFloat = 'right';
        toggleButton.style.cursor = 'pointer';
        toggleButton.onclick = toggleCollapse;
        var $toggleIcon = $(toggleButton);
        titleBar.appendChild(toggleButton);
        toolContainer.appendChild(titleBar);

        var widgetContent = document.createElement('div');
        widgetContent.className = 'widget_content';
        widgetContent.style.display = 'none';
        var $widgetContent = $(widgetContent);

        var toolTable = document.createElement('table');
        toolTable.id = 'twcheese_BRE_tools';
        toolTable.border = 1;
        toolTable.insertRow(-1);
        toolTable.rows[0].insertCell(-1); /* spot for raid calculator */
        toolTable.rows[0].cells[0].vAlign = 'top';
        toolTable.rows[0].insertCell(-1); /* spot for demolition information */
        toolTable.rows[0].cells[1].vAlign = 'top';
        toolTable.insertRow(-1);
        toolTable.rows[1].insertCell(-1); /* spot for renamer */
        toolTable.rows[1].cells[0].colSpan = 2;

        widgetContent.appendChild(toolTable);
        toolContainer.appendChild(widgetContent);

        contentValueElement.insertBefore(toolContainer, contentValueElement.getElementsByTagName('h2')[0]);

        /*==== raider table ====*/
        if (report.espionageLevel >= 1) {
            var raiderTable = document.createElement('table');
            raiderTable.id = 'twcheese_raider_calculator';
            raiderTable.insertRow(-1);
            raiderTable.rows[0].insertCell(-1);
            raiderTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Raiders</h2></span>';
            raiderTable.insertRow(-1);
            raiderTable.rows[1].align = 'center';
            raiderTable.rows[1].insertCell(-1);

            raiderTable.rows[1].cells[0].innerHTML = '';

            /*==== raid-category selection ====*/

            let raidModeOptions = [];
            if (report.espionageLevel >= 1) { // resources were scouted
                raidModeOptions.push(`<option value="scouted">raid scouted resources</option>`);
            }
            if (report.espionageLevel >= 2) { // buildings were scouted
                raidModeOptions.push(`<option value="predicted">raid predicted resources</option>`);
                raidModeOptions.push(`<option value="periodic">periodically raid resources</option>`);
            }
            let raidModeSelect = document.createElement('select');
            raidModeSelect.id = 'twcheese_raider_selection';
            raidModeSelect.innerHTML = raidModeOptions.join('');
            raidModeSelect.addEventListener('change', function() {
                twcheese_changeRaidMode(this.value);
            });
            raiderTable.rows[1].cells[0].appendChild(raidModeSelect);

            /*==== rally point link ====*/
            let rallyPointLink = document.createElement('a');
            rallyPointLink.href = gameUrl('place', {target: report.defenderVillage.id});
            rallyPointLink.innerHTML = '&raquo; Send troops';
            raiderTable.rows[1].cells[0].appendChild(rallyPointLink);

            /*==== haul Bonus ====*/
            let $haulBonus = $(`<div>Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size=5 value=0></input>%</div>`.trim());
            $haulBonus.find('#twcheese_raider_haulBonus').on('input', function() {
                twcheese_changeRaidMode(document.getElementById('twcheese_raider_selection').value);
            });
            raiderTable.rows[1].cells[0].appendChild($haulBonus[0]);

            /*==== Periodic Raider section ====*/
            var periodicDiv = document.createElement('div');
            periodicDiv.id = 'twcheese_periodic_options';
            periodicDiv.innerHTML = 'Period (hours):';
            var periodInput = document.createElement('input');
            periodInput.id = 'twcheese_period';
            periodInput.type = 'text';
            periodInput.size = 4;
            periodInput.maxLength = 4;
            periodInput.value = 8;
            periodInput.addEventListener('input', function() {
                report.raidPeriodic = twcheese_calculateRaidPeriodic(report.buildingLevels, Number(this.value), gameConfig.speed, Number(document.getElementById('twcheese_raider_haulBonus')));
                twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), report.raidPeriodic, report);
            });
            periodicDiv.appendChild(periodInput);

            raiderTable.rows[1].cells[0].appendChild(periodicDiv);

            /*==== button to use settings as default ====*/
            var setDefaultButton = document.createElement('button');
            setDefaultButton.innerHTML = 'Use current selection as default';
            setDefaultButton.onclick = function () {
                twcheese_BRESettings.haulBonus = document.getElementById('twcheese_raider_haulBonus').value;
                twcheese_BRESettings.period = gameDoc.getElementById('twcheese_period').value;
                twcheese_BRESettings.raid = gameDoc.getElementById('twcheese_raider_selection').value;
                twcheese_setBRESettings(twcheese_BRESettings);
                window.UI.InfoMessage('Settings Saved', 2000, 'success');
            };
            raiderTable.rows[1].cells[0].appendChild(setDefaultButton);

            /*==== units section ====*/
            var raiderUnitsTable = document.createElement('table');
            raiderUnitsTable.id = 'twcheese_raider_units';

            raiderUnitsTable.className = 'vis overview_table';
            raiderUnitsTable.style.borderStyle = 'solid';
            raiderUnitsTable.style.borderWidth = '1px';


            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[0].className = 'center';

            //==== icons ====
            var unitLanguage = new Array('spear', 'sword', 'axe', 'archer', 'lcav', 'acav', 'hcav');
            for (var i = 0; i < 7; i++) {
                raiderUnitsTable.rows[0].insertCell(-1);
                raiderUnitsTable.rows[0].cells[i].width = "35px";
                raiderUnitsTable.rows[0].cells[i].innerHTML = '<img src="' + imagePaths[unitLanguage[i]] + '" alt="' + unitLanguage[i] + '" />';
            }

            //==== looting suggestions ====
            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[1].className = 'center';
            for (let i = 0; i < 7; i++) {
                raiderUnitsTable.rows[1].insertCell(-1);
            }

            //==== travel times ====
            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[2].className = 'center';

            var travelTimes = calcTravelDurations(report.attackerVillage.distanceTo(report.defenderVillage), gameConfig.speed, gameConfig.unit_speed);

            for (let i = 0; i < 7; i++) {
                raiderUnitsTable.rows[2].insertCell(-1);
            }
            raiderUnitsTable.rows[2].cells[0].innerHTML = window.Format.timeSpan(travelTimes.spear);
            raiderUnitsTable.rows[2].cells[1].innerHTML = window.Format.timeSpan(travelTimes.sword);
            raiderUnitsTable.rows[2].cells[2].innerHTML = window.Format.timeSpan(travelTimes.axe);
            raiderUnitsTable.rows[2].cells[3].innerHTML = window.Format.timeSpan(travelTimes.archer);
            raiderUnitsTable.rows[2].cells[4].innerHTML = window.Format.timeSpan(travelTimes.light);
            raiderUnitsTable.rows[2].cells[5].innerHTML = window.Format.timeSpan(travelTimes.marcher);
            raiderUnitsTable.rows[2].cells[6].innerHTML = window.Format.timeSpan(travelTimes.heavy);

            raiderTable.insertRow(-1);
            raiderTable.rows[2].insertCell(-1);
            raiderTable.rows[2].align = 'center';
            raiderTable.rows[2].cells[0].appendChild(raiderUnitsTable);

            /*==== scout option ====*/
            if (game_data.market != 'uk') //uk rules forbid filling units into rally point
            {
                var raiderScoutTable = document.createElement('table');
                raiderScoutTable.id = 'twcheese_raider_scout';

                raiderScoutTable.className = 'vis overview_table';
                raiderScoutTable.style.borderStyle = 'solid';
                raiderScoutTable.style.borderWidth = '1px';

                raiderScoutTable.insertRow(-1);
                raiderScoutTable.rows[0].className = 'center';
                raiderScoutTable.rows[0].insertCell(-1);
                raiderScoutTable.rows[0].cells[0].width = "35px";
                raiderScoutTable.rows[0].cells[0].innerHTML = '<img src="' + imagePaths['scout'] + '" title="Number of scouts to send when a unit icon to the left is clicked" />';
                raiderScoutTable.insertRow(-1);
                raiderScoutTable.rows[1].className = 'center';
                raiderScoutTable.rows[1].insertCell(-1);

                var raiderScoutInput = document.createElement('input');
                raiderScoutInput.id = 'twcheese_raider_scouts';

                if (navigator.appName == 'Microsoft Internet Explorer') //internet buttsExplorer
                    raiderScoutInput.type = 'text';
                else
                    raiderScoutInput.type = 'number';
                raiderScoutInput.size = 3;
                raiderScoutInput.value = 0;
                raiderScoutInput.min = 0;
                raiderScoutTable.rows[1].cells[0].appendChild(raiderScoutInput);

                raiderScoutInput.onchange = function () {
                    twcheese_changeRaidMode(gameDoc.getElementById('twcheese_raider_selection').value)
                    localStorage.setItem('twcheese_report_raiderScouts', this.value);
                };

                raiderTable.rows[2].insertCell(-1);
                raiderTable.rows[2].cells[1].appendChild(raiderScoutTable);
            }

            toolTable.rows[0].cells[0].appendChild(raiderTable);
        }

        /*==== demolition table ====*/
        if (report.demolition) {
            var demolitionTable = document.createElement('table');
            demolitionTable.id = 'twcheese_demolition_calculator';

            demolitionTable.insertRow(-1);
            demolitionTable.rows[0].insertCell(-1);
            demolitionTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Demolition</h2></span>';

            var demolitionUnitsTable = document.createElement('table');
            demolitionUnitsTable.id = 'twcheese_demolition_units';

            demolitionUnitsTable.className = 'vis overview_table';
            demolitionUnitsTable.style.borderStyle = 'solid';
            demolitionUnitsTable.style.borderWidth = '1px';

            demolitionUnitsTable.insertRow(-1);
            demolitionUnitsTable.rows[0].className = 'center'
            demolitionUnitsTable.insertRow(-1);
            demolitionUnitsTable.rows[1].className = 'center';
            demolitionUnitsTable.insertRow(-1);
            demolitionUnitsTable.rows[2].className = 'center';
            demolitionUnitsTable.insertRow(-1);
            demolitionUnitsTable.rows[3].className = 'center';

            demolitionUnitsTable.rows[0].insertCell(-1);
            demolitionUnitsTable.rows[0].insertCell(-1);
            demolitionUnitsTable.rows[0].cells[0].colSpan = 17;
            demolitionUnitsTable.rows[0].cells[0].innerHTML = '<img src="' + imagePaths['catapult'] + '" alt="catapults" />';
            demolitionUnitsTable.rows[0].cells[1].innerHTML = '<img src="' + imagePaths['ram'] + '" alt="rams" />';

            var buildingLanguage = new Array('hq', 'barracks', 'stable', 'workshop', 'church', 'church_f', 'academy', 'smithy', 'rally', 'statue', 'market', 'timber', 'clay', 'iron', 'farm', 'warehouse', 'hiding', 'wall');
            var siege_weapon = 'catapult';
            for (let i = 0; i < 18; i++) {
                demolitionUnitsTable.rows[1].insertCell(-1);
                demolitionUnitsTable.rows[1].cells[i].width = "35px";
                if (game_data.market == 'uk') {
                    demolitionUnitsTable.rows[1].cells[i].innerHTML = '<img src="' + imagePaths[buildingLanguage[i]] + '" alt="' + buildingLanguage[i] + '" />';
                } else {
                    if (i == 17) {
                        siege_weapon = 'ram';
                    }
                    let rallyPointUrl = attackPrepUrl({[siege_weapon]: report.demolition.oneShotUpgraded[i]}, report.defenderVillage.id);
                    demolitionUnitsTable.rows[1].cells[i].innerHTML = '<a href="' + rallyPointUrl + '"><img src="' + imagePaths[buildingLanguage[i]] + '" alt="' + buildingLanguage[i] + '" /></a>';
                }
                demolitionUnitsTable.rows[2].insertCell(-1);
                demolitionUnitsTable.rows[2].cells[i].innerHTML = report.demolition.oneShotScouted[i];
                demolitionUnitsTable.rows[3].insertCell(-1);
                demolitionUnitsTable.rows[3].cells[i].innerHTML = report.demolition.oneShotUpgraded[i];
            }

            demolitionTable.insertRow(-1);
            demolitionTable.rows[1].insertCell(-1);
            demolitionTable.rows[1].cells[0].appendChild(demolitionUnitsTable);

            toolTable.rows[0].cells[1].appendChild(demolitionTable);
        }

        /*==== renamer ====*/
        let $renamer = $(`
            <div id="twcheese_renamer" align="center">
                <span align="center"><h2>Renamer</h2></span>
                note <input id="twcheese_note" type="text"/>
                <button>rename</button>
                <input id="twcheese_auto_rename" type="checkbox" />auto rename
                <img id="twcheese_autoRenameInfo" src="/graphic/questionmark.png?1" width="13" height="13" title="automatically rename reports when the BRE is used" />
                <br/> characters available: <span id="twcheese_availableCharacters">${Number(255 - twcheese_nameReport(report, '').length)}</span>
                <br/><b>Preview: </b><span id="twcheese_rename_preview">'${twcheese_nameReport(report, '')}'</span>
            </div>
        `.trim());

        toolTable.rows[1].cells[0].appendChild($renamer[0]);

        $('#twcheese_note').on('input', function() {
            // preview name
            var newName = twcheese_nameReport(report, document.getElementById('twcheese_note').value);
            document.getElementById('twcheese_rename_preview').innerHTML = newName;
            document.getElementById('twcheese_availableCharacters').innerHTML = Number(255 - newName.length);
        });

        $renamer.find('button').on('click', function() {
            pageMod.renameReport(twcheese_nameReport(report, document.getElementById('twcheese_note').value));
        });

        $('#twcheese_auto_rename').on('click', function() {
            twcheese_BRESettings.autoRename = gameDoc.getElementById('twcheese_auto_rename').checked;
            twcheese_setBRESettings(twcheese_BRESettings)
        });
        
    };

    this.includeExtraInformation = function () {
        var reportTable = gameDoc.getElementById('attack_luck').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

        /*==== surviving defenders ====*/
        if (gameDoc.getElementById('attack_info_def_units')) {
            var defenseUnitsTable = gameDoc.getElementById('attack_info_def_units');
            let rowAbove = defenseUnitsTable.rows[defenseUnitsTable.rows.length - 1];
            let survivorsRow = defenseUnitsTable.insertRow(-1);
            survivorsRow.className = "center";
            survivorsRow.insertCell(-1);
            survivorsRow.cells[0].innerHTML = 'Survivors:';
            survivorsRow.cells[0].align = 'left';
            
            for (let unitType of window.game_data.units) {
                if (survivorsRow.cells.length >= rowAbove.cells.length) {
                    break;
                }
                let cell = survivorsRow.insertCell(-1);
                let unitCount = report.defenderSurvivors[unitType];
                if (unitCount === 0) {
                    cell.className = 'hidden';
                }
                cell.innerHTML = unitCount;
            }
        }

        /*==== surviving attackers ====*/
        if (gameDoc.getElementById('attack_info_att_units')) {
            var unit_table = gameDoc.getElementById('attack_info_att_units');
            let rowAbove = unit_table.rows[unit_table.rows.length - 1];
            let survivorsRow = unit_table.insertRow(-1);
            survivorsRow.className = "center";
            survivorsRow.insertCell(-1);
            survivorsRow.cells[0].innerHTML = 'Survivors:';
            survivorsRow.cells[0].align = 'left';

            for (let unitType of window.game_data.units) {
                if (survivorsRow.cells.length >= rowAbove.cells.length) {
                    break;
                }
                let cell = survivorsRow.insertCell(-1);
                let unitCount = report.attackerSurvivors[unitType];
                if (unitCount === 0) {
                    cell.className = 'hidden';
                }
                cell.innerHTML = unitCount;
            }
        }

        /*==== population summary ====*/
        if (report.espionageLevel >= 2) {
            var building_table = gameDoc.getElementById('attack_spy_buildings_right');

            var population_summary = $('<table></table>')[0];
            var populationRow = population_summary.insertRow(-1);
            var populationHeader = document.createElement('th');
            populationHeader.innerHTML = 'Population:';
            populationRow.appendChild(populationHeader);
            populationRow.insertCell(-1);
            populationRow.cells[1].innerHTML = 'Buildings <b>(' + report.populationSummary.buildings + ')</b><br/>Military <b>(' + report.populationSummary.troops + ')</b><br/>';
            if (report.espionageLevel == 3)
                populationRow.cells[1].innerHTML += 'Idle';
            else
                populationRow.cells[1].innerHTML += 'Unknown';
            populationRow.cells[1].innerHTML += ' <b>(' + report.populationSummary.idle + ')</b>';

            $(building_table).after(population_summary);
        }

        /*==== loyalty ====*/
        if (report.loyalty) {
            var resultsHeaders = gameDoc.getElementById('attack_results').getElementsByTagName('th');
            var loyaltyRow;
            for (let i = 0; i < resultsHeaders.length; i++) {
                if (resultsHeaders[i].innerHTML == language['report']['loyalty']) {
                    loyaltyRow = resultsHeaders[i].parentNode;
                }
            }        

            var loyaltyHTML = loyaltyRow.cells[1].innerHTML;
            loyaltyRow.removeChild(loyaltyRow.cells[1]);
            loyaltyRow.insertCell(-1);
            loyaltyRow.cells[1].innerHTML = loyaltyHTML;
            loyaltyRow.cells[1].innerHTML += '<br/><span title="the current predicted loyalty, based on time passed since this report">@Current Time: ' + report.loyaltyExtra.loyaltyNow + '</span>';
            loyaltyRow.cells[1].innerHTML += '<br/><span title="the predicted loyalty at time of arrival, should you send a nobleman from your current village right now">@Arrival: ' + report.loyaltyExtra.loyaltyAtArrival + '</span>';
        }

        /*==== opponents defeated ====*/
        var oddRow = gameDoc.getElementById('attack_info_att').insertRow(-1);
        var oddHeader = document.createElement('th');
        oddHeader.innerHTML = 'ODD:';
        oddRow.appendChild(oddHeader);
        oddRow.insertCell(-1);
        oddRow.cells[1].innerHTML = `The defender gained ${report.killScores.defender} points.`;

        var odaRow = gameDoc.getElementById('attack_info_def').insertRow(-1);
        var odaHeader = document.createElement('th');
        odaHeader.innerHTML = 'ODA:';
        odaRow.appendChild(odaHeader);
        odaRow.insertCell(-1);
        odaRow.cells[1].innerHTML = `The attacker gained ${report.killScores.attacker} points.`;

        /*==== timing info ====*/
        if (!reportTable.rows) //6.5 graphics
            reportTable = reportTable.getElementsByTagName('table')[1];
        var launchRow = reportTable.insertRow(2);

        launchRow.insertCell(-1);
        launchRow.cells[0].innerHTML = '<span title="the time the attacker sent the attack">Launched</span>';
        launchRow.insertCell(-1);
        launchRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo.launchTime);

        /*==== determine whether return time should be displayed. ====*/
        var attackerSurvivors = report.attackerQuantity.subtract(report.attackerLosses);
        let showReturnTime = !attackerSurvivors.isZero();

        var returnRow = reportTable.insertRow(3);
        returnRow.insertCell(-1);
        if (showReturnTime) {
            returnRow.cells[0].innerHTML = '<span title="the time the attacking troops return to the attacker\'s village">Returns</span>';
            returnRow.insertCell(-1);
            returnRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo.returnTime);
        }

        /*==== rally point Manage Troops link ====*/
        var displayManageTroopsLink = false;
        if (report.defender.name == game_data.player.name)
            displayManageTroopsLink = true;
        if (report.loyalty) {
            if (report.attacker.name == game_data.player.name && report.loyalty[1] <= 0)
                displayManageTroopsLink = false;
        }
        if (displayManageTroopsLink) {
            var defenderVillageCell = document.getElementById('attack_info_def').rows[1].cells[1];
            var manageTroopsButton = document.createElement('img');
            manageTroopsButton.src = imagePaths['rally'];
            manageTroopsButton.title = 'manage this village\'s troops';
            manageTroopsButton.style.cssFloat = 'right';
            manageTroopsButton.style.cursor = 'pointer';
            manageTroopsButton.onclick = function () { window.location = 'game.php?village=' + report.defenderVillage[0] + '&screen=place&mode=units' };
            defenderVillageCell.appendChild(manageTroopsButton);
        }


        /*==== json representation ====*/
        var jsonRow = reportTable.insertRow(5);
        jsonRow.insertCell(-1);
        jsonRow.cells[0].colSpan = 2;
        jsonRow.cells[0].innerHTML = '<b>JSON</b><br/><textarea cols=50 readonly=true>' + escapeHtml(JSON.stringify(report, null, 2)) + '</textarea>';

    };

    /**
     *	renames the report
     *	@param newName:String
     */
    this.renameReport = function (newName) {
        console.info('renaming report:', report);
        var url = window.TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: report.reportID });
        window.TribalWars.post(url,
            {},
            { text: newName },
            function (data) {
                var $container = $('.quickedit[data-id="' + report.reportID + '"]');
                $container.find('.quickedit-label').html(newName);
            },
            {}
        );

        /*==== retrieve key required for certain events ====*/
        //var text = String(gameDoc.getElementById('edit').getElementsByTagName('input')[1].onclick);
        //var hash = text.substring(text.indexOf('&h=')+3,text.indexOf('&report_id'));

        /*==== rename report ====*/
        //gameDoc.getElementById('editInput').value = newName;
        //var submitLink = 'game.php?ajaxaction=edit_subject&h='+hash+'&report_id='+report.reportID+'&screen=report';
        //editSubmit('label', 'labelText', 'edit', 'editInput', submitLink);
    };

    /**
     *	@param	mode:String	represents which mode to use
     */
    function twcheese_changeRaidMode(mode) {
        var haulBonus = Number(document.getElementById('twcheese_raider_haulBonus').value);

        if (mode == 'scouted') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'scouted';
            report.raidScouted = twcheese_calculateRaidScouted(report.resources, haulBonus);
            twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), report.raidScouted, report);
            gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
        }
        else if (mode == 'predicted') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'predicted';
            report.raidPredicted = twcheese_calculateRaidPredicted(report.resources, report.buildingLevels, game_data.village, report.defenderVillage, report.sent, TwCheeseDate.newServerDate(), gameConfig.speed, gameConfig.unit_speed, haulBonus);
            twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), report.raidPredicted, report);
            gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
        }
        else if (mode == 'periodic') {
            gameDoc.getElementById('twcheese_raider_selection').value = 'periodic';
            report.raidPeriodic = twcheese_calculateRaidPeriodic(report.buildingLevels, Number(gameDoc.getElementById('twcheese_period').value), gameConfig.speed, haulBonus);
            twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), report.raidPeriodic, report);
            gameDoc.getElementById('twcheese_periodic_options').style.display = '';
        }
    }
    this.changeRaidMode = twcheese_changeRaidMode;

    /**
     *	sets raiders displayed in the raider calculator
     *	@param	raiderTable:HTMLTableElement
     *	@param	units:Array	the units to display
     *	@param 	report:twcheese_BattleReport	the report being viewed
     */
    function twcheese_setRaiders(raiderTable, units, report) {
        for (var i = 0; i < 7; i++) {
            raiderTable.rows[1].cells[i].innerHTML = units[i];
        }

        if (game_data.market === 'uk') {
            return;
        }

        var scouts = document.getElementById('twcheese_raider_scouts').value;

        function attackUrl(unitCounts) {
            unitCounts = Object.assign({spy: scouts}, unitCounts);
            return attackPrepUrl(unitCounts, report.defenderVillage.id);
        }
            
        raiderTable.rows[0].cells[0].innerHTML = '<a href="' + attackUrl({spear: Math.round(units[0])}) + '"><img src="' + imagePaths['spear'] + '"/></a>';
        raiderTable.rows[0].cells[1].innerHTML = '<a href="' + attackUrl({sword: Math.round(units[1])}) + '"><img src="' + imagePaths['sword'] + '"/></a>';
        raiderTable.rows[0].cells[2].innerHTML = '<a href="' + attackUrl({axe: Math.round(units[2])}) + '"><img src="' + imagePaths['axe'] + '"/></a>';
        raiderTable.rows[0].cells[3].innerHTML = '<a href="' + attackUrl({archer: Math.round(units[3])}) + '"><img src="' + imagePaths['archer'] + '"/></a>';
        raiderTable.rows[0].cells[4].innerHTML = '<a href="' + attackUrl({light: Math.round(units[4])}) + '"><img src="' + imagePaths['lcav'] + '"/></a>';
        raiderTable.rows[0].cells[5].innerHTML = '<a href="' + attackUrl({marcher: Math.round(units[5])}) + '"><img src="' + imagePaths['acav'] + '"/></a>';
        raiderTable.rows[0].cells[6].innerHTML = '<a href="' + attackUrl({heavy: Math.round(units[6])}) + '"><img src="' + imagePaths['hcav'] + '"/></a>';
    }

}


/**
 *	modifies page on the reports folder view
 *	@param gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc, twcheese_reportsFolderDisplaySettings, gameConfig) {
    var pageMod = this;
    this.reports = new Array();

    /**
     *	mark checkboxes for reports with partial hauls
     */
    this.markPartialHauls = function () {
        for (var i = 0; i < partialHauls.length; i++)
            gameDoc.getElementsByName('id_' + partialHauls[i])[0].checked = true;
    };

    /**
     *	fills reportsTableBody with information
     */
    this.populateReportsTable = function () {
        for (let report of this.reports) {
            let row = reportsTableBody.insertRow(-1);
            row.twcheeseLabel = report.twcheeseLabel;

            /*==== basic cell ====*/
            let cell = row.insertCell(-1);
            cell.innerHTML = '<input name="id_' + report.reportID + '" type="checkbox">';
            cell.innerHTML += ' <img src="' + report.dotIcon + '"> ';
            if (report.lootIcon) {
                cell.innerHTML += '<img src="' + report.lootIcon + '"> ';
            }
            if (report.isForwarded) {
                cell.innerHTML += '<img src="graphic/forwarded.png?1" />';
            }
            cell.innerHTML += '<a href="' + game_data.link_base_pure + 'report&mode=' + game_data.mode + '&view=' + report.reportID + '"> view</a>';
            if (report.defender) {
                if (report.defender.name == game_data.player.name) {
                    cell.innerHTML += ' <img title="manage troops" style="float:right; cursor:pointer;" src="' + imagePaths['rally'] + '" onclick="window.location=\'game.php?village=' + report.defenderVillage.id + '&screen=place&mode=units\'"></img>';
                }
                if (report.loyalty && report.loyalty <= 0) {
                    cell.innerHTML += ' <img title="manage troops" style="float:right; cursor:pointer;" src="' + imagePaths['rally'] + '" onclick="window.location=\'game.php?village=' + report.defenderVillage.id + '&screen=place&mode=units\'"></img>';
                }
            }

            /*==== repeat attack cell ====*/
            cell = row.insertCell(-1);
            if (report.attacker && report.attacker.name === game_data.player.name) {
                let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportID});
                cell.innerHTML = '<a title="repeat attack, from current village" href="' + url + '"><img src="' + imagePaths['repeatFromCurrent'] + '" /></a>';
                if (report.twcheeseLabel) {
                    let url = gameUrl('place', {try: 'confirm', type: 'same', report_id: report.reportID, village: report.attackerVillage.id});
                    cell.innerHTML += ' | <a title="repeat attack, from original village" href="' + url + '"><img src="' + imagePaths['repeatFromOriginal'] + '" /></a>';
                }
            }

            /*==== distance cell ====*/
            cell = row.insertCell(-1);
            if (report.defenderDistance) {
                cell.innerHTML = report.defenderDistance;
            }

            /*==== full subject cell ====*/
            cell = row.insertCell(-1);
            cell.innerHTML = report.subjectHTML;
            if (!report.twcheeseLabel) {
                cell.colSpan = 44;
            }

            if (report.twcheeseLabel) {
                /*==== note cell ====*/
                let cell = row.insertCell(-1);
                if (report.note) {
                    cell.innerHTML = report.note;
                }

                /*==== attacker cell ====*/
                cell = row.insertCell(-1);
                if (report.attacker) {
                    cell.innerHTML = report.attacker.name;
                }

                /*==== defender cell ====*/
                cell = row.insertCell(-1);
                if (report.defender) {
                    cell.innerHTML = report.defender.name;
                }

                /*==== origin cell ====*/
                cell = row.insertCell(-1);
                if (report.attackerVillage) {
                    cell.innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.attackerVillage.id + '" >' + report.attackerVillage.x + '|' + report.attackerVillage.y + '</a>';
                }

                /*==== target cell ====*/
                cell = row.insertCell(-1);
                if (report.defenderVillage) {
                    cell.innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.defenderVillage.id + '" >' + report.defenderVillage.x + '|' + report.defenderVillage.y + '</a>';
                }

                /*==== feint cell ====*/
                cell = row.insertCell(-1);
                if (report.isFeint) {
                    cell.innerHTML = '<img title="The attack contained only a small amount of units" style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/grey.png?1">';
                }

                /*==== deadNoble cell ====*/
                cell = row.insertCell(-1);
                if (report.deadNoble) {
                    if (report.attacker.name == game_data.player.name) {
                        cell.innerHTML = '<a href="/game.php?village=' + report.attackerVillage.id + '&screen=snob"><img src="' + imagePaths['priest'] + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/></a>';
                    }
                    else {
                        cell.innerHTML = '<img src="' + imagePaths['priest'] + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/>';
                    }
                }

                /*==== loyalty cell ====*/
                cell = row.insertCell(-1);
                if (report.loyalty) {
                    cell.innerHTML = '<span class="icon ally lead" title="Loyalty change"></span> ' + report.loyalty[1];
                }

                /*==== defender survivors ====*/
                for (let troopType of troopTypes) {
                    if (troopType === 'militia') {
                        continue;
                        // todo: change headers and display options to handle various troop types, instead of hardcoded
                    }
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.defenderSurvivors) {
                        let survivorCount = report.defenderSurvivors[troopType];
                        cell.innerHTML = survivorCount;
                        if (survivorCount === 0) {
                            cell.className = 'unit-item hidden';
                        }
                        cell.troopDigits = String(survivorCount).length;
                    }
                }

                /*==== buildings ====*/
                for (let buildingType of buildingTypes) {
                    if (buildingType === 'watchtower') {
                        continue;
                        // todo: change headers and display options to handle various building types, instead of hardcoded
                    }
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.buildingLevels) {
                        let level = report.buildingLevels[buildingType];
                        if (level !== '?') {
                            cell.innerHTML = level;
                        }
                        if (level === 0) {
                            cell.className = 'hidden';
                        }
                    }
                }

                /*==== timber, clay, iron ====*/
                for (let j = 0; j < 3; j++) {
                    let cell = row.insertCell(-1);
                    cell.style.textAlign = 'center';
                    if (report.resources) {
                        cell.innerHTML = report.resources[j];
                        if (report.resources[j] == 0) {
                            cell.className = 'hidden';
                        }
                        cell.resourceDigits = report.resources[j].length;
                    }
                }

                /*==== resources total cell ====*/
                cell = row.insertCell(-1);
                cell.style.textAlign = 'center';
                if (report.resourcesTotal) {
                    cell.innerHTML = report.resourcesTotal;
                }
                if (report.resourcesTotal == 0) {
                    cell.className = 'hidden';
                }

                /*==== timeLaunched cell ====*/
                cell = row.insertCell(-1);
                if (report.timeLaunched) {
                    cell.innerHTML = twcheese_dateToString(report.timeLaunched);
                }

                /*==== timeReceived cell ====*/
                cell = row.insertCell(-1);
                if (report.timeReceived) {
                    cell.innerHTML = report.timeReceived;
                }
            }
            else {
                /*==== timeReceived cell ====*/
                let cell = row.insertCell(-1);
                if (report.timeReceived) {
                    cell.innerHTML = report.timeReceived;
                }
            }

            row.twcheeseReport = report;
        }
        yTableEmulator.style.height = reportsTableBody.clientHeight + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
        this.alignForTroops();
        this.alignForResources();
    };

    /**
     *	@param	link:HTMLAnchor	a link to a report
     *	@return	reportId:Number the reportId of the linked report
     */
    this.scrapeReportId = function (link) {
        var address = link.href;
        return new Number(address.substring(address.indexOf('view=') + 5).match('[0-9]{1,}'));
    }

    /**
     *	marks checkboxes and hides certain displays in accordance with the user's Folder Display settings
     *	@param settings:twcheese_ReportsFolderDisplaySettings()
     */
    this.applySettings = function (settings) {
        var checkboxes = document.getElementById('twcheese_reportsFolderSettings').getElementsByTagName('input');

        if (settings.repeatLinks == 1)
            checkboxes[0].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(1);

        if (settings.distance == 1)
            checkboxes[2].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(2);

        if (settings.fullSubject == 1)
            checkboxes[4].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(3);

        if (settings.note == 1)
            checkboxes[6].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(4);

        if (settings.attacker == 1)
            checkboxes[8].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(5);

        if (settings.defender == 1)
            checkboxes[10].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(6);

        if (settings.attackerVillage == 1)
            checkboxes[12].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(7);

        if (settings.defenderVillage == 1)
            checkboxes[14].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(8);

        if (settings.feint == 1)
            checkboxes[16].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(9);

        if (settings.deadNoble == 1)
            checkboxes[18].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(10);

        if (settings.loyalty == 1)
            checkboxes[20].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(11);

        if (settings.survivors == 1)
            checkboxes[22].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideDefenseColumns();

        if (settings.resourcesTimber == 1)
            checkboxes[24].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(42);

        if (settings.resourcesClay == 1)
            checkboxes[26].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(43);

        if (settings.resourcesIron == 1)
            checkboxes[28].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(44);

        if (settings.resourcesTotal == 1)
            checkboxes[30].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(45);

        if (settings.timeLaunched == 1)
            checkboxes[32].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(46);

        if (settings.timeReceived == 1)
            checkboxes[34].checked = true;
        else
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(47);

        var checkboxIndex;
        for (var i = 0; i < 18; i++) {
            checkboxIndex = i * 2 + 1;
            if (settings.buildings[i] == 1)
                checkboxes[checkboxIndex].checked = true;
            else
                document.getElementById('twcheese_reportsFolderDisplay').hideColumn(i + 24);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

        /*==== set display dimensions ====*/
        if (settings.displayWidth) {
            document.getElementById('twcheese_reportsFolderDisplay').style.width = settings.displayWidth;
            document.getElementById('twcheese_reportsFolderDisplay').style.height = settings.displayHeight;
            document.getElementById('twcheese_reportsFolderDisplay').fitDisplayComponents();

        }
    }

    /*==== find reports table ====*/
    /* note: premium players have a table with links to folders. regular players don't. But the layout seems to have changed again */
    var reportsTable;
    if (window.premium)
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];
    else
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];

    var reportsForm = reportsTable.parentNode;

    /*==== scrape reports information ====*/
    this.reports = new Array();
    var partialHauls = new Array();

    for (var i = 1; i < reportsTable.rows.length - 1; i++) {
        var report = twcheese_interpretReportName(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML);
        report.timeReceived = reportsTable.rows[i].cells[1].innerHTML;
        report.reportID = this.scrapeReportId(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0]);
        var reportIcons = [...reportsTable.rows[i].cells[1].getElementsByTagName('img')];

        /*==== defender distance from current village ====*/
        if (report.defenderVillage)
            try {
                report.defenderDistance = Math.round(report.defenderVillage.distanceTo(game_data.village) * 100) / 100;
            }
            catch (err) {
                console.error(err);
                report.defenderDistance = '?';
            }

        else
            report.defenderDistance = '?';

        /*==== dot color ====*/
        report.dotIcon = reportIcons.find(img => img.src.includes('graphic/dots/')).src;

        /*==== has it already been read? ====*/
        var cellText = $(reportsTable.rows[i].cells[0]).contents().filter(function () {
            return this.nodeType == 3;
        }).text();

        report.isNew = false;
        if (cellText.search(language['report']['unread']) != -1)
            report.isNew = true;

        /*==== partial hauls ====*/
        report.isFullHaul = false;
        report.isPartialHaul = false;

        // note: non-premium users don't get an icon showing partial/full haul
        let lootImg = reportIcons.find(img => img.src.includes('graphic/max_loot/'));
        if (lootImg) {
            if (lootImg.src.includes('max_loot/0.png')) {
                partialHauls.push(report.reportID);
                report.isPartialHaul = true;
            } else {
                report.isFullHaul = true;
            }
            report.lootIcon = lootImg.src;
        }

        /*==== forwarded ====*/
        report.isForwarded = !!reportIcons.find(img => img.src.includes('graphic/forwarded.png'));

        /*==== subject html ====*/
        var $subjectNode = $(reportsTable.rows[i].cells[1]).clone();
        $subjectNode.find(`img[src*='graphic/max_loot/'], img[src*='graphic/dots/']`).remove();
        report.subjectHTML = $subjectNode.html();

        /*==== timeReceived ====*/
        report.timeReceived = reportsTable.rows[i].cells[2].innerHTML;

        this.reports.push(report);
    }

    /*==== remove old table ====*/
    reportsTable.parentNode.removeChild(reportsTable);

    /*==== create twcheese reports folder ====*/
    var reportsFolder = document.createElement('div');
    reportsForm.insertBefore(reportsFolder, reportsForm.firstChild);
    reportsFolder.id = 'twcheese_reportsFolder';

    /*==== reports folder toolbar ====*/
    var reportsFolderToolbar = document.createElement('div');
    reportsFolder.appendChild(reportsFolderToolbar);
    reportsFolderToolbar.id = 'twcheese_reportsFolderToolbar';

    reportsFolderToolbar.currentPanel = 'none';
    reportsFolderToolbar.toggleDisplayConfig = function () {
        if (this.currentPanel == 'displayConfig') {
            document.getElementById('twcheese_displayConfig_tab').className = '';
            document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
            this.currentPanel = 'none';
        }
        else {
            document.getElementById('twcheese_displayConfig_tab').className = 'selected';
            document.getElementById('twcheese_export_tab').className = '';
            document.getElementById('twcheese_reportsFolderSettings').style.display = '';
            document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
            this.currentPanel = 'displayConfig';
        }
    };

    reportsFolderToolbar.toggleExport = function () {
        if (this.currentPanel == 'exportLinks') {
            document.getElementById('twcheese_export_tab').className = '';
            document.getElementById('twcheese_reportsFolderExport').style.display = 'none';
            this.currentPanel = 'none';
        }
        else {
            document.getElementById('twcheese_export_tab').className = 'selected';
            document.getElementById('twcheese_displayConfig_tab').className = '';
            document.getElementById('twcheese_reportsFolderExport').style.display = '';
            document.getElementById('twcheese_reportsFolderSettings').style.display = 'none';
            this.currentPanel = 'exportLinks';
        }
    };

    /*==== toolbar tabs ====*/
    reportsFolderToolbar.innerHTML += `
        <table style="border-style:solid; border-width:0px;" class="vis modemenu">
            <tbody>
                <tr>
                    <td id="twcheese_displayConfig_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleDisplayConfig();">
                        <a>configure display</a>
                    </td>
                    <td id="twcheese_export_tab" style="border-style:solid; border-width:1px; cursor:default;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleExport();">
                        <a>export repeat-attack links</a>
                    </td>
                </tr>
            </tbody>
        </table>`;


    /*==== export repeatLinks div ====*/
    var reportsFolderExportContainer = document.createElement('table');
    reportsFolderToolbar.appendChild(reportsFolderExportContainer);
    reportsFolderExportContainer.id = 'twcheese_reportsFolderExport';
    reportsFolderExportContainer.style.display = 'none';

    reportsFolderExportContainer.insertRow(-1);
    reportsFolderExportContainer.rows[0].insertCell(-1);
    reportsFolderExportContainer.rows[0].insertCell(-1);
    reportsFolderExportContainer.rows[0].cells[0].innerHTML += '<textarea rows=10 cols=40 />';

    /*==== export repeatLinks configuration table ====*/
    var exportConfigTable = document.createElement('table');
    exportConfigTable.id = 'twcheese_exportConfigTable';
    reportsFolderExportContainer.rows[0].cells[1].appendChild(exportConfigTable);

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[0].appendChild(document.createElement('th'));
    exportConfigTable.rows[0].cells[0].innerHTML = 'Format';
    exportConfigTable.rows[0].appendChild(document.createElement('th'));
    exportConfigTable.rows[0].cells[1].innerHTML = 'Attacking Village';

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[1].insertCell(-1);
    exportConfigTable.rows[1].cells[0].innerHTML = `
        <input type="radio" name="twcheese-repeat-attack-export-format" checked="true" value="bbcode"/> BBCode
        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="plainLink"/> plain links
        <br/><input type="radio" name="twcheese-repeat-attack-export-format" value="html"/> HTML`;

    exportConfigTable.rows[1].insertCell(-1);
    exportConfigTable.rows[1].cells[1].innerHTML = `
        <input type="radio" name="twcheese-repeat-attack-export-village" checked="true" value="current"/> current village
        <br/><input type="radio" name="twcheese-repeat-attack-export-village" value="original"/> original village`;

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[2].insertCell(-1);
    exportConfigTable.rows[2].cells[0].colSpan = 2;
    exportConfigTable.rows[2].cells[0].innerHTML = 'Header: <input type="text" id="twcheese_export_header" value="new cheesy attack group" onclick="if(this.value==\'new cheesy attack group\')this.value=\'\';" />';

    exportConfigTable.insertRow(-1);
    exportConfigTable.rows[3].insertCell(-1);
    exportConfigTable.rows[3].cells[0].colSpan = 2;
    exportConfigTable.rows[3].cells[0].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderExport\').exportLinks();" > &raquo; Export</a>';

    reportsFolderExportContainer.exportLinks = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        let format = $("input[name='twcheese-repeat-attack-export-format']:checked").val();
        let attackingVillage = $("input[name='twcheese-repeat-attack-export-village']:checked").val();

        var header = document.getElementById('twcheese_export_header').value;


        function buildHeader() {
            switch (format) {
                case 'bbcode':
                    return `[b][u][size=12]${header}[/size][/u][/b]`;

                case 'plainLink':
                    return header;

                case 'html':
                    return [
                        '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
                        `\n<DT><H3>${header}</H3></DT>\n<DL><P>`
                    ].join('');
            }
        }


        function urlCurrentVillage(twcheeseReport) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: twcheeseReport.reportID});
        }

        function buildEntryCurrentVillage(twcheeseReport) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlCurrentVillage(twcheeseReport) + ']repeat attack ' + twcheeseReport.reportID + ' from (' + game_data.village.coord + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlCurrentVillage(twcheeseReport);

                case 'html':
                    let leadingZero = '';
                    if (twcheeseReport.defenderDistance < 10) {
                        leadingZero = '0';
                    }
                    return '\n<DT><A HREF="' + urlCurrentVillage(twcheeseReport) + '" >' + leadingZero + twcheeseReport.defenderDistance + ' Repeat Attack ' + twcheeseReport.reportID + ' from (' + game_data.village.coord + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')</A></DT>';                
            }
        }


        function urlOriginalVillage(twcheeseReport) {
            return gameUrl('place', {try: 'confirm', type: 'same', report_id: twcheeseReport.reportID, village: twcheeseReport.attackerVillage.id});
        }

        function buildEntryOriginalVillage(twcheeseReport) {
            switch (format) {
                case 'bbcode':
                    return '\n[url=' + urlOriginalVillage(twcheeseReport) + ']repeat attack ' + twcheeseReport.reportID + ' from (' + twcheeseReport.attackerVillage.x + '|' + twcheeseReport.attackerVillage.y + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')[/url]';

                case 'plainLink':
                    return '\n' + urlOriginalVillage(twcheeseReport);

                case 'html':
                    return '\n<DT><A HREF="' + urlOriginalVillage(twcheeseReport) + '" >Repeat Attack ' + twcheeseReport.reportID + ' from (' + twcheeseReport.attackerVillage.x + '|' + twcheeseReport.attackerVillage.y + ') to (' + twcheeseReport.defenderVillage.x + '|' + twcheeseReport.defenderVillage.y + ')</A></DT>';
            }
        }

        var exportString = buildHeader();

        for (let i = 1; i < reportsTable.rows.length; i++) {
            let twcheeseReport = reportsTable.rows[i].twcheeseReport;
            if (twcheeseReport.attacker.name !== game_data.player.name) {
                continue; // can't repeat somebody else's attack
            }
            if (attackingVillage == 'current') {
                exportString += buildEntryCurrentVillage(twcheeseReport);
            }
            else if (attackingVillage == 'original' && reportsTable.rows[i].twcheeseLabel) {
                exportString += buildEntryOriginalVillage(twcheeseReport);
            } 
        }

        if (format === 'html') {
            exportString += '\n</P></DL>';
        }

        document.getElementById('twcheese_reportsFolderExport').getElementsByTagName('textarea')[0].value = exportString;
    };


    /*==== display settings ====*/
    var reportsFolderSettingsDiv = document.createElement('div');
    reportsFolderToolbar.appendChild(reportsFolderSettingsDiv);
    reportsFolderSettingsDiv.id = 'twcheese_reportsFolderSettings';
    reportsFolderSettingsDiv.style.display = 'none';

    /*==== options table ====*/
    var reportsFolderSettingsTable = document.createElement('table');
    reportsFolderSettingsTable.width = '100%';
    reportsFolderSettingsDiv.appendChild(reportsFolderSettingsTable);
    reportsFolderSettingsTable.id = 'twcheese_reportsFolderSettingsTable';

    for (let i = 0; i < 19; i++) {
        reportsFolderSettingsTable.insertRow(-1);
        reportsFolderSettingsTable.rows[i].insertCell(-1);
        reportsFolderSettingsTable.rows[i].insertCell(-1);
    }

    /*==== repeatLinks option ====*/
    var checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(1,'repeatLinks')";
    reportsFolderSettingsTable.rows[0].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Links to Repeat';

    /*==== distance option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(2,'distance')";
    reportsFolderSettingsTable.rows[1].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Distance';

    /*==== fullSubject option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(3,'fullSubject')";
    reportsFolderSettingsTable.rows[2].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Full Subject';

    /*==== note option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(4,'note')";
    reportsFolderSettingsTable.rows[3].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Note';

    /*==== attacker option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(5,'attacker')";
    reportsFolderSettingsTable.rows[4].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Attacker';

    /*==== defender option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(6,'defender')";
    reportsFolderSettingsTable.rows[5].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Defender';

    /*==== attackerVillage option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(7,'attackerVillage')";
    reportsFolderSettingsTable.rows[6].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Attacker\'s Village';

    /*==== defenderVillage option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(8,'defenderVillage')";
    reportsFolderSettingsTable.rows[7].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Defender\'s Village';

    /*==== feint option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(9,'feint')";
    reportsFolderSettingsTable.rows[8].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Feint';

    /*==== deadNoble option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(10,'deadNoble')";
    reportsFolderSettingsTable.rows[9].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Dead Noble';

    /*==== loyalty option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(11,'loyalty')";
    reportsFolderSettingsTable.rows[10].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Loyalty';

    /*==== survivors option ====*/
    var survivorsScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsDefenseColumns()";
    reportsFolderSettingsTable.rows[11].cells[0].innerHTML += '<input onClick="' + survivorsScript + '" type="checkbox"/>Troops: remaining defense';

    /*==== resourcesTimber option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(42,'resourcesTimber')";
    reportsFolderSettingsTable.rows[12].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Timber';

    /*==== resourcesClay option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(43,'resourcesClay')";
    reportsFolderSettingsTable.rows[13].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Clay';

    /*==== resourcesIron option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(44,'resourcesIron')";
    reportsFolderSettingsTable.rows[14].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Iron';

    /*==== resourcesTotal option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(45,'resourcesTotal')";
    reportsFolderSettingsTable.rows[15].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Resources: Total';

    /*==== timeLaunched option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(46,'timeLaunched')";
    reportsFolderSettingsTable.rows[16].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Time: Launched';

    /*==== timeReceived option ====*/
    checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(47,'timeReceived')";
    reportsFolderSettingsTable.rows[17].cells[0].innerHTML += '<input onClick="' + checkboxScript + '" type="checkbox"/>Time: Received';

    /*=== building options ====*/
    for (let i = 0; i < 18; i++) {
        checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(" + Number(i + 24) + ",'buildings[" + i + "]')";
        var targetCell = reportsFolderSettingsTable.rows[i].cells[1];
        targetCell.innerHTML = '<input onClick="' + checkboxScript + '" type="checkbox"/>';
        targetCell.innerHTML += language['twcheese']['Building'] + ': ' + language['buildings'][i];
    }


    /*==== reports display ====*/
    var reportsFolderDisplay = document.createElement('div');
    reportsFolder.appendChild(reportsFolderDisplay);
    reportsFolderDisplay.id = 'twcheese_reportsFolderDisplay';
    reportsFolderDisplay.style.overflow = 'hidden';
    reportsFolderDisplay.style.position = 'relative';
    reportsFolderDisplay.style.width = '646px';
    reportsFolderDisplay.style.height = '400px'; // I think this is what I should have used in the first place. TODO: test to ensure proper scrolling
    //reportsFolderDisplay.style.maxHeight = '400px';  //removed for resizable
    reportsFolderDisplay.style.minHeight = '100px';
    reportsFolderDisplay.style.minWidth = '100px';

    /*==== resizable functionality ====*/
    $(function () { $("#twcheese_reportsFolderDisplay").resizable(); });
    $('#twcheese_reportsFolderDisplay').resize(
        function () {
            try {
                document.getElementById('twcheese_reportsFolderDisplay').fitDisplayComponents();

                /*==== save settings ====*/
                var reportsFolderDisplay = document.getElementById('twcheese_reportsFolderDisplay');
                twcheese_reportsFolderDisplaySettings.displayWidth = reportsFolderDisplay.style.width;
                twcheese_reportsFolderDisplaySettings.displayHeight = reportsFolderDisplay.style.height;
                twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
            } catch (e) { console.error(e) }
        }
    );

    /*==== reports table header ====*/
    var reportsTableHeaderDiv = document.createElement('div');
    reportsFolderDisplay.appendChild(reportsTableHeaderDiv);
    reportsTableHeaderDiv.style.overflow = 'hidden';

    var reportsTableHeader = document.createElement('table');
    reportsTableHeaderDiv.appendChild(reportsTableHeader);
    reportsTableHeader.style.tableLayout = 'fixed';
    reportsTableHeader.style.width = '2370px';
    reportsTableHeader.id = 'twcheese_reportsTable_header';

    /*==== create headers ====*/
    reportsTableHeader.insertRow(-1);
    reportsTableHeader.insertRow(-1);

    for (let i = 0; i < 37; i++) {
        reportsTableHeader.rows[0].appendChild(document.createElement('th'));
    }
    reportsTableHeader.rows[0].cells[12].colSpan = 12;
    reportsTableHeader.rows[0].cells[12].innerHTML = 'Defense Remaining';

    var cellIndex = 0;

    /*==== basic header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '120px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '120px';
    cellIndex++;

    /*==== repeat links header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Repeat';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== distance header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Distance';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '60px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '60px';
    cellIndex++;

    /*==== subject header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Subject';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '400px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '400px';
    cellIndex++;

    /*==== note header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Note';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '200px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '200px';
    cellIndex++;

    /*==== attacker header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Attacker';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '150px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '150px';
    cellIndex++;

    /*==== defender header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Defender';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '150px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '150px';
    cellIndex++;

    /*==== origin header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Origin';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '70px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '70px';
    cellIndex++;

    /*==== target header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Target';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '70px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '70px';
    cellIndex++;

    /*==== feint header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Feint';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== dead noble header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Noble';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== loyalty header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Loyalty';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '50px';
    reportsTableHeader.rows[0].cells[cellIndex].style.width = '50px';
    cellIndex++;

    /*==== defense remaining ====*/
    var widthSum = 0;
    for (let i = 0; i < 12; i++) {
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['units'][i] + '" />';

        widthSum = widthSum + 20;
        cellIndex++;
    }
    reportsTableHeader.rows[0].cells[cellIndex - 12].style.width = widthSum + 'px';


    /*==== building levels ====*/
    for (let i = 0; i < 18; i++) {
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['buildings'][i] + '" />';
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '20px';
        cellIndex++;
    }

    /*==== timber header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.timber + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== clay header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.clay + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== timber header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + ImageSrc.iron + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== total resources header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Total';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '40px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '40px';
    cellIndex++;

    /*==== timeLaunched header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Launched';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '170px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '170px';
    cellIndex++;

    /*==== timeReceived header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = 'Received';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '140px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '140px';
    cellIndex++;

    /*==== reports table body ====*/
    var reportsTableBodyDiv = document.createElement('div');
    reportsFolderDisplay.appendChild(reportsTableBodyDiv);
    reportsTableBodyDiv.style.overflow = 'hidden';
    reportsTableBodyDiv.style.height = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
    reportsTableBodyDiv.style.width = '646px';
    reportsTableBodyDiv.id = 'twcheese_reportsTable';


    var reportsTableBody = document.createElement('table');
    reportsTableBodyDiv.appendChild(reportsTableBody);
    reportsTableBody.style.tableLayout = 'fixed';
    reportsTableBody.style.width = '2370px';
    reportsTableBody.id = 'twcheese_reportsTable_body';
    reportsTableBody.className = 'vis';

    /*==== create first row to match widths to header table ====*/
    reportsTableBody.insertRow(-1);
    for (let i = 0; i < reportsTableHeader.rows[1].cells.length; i++) {
        reportsTableBody.rows[0].insertCell(-1);
        reportsTableBody.rows[0].cells[i].style.width = reportsTableHeader.rows[1].cells[i].style.width;
    }
    reportsTableBody.rows[0].twcheeseLabel = true;

    /*==== y scroll panel====*/
    var yScrollPanel = document.createElement('div');
    yScrollPanel.id = 'twcheese_reportsDisplay_yScrollPanel';
    reportsFolderDisplay.appendChild(yScrollPanel);
    yScrollPanel.style.overflowY = 'scroll';
    yScrollPanel.style.overflowX = 'hidden';
    yScrollPanel.style.background = 'transparent';
    yScrollPanel.style.position = 'absolute';
    yScrollPanel.style.right = 0;
    //yScrollPanel.style.maxHeight = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
    yScrollPanel.style.height = Number(400 - 20 - reportsTableHeaderDiv.clientHeight) + 'px';
    yScrollPanel.style.top = reportsTableHeaderDiv.clientHeight + "px";

    /*==== y table emulator ====*/
    var yTableEmulator = document.createElement('div');
    yTableEmulator.id = 'twcheese_reportsDisplay_y-table-emulator';
    yScrollPanel.appendChild(yTableEmulator);
    yTableEmulator.style.height = reportsTableBody.clientHeight;
    //if(navigator.appName.search('Internet Explorer') != -1)
    //yTableEmulator.style.height = '10000px';
    yTableEmulator.style.overflow = 'hidden';
    yTableEmulator.style.position = 'relative';
    yTableEmulator.innerHTML = '&nbsp;';


    /*==== x scroll panel ====*/
    var xScrollPanel = document.createElement('div');
    xScrollPanel.id = 'twcheese_reportsDisplay_xScrollPanel';
    reportsFolderDisplay.appendChild(xScrollPanel);
    xScrollPanel.style.height = '40px';
    xScrollPanel.style.marginTop = '-23px';
    xScrollPanel.style.overflowX = 'scroll';
    xScrollPanel.style.overflowY = 'hidden';
    xScrollPanel.style.marginTop = 'expression(\'0px\')';// IE 7 fix
    xScrollPanel.style.height = 'expression(\'17px\')'; // IE 7 fix

    /*==== x table emulator ====*/
    var xTableEmulator = document.createElement('div');
    xTableEmulator.id = 'twcheese_reportsDisplay_x-table-emulator';
    xScrollPanel.appendChild(xTableEmulator);
    xTableEmulator.style.width = reportsTableHeader.clientWidth + 'px';
    xTableEmulator.innerHTML = '&nbsp;';

    /*==== scrolling functionality ====*/
    reportsTableBodyDiv.onscroll = function (e) {
        xScrollPanel.scrollTop = reportsTableBodyDiv.scrollTop;
    };

    yScrollPanel.onscroll = function (e) {
        reportsTableBodyDiv.scrollTop = yScrollPanel.scrollTop;
    };

    xScrollPanel.onscroll = function (e) {
        reportsTableBodyDiv.scrollLeft = xScrollPanel.scrollLeft;
        reportsTableHeaderDiv.scrollLeft = xScrollPanel.scrollLeft;
    };

    /*==== reports table functions ====*/
    var reportsTable = reportsFolderDisplay;

    reportsTable.toggleReportsDefenseColumns = function () {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        if (twcheese_reportsFolderDisplaySettings.survivors == 1) {
            /* hide */
            document.getElementById('twcheese_reportsFolderDisplay').hideDefenseColumns();
            twcheese_reportsFolderDisplaySettings.survivors = 0;
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }
        else {
            /* show */
            reportsTableHeader.rows[0].cells[12].style.display = "table-cell";
            for (var j = 12; j < 24; j++) {
                reportsTableHeader.rows[1].cells[j].style.display = "table-cell";
                for (var i = 0; i < reportsTableBody.rows.length; i++) {
                    if (!reportsTableBody.rows[i].twcheeseLabel)
                        reportsTableBody.rows[i].cells[3].colSpan += 1;
                    else
                        reportsTableBody.rows[i].cells[j].style.display = "table-cell";
                }
                var tableWidth = reportsTableHeader.style.width.split('px')[0];
                var columnWidth = reportsTableHeader.rows[1].cells[j].style.width.split('px')[0];
                tableWidth = Number(tableWidth) + Number(columnWidth);
                reportsTableHeader.style.width = tableWidth + 'px';
            }
            reportsTableBody.style.width = reportsTableHeader.style.width;

            twcheese_reportsFolderDisplaySettings.survivors = 1;
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.toggleReportsColumn = function (column, settingName) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');
        if (eval('twcheese_reportsFolderDisplaySettings.' + settingName) == 1) {
            document.getElementById('twcheese_reportsFolderDisplay').hideColumn(column);
            eval('twcheese_reportsFolderDisplaySettings.' + settingName + '= 0');
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }
        else {
            /* show */
            var tableWidth = reportsTableHeader.style.width.split('px')[0];
            var columnWidth = reportsTableHeader.rows[1].cells[column].style.width.split('px')[0];
            tableWidth = Number(tableWidth) + Number(columnWidth);

            /*==== header ====*/
            reportsTableHeader.style.width = tableWidth + 'px';
            if (column < 12)
                reportsTableHeader.rows[0].cells[column].style.display = "table-cell";
            else if (column >= 24)
                reportsTableHeader.rows[0].cells[column - 11].style.display = "table-cell";
            reportsTableHeader.rows[1].cells[column].style.display = "table-cell";

            /*==== body ====*/
            reportsTableBody.style.width = tableWidth + 'px';
            for (var i = 0; i < reportsTableBody.rows.length; i++) {
                if (!reportsTableBody.rows[i].twcheeseLabel && column > 2) {
                    if (column == 47) //timeReceived column
                        reportsTableBody.rows[i].cells[4].style.display = 'table-cell';
                    else
                        reportsTableBody.rows[i].cells[3].colSpan += 1;
                }
                else {
                    reportsTableBody.rows[i].cells[column].style.display = "table-cell";
                }
            }

            eval('twcheese_reportsFolderDisplaySettings.' + settingName + '= 1');
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.hideDefenseColumns = function () {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        reportsTableHeader.rows[0].cells[12].style.display = "none";
        for (var j = 12; j < 24; j++) {
            reportsTableHeader.rows[1].cells[j].style.display = "none";
            for (var i = 0; i < reportsTableBody.rows.length; i++) {
                if (!reportsTableBody.rows[i].twcheeseLabel)
                    reportsTableBody.rows[i].cells[3].colSpan -= 1;
                else
                    reportsTableBody.rows[i].cells[j].style.display = "none";
            }
            var tableWidth = reportsTableHeader.style.width.split('px')[0];
            var columnWidth = reportsTableHeader.rows[1].cells[j].style.width.split('px')[0];
            tableWidth = Number(tableWidth) - Number(columnWidth);
            reportsTableHeader.style.width = tableWidth + 'px';
        }
        reportsTableBody.style.width = reportsTableHeader.style.width;

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';
    };

    reportsTable.hideColumn = function (column) {
        var reportsTableBody = document.getElementById('twcheese_reportsTable_body');
        var reportsTableHeader = document.getElementById('twcheese_reportsTable_header');

        var tableWidth = reportsTableHeader.style.width.split('px')[0];
        var columnWidth;

        /*==== header ====*/
        if (column < 12) {
            reportsTableHeader.rows[0].cells[column].style.display = "none";
            columnWidth = reportsTableHeader.rows[0].cells[column].style.width.split('px')[0];
        }
        else if (column >= 24) {
            reportsTableHeader.rows[0].cells[column - 11].style.display = "none";
            columnWidth = reportsTableHeader.rows[0].cells[column - 11].style.width.split('px')[0];

        }
        tableWidth = Number(tableWidth) - Number(columnWidth);
        reportsTableHeader.style.width = tableWidth + 'px';
        reportsTableHeader.rows[1].cells[column].style.display = "none";

        /*==== body ====*/
        reportsTableBody.style.width = tableWidth + 'px';
        for (var i = 0; i < reportsTableBody.rows.length; i++) {
            if (!reportsTableBody.rows[i].twcheeseLabel && column > 2) {
                if (column == 47) // timeReceived column
                    reportsTableBody.rows[i].cells[4].style.display = 'none';
                else
                    reportsTableBody.rows[i].cells[3].colSpan -= 1;
            }
            else {
                reportsTableBody.rows[i].cells[column].style.display = "none";
            }
        }

        /*==== adjust scrollbars ====*/
        document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

    };

    /**
     *	note: changed from a loop to recursive method in 2.2 to allow redrawing of progress in IE via setTimeout method
     *	@param reports:Array(reportID:String)	an array of reportIDs for reports that still need to be renamed
     *	@param total:Number		the total amount of reports that will have been renamed
     */
    reportsTable.massRename = async function (reports, total) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        var inputs = reportsTable.getElementsByTagName('input');
        if (!reports) {
            reports = new Array(); //array of report IDs for reports to rename

            /*==== detect which reports need to be renamed ====*/
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    if (inputs[i].checked) {
                        reports.push(inputs[i].name.substring(3));
                    }
                }
            }
            document.getElementById('twcheese_progress_count_max').innerHTML = reports.length;
            total = reports.length;
        }
        var estimatedTimeRemaining;

        /*==== rename reports 1 by 1 ====*/
        if (reports.length == 0) {
            document.getElementById('twcheese_progress_count').innerHTML = 0;
            window.UI.ErrorMessage(language['twcheese']['noReportsSelected'], 3000);
        }
        else {
            var reportID = reports.shift();
            var startTime = performance.now();

            let reportDoc = await requestDocument(gameUrl('report', {mode: game_data.mode, view: reportID}));

            try {
                let now = TwCheeseDate.newServerDate();
                var report = twcheese_scrapeBattleReport(reportDoc);
                if (report.defenderQuantity)
                    report.defenderSurvivors = report.defenderQuantity.subtract(report.defenderLosses);                    
                report.killScores = calcKillScores(report.attackerLosses, report.defenderLosses);
                if (report.loyalty)
                    report.loyaltyExtra = calcLoyalty(gameConfig.speed, gameConfig.unit_speed, report.loyalty[1], report.sent, now, game_data.village, report.defenderVillage);
                report.timingInfo = twcheese_calculateTimingInfo(gameConfig.speed, gameConfig.unit_speed, report.sent, report.attackerQuantity, report.attackerVillage, report.defenderVillage);
                if (report.buildingLevels)
                    report.demolition = twcheese_calculateDemolition(report.buildingLevels);
                if (report.espionageLevel >= 1)
                    report.raidScouted = twcheese_calculateRaidScouted(report.resources);
                if (report.espionageLevel >= 2) {
                    report.populationSummary = twcheese_calculatePopulation(report.buildingLevels, report.defenderQuantity, report.unitsOutside);
                    report.raidPredicted = twcheese_calculateRaidPredicted(report.resources, report.buildingLevels, game_data.village, report.defenderVillage, report.sent, now, gameConfig.speed, gameConfig.unit_speed);
                    report.raidPeriodic = twcheese_calculateRaidPeriodic(report.buildingLevels, 8, gameConfig.speed);
                }
                report.reportID = reportID;

                var name = twcheese_nameReport(report, '');

                var url = window.TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: report.reportID });
                window.TribalWars.post(url,
                    {},
                    { text: name },
                    function (data) {
                        var $container = $('.quickedit[data-id="' + report.reportID + '"]');
                        $container.find('.quickedit-label').html(name);
                    },
                    {}
                );

                /*==== update reports information so row can be redrawn with updated information====*/
                var oldReport = reportsTable.rows[document.getElementsByName('id_' + report.reportID)[0].parentNode.parentNode.rowIndex].twcheeseReport;
                report = twcheese_interpretReportName(name);
                report.reportID = reportID;
                report.twcheeseLabel = true;
                report.dotIcon = oldReport.dotIcon;
                report.isFullHaul = oldReport.isFullHaul;
                report.isPartialHaul = oldReport.isPartialHaul;
                report.lootIcon = oldReport.lootIcon;
                report.isForwarded = oldReport.isForwarded;
                report.timeReceived = oldReport.timeReceived;
                //report.subjectHTML = reportsTable.rows[document.getElementsByName('id_'+report.reportID)[0].parentNode.parentNode.rowIndex].cells[3].innerHTML;
                pageMod.reports[document.getElementsByName('id_' + report.reportID)[0].parentNode.parentNode.rowIndex - 1] = report;

                /*==== update progress display ====*/
                var millisElapsed = performance.now() - startTime;
                estimatedTimeRemaining = (millisElapsed * reports.length) / 1000;
                var minutesRemaining = Math.floor(estimatedTimeRemaining / 60);
                var secondsRemaining = Math.round(estimatedTimeRemaining - (minutesRemaining * 60));
                if (minutesRemaining < 10)
                    minutesRemaining = '0' + minutesRemaining;
                if (secondsRemaining < 10)
                    secondsRemaining = '0' + secondsRemaining;
                document.getElementById('twcheese_time_remaining').innerHTML = minutesRemaining; //minutes
                document.getElementById('twcheese_time_remaining').innerHTML += ':' + secondsRemaining; //seconds
                document.getElementById('twcheese_progress_count').innerHTML = Number(total - reports.length);
                document.getElementById('twcheese_progress_percent').innerHTML = Number(Math.round((total - reports.length) / total * 100));
            }
            catch (e) {
                console.error('error renaming report:', e);
            }

            if (reports.length > 0)
                setTimeout(function () { document.getElementById('twcheese_reportsFolderDisplay').massRename(reports, total) }, 1);
            else {
                /*==== update subject html ====*/
                for (let i = 1; i < reportsTable.rows.length; i++) {
                    pageMod.reports[i - 1].subjectHTML = reportsTable.rows[i].cells[3].innerHTML;
                }

                document.getElementById('twcheese_reportsFolderDisplay').refreshContents();
            }
        }
    };

    reportsTable.refreshContents = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length;) {
            reportsTable.deleteRow(1);
        }

        pageMod.populateReportsTable();
        pageMod.applySettings(twcheese_reportsFolderDisplaySettings);

        //yTableEmulator.style.height = reportsTableBody.clientHeight + 'px';
        //xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';				

        /*==== adjust scrollbars ====*/
        //document.getElementById('twcheese_reportsDisplay_x-table-emulator').style.width = document.getElementById('twcheese_reportsTable_header').clientWidth + 'px';
        //document.getElementById('twcheese_reportsDisplay_y-table-emulator').style.height = document.getElementById('twcheese_reportsTable_body').clientHeight + 'px';

    };

    /**
     *	sets display components styles to fill the display zone and ensure scrolling functionality
     */
    reportsTable.fitDisplayComponents = function () {
        var displayZone = document.getElementById('twcheese_reportsFolderDisplay');
        var tableBody = document.getElementById('twcheese_reportsTable');
        tableBody.style.width = displayZone.style.width;
        tableBody.style.height = Number(Number(displayZone.style.height.substring(0, displayZone.style.height.indexOf('px'))) - 67) + 'px';
        document.getElementById('twcheese_reportsDisplay_yScrollPanel').style.height = tableBody.style.height;
    };

    reportsTable.selectNew = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isNew)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    }

    reportsTable.selectOld = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (!reportsTable.rows[i].twcheeseReport.isNew)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    }

    reportsTable.selectAll = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectNone = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = false;
        }
    };

    reportsTable.selectDotColor = function (dotColor) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.dotIcon.search(dotColor) != -1)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectForwarded = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isForwarded)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    /**
     *	@param type:Number - 0 for non full haul, 1 for full haul
     */
    reportsTable.selectLoot = function (type) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if ((reportsTable.rows[i].twcheeseReport.isFullHaul && type == 1) || (reportsTable.rows[i].twcheeseReport.isPartialHaul && type == 0))
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectFeint = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isFeint)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectDeadNoble = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.deadNoble)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectLoyalty = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.loyalty)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectCleared = function () {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.isCleared)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectText = function (text) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.subject.toLowerCase().search(text) != -1)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectAttacker = function (attackerName) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attacker.name == attackerName)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectDefender = function (defender) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defender.name == defender)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectAttackerVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attackerVillage.x == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.attackerVillage.y == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectDefenderVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defenderVillage.x == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.defenderVillage.y == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    /**
     *	todo: fix buginess
     *	adjusts reports table width based on troop counts
     */
    this.alignForTroops = function () {
        var maxDigits = new Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
        for (var row = 1; row < reportsTableBody.rows.length; row++) {
            if (reportsTableBody.rows[row].twcheeseLabel && reportsTableBody.rows[row].twcheeseReport.defenderSurvivors) {
                let survivors = reportsTableBody.rows[row].twcheeseReport.defenderSurvivors.toArray();
                for (var i = 0; i < 12; i++) {
                    var digits = new String(survivors[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
            }
        }

        var totalWidth = 0;
        for (let i = 0; i < 12; i++) {
            let $headerCell = $(reportsTableHeader.rows[1].cells[i + 12]);
            let $bodyCell = $(reportsTableBody.rows[0].cells[i + 12]);
            let width = Math.max($headerCell.innerWidth(), $bodyCell.innerWidth());

            $headerCell.css({'min-width': width});
            $bodyCell.css({'min-width': width});

            totalWidth += $bodyCell.outerWidth();
        }
        totalWidth += 11 * 2; // border spacing between the 12 cells
        let padding = 3;
        reportsTableHeader.style.width = Number(Number(reportsTableHeader.style.width.split('px')[0]) - Number(reportsTableHeader.rows[0].cells[12].style.width.split('px')[0]) + totalWidth - 2*padding) + 'px';
        reportsTableHeader.rows[0].cells[12].style.width = Number(totalWidth - 2*padding) + 'px';
        reportsTableBody.style.width = reportsTableHeader.clientWidth + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
    };

    /**
     *	adjusts reportsTable width based on resources
     */
    this.alignForResources = function () {
        var maxDigits = new Array(2, 2, 2, 5);
        for (var row = 1; row < reportsTableBody.rows.length; row++) {
            if (reportsTableBody.rows[row].twcheeseLabel && reportsTableBody.rows[row].twcheeseReport.resources) {
                for (var i = 0; i < 3; i++) {
                    let digits = new String(reportsTableBody.rows[row].twcheeseReport.resources[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
                let digits = new String(reportsTableBody.rows[row].twcheeseReport.resourcesTotal).length;
                if (digits > maxDigits[3])
                    maxDigits[3] = digits;
            }
        }

        reportsTableHeader.style.width = Number(Number(reportsTable.style.width.split('px')[0]) - 88) + 'px';
        for (let i = 0; i < 4; i++) {
            var width = maxDigits[i] * 8;
            if (width < 20)
                width = 20;
            reportsTableHeader.rows[1].cells[i + 42].style.width = width + 'px';
            reportsTableHeader.rows[0].cells[i + 31].style.width = width + 'px';
            reportsTableBody.rows[0].cells[i + 42].style.width = width + 'px';
            reportsTableHeader.style.width = Number(Number(reportsTableHeader.style.width.split('px')[0]) + width) + 'px';
        }
        reportsTableBody.style.width = reportsTableHeader.clientWidth + 'px';
        xTableEmulator.style.width = reportsTableBody.clientWidth + 'px';
    };

    /*==== put report information into table ====*/
    this.populateReportsTable();

    /*==== reports selector bar ====*/
    var reportsSelectorBar = document.createElement('div');
    reportsFolder.appendChild(reportsSelectorBar);
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
            click: () => reportsFolderDisplay.selectAll(),
            html: 'all'
        }],
        ['none', {
            click: () => reportsFolderDisplay.selectNone(),
            html: 'none'
        }],
        ['new', {
            click: () => reportsFolderDisplay.selectNew(),
            html: 'new'
        }],
        ['old', {
            click: () => reportsFolderDisplay.selectOld(),
            html: 'old'
        }],
        ['dotGreen', {
            click: () => reportsFolderDisplay.selectDotColor('green'),
            html: imgHtml('graphic/dots/green.png')
        }],
        ['dotYellow', {
            click: () => reportsFolderDisplay.selectDotColor('yellow'),
            html: imgHtml('graphic/dots/yellow.png')
        }],
        ['dotRed', {
            click: () => reportsFolderDisplay.selectDotColor('red'),
            html: imgHtml('graphic/dots/red.png')
        }],
        ['dotBlue', {
            click: () => reportsFolderDisplay.selectDotColor('blue'),
            html: imgHtml('graphic/dots/blue.png')
        }],
        ['forwarded', {
            click: () => reportsFolderDisplay.selectForwarded(),
            html: imgHtml('graphic/forwarded.png')
        }],
        ['haulPartial', {
            click: () => reportsFolderDisplay.selectLoot(0),
            html: imgHtml('graphic/max_loot/0.png')
        }],
        ['haulFull', {
            click: () => reportsFolderDisplay.selectLoot(1),
            html: imgHtml('graphic/max_loot/1.png')
        }],
        ['feint', {
            click: () => reportsFolderDisplay.selectFeint(),
            html: imgHtml('graphic/dots/grey.png'),
            tooltip: 'feint'
        }],
        ['deadNoble', {
            click: () => reportsFolderDisplay.selectDeadNoble(),
            html: imgHtml(imagePaths['priest']),
            tooltip: 'dead noble'
        }],
        ['loyalty', {
            click: () => reportsFolderDisplay.selectLoyalty(),
            html: '<span style="display:block; margin-left:auto; margin-right:auto" class="icon ally lead"/>',
            tooltip: 'loyalty change'
        }],
        ['cleared', {
            click: () => reportsFolderDisplay.selectCleared(),
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
            use: reportsFolderDisplay.selectText,
            sprite: [-140, 0]
        },
        {
            hintInput: 'attacker',
            hintButton: 'select attacking player',
            use: reportsFolderDisplay.selectAttacker,
            sprite: [-80, 0]
        },
        {
            hintInput: 'defender',
            hintButton: 'select defending player',
            use: reportsFolderDisplay.selectDefender,
            sprite: [-80, 0]
        },
        {
            hintInput: 'origin',
            hintButton: 'select attacking village',
            placeholder: 'x|y',
            use: reportsFolderDisplay.selectAttackerVillage,
            sprite: [-120, 0]
        },
        {
            hintInput: 'target',
            hintButton: 'select defending village',
            placeholder: 'x|y',
            use: reportsFolderDisplay.selectDefenderVillage,
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

    /*==== mass rename table ===*/

    // note: non-premium accounts cannot rename reports
    if (window.premium) {
        let $massRename = $(`
            <table class="vis">
                <tbody>
                    <tr>
                        <td>
                            <a href="#">&raquo; Rename</a>
                            <img src="/graphic/questionmark.png?1" width="13" height="13" title="rename selected reports to twCheese format">
                        </td>
                        <td style="textAlign: right;">Progress:</td>
                        <td style="width: 40px;"><span id="twcheese_progress_percent">0</span>%</td>
                        <td style="width: 136px;">(<span id="twcheese_progress_count">0</span>/<span id="twcheese_progress_count_max">0</span> reports)</td>
                        <td>time remaining: <span id="twcheese_time_remaining">00:00</span></td>
                    </tr>
                </tbody>
            </table>
        `.trim());
        $massRename.find('a').on('click', (e) => {
            e.preventDefault();
            reportsFolderDisplay.massRename();
        });
        $massRename.appendTo(reportsFolder);
    }

}

/**
 *	@param	text:String	text to be displayed inside the button
 *	@param	address:String	(optional) if included, causes the button to open a new window when clicked, directing the page to the specified address
 */
function createFooterButton(text, address) {
    var twcheese_menu = document.createElement('div');
    twcheese_menu.style.textAlign = 'center';

    var twcheese_menu_text = document.createElement('p');
    twcheese_menu_text.style.fontSize = '9pt';
    twcheese_menu_text.innerHTML = text;
    /*twcheese_menu_text.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';*/
    twcheese_menu_text.style.fontWeight = '700';
    twcheese_menu_text.style.marginTop = '3px';
    twcheese_menu_text.style.color = '#422301';
    twcheese_menu.appendChild(twcheese_menu_text);

    twcheese_menu.style.background = `url("${ImageSrc.legacy.helpBackground}")`;
    twcheese_menu.style.height = '22px';
    twcheese_menu.style.width = '49px';
    twcheese_menu.style.display = 'block';
    twcheese_menu.style.position = 'fixed';
    twcheese_menu.style.left = '100%';
    twcheese_menu.style.top = '100%';
    twcheese_menu.style.marginTop = '-24px';
    twcheese_menu.style.marginLeft = '-52px';
    twcheese_menu.style.zIndex = '99999999999';

    twcheese_menu.onmouseover = function () { this.style.background = `url("${ImageSrc.legacy.helpBackgroundBright}")` };
    twcheese_menu.onmouseout = function () { this.style.background = `url("${ImageSrc.legacy.helpBackground}")` };

    if (address) {
        twcheese_menu.style.cursor = 'pointer';
        twcheese_menu.onclick = function () { window.open(address, 'twcheese_menu_window') };
    }
    else
        twcheese_menu.style.cursor = 'default';

    return document.body.appendChild(twcheese_menu);
};


/*==== calculator functions ====*/


/**
 *	determines if an attack was likely just a distraction
 *	@param {TroopCounts} troops
 *	@return {boolean}
 */
function twcheese_isFeint(troops) {
    return troops.snob === 0 && troops.populationUsed() <= 130;
}

/**
 *	calculates some population information based on a scout report
 *	@param {BuildingLevels} buildingLevels
 *  @param {TroopCounts} troopsDefending
 *	@param {TroopCounts} troopsOutside
 *	@return	{{buildings:number, troops:number, idle:number}} population
 */
function twcheese_calculatePopulation(buildingLevels, troopsDefending, troopsOutside) {
    let buildingPop = buildingLevels.populationUsed();
    let troopPop = troopsDefending.populationUsed() + troopsOutside.populationUsed();
    return {
        buildings: buildingPop,
        troops: troopPop,
        idle: buildingLevels.populationCap() - buildingPop - troopPop
    };
}

/**
 *	@param {TwCheeseDate} timeOfArrival
 *	@param {TroopCounts} attackerTroops
 *	@param {Village} attackerVillage
 *	@param {Village} defenderVillage
 *	@return	{{launchTime:TwCheeseDate, returnTime:TwCheeseDate}}
 */
function twcheese_calculateTimingInfo(worldSpeed, unitSpeed, timeOfArrival, attackerTroops, attackerVillage, defenderVillage) {
    var distance = attackerVillage.distanceTo(defenderVillage);
    let travelDuration = attackerTroops.travelDuration(distance, 'attack', worldSpeed, unitSpeed);
    return {
        launchTime: new TwCheeseDate(timeOfArrival.getTime() - travelDuration),
        returnTime: new TwCheeseDate(timeOfArrival.getTime() + travelDuration)
    };
}

/**
 *	@param {BuildingLevels} buildings
 *	@return smashUnits:Array(demoScouted:Array,demoBuffer:Array)	an array of arrays of #cats to downgrade each building as much as possible (and #rams for wall). demoScouted is for scouted levels, demoBuffer is for buildings 1 level higher than scouted
 */
function twcheese_calculateDemolition(buildingLevels) {
    var demoScouted = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var demoBuffer = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var catAmounts = new Array(0, 2, 6, 10, 15, 21, 28, 36, 45, 56, 68, 82, 98, 115, 136, 159, 185, 215, 248, 286, 328, 376, 430, 490, 558, 634, 720, 815, 922, 1041, 1175, 1175);
    var catAmountsChurch = new Array(0, 400, 500, 600, 600);
    var ramAmounts = new Array(0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219);
    let invulnerable = ['church_f', 'hide'];

    function whichSiegeLookup(buildingType) {
        switch (buildingType) {
            case 'wall':    return ramAmounts;
            case 'church':  return catAmountsChurch;
            default:        return catAmounts;
        }
    }

    function assignDemolition(i) {
        let buildingType = BuildingLevels.typeAt(i);

        if (invulnerable.includes(buildingType)) {
            demoScouted[i] = 'NA';
            demoBuffer[i] = 'NA';
            return;
        }

        let level = buildingLevels[buildingType];
        if (level === '?') {
            demoScouted[i] = '?';
            demoBuffer[i] = '?';
            return;
        }

        let siegeAmounts = whichSiegeLookup(buildingType);

        demoScouted[i] = siegeAmounts[level];
        let bufferLevel = buildingLevels.canUpgrade(buildingType) ? level + 1 : level;
        demoBuffer[i] = siegeAmounts[bufferLevel];
    }

    for (let i = 0; i < 18; i++) {
        assignDemolition(i); // todo: assign to maps keyed by buildingType instead of arrays
    }

    return {
        oneShotScouted: demoScouted,
        oneShotUpgraded: demoBuffer
    };
}

/**
 *	@param	resourcesScouted:Array(timber,clay,iron)
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc.  Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidScouted(resourcesScouted, haulBonus) {
    if (!haulBonus)
        haulBonus = 0;

    var totalResources = resourcesScouted[0] + resourcesScouted[1] + resourcesScouted[2];
    return twcheese_calculateRaidUnits(totalResources, haulBonus);
}

/**
 *	@param	resourcesScouted:Array(timber,clay,iron)
 *	@param {BuildingLevels} buildingLevels
 *	@param {Village|{x:number, y:number}} home
 *	@param {Village} target
 *	@param {TwCheeseDate} timeSent the time the player received the report
 *	@param {TwCheeseDate} timeNow the current time
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidPredicted(resourcesScouted, buildingLevels, home, target, timeSent, timeNow, gameSpeed, unitSpeed, haulBonus) {
    if (!haulBonus) {
        haulBonus = 0;
    }

    var maxHaul = buildingLevels.resourceCap() - buildingLevels.hideableResources();
    var speeds = new Array(18, 22, 18, 18, 10, 10, 11);
    var resources = resourcesScouted.slice();

    /*==== calculate production rates ====*/
    var production = new Array(0, 0, 0);
    for (let [i, resType] of [[0, 'wood'], [1, 'stone'], [2, 'iron']]) {
        production[i] = buildingLevels.resourceProductionHourly(resType, gameSpeed);
    }

    /*==== add resources produced between the current time and the time of the report*/
    var timeElapsed = (timeNow - timeSent) / 3600000;
    for (i = 0; i < 3; i++) {
        resources[i] += timeElapsed * production[i];
        if (resources[i] > maxHaul)
            resources[i] = maxHaul;
    }

    /*==== calculate travel times (in hours) ====*/
    var travelTimes = new Array();
    for (var i = 0; i < 7; i++)
        travelTimes[i] = speeds[i] / gameSpeed / unitSpeed * target.distanceTo(home) / 60;

    /*==== add resources produced during travel ====*/
    var totalResources = new Array(0, 0, 0, 0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
        var resTotal = new Array(0, 0, 0);
        for (let j = 0; j < 3; j++) {
            resTotal[j] = resources[j] + travelTimes[i] * production[j];
            if (resTotal[j] > maxHaul)
                resTotal[j] = maxHaul;
        }
        totalResources[i] = resTotal[0] + resTotal[1] + resTotal[2];
    }


    /*==== calculate units to take resources ====*/
    var units = new Array(0, 0, 0, 0, 0, 0, 0);
    var hauls = new Array(25, 15, 10, 10, 80, 50, 50);
    for (let i = 0; i < 7; i++) {
        hauls[i] += hauls[i] * haulBonus / 100;
        units[i] = Math.round((totalResources[i] / hauls[i]) * 10) / 10;
    }

    return units;
}

/**
 *	@param {BuildingLevels} buildingLevels
 *	@param	period:Number	the number of hours that resources have been accumulating
 *	@param	gameSpeed:Number
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidPeriodic(buildingLevels, period, gameSpeed, haulBonus) {
    if (!haulBonus)
        haulBonus = 0;

    /*==== calculate maximum of each resource hauled ====*/
    var maxHaul = buildingLevels.resourceCap() - buildingLevels.hideableResources();

    /*==== calculate production rates ====*/
    var production = new Array(0, 0, 0);
    for (let [i, resType] of [[0, 'wood'], [1, 'stone'], [2, 'iron']]) {
        production[i] = buildingLevels.resourceProductionHourly(resType, gameSpeed);
    }

    /*==== calculate resources produced */
    var resources = new Array(0, 0, 0);
    for (let i = 0; i < 3; i++) {
        resources[i] = period * production[i];
        if (resources[i] > maxHaul)
            resources[i] = maxHaul;
    }
    var totalResources = resources[0] + resources[1] + resources[2];
    return twcheese_calculateRaidUnits(totalResources, haulBonus);
}

/**
 *	@param	resources	the total resources to be raided
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidUnits(resources, haulBonus) {
    if (!haulBonus)
        haulBonus = 0;

    var units = new Array(0, 0, 0, 0, 0, 0, 0);
    var hauls = new Array(25, 15, 10, 10, 80, 50, 50);
    for (var i = 0; i < 7; i++) {
        hauls[i] += hauls[i] * haulBonus / 100;
        units[i] = Math.round((resources / hauls[i]) * 10) / 10;

    }
    return units;
}

/*==== other functions ====*/

/**
 *	names a report in twCheese format
 *	@param report:twcheese_BattleReport
 *	@param note:String
 *	@return	newName:String
 */
function twcheese_nameReport(report, note) {
    var newName = 'twCheese: ';
    newName += report.attacker.name.replace(language['report']['deletedPlayer'], '') + ' ';
    newName += '(' + report.attackerVillage.x + '|' + report.attackerVillage.y + ',' + report.attackerVillage.id + ')';
    newName += report.defender.name.replace(language['report']['deletedPlayer'], '');
    newName += '(' + report.defenderVillage.x + '|' + report.defenderVillage.y + ',' + report.defenderVillage.id + ')';

    newName += '_t:' + Math.floor(report.timingInfo.launchTime.getTime() / 1000) + '. ';
    if (report.attackerLosses.snob > 0) //dead noble
        newName += '_x';
    if (report.loyalty)
        newName += '_l:' + report.loyalty[1] + '.';
    if (report.defenderSurvivors)
        newName += '_d[' + report.defenderSurvivors.toArray() + '] ';
    if (report.buildingLevels)
        newName += '_b[' + report.buildingLevels.toArray() + '] ';
    if (report.resources)
        newName += '_r[' + report.resources + '] ';
    if (twcheese_isFeint(report.attackerQuantity))
        newName += '_f';
    if (note)
        newName += '_n:' + note;

    return newName;
}

/**
 *	interprets a report named with twCheese format
 *	@param reportName:String
 *	@return report:twcheese_BattleReport
 */
function twcheese_interpretReportName(reportName) {
    var report = new twcheese_BattleReport();
    report.twcheeseLabel = false;

    /*=== remove the unnecessary whitespace at the beginning ====*/
    while (reportName.search('	') != -1) {
        reportName = reportName.replace('	', '');
    }
    while (reportName.search('\n') != -1) {
        reportName = reportName.replace('\n', '');
    }
    report.subject = reportName;

    var pattern = /\(.*?\)/gi;
    var data = reportName.match(pattern);
    if (data) {
        if (reportName.split(' ')[0] == 'twCheese:') {
            report.twcheeseLabel = true;
            reportName = reportName.replace('twCheese: ', '');
        }

        /*==== set attacker ====*/
        try {
            report.attacker = new Player(0, 0);
            var attackerString = reportName.split('(')[0];
            attackerString = attackerString.substring(0, attackerString.lastIndexOf(' '));
            report.attacker.name = attackerString;
        }
        catch (err) {
            report.attacker = null;
        }


        report.attackerVillage = new Village(0, 0, 0);
        report.defenderVillage = new Village(0, 0, 0);
        if (report.twcheeseLabel) /* report named with twCheese format */ {
            /*==== set attacker village ====*/
            try {
                data[0] = data[0].substring(data[0].lastIndexOf('(') + 1, data[0].lastIndexOf(')'));
                report.attackerVillage.x = data[0].split(',')[0].split('|')[0];
                report.attackerVillage.y = data[0].split(',')[0].split('|')[1];
                report.attackerVillage.id = data[0].split(',')[1];
            }
            catch (err) {
                console.warn('swallowed:', err);
            }

            /*==== set defender village ====*/
            try {
                data[1] = data[1].substring(data[1].lastIndexOf('(') + 1, data[1].lastIndexOf(')'));
                report.defenderVillage.x = data[1].split(',')[0].split('|')[0];
                report.defenderVillage.y = data[1].split(',')[0].split('|')[1];
                report.defenderVillage.id = data[1].split(',')[1];
            }
            catch (err) {
                report.defenderVillage = null;
            }

            try {
                /*==== set note ====*/
                report.note = false;
                if (reportName.search('_n:') != -1) {
                    report.note = reportName.substring(reportName.indexOf('_n:') + 3);
                    reportName = reportName.substring(0, reportName.indexOf('_n:'));
                }

                /*==== set buildings ====*/
                report.buildingLevels = false;
                if (reportName.search('_b') != -1) {
                    let text = reportName.substring(reportName.indexOf('_b') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    //if(text.search('\\?') != -1)
                    //{
                    text = text.substring(1, text.length - 1);
                    report.buildingLevels = BuildingLevels.fromArray(text.split(','));
                    //}
                    //else
                    //report.buildingLevels = eval(text);
                }

                /*==== set resources ====*/
                report.resources = false;
                report.resourcesTotal = false;
                if (reportName.search('_r') != -1) {
                    let text = reportName.substring(reportName.indexOf('_r') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    report.resources = eval(text);
                    report.resourcesTotal = report.resources[0] + report.resources[0] + report.resources[0];
                }

                /*==== set defense ====*/
                report.defenderSurvivors = false;
                report.isCleared = false;
                if (reportName.search('_d') != -1) {
                    let text = reportName.substring(reportName.indexOf('_d') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    report.defenderSurvivors = TroopCounts.fromArray(JSON.parse(text));
                    report.isCleared = report.defenderSurvivors.isZero();
                }

                /*==== set loyalty ====*/
                report.loyalty = false;
                if (reportName.search('_l:') != -1) {
                    let text = reportName.substring(reportName.indexOf('_l:') + 3);
                    text = text.substring(0, text.indexOf('.'));
                    report.loyalty = [-1, Number(text)];
                }

                /*==== set deadNoble ====*/
                report.deadNoble = false;
                if (reportName.search('_x') != -1)
                    report.deadNoble = true;

                /*==== set feint ====*/
                report.isFeint = false;
                if (reportName.search('_f') != -1)
                    report.isFeint = true;

                /*==== set timeLaunched ====*/
                report.timeLaunched = false;
                if (reportName.search('_t:') != -1) {
                    let text = reportName.substring(reportName.indexOf('_t:') + 3);
                    text = text.substring(0, text.indexOf('.'));
                    report.timeLaunched = TwCheeseDate.newServerDate(parseInt(text) * 1000);
                }

                /*==== set defender ====*/
                report.defender = false;
                let text = reportName.substring(reportName.indexOf(')') + 1);
                text = text.substring(0, text.indexOf('('));
                report.defender = new Player(0, text);
            }
            catch (err) {
                console.warn('swallowed', err);
            }
        }
        else {
            /*==== set defender village ====*/
            try {

                var defIndex;
                if (reportName.charAt(reportName.length - 1) == ')') /* report was renamed by the game based on the command name */
                    defIndex = data.length - 2
                else
                    defIndex = data.length - 1

                data[defIndex] = data[defIndex].substring(data[defIndex].lastIndexOf('(') + 1, data[defIndex].lastIndexOf(')'));
                report.defenderVillage.x = data[defIndex].split(',')[0].split('|')[0];
                report.defenderVillage.y = data[defIndex].split(',')[0].split('|')[1];
            }
            catch (err) {
                report.defenderVillage = null;
            }
        }
    }
    return report;
}

/**
 *	@param {TwCheeseDate} time
 *	@return time:String	formatted TW style
 */
function twcheese_dateToString(time) {
    var monthText = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var timeString = '';
    timeString += monthText[time.getServerMonth()] + ' ';
    if (time.getServerDate() < 10)
        timeString += '0';
    timeString += time.getServerDate() + ', ';
    timeString += time.getServerYear() + '  ';
    if (time.getServerHours() < 10)
        timeString += '0';
    timeString += time.getServerHours() + ':';
    if (time.getServerMinutes() < 10)
        timeString += '0';
    timeString += time.getServerMinutes() + ':';
    if (time.getServerSeconds() < 10)
        timeString += '0';
    timeString += time.getServerSeconds();
    return timeString;
}

/**
 *	requests the xml from a page
 *	@param	targetUrl:String	the url of the page to get the document from
 *	@return	requestedXML:String
 */
function twcheese_requestXML(targetUrl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", targetUrl, false);
    xmlhttp.send("");
    return xmlhttp.responseText;
}

/*==== storage functions ====*/

function twcheese_saveReportsFolderDisplaySettings(settings) {

    //localStorage.setItem('twcheese_reportsFolderDisplaySettings',escape(JSON.stringify(settings))); //old
    localStorage.setItem('twcheese_reportsFolderDisplaySettings', JSON.stringify(settings));
}

function twcheese_loadReportsFolderDisplaySettings() {
    if (!localStorage.getItem('twcheese_reportsFolderDisplaySettings')) {
        return new twcheese_ReportsFolderDisplaySettings();
    }
    else {
        var settings;
        if (localStorage.getItem('twcheese_reportsFolderDisplaySettings').search('%') != -1)
            settings = eval('(' + unescape(localStorage.getItem('twcheese_reportsFolderDisplaySettings')) + ')'); //old
        else
            settings = eval('(' + localStorage.getItem('twcheese_reportsFolderDisplaySettings') + ')'); //new
        return settings;
    }
}

function twcheese_getServerSettings() {
    let cacheKey = 'twcheese_game_config_bre';

    let cachedSettings = localStorage.getItem(cacheKey);
    if (cachedSettings) {
        return JSON.parse(cachedSettings);
    }

    let configXML = twcheese_requestXML('https://' + document.domain + '/interface.php?func=get_config')
    let settings = {
        speed: configXML.match(/\<SPEED>.*?\<\/SPEED>/gi)[0].toLowerCase().replace('<speed>', '').replace('</speed>', ''),
        unit_speed: configXML.match(/\<UNIT_SPEED>.*?\<\/UNIT_SPEED>/gi)[0].toLowerCase().replace('<unit_speed>', '').replace('</unit_speed>', ''),
        archer: configXML.match(/\<ARCHER>.*?\<\/ARCHER>/gi)[0].toLowerCase().replace('<archer>', '').replace('</archer>', ''),
        paladin: configXML.match(/\<KNIGHT>.*?\<\/KNIGHT>/gi)[0].toLowerCase().replace('<knight>', '').replace('</knight>', '')
    };
    localStorage.setItem(cacheKey, JSON.stringify(settings));
    return settings;
}


function twcheese_getBRESettings() {
    let cachedSettings = localStorage.getItem('twcheese_bresettings');
    if (cachedSettings) {
        return JSON.parse(cachedSettings);
    }

    return {
        autoRename: false,
        period: 8,
        haulBonus: 0,
        raid: 'scouted'
    };
}

function twcheese_setBRESettings(breSettings) {
    localStorage.setItem('twcheese_bresettings', JSON.stringify(breSettings));
}

/*==== main ====*/

let initialized = false;
let reportEnhanced = false;
let reportsFolderEnhanced = false;

function useTool() {
    if (!initialized) {
        initBRE();
        initialized = true;
    }

    let gameConfig = twcheese_getServerSettings();

    if (game_data.screen == 'report' && document.URL.includes('&view=')) {
        // user is viewing single report
        if (!reportEnhanced) {
            enhanceReport(gameConfig);
            reportEnhanced = true;
        }
    }
    else if (game_data.screen == 'report' && (game_data.mode == 'attack' || game_data.mode == 'defense')) {
        // user is viewing reports folder with 'Attacks' or "Defenses" filter on
        if (!reportsFolderEnhanced) {
            enhanceReportsFolder(gameConfig);
            reportsFolderEnhanced = true;
        }
    }
    else {
        alert('try using this on:\n1) a battle report\n2) a reports folder, with the "Attacks" filter on\n3) a reports folder, with the "Defenses" filter on');
    }
}


function initBRE() {

    /*==== contact information ====*/
    var narcismDiv = document.createElement('div');
    document.getElementById('content_value').insertBefore(narcismDiv, document.getElementById('content_value').firstChild);
    narcismDiv.innerHTML = 'BRE created by <a href="https://forum.tribalwars.net/index.php?members/28484">cheesasaurus</a>';
    narcismDiv.style.fontSize = '10px';

    /*==== help ====*/
    createFooterButton(language['twcheese']['Help'], 'https://forum.tribalwars.net/index.php?threads/256225/');
}


function enhanceReport(gameConfig) {
    let twcheese_BRESettings = twcheese_getBRESettings();

    /*==== calculate additional information ===*/
    let now = TwCheeseDate.newServerDate();
    let report = new twcheese_scrapeBattleReport(document);
    if (report.attackerQuantity)
        report.attackerSurvivors = report.attackerQuantity.subtract(report.attackerLosses);
    if (report.defenderQuantity)
        report.defenderSurvivors = report.defenderQuantity.subtract(report.defenderLosses);        
    report.killScores = calcKillScores(report.attackerLosses, report.defenderLosses);
    if (report.loyalty)
        report.loyaltyExtra = calcLoyalty(gameConfig.speed, gameConfig.unit_speed, report.loyalty[1], report.sent, now, game_data.village, report.defenderVillage);
    report.timingInfo = twcheese_calculateTimingInfo(gameConfig.speed, gameConfig.unit_speed, report.sent, report.attackerQuantity, report.attackerVillage, report.defenderVillage);
    if (report.buildingLevels)
        report.demolition = twcheese_calculateDemolition(report.buildingLevels);
    if (report.espionageLevel >= 1)
        report.raidScouted = twcheese_calculateRaidScouted(report.resources);
    if (report.espionageLevel >= 2) {
        report.populationSummary = twcheese_calculatePopulation(report.buildingLevels, report.defenderQuantity, report.unitsOutside);
        report.raidPredicted = twcheese_calculateRaidPredicted(report.resources, report.buildingLevels, game_data.village, report.defenderVillage, report.sent, now, gameConfig.speed, gameConfig.unit_speed);
        report.raidPeriodic = twcheese_calculateRaidPeriodic(report.buildingLevels, 8, gameConfig.speed);
    }

    /*==== add stuff to the page ====*/
    let pageMod = new twcheese_BattleReportEnhancer(document, report, gameConfig, twcheese_BRESettings);
    pageMod.includeExtraInformation();
    pageMod.includeReportTools();
    /*==== auto rename ====*/
    if (twcheese_BRESettings.autoRename)
        pageMod.renameReport(twcheese_nameReport(report, ''));

    /*==== set to user defaults ====*/
    if (report.espionageLevel >= 1) {
        document.getElementById('twcheese_period').value = twcheese_BRESettings.period;
        document.getElementById('twcheese_raider_haulBonus').value = twcheese_BRESettings.haulBonus;

        if (game_data.market != 'uk') {
            if (localStorage.getItem('twcheese_report_raiderScouts'))
                document.getElementById('twcheese_raider_scouts').value = localStorage.getItem('twcheese_report_raiderScouts');
        }

        pageMod.changeRaidMode(twcheese_BRESettings.raid);
    }

    document.getElementById('twcheese_auto_rename').checked = twcheese_BRESettings.autoRename;

    if (!userConfig.get('ReportToolsWidget.collapse', false)) {
        pageMod.toggleReportTools();
    }
        
}


function enhanceReportsFolder(gameConfig) {
    let twcheese_reportsFolderDisplaySettings = twcheese_loadReportsFolderDisplaySettings();
    twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
    let pageMod = new twcheese_BattleReportsFolderEnhancer(document, twcheese_reportsFolderDisplaySettings, gameConfig);
    pageMod.applySettings(twcheese_reportsFolderDisplaySettings);
}


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory({});

function newDebugProcess() {
    let name = 'Tool: Battle Report Enhancer';
    return processFactory.create(name, debugCfgDefault, true);
}


window.TwCheese.registerTool({
    id: 'BRE',
    use: useTool,
    getDebugProcess: newDebugProcess
});