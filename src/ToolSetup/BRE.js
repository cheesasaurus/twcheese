var twcheese_gameConfig,
    twcheese_BRESettings,
    twcheese_BREinitialized,
    twcheese_reportEnhanced,
    twcheese_reportsFolderDisplaySettings,
    twcheese_reportsFolderEnhanced
;   

if (!twcheese)
    var twcheese = {};

/*==== register ====*/
var script = {
    scriptname: 'Battle Report Enhancer',
    version: 8.25,
    author: 'Nick Toby',
    email: 'cheesasaurus@gmail.com',
    broken: false
};
$.post(ScriptAPI.url, script);

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
    imagePaths['report'] = 'https://forum.tribalwars.co.uk/images/smilies/new_report.png';
    imagePaths['baron'] = 'https://forum.tribalwars.co.uk/images/smilies/lead.png';
    imagePaths['timber'] = 'https://' + document.domain + '/graphic/holz.png?1';
    imagePaths['clay'] = 'https://' + document.domain + '/graphic/lehm.png?1';
    imagePaths['iron'] = 'https://' + document.domain + '/graphic/eisen.png?1';
    imagePaths['plus'] = 'graphic/plus.png';
    imagePaths['minus'] = 'graphic/minus.png';
    imagePaths['rename'] = 'graphic/rename.png';
}

/*==== styles ====*/
try {
    var styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'httpss://dl.dropbox.com/u/1621643/tw/scripts/dev/twcheese_BRE_UI.css';
    document.getElementsByTagName('head')[0].appendChild(styleLink);
} catch (e) { console.error(e) }
//TODO: test on various browsers


/*==== language ====*/

try {
    twcheese.language = { "buildings": [], "months": [], "report": [], "twcheese": [] };
    switch (game_data.market) {
        default:
            /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
            twcheese.language['buildings'][0] = 'Headquarters';
            twcheese.language['buildings'][1] = 'Barracks';
            twcheese.language['buildings'][2] = 'Stable';
            twcheese.language['buildings'][3] = 'Workshop';
            twcheese.language['buildings'][4] = 'Church';
            twcheese.language['buildings'][5] = 'First church';
            twcheese.language['buildings'][6] = 'Academy';
            twcheese.language['buildings'][7] = 'Smithy';
            twcheese.language['buildings'][8] = 'Rally point';
            twcheese.language['buildings'][9] = 'Statue';
            twcheese.language['buildings'][10] = 'Market';
            twcheese.language['buildings'][11] = 'Timber camp';
            twcheese.language['buildings'][12] = 'Clay pit';
            twcheese.language['buildings'][13] = 'Iron mine';
            twcheese.language['buildings'][14] = 'Farm';
            twcheese.language['buildings'][15] = 'Warehouse';
            twcheese.language['buildings'][16] = 'Hiding place';
            twcheese.language['buildings'][17] = 'Wall';

            twcheese.language['months'][0] = 'Jan';
            twcheese.language['months'][1] = 'Feb';
            twcheese.language['months'][2] = 'Mar';
            twcheese.language['months'][3] = 'Apr';
            twcheese.language['months'][4] = 'May';
            twcheese.language['months'][5] = 'Jun';
            twcheese.language['months'][6] = 'Jul';
            twcheese.language['months'][7] = 'Aug';
            twcheese.language['months'][8] = 'Sep';
            twcheese.language['months'][9] = 'Oct';
            twcheese.language['months'][10] = 'Nov';
            twcheese.language['months'][11] = 'Dec';

            twcheese.language['report']['catDamage'] = 'Damage by catapults:';
            twcheese.language['report']['ramDamage'] = 'Damage by rams:';
            twcheese.language['report']['farmAssistant'] = 'Possible resources:';
            twcheese.language['report']['haul'] = 'Haul:';
            twcheese.language['report']['loyalty'] = 'Loyalty:';
            twcheese.language['report']['timeSent'] = 'Battle time';
            twcheese.language['report']['unitsInTransit'] = 'Defender\'s troops, that were in transit';
            twcheese.language['report']['deletedPlayer'] = '(deleted)';
            twcheese.language['report']['unread'] = '(new)';

            twcheese.language['twcheese']['Building'] = 'Building';
            twcheese.language['twcheese']['Help'] = 'Help';
            twcheese.language['twcheese']['noReportsSelected'] = 'You haven\'t selected any reports to be renamed.';
            break;

        case 'cz':
            /*==== divokekmeny.cz/ ====*/
            twcheese.language['buildings'][0] = 'Hlavní budova';
            twcheese.language['buildings'][1] = 'Kasárna';
            twcheese.language['buildings'][2] = 'Stáj';
            twcheese.language['buildings'][3] = 'Dílna';
            twcheese.language['buildings'][4] = 'Kostel';
            twcheese.language['buildings'][5] = 'První kostel';
            twcheese.language['buildings'][6] = 'Panský dvůr';
            twcheese.language['buildings'][7] = 'Kovárna';
            twcheese.language['buildings'][8] = 'Nádvoří';
            twcheese.language['buildings'][9] = 'Socha';
            twcheese.language['buildings'][10] = 'Tržiště';
            twcheese.language['buildings'][11] = 'Dřevorubec';
            twcheese.language['buildings'][12] = 'Lom na těžbu hlíny';
            twcheese.language['buildings'][13] = 'Železný důl';
            twcheese.language['buildings'][14] = 'Selský dvůr';
            twcheese.language['buildings'][15] = 'Skladiště';
            twcheese.language['buildings'][16] = 'Skrýš';
            twcheese.language['buildings'][17] = 'Hradby';

            twcheese.language['months'][0] = 'Jan';
            twcheese.language['months'][1] = 'Feb';
            twcheese.language['months'][2] = 'Mar';
            twcheese.language['months'][3] = 'Apr';
            twcheese.language['months'][4] = 'May';
            twcheese.language['months'][5] = 'Jun';
            twcheese.language['months'][6] = 'Jul';
            twcheese.language['months'][7] = 'Aug';
            twcheese.language['months'][8] = 'Sep';
            twcheese.language['months'][9] = 'Oct';
            twcheese.language['months'][10] = 'Nov';
            twcheese.language['months'][11] = 'Dec';

            twcheese.language['report']['catDamage'] = 'Škoda vzniklá střelbou z katapultu:';
            twcheese.language['report']['ramDamage'] = 'Škoda vzniklá beranidlem:';
            twcheese.language['report']['farmAssistant'] = 'Vyšpehované suroviny:';
            twcheese.language['report']['haul'] = 'Kořist:';
            twcheese.language['report']['loyalty'] = 'Oddanost:';
            twcheese.language['report']['timeSent'] = 'Odesláno';
            twcheese.language['report']['unitsInTransit'] = 'Vojsko obránce, které bylo na cestě';
            twcheese.language['report']['deletedPlayer'] = '(deleted)'; //todo: translate
            twcheese.language['report']['unread'] = '(new)'; //todo: translate

            twcheese.language['twcheese']['Building'] = 'budově';
            twcheese.language['twcheese']['Help'] = 'Pomoc';
            twcheese.language['twcheese']['noReportsSelected'] = 'Nejdříve si musíte vybrat, které zprávy přejmenovat.';
            break;

        case 'se':
            twcheese.language['buildings'][0] = 'Högkvarter';
            twcheese.language['buildings'][1] = 'Barack';
            twcheese.language['buildings'][2] = 'Stall';
            twcheese.language['buildings'][3] = 'Verkstad';
            twcheese.language['buildings'][4] = 'Kyrka';
            twcheese.language['buildings'][5] = 'Första Kyrkan';
            twcheese.language['buildings'][6] = 'Akademi';
            twcheese.language['buildings'][7] = 'Smedja';
            twcheese.language['buildings'][8] = 'Samlingsplats';
            twcheese.language['buildings'][9] = 'Staty';
            twcheese.language['buildings'][10] = 'Marknad';
            twcheese.language['buildings'][11] = 'Sågverk';
            twcheese.language['buildings'][12] = 'Lergrop';
            twcheese.language['buildings'][13] = 'Järngruva';
            twcheese.language['buildings'][14] = 'Farm';
            twcheese.language['buildings'][15] = 'Förråd';
            twcheese.language['buildings'][16] = 'Gömställe';
            twcheese.language['buildings'][17] = 'Mur';

            twcheese.language['months'][0] = 'Jan';
            twcheese.language['months'][1] = 'Feb';
            twcheese.language['months'][2] = 'Mar';
            twcheese.language['months'][3] = 'Apr';
            twcheese.language['months'][4] = 'Maj';
            twcheese.language['months'][5] = 'Jun';
            twcheese.language['months'][6] = 'Jul';
            twcheese.language['months'][7] = 'Aug';
            twcheese.language['months'][8] = 'Sep';
            twcheese.language['months'][9] = 'Okt';
            twcheese.language['months'][10] = 'Nov';
            twcheese.language['months'][11] = 'Dec';

            twcheese.language['report']['catDamage'] = 'Skada gjord av katapulter:';
            twcheese.language['report']['ramDamage'] = 'Skada gjorda av Murbräckan:';
            twcheese.language['report']['farmAssistant'] = 'Resurser spejade:';
            twcheese.language['report']['haul'] = 'Byte:';
            twcheese.language['report']['loyalty'] = 'Lojalitet:';
            twcheese.language['report']['timeSent'] = 'Skickat';
            twcheese.language['report']['unitsInTransit'] = 'Enheter utanför byn';
            twcheese.language['report']['deletedPlayer'] = '(borttaget)';
            twcheese.language['report']['unread'] = '(new)'; //todo: translate

            twcheese.language['twcheese']['Building'] = 'Byggnad';
            twcheese.language['twcheese']['Help'] = 'Hjälp';
            twcheese.language['twcheese']['noReportsSelected'] = 'Du har inte valt några rapporter som skall döpas om.';
            break;

        /*==== fyletikesmaxes.gr/ ====*/
        case 'gr':
            twcheese.language['buildings'][0] = 'Επιτελείο';
            twcheese.language['buildings'][1] = 'Στρατώνας';
            twcheese.language['buildings'][2] = 'Στάβλος';
            twcheese.language['buildings'][3] = 'Εργαστήριο';
            twcheese.language['buildings'][4] = 'Εκκλησία';
            twcheese.language['buildings'][5] = 'ΠρώτηΕκκλησία';
            twcheese.language['buildings'][6] = 'Ακαδημία';
            twcheese.language['buildings'][7] = 'Οπλοποιείο';
            twcheese.language['buildings'][8] = 'ΜέροςΣυγκέντρωσης';
            twcheese.language['buildings'][9] = 'Άγαλμα';
            twcheese.language['buildings'][10] = 'Αγορά';
            twcheese.language['buildings'][11] = 'Ξυλουργείο';
            twcheese.language['buildings'][12] = 'Λατομείο';
            twcheese.language['buildings'][13] = 'Σιδηρωρυχείο';
            twcheese.language['buildings'][14] = 'Αγρόκτημα';
            twcheese.language['buildings'][15] = 'Αποθήκη';
            twcheese.language['buildings'][16] = 'Κρυψώνα';
            twcheese.language['buildings'][17] = 'Τείχος';

            twcheese.language['months'][0] = 'Ιαν';
            twcheese.language['months'][1] = 'Φεβ';
            twcheese.language['months'][2] = 'Μαρ';
            twcheese.language['months'][3] = 'Απρ';
            twcheese.language['months'][4] = 'Μαι';
            twcheese.language['months'][5] = 'Ιον';
            twcheese.language['months'][6] = 'Ιολ';
            twcheese.language['months'][7] = 'Αυγ';
            twcheese.language['months'][8] = 'Σεπ';
            twcheese.language['months'][9] = 'Οκτ';
            twcheese.language['months'][10] = 'Νοε';
            twcheese.language['months'][11] = 'Δεκ';

            twcheese.language['report']['catDamage'] = 'Ζημία που έκαναν οι καταπέλτες:';
            twcheese.language['report']['ramDamage'] = 'Ζημιά που προκλήθηκε από τον πολιορκητικό κριό:';
            twcheese.language['report']['farmAssistant'] = 'Πιθανοί πόροι:';
            twcheese.language['report']['haul'] = 'Αλλαγή:';
            twcheese.language['report']['loyalty'] = 'Πίστη:';
            twcheese.language['report']['timeSent'] = 'Απεσταλμένο';
            twcheese.language['report']['unitsInTransit'] = 'Στρατεύματα αμυνόμενου που ήταν σε μεταφορά';
            twcheese.language['report']['deletedPlayer'] = '(διεγραμμένο)';
            twcheese.language['report']['unread'] = '(νέο)';

            twcheese.language['twcheese']['Building'] = 'Κτίριο';
            twcheese.language['twcheese']['Help'] = 'Βοήθεια';
            twcheese.language['twcheese']['noReportsSelected'] = 'Δεν έχεις επιλέξει  καμιά αναφορά για μετονομασία';
            break;

        /* the market where Arma plays :D */
        case 'hr':
            twcheese.language['buildings'][0] = 'Sjedište';
            twcheese.language['buildings'][1] = 'Vojarna';
            twcheese.language['buildings'][2] = 'Štala';
            twcheese.language['buildings'][3] = 'Radionica';
            twcheese.language['buildings'][4] = 'Crkva';
            twcheese.language['buildings'][5] = 'Prva crkva';
            twcheese.language['buildings'][6] = 'Akademija';
            twcheese.language['buildings'][7] = 'Kovačnica';
            twcheese.language['buildings'][8] = 'Okupljalište';
            twcheese.language['buildings'][9] = 'Spomenik';
            twcheese.language['buildings'][10] = 'Tržnica';
            twcheese.language['buildings'][11] = 'Drvosječa';
            twcheese.language['buildings'][12] = 'Glinokop';
            twcheese.language['buildings'][13] = 'Rudnik željeza';
            twcheese.language['buildings'][14] = 'Farma';
            twcheese.language['buildings'][15] = 'Spremište';
            twcheese.language['buildings'][16] = 'Skrovište';
            twcheese.language['buildings'][17] = 'Zid';

            twcheese.language['months'][0] = 'Sij';
            twcheese.language['months'][1] = 'Vel';
            twcheese.language['months'][2] = 'Ožu';
            twcheese.language['months'][3] = 'Tra';
            twcheese.language['months'][4] = 'Svi';
            twcheese.language['months'][5] = 'Lip';
            twcheese.language['months'][6] = 'Srp';
            twcheese.language['months'][7] = 'Kol';
            twcheese.language['months'][8] = 'Ruj';
            twcheese.language['months'][9] = 'Lis';
            twcheese.language['months'][10] = 'Stu';
            twcheese.language['months'][11] = 'Pro';

            twcheese.language['report']['catDamage'] = 'Šteta nanešena katapultima:	';
            twcheese.language['report']['ramDamage'] = 'Šteta nanešena ovnovima:';
            twcheese.language['report']['farmAssistant'] = 'Moguće sirovine:';
            twcheese.language['report']['haul'] = 'Nosivost:';
            twcheese.language['report']['loyalty'] = 'Odanost:';
            twcheese.language['report']['timeSent'] = 'Poslano';
            twcheese.language['report']['unitsInTransit'] = 'Obrambene postrojbe koje su bile na putu';
            twcheese.language['report']['deletedPlayer'] = '(obrisano)';
            break;

        /* Norwegian */
        case 'no':
            twcheese.language['buildings'][0] = 'Hovedkvarter';
            twcheese.language['buildings'][1] = 'Brakker';
            twcheese.language['buildings'][2] = 'Stall';
            twcheese.language['buildings'][3] = 'Verksted';
            twcheese.language['buildings'][4] = 'Kirke';
            twcheese.language['buildings'][5] = 'Første Kirke';
            twcheese.language['buildings'][6] = 'Akademi';
            twcheese.language['buildings'][7] = 'Smie';
            twcheese.language['buildings'][8] = 'Samlingsplass';
            twcheese.language['buildings'][9] = 'Statue';
            twcheese.language['buildings'][10] = 'Marked';
            twcheese.language['buildings'][11] = 'Hogstfelt';
            twcheese.language['buildings'][12] = 'Leirgrav';
            twcheese.language['buildings'][13] = 'Jerngruve';
            twcheese.language['buildings'][14] = 'Gård';
            twcheese.language['buildings'][15] = 'Varehus';
            twcheese.language['buildings'][16] = 'Skjulested';
            twcheese.language['buildings'][17] = 'Mur';

            twcheese.language['months'][0] = 'Jan';
            twcheese.language['months'][1] = 'Feb';
            twcheese.language['months'][2] = 'Mar';
            twcheese.language['months'][3] = 'Apr';
            twcheese.language['months'][4] = 'Mai';
            twcheese.language['months'][5] = 'Jun';
            twcheese.language['months'][6] = 'Jul';
            twcheese.language['months'][7] = 'Aug';
            twcheese.language['months'][8] = 'Sep';
            twcheese.language['months'][9] = 'Okt';
            twcheese.language['months'][10] = 'Nov';
            twcheese.language['months'][11] = 'Des';

            twcheese.language['report']['catDamage'] = 'Skade forårsaket av katapulter:';
            twcheese.language['report']['ramDamage'] = 'Skade forårsaket av rambukker:';
            twcheese.language['report']['farmAssistant'] = 'Speidede ressurser:';
            twcheese.language['report']['haul'] = 'Bytte';
            twcheese.language['report']['loyalty'] = 'Lojalitet:';
            twcheese.language['report']['timeSent'] = 'Sendt';
            twcheese.language['report']['unitsInTransit'] = 'Forsvarer';
            twcheese.language['report']['timeSent'] = 'Kamptid';
            twcheese.language['report']['unitsInTransit'] = 'Antall';
            twcheese.language['report']['deletedPlayer'] = '(slettet)';
            twcheese.language['report']['unread'] = '(ny)';


            twcheese.language['twcheese']['Building'] = 'Bygning';
            twcheese.language['twcheese']['Help'] = 'Hjelp';
            twcheese.language['twcheese']['noReportsSelected'] = 'Du har ikke valgt hvilke rapporter som skal endres navn på.';
            break;
    }
} catch (e) { console.error(e) }

/*==== templates ====*/

/**
 * Reinforcements template
 * @attribute	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)	- the troop count of the army supporting
 * @attribute	village:Array(x,y,id)	- the information about the village being supported.
 */
function twcheese_Reinforcements() {
    this.troops = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.village = new Array(0, 0, 0);
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
	 * reads a HTMLElement with the timber count, clay count, and iron count, and converts it to an array of Numbers
	 * @param	resElement:HTMLElement	the html of the resources
	 * @return	resources:Array(timber:Number,clay:Number,iron:Number)
	 */
twcheese.resElementToNumbers = function (resElement) {
    var resIconNames = new Array('icon header wood', 'icon header stone', 'icon header iron');
    var resources = new Array(0, 0, 0);

    /*==== remove the grey periods ====*/
    $(resElement).children().children('.grey').remove();

    /*==== remove haul performance ====*/
    if (resElement.innerHTML.search('\\|') != -1)
        resElement.innerHTML = resElement.innerHTML.substring(0, resElement.innerHTML.indexOf('|') - 1);

    /*==== set resources ====*/
    var icons = resElement.getElementsByTagName('span');

    if (navigator.appName == 'Microsoft Internet Explorer') /* internet explorer */ {
        for (var i = 0; i < icons.length; i++) {
            /*==== if timber icon is found, set timber ====*/
            if (icons[i].className == resIconNames[0])
                resources[0] = Number(icons[i].nextSibling.data);

            /*==== if clay icon is found, set clay ====*/
            if (icons[i].className == resIconNames[1])
                resources[1] = Number(icons[i].nextSibling.data);

            /*==== if iron icon is found, set iron ====*/
            if (icons[i].className == resIconNames[2])
                resources[2] = Number(icons[i].nextSibling.data);
        }
    }
    else /* if(navigator.appName == 'Opera' || navigator.appName == 'Netscape') //opera, netscape */ {
        for (var i = 0; i < icons.length; i++) {
            /*==== if timber icon is found, set timber ====*/
            if (icons[i].className == resIconNames[0]) {
                resources[0] = Number(icons[i].nextSibling.wholeText);
            }

            /*==== if clay icon is found, set clay ====*/
            if (icons[i].className == resIconNames[1])
                resources[1] = Number(icons[i].nextSibling.wholeText);

            /*==== if iron icon is found, set iron ====*/
            if (icons[i].className == resIconNames[2])
                resources[2] = Number(icons[i].nextSibling.wholeText);
        }
    }
    return resources;
};

/**
 * @param	playerCell:HTMLTableCellElement - a cell containing a link to a player profile
 * @return	player:Array(id,name)
 */
function twcheese_getPlayerInfo(playerCell) {
    var player = new Array(0, 0);

    if (playerCell.innerHTML.search(twcheese.language['report']['deletedPlayer']) != -1)
        return new Array(-1, playerCell.innerHTML);
    else if (playerCell.innerHTML == '---')
        return new Array(0, '---');
    else {
        var playerLink = playerCell.firstChild;
        player[0] = Number(playerLink.href.match(/&id=[0-9]{1,}/)[0].substring(4));
        player[1] = playerLink.innerHTML;
        return player;
    }
}

/**
 * @param	troopRow:HTMLTableRowElement	- a row of cells containing troop counts
 * @param	gameConfig:object		the Tribal Wars server configuration
 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
 */
function twcheese_getTroopCount(troopRow, gameConfig) {
    var troops = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    troops[0] = Number(troopRow.cells[0].innerHTML);
    troops[1] = Number(troopRow.cells[1].innerHTML);

    if (gameConfig.archer == 0) //classic
    {
        troops[3] = Number(troopRow.cells[2].innerHTML);
        troops[4] = Number(troopRow.cells[3].innerHTML);
        troops[5] = Number(troopRow.cells[4].innerHTML);
        troops[7] = Number(troopRow.cells[5].innerHTML);
        troops[8] = Number(troopRow.cells[6].innerHTML);
        troops[9] = Number(troopRow.cells[7].innerHTML);

        if (gameConfig.paladin == 0) //classic without paladin
        {
            troops[11] = Number(troopRow.cells[8].innerHTML);
        }
        else // classic with paladin
        {
            troops[10] = Number(troopRow.cells[8].innerHTML);
            troops[11] = Number(troopRow.cells[9].innerHTML);
        }
    }
    else //new units
    {
        troops[2] = Number(troopRow.cells[2].innerHTML);
        troops[3] = Number(troopRow.cells[3].innerHTML);
        troops[4] = Number(troopRow.cells[4].innerHTML);
        troops[5] = Number(troopRow.cells[5].innerHTML);
        troops[6] = Number(troopRow.cells[6].innerHTML);
        troops[7] = Number(troopRow.cells[7].innerHTML);
        troops[8] = Number(troopRow.cells[8].innerHTML);
        troops[9] = Number(troopRow.cells[9].innerHTML);

        if (gameConfig.paladin == 0) //new units without paladin
        {
            troops[11] = Number(troopRow.cells[10].innerHTML);
        }
        else {
            troops[10] = Number(troopRow.cells[10].innerHTML);
            troops[11] = Number(troopRow.cells[11].innerHTML);
        }
    }
    return troops;
}

/**
 * @param	villageLink:HTMLAnchor - a link to a village with the name and coordinates
 * @return	village:Array(x,y,id)
 */
function twcheese_getVillageInfo(villageLink) {
    var village = new Array(0, 0, 0);
    village[0] = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('(') + 1, villageLink.innerHTML.lastIndexOf('|')));
    village[1] = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('|') + 1, villageLink.innerHTML.lastIndexOf(')')));
    village[2] = Number(villageLink.href.match(/&id=[0-9]{1,}/)[0].substring(4))
    return village;
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
        this.attackerTable = gameDocument.getElementById('attack_info_att');
        this.attackerUnitsTable = gameDocument.getElementById('attack_info_att_units');
        this.defenderTable = gameDocument.getElementById('attack_info_def');
        this.defenderUnitsTable = gameDocument.getElementById('attack_info_def_units');
        this.resultsTable = gameDocument.getElementById('attack_results');
        this.supportKilledTable = gameDocument.getElementById('attack_away_units');

        /* functions */

        /**
         * @return	player:Array(id,name)
         */
        this.getAttacker = function () {
            if (this.attackerTable) {
                var playerCell = this.attackerTable.rows[0].cells[1];
                return twcheese_getPlayerInfo(playerCell);
            }
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         */
        this.getAttackerLosses = function () {
            if (this.attackerUnitsTable)
                return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[2]), twcheese_gameConfig);
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         */
        this.getAttackerQuantity = function () {
            if (this.attackerUnitsTable)
                return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[1]), twcheese_gameConfig);
        };

        /**
         * @return	village:Array(x,y,id)
         */
        this.getAttackerVillage = function () {
            if (this.attackerTable)
                return twcheese_getVillageInfo(this.attackerTable.rows[1].cells[1].firstChild.firstChild);
        };

        /**
         * @return	buildingLevels:Array()
         * if no buildings were scouted, returns boolean false
         * -------------------
         * Building		Index
         * hq:			0
         * barracks:	1
         * stable:		2
         * workshop:	3
         * church:		4
         * church_f:	5
         * academy:		6
         * smithy:		7
         * rally:		8
         * statue:		9
         * market:		10
         * timber:		11
         * clay:		12
         * iron:		13
         * farm:		14
         * warehouse:	15
         * hiding:		16
         * wall:		17
         */
        this.getBuildingLevels = function () {
            if (this.getEspionageLevel() >= 2) {

                try {
                    var building_levels = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                    var building_ids = ['main', 'barracks', 'stable', 'garage', 'church', 'church_f', 'snob', 'smith', 'place', 'statue', 'market', 'wood', 'stone', 'iron', 'farm', 'storage', 'hide', 'wall'];

                    var building_data = JSON.parse($('#attack_spy_building_data').val());
                    for (i = 0; i < building_data.length; i++) {
                        var building = building_data[i];
                        building_levels[building_ids.indexOf(building.id)] = Number(building.level);
                    }

                    // church
                    if (building_levels[5] > 0) {
                        building_levels[4] = 0;
                    }
                    return building_levels;
                }
                catch (e) { console.error(e); }
            }
            else
                return Boolean(false);
        };

        /**
         *	@return catDamage:Array(buildingIndex:Number,beforeLevel:Number,afterLevel:Number)
         *	if no catapult damage was done, returns boolean false
         */
        this.getCatDamage = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == twcheese.language['report']['catDamage']) {
                        var catDamage = new Array(0, 0, 0);
                        //var buildingNames = new Array('village headquarters','barracks','stable','workshop','church','first church','academy','smithy','rally point','statue','market','timber camp','clay pit','iron mine','farm','warehouse','hiding place','wall');
                        var damageCell = thElements[i].parentNode.cells[1];
                        for (var n = 0; n < 18; n++) {
                            //var searchText = damageCell.innerHTML.toLowerCase();
                            //if(searchText.search(buildingNames[n]) != -1)
                            if (damageCell.innerHTML.search(twcheese.language['buildings'][n]) != -1)
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
         * @return	player:Array(id,name)
         */
        this.getDefender = function () {
            if (this.defenderTable) {
                var playerCell = this.defenderTable.rows[0].cells[1];
                return twcheese_getPlayerInfo(playerCell);
            }
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         * if no information about the strength of the enemy's army could be collected, returns boolean false
         */
        this.getDefenderLosses = function () {
            if (this.defenderUnitsTable)
                return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[2]), twcheese_gameConfig);
            else
                return false;
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         * if no information about the strength of the enemy's army could be collected, returns boolean false
         */
        this.getDefenderQuantity = function () {
            if (this.defenderUnitsTable)
                return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[1]), twcheese_gameConfig);
            else
                return false;
        };

        /**
         * @return	village:Array(x,y,id)
         */
        this.getDefenderVillage = function () {
            if (this.defenderTable)
                return twcheese_getVillageInfo(this.defenderTable.rows[1].cells[1].firstChild.firstChild);
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
            var spied_resources = $('#attack_spy_resources').length > 0;
            var spied_buildings = $('#attack_spy_building_data').length > 0;
            var spied_external = $('#attack_spy_away').length > 0;
            return Number(Number(spied_resources) + Number(spied_buildings) + Number(spied_external));
        };

        /**
         * @return	resources:Array(timber:Number,clay:Number,iron:Number)
         */
        this.getHaul = function () {
            if (this.resultsTable) {
                var thElements = this.resultsTable.getElementsByTagName('th');
                for (var i = 0; i < thElements.length; i++) {
                    if (thElements[i].innerHTML == twcheese.language['report']['haul']) {
                        return twcheese.resElementToNumbers(thElements[i].parentNode.cells[1]);
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
                    if (thElements[i].innerHTML == twcheese.language['report']['loyalty']) {
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
                    if (thElements[i].innerHTML == twcheese.language['report']['ramDamage']) {
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
            if ($('#attack_spy_resources').length > 0)

                return twcheese.resElementToNumbers($('#attack_spy_resources').find('td')[0]);
            else
                return false;
        };


        /**
         * @return	sent:Date
         */
        this.getSent = function () {
            var text = $($('#attack_luck').parents('table')[0].rows[1].cells[1]).text(); //from the element with the battle time
            var sent = new Date();

            if (game_data.market == 'cz') {
                var targetString = text;
                var numbers = targetString.match(/[0-9]{1,}/g);

                sent.setSeconds(numbers[5]);
                sent.setMinutes(numbers[4]);
                sent.setHours(numbers[3]);
                sent.setMonth(numbers[1] - 1, numbers[0]);
                sent.setYear('20' + numbers[2]);
            }
            else { /* .net, .us, .co.uk */
                var numbers = text.match(/[0-9]{1,}/g);
                var month = text.match(/\w{3,}/);
                for (var m = 0; m < 12; m++) {
                    if (month == twcheese.language['months'][m]) {
                        break;
                    }
                }

                if (numbers[5]) {
                    sent.setMilliseconds(numbers[5]);
                }
                sent.setSeconds(numbers[4]);
                sent.setMinutes(numbers[3]);
                sent.setHours(numbers[2]);
                sent.setMonth(m, numbers[0]);
                sent.setYear(numbers[1]);
            }
            return sent;
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
                    currentReinforcement.troops = twcheese_getTroopCount(twcheese_removeTroopsLabel(this.supportKilledTable.rows[i]), twcheese_gameConfig);
                    currentReinforcement.village = twcheese_getVillageInfo(this.supportKilledTable.rows[i].cells[0].firstChild);
                    reinforcements.push(currentReinforcement);
                }
                return reinforcements;
            }
            else
                return false;
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         * returns boolean false if no units In transit were detected
         */
        this.getUnitsInTransit = function () {
            var h4elements = gameDocument.getElementsByTagName('h4');
            for (var i = 0; i < h4elements.length; i++) {
                if (h4elements[i].innerHTML.search(twcheese.language['report']['unitsInTransit']) != -1)
                    return twcheese_getTroopCount(h4elements[i].nextSibling.nextSibling.rows[1], twcheese_gameConfig);
            }
            return false;
        };

        /**
         * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
         * returns boolean false if no units outside were detected
         */
        this.getUnitsOutside = function () {
            try {
                if (this.getEspionageLevel() == 3) {
                    return twcheese_getTroopCount($('#attack_spy_away').find('table')[0].rows[1], twcheese_gameConfig);
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
            if (!report.buildingLevels)
                report.buildingLevels = new Array('?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?');
            report.buildingLevels[17] = report.ramDamage[1];
        }
        if (report.catDamage) {
            if (!report.buildingLevels)
                report.buildingLevels = new Array('?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?');
            report.buildingLevels[report.catDamage[0]] = report.catDamage[2];
        }

        return report;
    } catch (e) { console.error(e) };
}


/*==== page modifier functions ====*/

/**
 *	@param widgetId:String
 *	@param icon:HTMLImageElement
 */
twcheese.toggleWidget = function (widgetId, icon) {
    var content = $('#' + widgetId).children('div:first');

    var toggleState;
    if (icon.src.search('plus') != -1) {
        icon.src = imagePaths['minus'];
        content.show(200);
        toggleState = 1;
    }
    else {
        icon.src = imagePaths['plus'];
        content.hide(200);
        toggleState = 0;
    }

    /*==== save settings ====*/
    eval('if(!twcheese.userConfig.' + game_data.screen + ')twcheese.userConfig.' + game_data.screen + '={}');
    eval('twcheese.userConfig.' + game_data.screen + '.' + widgetId.substring(9) + '=' + toggleState);
    localStorage.setItem('twcheese.userConfig', JSON.stringify(twcheese.userConfig));
};

/**
 *	modifies report page
 *	@param	gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
 *	@param	report:twcheese_BattleReport	the report data to use
 */
function twcheese_BattleReportEnhancer(gameDoc, report, gameConfig) {
    var contentValueElement = gameDoc.getElementById('content_value');

    this.includeReportTools = function () {
        /*==== tools widget containers ====*/
        var toolContainer = document.createElement('div');
        toolContainer.className = 'vis widget';
        toolContainer.id = 'twcheese_show_report_tools';

        var titleBar = document.createElement('h4');
        titleBar.innerHTML = 'Report Tools';
        var toggleButton = document.createElement('img');
        toggleButton.src = 'graphic/plus.png';
        toggleButton.style.cssFloat = 'right';
        toggleButton.style.cursor = 'pointer';
        toggleButton.onclick = function () {
            twcheese.toggleWidget('twcheese_show_report_tools', this)
        };
        titleBar.appendChild(toggleButton);
        toolContainer.appendChild(titleBar);

        var widgetContent = document.createElement('div');
        widgetContent.className = 'widget_content';
        widgetContent.style.display = 'none';

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
            if (report.espionageLevel >= 2)
                raiderTable.rows[1].cells[0].innerHTML += '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"><option value="scouted">raid scouted resources</option><option value="predicted">raid predicted resources</option><option value="periodic">periodically raid resources</option></select>';
            else if (report.espionageLevel >= 1)
                raiderTable.rows[1].cells[0].innerHTML += '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"><option value="scouted">raid scouted resources</option></select>';
            else
                raiderTable.rows[1].cells[0].innerHTML += '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"></select>';

            /*==== rally point link ====*/
            raiderTable.rows[1].cells[0].innerHTML += ' <a href="game.php?village=' + game_data.village.id + twcheese.babyUriComponent + '&screen=place&target=' + report.defenderVillage[2] + '">&raquo; Send troops</a>';

            /*==== haul Bonus ====*/
            raiderTable.rows[1].cells[0].innerHTML += '<br/>Haul Bonus: <input id="twcheese_raider_haulBonus" type="text" size=5 value=0 onchange="twcheese_changeRaidMode(document.getElementById(\'twcheese_raider_selection\').value)"></input>%<br/>';

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
            periodInput.onchange = function () {
                twcheese_currentReport.raidPeriodic = twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels, Number(this.value), twcheese_gameConfig.speed, Number(document.getElementById('twcheese_raider_haulBonus')));
                twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), twcheese_currentReport.raidPeriodic, twcheese_currentReport);
            };
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
                UI.InfoMessage('Settings Saved', 2000, 'success');
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
            for (var i = 0; i < 7; i++)
                raiderUnitsTable.rows[1].insertCell(-1);

            //==== travel times ====
            raiderUnitsTable.insertRow(-1);
            raiderUnitsTable.rows[2].className = 'center';

            var travelTimes = twcheese.calculateTravelTimes(twcheese_calculateDistance(report.attackerVillage, report.defenderVillage), twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed);

            for (var i = 0; i < 7; i++)
                raiderUnitsTable.rows[2].insertCell(-1);
            raiderUnitsTable.rows[2].cells[0].innerHTML = twcheese.formatDateTo_timeString(travelTimes[0]);
            raiderUnitsTable.rows[2].cells[1].innerHTML = twcheese.formatDateTo_timeString(travelTimes[1]);
            raiderUnitsTable.rows[2].cells[2].innerHTML = twcheese.formatDateTo_timeString(travelTimes[2]);
            raiderUnitsTable.rows[2].cells[3].innerHTML = twcheese.formatDateTo_timeString(travelTimes[3]);
            raiderUnitsTable.rows[2].cells[4].innerHTML = twcheese.formatDateTo_timeString(travelTimes[5]);
            raiderUnitsTable.rows[2].cells[5].innerHTML = twcheese.formatDateTo_timeString(travelTimes[6]);
            raiderUnitsTable.rows[2].cells[6].innerHTML = twcheese.formatDateTo_timeString(travelTimes[7]);

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
            for (var i = 0; i < 18; i++) {
                demolitionUnitsTable.rows[1].insertCell(-1);
                demolitionUnitsTable.rows[1].cells[i].width = "35px";
                if (game_data.market == 'uk') {
                    demolitionUnitsTable.rows[1].cells[i].innerHTML = '<img src="' + imagePaths[buildingLanguage[i]] + '" alt="' + buildingLanguage[i] + '" />';
                } else {
                    if (i == 17) {
                        siege_weapon = 'ram';
                    }
                    demolitionUnitsTable.rows[1].cells[i].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_' + siege_weapon + '=' + report.demolition[1][i] + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths[buildingLanguage[i]] + '" alt="' + buildingLanguage[i] + '" /></a>';
                }
                demolitionUnitsTable.rows[2].insertCell(-1);
                demolitionUnitsTable.rows[2].cells[i].innerHTML = report.demolition[0][i];
                demolitionUnitsTable.rows[3].insertCell(-1);
                demolitionUnitsTable.rows[3].cells[i].innerHTML = report.demolition[1][i];
            }

            demolitionTable.insertRow(-1);
            demolitionTable.rows[1].insertCell(-1);
            demolitionTable.rows[1].cells[0].appendChild(demolitionUnitsTable);

            toolTable.rows[0].cells[1].appendChild(demolitionTable);
        }

        /*==== renamer div ====*/
        var renamerDiv = document.createElement('div');
        renamerDiv.id = 'twcheese_renamer';
        renamerDiv.align = 'center';

        renamerDiv.innerHTML = '<span align="center"><h2>Renamer</h2></span>';
        renamerDiv.innerHTML += 'note <input id="twcheese_note" onkeyup="document.getElementById(\'twcheese_renamer\').previewName();" type="text"/> ';
        renamerDiv.innerHTML += '<button onclick="pageMod.renameReport(twcheese_nameReport(twcheese_currentReport,document.getElementById(\'twcheese_note\').value))">rename</button>';
        renamerDiv.innerHTML += '<input id="twcheese_auto_rename" type="checkbox" onclick="twcheese_BRESettings.autoRename = gameDoc.getElementById(\'twcheese_auto_rename\').checked; twcheese_setBRESettings(twcheese_BRESettings)" />auto rename';
        renamerDiv.innerHTML += ' <img id="twcheese_autoRenameInfo" src="/graphic/questionmark.png?1" width="13" height="13" title="automatically rename reports when the BRE is used" />';
        renamerDiv.innerHTML += '<br/> characters available: <span id="twcheese_availableCharacters">' + Number(255 - twcheese_nameReport(report, '').length) + '</span>';
        renamerDiv.innerHTML += '<br/><b>Preview: </b><span id="twcheese_rename_preview">' + twcheese_nameReport(report, '') + '</span>';
        toolTable.rows[1].cells[0].appendChild(renamerDiv);

        document.getElementById('twcheese_renamer').previewName = function () {
            var newName = twcheese_nameReport(twcheese_currentReport, document.getElementById('twcheese_note').value);
            document.getElementById('twcheese_rename_preview').innerHTML = newName;
            document.getElementById('twcheese_availableCharacters').innerHTML = Number(255 - newName.length);
        };
    };

    this.includeExtraInformation = function () {
        var reportTable = gameDoc.getElementById('attack_luck').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

        /*==== surviving defenders ====*/
        if (gameDoc.getElementById('attack_info_def_units')) {
            var defenseUnitsTable = gameDoc.getElementById('attack_info_def_units');
            var survivorsRow = defenseUnitsTable.insertRow(-1);
            survivorsRow.className = "center";
            survivorsRow.insertCell(-1);
            survivorsRow.cells[0].innerHTML = 'Survivors:';



            for (var i = 1; i < 13; i++) {
                survivorsRow.insertCell(-1);
                if (report.survivors[i - 1] == 0)
                    survivorsRow.cells[i].className = "hidden";
                survivorsRow.cells[i].innerHTML = report.survivors[i - 1];
            }

            /* remove displays for disabled units (note: need to progress right to left) */

            if (gameConfig.paladin < 1)
                survivorsRow.removeChild(survivorsRow.cells[12]);

            if (gameConfig.archer < 1) {
                survivorsRow.removeChild(survivorsRow.cells[7]);
                survivorsRow.removeChild(survivorsRow.cells[4]);
            }
        }

        /*==== surviving attackers ====*/
        if (gameDoc.getElementById('attack_info_att_units')) {
            var unit_table = gameDoc.getElementById('attack_info_att_units');
            var survivorsRow = unit_table.insertRow(-1);
            survivorsRow.className = "center";
            survivorsRow.insertCell(-1);
            survivorsRow.cells[0].innerHTML = 'Survivors:';
            survivorsRow.cells[0].align = 'left';

            for (var i = 1; i < 13; i++) {
                survivorsRow.insertCell(-1);
                if (report.attacker_survivors[i - 1] == 0)
                    survivorsRow.cells[i].className = "hidden";
                survivorsRow.cells[i].innerHTML = report.attacker_survivors[i - 1];
            }

            /* remove displays for disabled units (note: need to progress right to left) */

            if (gameConfig.paladin < 1)
                survivorsRow.removeChild(survivorsRow.cells[12]);

            if (gameConfig.archer < 1) {
                survivorsRow.removeChild(survivorsRow.cells[7]);
                survivorsRow.removeChild(survivorsRow.cells[4]);
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
            populationRow.cells[1].innerHTML = 'Buildings <b>(' + report.populationSummary[0] + ')</b><br/>Military <b>(' + report.populationSummary[1] + ')</b><br/>';
            if (report.espionageLevel == 3)
                populationRow.cells[1].innerHTML += 'Idle';
            else
                populationRow.cells[1].innerHTML += 'Unknown';
            populationRow.cells[1].innerHTML += ' <b>(' + report.populationSummary[2] + ')</b>';

            $(building_table).after(population_summary);
        }

        /*==== loyalty ====*/
        if (report.loyalty) {
            var resultsHeaders = gameDoc.getElementById('attack_results').getElementsByTagName('th');
            var loyaltyRow;
            for (var i = 0; i < resultsHeaders.length; i++)
                if (resultsHeaders[i].innerHTML == twcheese.language['report']['loyalty'])
                    loyaltyRow = resultsHeaders[i].parentNode;

            var loyaltyHTML = loyaltyRow.cells[1].innerHTML;
            loyaltyRow.removeChild(loyaltyRow.cells[1]);
            loyaltyRow.insertCell(-1);
            loyaltyRow.cells[1].innerHTML = loyaltyHTML;
            loyaltyRow.cells[1].innerHTML += '<br/><span title="the current predicted loyalty, based on time passed since this report">@Current Time: ' + report.loyaltyExtra[0] + '</span>';
            loyaltyRow.cells[1].innerHTML += '<br/><span title="the predicted loyalty at time of arrival, should you send a nobleman from your current village right now">@Arrival: ' + report.loyaltyExtra[1] + '</span>';
        }

        /*==== opponents defeated ====*/
        var oddRow = gameDoc.getElementById('attack_info_att').insertRow(-1);
        var oddHeader = document.createElement('th');
        oddHeader.innerHTML = 'ODD:';
        oddRow.appendChild(oddHeader);
        oddRow.insertCell(-1);
        oddRow.cells[1].innerHTML = 'The defender defeated ' + report.opponentsDefeatedSummary[1] + ' opponents.';

        var odaRow = gameDoc.getElementById('attack_info_def').insertRow(-1);
        var odaHeader = document.createElement('th');
        odaHeader.innerHTML = 'ODA:';
        odaRow.appendChild(odaHeader);
        odaRow.insertCell(-1);
        odaRow.cells[1].innerHTML = 'The attacker defeated ' + report.opponentsDefeatedSummary[0] + ' opponents.';

        /*==== timing info ====*/
        if (!reportTable.rows) //6.5 graphics
            reportTable = reportTable.getElementsByTagName('table')[1];
        launchRow = reportTable.insertRow(2);

        launchRow.insertCell(-1);
        launchRow.cells[0].innerHTML = '<span title="the time the attacker sent the attack">Launched</span>';
        launchRow.insertCell(-1);
        launchRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo[0]);

        /*==== determine whether return time should be displayed. ====*/
        var attackerSurvivors = twcheese_calculateSurvivors(report.attackerQuantity, report.attackerLosses);
        var showReturnTime = false;
        for (var i = 0; i < attackerSurvivors.length; i++)
            if (attackerSurvivors[i] > 0)
                showReturnTime = true;

        var returnRow = reportTable.insertRow(3);
        returnRow.insertCell(-1);
        if (showReturnTime) {
            returnRow.cells[0].innerHTML = '<span title="the time the attacking troops return to the attacker\'s village">Returns</span>';
            returnRow.insertCell(-1);
            returnRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo[1]);
        }

        /*==== rally point Manage Troops link ====*/
        var displayManageTroopsLink = false;
        if (report.defender[1] == game_data.player.name)
            displayManageTroopsLink = true;
        if (report.loyalty) {
            if (report.attacker[1] == game_data.player.name && report.loyalty[1] <= 0)
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
        jsonRow.cells[0].innerHTML = '<b>JSON</b><br/><textarea cols=50 readonly=true>' + JSON.stringify(report) + '</textarea>';

    };

    /**
     *	renames the report
     *	@param newName:String
     */
    this.renameReport = function (newName) {
        console.info('renaming report:', twcheese_currentReport);
        var url = TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: twcheese_currentReport.reportID });
        TribalWars.post(url,
            {},
            { text: newName },
            function (data) {
                var $container = $('.quickedit[data-id="' + twcheese_currentReport.reportID + '"]');
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
}

/**
 *	sets raiders displayed in the raider calculator
 *	@param	raiderTable:HTMLTableElement
 *	@param	units:Array	the units to display
 *	@param 	report:twcheese.BattleReport	the report being viewed
 */
function twcheese_setRaiders(raiderTable, units, report) {
    for (var i = 0; i < 7; i++) {
        raiderTable.rows[1].cells[i].innerHTML = units[i];
    }

    if (game_data.market != 'uk') {
        var scouts = document.getElementById('twcheese_raider_scouts').value;
        raiderTable.rows[0].cells[0].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_spear=' + Math.round(units[0]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['spear'] + '"/></a>';
        raiderTable.rows[0].cells[1].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_sword=' + Math.round(units[1]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['sword'] + '"/></a>';
        raiderTable.rows[0].cells[2].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_axe=' + Math.round(units[2]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['axe'] + '"/></a>';
        raiderTable.rows[0].cells[3].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_archer=' + Math.round(units[3]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['archer'] + '"/></a>';
        raiderTable.rows[0].cells[4].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_light=' + Math.round(units[4]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['lcav'] + '"/></a>';
        raiderTable.rows[0].cells[5].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_marcher=' + Math.round(units[5]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['acav'] + '"/></a>';
        raiderTable.rows[0].cells[6].innerHTML = '<a href="game.php?village=' + game_data.village.id + '&screen=place&from=simulator&att_spy=' + scouts + '&att_heavy=' + Math.round(units[6]) + '&target_village_id=' + report.defenderVillage[2] + twcheese.babyUriComponent + '"><img src="' + imagePaths['hcav'] + '"/></a>';
    }
}

/**
 *	@param	mode:String	represents which mode to use
 */
function twcheese_changeRaidMode(mode) {
    var haulBonus = Number(document.getElementById('twcheese_raider_haulBonus').value);

    if (mode == 'scouted') {
        gameDoc.getElementById('twcheese_raider_selection').value = 'scouted';
        twcheese_currentReport.raidScouted = twcheese_calculateRaidScouted(twcheese_currentReport.resources, haulBonus);
        twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), twcheese_currentReport.raidScouted, twcheese_currentReport);
        gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
    }
    else if (mode == 'predicted') {
        gameDoc.getElementById('twcheese_raider_selection').value = 'predicted';
        twcheese_currentReport.raidPredicted = twcheese_calculateRaidPredicted(twcheese_currentReport.resources, twcheese_currentReport.buildingLevels, game_data.village.coord.split('|'), twcheese_currentReport.defenderVillage, twcheese_currentReport.sent, twcheese_getServerTime(), twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed, haulBonus);
        twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), twcheese_currentReport.raidPredicted, twcheese_currentReport);
        gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
    }
    else if (mode == 'periodic') {
        gameDoc.getElementById('twcheese_raider_selection').value = 'periodic';
        twcheese_currentReport.raidPeriodic = twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels, Number(gameDoc.getElementById('twcheese_period').value), twcheese_gameConfig.speed, haulBonus);
        twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'), twcheese_currentReport.raidPeriodic, twcheese_currentReport);
        gameDoc.getElementById('twcheese_periodic_options').style.display = '';
    }
}

/**
 *	modifies page on the reports folder view
 *	@param gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
 */
function twcheese_BattleReportsFolderEnhancer(gameDoc) {
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
        for (var i = 0; i < this.reports.length; i++) {
            var report = this.reports[i];
            reportsTableBody.insertRow(-1);
            if (report.twcheeseLabel)
                reportsTableBody.rows[i + 1].twcheeseLabel = true;
            else
                reportsTableBody.rows[i + 1].twcheeseLabel = false;

            /*==== basic cell ====*/
            reportsTableBody.rows[i + 1].insertCell(-1);
            reportsTableBody.rows[i + 1].cells[0].innerHTML = '<input name="id_' + report.reportID + '" type="checkbox">';
            reportsTableBody.rows[i + 1].cells[0].innerHTML += ' <img src="' + report.dotIcon + '"> ';
            if (report.lootIcon)
                reportsTableBody.rows[i + 1].cells[0].innerHTML += '<img src="' + report.lootIcon + '"> ';
            if (report.isForwarded)
                reportsTableBody.rows[i + 1].cells[0].innerHTML += '<img src="graphic/forwarded.png?1" />';
            reportsTableBody.rows[i + 1].cells[0].innerHTML += '<a href="' + game_data.link_base_pure + 'report&mode=' + game_data.mode + '&view=' + report.reportID + '"> view</a>';
            if (report.defender) {
                if (report.defender[1] == game_data.player.name) {
                    reportsTableBody.rows[i + 1].cells[0].innerHTML += ' <img title="manage troops" style="float:right; cursor:pointer;" src="' + imagePaths['rally'] + '" onclick="window.location=\'game.php?village=' + report.defenderVillage[2] + '&screen=place&mode=units\'"></img>';
                }
                if (report.loyalty) {
                    if (report.loyalty <= 0) {
                        reportsTableBody.rows[i + 1].cells[0].innerHTML += ' <img title="manage troops" style="float:right; cursor:pointer;" src="' + imagePaths['rally'] + '" onclick="window.location=\'game.php?village=' + report.defenderVillage[2] + '&screen=place&mode=units\'"></img>';
                    }
                }
            }


            /*==== repeat attack cell ====*/
            reportsTableBody.rows[i + 1].insertCell(-1);
            if (report.attacker) {
                if (report.attacker[1] == game_data.player.name) {
                    reportsTableBody.rows[i + 1].cells[1].innerHTML = '<a title="repeat attack, from current village" href="game.php?village=' + game_data.village.id + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + report.reportID + '"><img src="' + imagePaths['repeatFromCurrent'] + '" /></a>';
                    if (reportsTableBody.rows[i + 1].twcheeseLabel)
                        reportsTableBody.rows[i + 1].cells[1].innerHTML += ' | <a title="repeat attack, from original village" href="/game.php?village=' + report.attackerVillage[2] + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + report.reportID + '"><img src="' + imagePaths['repeatFromOriginal'] + '" /></a>';
                }
            }

            /*==== distance cell ====*/
            reportsTableBody.rows[i + 1].insertCell(-1);
            if (report.defenderDistance)
                reportsTableBody.rows[i + 1].cells[2].innerHTML = report.defenderDistance;

            /*==== full subject cell ====*/
            reportsTableBody.rows[i + 1].insertCell(-1);
            reportsTableBody.rows[i + 1].cells[3].innerHTML = report.subjectHTML;
            if (!report.twcheeseLabel) {
                reportsTableBody.rows[i + 1].cells[3].colSpan = 44;
            }

            if (report.twcheeseLabel) {
                var cellIndex = 4;

                /*==== note cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.note)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.note;
                cellIndex++;

                /*==== attacker cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.attacker)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.attacker[1];
                cellIndex++;

                /*==== defender cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.defender)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.defender[1];
                cellIndex++;

                /*==== origin cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.attackerVillage)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.attackerVillage[2] + '" >' + report.attackerVillage[0] + '|' + report.attackerVillage[1] + '</a>';
                cellIndex++;

                /*==== target cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.defenderVillage)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<a href="' + game_data.link_base_pure + 'info_village&id=' + report.defenderVillage[2] + '" >' + report.defenderVillage[0] + '|' + report.defenderVillage[1] + '</a>';
                cellIndex++;

                /*==== feint cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.isFeint)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<img title="The attack contained only a small amount of units" style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/grey.png?1">';
                cellIndex++;

                /*==== deadNoble cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.deadNoble) {
                    if (report.attacker[1] == game_data.player.name)
                        reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<a href="/game.php?village=' + report.attackerVillage[2] + '&screen=snob"><img src="' + imagePaths['priest'] + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/></a>';
                    else
                        reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<img src="' + imagePaths['priest'] + '" style="display:block; margin-left:auto; margin-right:auto" title="An attacking nobleman died."/>';
                }
                cellIndex++;

                /*==== loyalty cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.loyalty)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = '<span class="icon ally lead" title="Loyalty change"></span> ' + report.loyalty[1];
                cellIndex++;

                /*==== survivors ====*/
                /*if(report.cleared)
                {
                    reportsTableBody.rows[i+1].insertCell(-1);
                    reportsTableBody.rows[i+1].cells[cellIndex].innerHTML = '<b>CLEAR</b>';
                    reportsTableBody.rows[i+1].cells[cellIndex].colSpan = 12;
                    cellIndex ++;
                }
                else *///note: changed my mind about doing this. Might change it again later so left intact
                for (var j = 0; j < 12; j++) {
                    reportsTableBody.rows[i + 1].insertCell(-1);
                    reportsTableBody.rows[i + 1].cells[cellIndex].style.textAlign = 'center';
                    if (report.survivors) {
                        reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.survivors[j];
                        if (report.survivors[j] == 0)
                            reportsTableBody.rows[i + 1].cells[cellIndex].className = 'unit-item hidden';
                        reportsTableBody.rows[i + 1].cells[cellIndex].troopDigits = report.survivors[j].length;
                    }
                    cellIndex++;
                }


                /*==== buildings ====*/
                for (var j = 0; j < 18; j++) {
                    reportsTableBody.rows[i + 1].insertCell(-1);
                    reportsTableBody.rows[i + 1].cells[cellIndex].style.textAlign = 'center';
                    if (report.buildingLevels) {
                        if (report.buildingLevels[j] != '?')
                            reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.buildingLevels[j];
                        if (report.buildingLevels[j] == 0)
                            reportsTableBody.rows[i + 1].cells[cellIndex].className = 'hidden';
                    }
                    cellIndex++;
                }

                /*==== timber, clay, iron ====*/
                for (var j = 0; j < 3; j++) {
                    reportsTableBody.rows[i + 1].insertCell(-1);
                    reportsTableBody.rows[i + 1].cells[cellIndex].style.textAlign = 'center';
                    if (report.resources) {
                        reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.resources[j];
                        if (report.resources[j] == 0)
                            reportsTableBody.rows[i + 1].cells[cellIndex].className = 'hidden';
                        reportsTableBody.rows[i + 1].cells[cellIndex].resourceDigits = report.resources[j].length;
                    }
                    cellIndex++;
                }

                /*==== resources total cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                reportsTableBody.rows[i + 1].cells[cellIndex].style.textAlign = 'center';
                if (report.resourcesTotal)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.resourcesTotal;
                if (report.resourcesTotal == 0)
                    reportsTableBody.rows[i + 1].cells[cellIndex].className = 'hidden';
                cellIndex++;

                /*==== timeLaunched cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.timeLaunched)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = twcheese_dateToString(report.timeLaunched);
                cellIndex++;

                /*==== timeReceived cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.timeReceived)
                    reportsTableBody.rows[i + 1].cells[cellIndex].innerHTML = report.timeReceived;
                cellIndex++;
            }
            else {
                /*==== timeReceived cell ====*/
                reportsTableBody.rows[i + 1].insertCell(-1);
                if (report.timeReceived) {
                    reportsTableBody.rows[i + 1].cells[4].innerHTML = report.timeReceived;
                }
            }

            /*==== indicate if row is twcheese format ====*/
            if (report.twcheeseLabel) {
                reportsTableBody.rows[i + 1].twcheeseLabel = true;
            }
            else {
                reportsTableBody.rows[i + 1].twcheeseLabel = false;
            }

            reportsTableBody.rows[i + 1].twcheeseReport = report;
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
    if (game_data.player.premium)
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];
    else
        reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];

    var reportsForm = reportsTable.parentNode;

    /*==== scrape reports information ====*/
    this.reports = new Array();
    var partialHauls = new Array();
    var home = game_data.village.coord.split('|');

    for (var i = 1; i < reportsTable.rows.length - 1; i++) {
        var report = twcheese_interpretReportName(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML);
        report.timeReceived = reportsTable.rows[i].cells[1].innerHTML;
        report.reportID = this.scrapeReportId(reportsTable.rows[i].cells[1].getElementsByTagName('a')[0]);
        var reportIcons = reportsTable.rows[i].cells[1].getElementsByTagName('img');

        // check if it has a strength icon
        var has_strength_icon = false;
        var divs = reportsTable.rows[i].cells[1].getElementsByTagName('div');
        if (divs.length) {
            if (divs[0].getElementsByTagName('img').length) {
                has_strength_icon = true;
            }
        }

        /*==== defender distance from current village ====*/
        if (report.defenderVillage)
            try {
                report.defenderDistance = Math.round(twcheese_calculateDistance(home, report.defenderVillage) * 100) / 100;
            }
            catch (err) {
                console.error(err);
                report.defenderDistance = '?';
            }

        else
            report.defenderDistance = '?';

        /*==== dot color ====*/
        if (has_strength_icon) {
            report.dotIcon = reportIcons[1].src;
        } else {
            report.dotIcon = reportIcons[0].src;
        }

        /*==== has it already been read? ====*/
        var cellText = $(reportsTable.rows[i].cells[0]).contents().filter(function () {
            return this.nodeType == 3;
        }).text();

        report.isNew = false;
        if (cellText.search(twcheese.language['report']['unread']) != -1)
            report.isNew = true;

        /*==== partial hauls ====*/
        report.isFullHaul = false;
        report.isPartialHaul = false;
        if (game_data.player.premium) {
            if (reportIcons.length > 1) {
                if (reportIcons[1].src.search('max_loot') != -1) {
                    report.lootIcon = reportIcons[1].src;
                    if (report.lootIcon.search('max_loot/0.png') != -1) /* haul is partial */ {
                        partialHauls.push(report.reportID);
                        report.isPartialHaul = true;
                    }
                    if (report.lootIcon.search('max_loot/1.png') != -1) /* haul is full */ {
                        report.isFullHaul = true;
                    }
                    report.lootIcon = reportsTable.rows[i].cells[0].getElementsByTagName('img')[1].src;
                }
            }
        }

        /*==== forwarded ====*/
        report.isForwarded = false;
        if ((!game_data.player.premium && reportIcons.length > 1) || (game_data.player.premium && reportIcons.length > 2)) {
            for (var j = 1; j < reportIcons.length; j++) {
                if (reportIcons[j].src.search('forwarded') != -1)
                    report.isForwarded = true;
            }
        }

        /*==== subject html ====*/
        var subjectNode = reportsTable.rows[i].cells[1];
        if (has_strength_icon) {
            subjectNode.removeChild(subjectNode.getElementsByTagName('img')[1]);
        } else {
            subjectNode.removeChild(subjectNode.getElementsByTagName('img')[0]);
        }
        if (report.lootIcon) {
            subjectNode.removeChild(subjectNode.getElementsByTagName('div')[0]);
        }
        report.subjectHTML = subjectNode.innerHTML;

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
    reportsFolderToolbar.innerHTML += '<table style="border-style:solid; border-width:0px;" class="vis modemenu"><tbody><tr><td id="twcheese_displayConfig_tab" style="border-style:solid; border-width:1px;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleDisplayConfig();"><a>configure display</a></td><td id="twcheese_export_tab" style="border-style:solid; border-width:1px;" onclick="document.getElementById(\'twcheese_reportsFolderToolbar\').toggleExport();"><a>export repeat-attack links</a></td></tr></tbody></table>';


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
    exportConfigTable.rows[1].cells[0].innerHTML = '<input type="radio" name="format" checked="true" value="BBCode"/> BBCode <br/><input type="radio" name="format" value="plain_links"/> plain links<br/><input type="radio" name="format" value="html_bookmarks"/> HTML';
    exportConfigTable.rows[1].insertCell(-1);
    exportConfigTable.rows[1].cells[1].innerHTML = '<input type="radio" name="attackingVillage" checked="true" value="currentVillage"/> current village<br/><input type="radio" name="attackingVillage" value="originalVillage"/> original village';

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
        var configTable = document.getElementById('twcheese_exportConfigTable');

        var format;
        for (var i = 0; i < 3; i++) {
            if (document.getElementsByName('format')[i].checked) {
                switch (i) {
                    case 0:
                        format = 'bbcode';
                        break;
                    case 1:
                        format = 'plainLink';
                        break;
                    case 2:
                        format = 'html';
                        break;
                }
            }
        }

        var attackingVillage;
        for (var i = 0; i < 2; i++) {
            if (document.getElementsByName('attackingVillage')[i].checked) {
                switch (i) {
                    case 0:
                        attackingVillage = 'current';
                        break;
                    case 1:
                        attackingVillage = 'original';
                        break;
                }
            }
        }

        var header = document.getElementById('twcheese_export_header').value;

        var exportString = '';
        if (format == 'bbcode') {
            exportString = '[b][u][size=12]' + header + '[/size][/u][/b]';
            for (var i = 1; i < reportsTable.rows.length; i++) {
                if (attackingVillage == 'current') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name)
                        exportString += '\n[url=https://' + document.domain + '/game.php?village=' + game_data.village.id + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID + ']repeat attack ' + reportsTable.rows[i].twcheeseReport.reportID + ' from (' + game_data.village.coord + ') to (' + reportsTable.rows[i].twcheeseReport.defenderVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.defenderVillage[1] + ')[/url]';
                }
                else if (attackingVillage == 'original') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name && reportsTable.rows[i].twcheeseLabel)
                        exportString += '\n[url=https://' + document.domain + '/game.php?village=' + reportsTable.rows[i].twcheeseReport.attackerVillage[2] + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID + ']repeat attack ' + reportsTable.rows[i].twcheeseReport.reportID + ' from (' + reportsTable.rows[i].twcheeseReport.attackerVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.attackerVillage[1] + ') to (' + reportsTable.rows[i].twcheeseReport.defenderVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.defenderVillage[1] + ')[/url]';
                }
            }
        }
        else if (format == 'plainLink') {
            exportString = header;
            for (var i = 1; i < reportsTable.rows.length; i++) {
                if (attackingVillage == 'current') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name)
                        exportString += '\nhttps://' + document.domain + '/game.php?village=' + game_data.village.id + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID;
                }
                else if (attackingVillage == 'original') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name && reportsTable.rows[i].twcheeseLabel)
                        exportString += '\nhttps://' + document.domain + '/game.php?village=' + reportsTable.rows[i].twcheeseReport.attackerVillage[2] + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID;
                }
            }
        }
        else if (format == 'html') {

            exportString = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">';
            exportString += '\n<DT><H3>' + header + '</H3></DT>\n<DL><P>';
            for (var i = 1; i < reportsTable.rows.length; i++) {
                var leadingZero = '';
                if (reportsTable.rows[i].twcheeseReport.defenderDistance < 10) {
                    leadingZero = '0';
                }

                if (attackingVillage == 'current') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name) {
                        exportString += '\n<DT><A HREF="https://' + document.domain + '/game.php?village=' + game_data.village.id + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID + '" >' + leadingZero + reportsTable.rows[i].twcheeseReport.defenderDistance + ' Repeat Attack ' + reportsTable.rows[i].twcheeseReport.reportID + ' from (' + game_data.village.coord + ') to (' + reportsTable.rows[i].twcheeseReport.defenderVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.defenderVillage[1] + ')</A></DT>';
                    }
                }
                else if (attackingVillage == 'original') {
                    if (reportsTable.rows[i].twcheeseReport.attacker[1] == game_data.player.name && reportsTable.rows[i].twcheeseLabel) {
                        exportString += '\n<DT><A HREF="https://' + document.domain + '/game.php?village=' + reportsTable.rows[i].twcheeseReport.attackerVillage[2] + twcheese.babyUriComponent + '&screen=place&try=confirm&type=same&report_id=' + reportsTable.rows[i].twcheeseReport.reportID + '" >Repeat Attack ' + reportsTable.rows[i].twcheeseReport.reportID + ' from (' + reportsTable.rows[i].twcheeseReport.attackerVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.attackerVillage[1] + ') to (' + reportsTable.rows[i].twcheeseReport.defenderVillage[0] + '|' + reportsTable.rows[i].twcheeseReport.defenderVillage[1] + ')</A></DT>';
                    }
                }
            }
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

    for (var i = 0; i < 19; i++) {
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
    var checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(3,'fullSubject')";
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
    survivorsScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsDefenseColumns()";
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
    for (var i = 0; i < 18; i++) {
        checkboxScript = "document.getElementById('twcheese_reportsFolderDisplay').toggleReportsColumn(" + Number(i + 24) + ",'buildings[" + i + "]')";
        var targetCell = reportsFolderSettingsTable.rows[i].cells[1];
        targetCell.innerHTML = '<input onClick="' + checkboxScript + '" type="checkbox"/>';
        targetCell.innerHTML += twcheese.language['twcheese']['Building'] + ': ' + twcheese.language['buildings'][i];
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

    for (var i = 0; i < 37; i++) {
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
    for (var i = 0; i < 12; i++) {
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['units'][i] + '" />';

        widthSum = widthSum + 20;
        cellIndex++;
    }
    reportsTableHeader.rows[0].cells[cellIndex - 12].style.width = widthSum + 'px';


    /*==== building levels ====*/
    for (var i = 0; i < 18; i++) {
        reportsTableHeader.rows[1].appendChild(document.createElement('th'));
        reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['buildings'][i] + '" />';
        reportsTableHeader.rows[1].cells[cellIndex].style.width = '20px';
        reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '20px';
        cellIndex++;
    }

    /*==== timber header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['timber'] + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== clay header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['clay'] + '" />';
    reportsTableHeader.rows[1].cells[cellIndex].style.width = '16px';
    reportsTableHeader.rows[0].cells[cellIndex - 11].style.width = '16px';
    cellIndex++;

    /*==== timber header ====*/
    reportsTableHeader.rows[1].appendChild(document.createElement('th'));
    reportsTableHeader.rows[1].cells[cellIndex].innerHTML = '<img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['iron'] + '" />';
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
    for (var i = 0; i < reportsTableHeader.rows[1].cells.length; i++) {
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
    reportsTable.massRename = function (reports, total) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        var inputs = reportsTable.getElementsByTagName('input');
        if (!reports) {
            var reports = new Array(); //array of report IDs for reports to rename

            /*==== detect which reports need to be renamed ====*/
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == 'checkbox') {
                    if (inputs[i].checked) {
                        reports.push(inputs[i].name.substring(3));
                    }
                }
            }
            document.getElementById('twcheese_progress_count_max').innerHTML = reports.length;
            var total = reports.length;
        }
        var estimatedTimeRemaining;

        /*==== rename reports 1 by 1 ====*/
        if (reports.length == 0) {
            document.getElementById('twcheese_progress_count').innerHTML = 0;
            UI.ErrorMessage(twcheese.language['twcheese']['noReportsSelected'], 3000);
        }
        else {
            var reportID = reports.shift();
            var startTime = new Date();
            var reportDoc = document.createElement('div');
            reportDoc.style.display = 'none';
            reportDoc.id = 'hidden_report'
            document.getElementById('content_value').appendChild(reportDoc);
            reportDoc.innerHTML = twcheese_requestXML('https://' + document.domain + '/game.php?village=' + game_data.village.id + '&screen=report&mode=' + game_data.mode + '&view=' + reportID + twcheese.babyUriComponent);

            try {
                var report = twcheese_scrapeBattleReport(document);

                if (report.defenderQuantity)
                    report.survivors = twcheese_calculateSurvivors(report.defenderQuantity, report.defenderLosses);
                if (report.buildingLevels)
                    report.populationSummary = twcheese_calculatePopulation(report.buildingLevels, report.defenderQuantity, report.unitsOutside);
                report.opponentsDefeatedSummary = twcheese_calculateOd(report.attackerLosses, report.defenderLosses);
                if (report.loyalty)
                    report.loyaltyExtra = twcheese_calculateLoyalty(twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed, report.loyalty[1], report.sent, twcheese_getServerTime(), game_data.village.coord.split('|'), report.defenderVillage);
                report.timingInfo = twcheese_calculateTimingInfo(twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed, report.sent, report.attackerQuantity, report.attackerVillage, report.defenderVillage);
                if (report.buildingLevels)
                    report.demolition = twcheese_calculateDemolition(report.buildingLevels);
                if (report.espionageLevel >= 1)
                    report.raidScouted = twcheese_calculateRaidScouted(report.resources);
                if (report.espionageLevel >= 2) {
                    report.raidPredicted = twcheese_calculateRaidPredicted(report.resources, report.buildingLevels, game_data.village.coord.split('|'), report.defenderVillage, report.sent, twcheese_getServerTime(), twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed);
                    report.raidPeriodic = twcheese_calculateRaidPeriodic(report.buildingLevels, 8, twcheese_gameConfig.speed);
                }
                report.reportID = reportID;

                document.getElementById('content_value').removeChild(reportDoc);
                var name = twcheese_nameReport(report, '');

                var url = TribalWars.buildURL('POST', 'report', { ajaxaction: 'edit_subject', report_id: report.reportID });
                TribalWars.post(url,
                    {},
                    { text: name },
                    function (data) {
                        var $container = $('.quickedit[data-id="' + report.reportID + '"]');
                        $container.find('.quickedit-label').html(name);
                    },
                    {}
                );

                //document.getElementById('editInput_'+report.reportID).value = name;
                //editSubmit('label_'+report.reportID, 'labelText_'+report.reportID, 'edit_'+report.reportID, 'editInput_'+report.reportID, '/game.php?village='+game_data.village.id+'&screen=report&ajaxaction=edit_subject&h='+game_data.csrf+'&report_id='+report.reportID + twcheese.babyUriComponent);

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
                var endTime = new Date();
                var timeElapsed = endTime.getTime() - startTime.getTime();
                estimatedTimeRemaining = (timeElapsed * reports.length) / 1000;
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
                for (var i = 1; i < reportsTable.rows.length; i++) {
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

    reportsTable.selectAttacker = function (attacker) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attacker[1] == attacker)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectDefender = function (defender) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');
        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defender[1] == defender)
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectAttackerVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.attackerVillage[0] == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.attackerVillage[1] == coordinates.split('|')[1])
                document.getElementsByName('id_' + reportsTable.rows[i].twcheeseReport.reportID)[0].checked = true;
        }
    };

    reportsTable.selectDefenderVillage = function (coordinates) {
        var reportsTable = document.getElementById('twcheese_reportsTable_body');

        for (var i = 1; i < reportsTable.rows.length; i++) {
            if (reportsTable.rows[i].twcheeseReport.defenderVillage[0] == coordinates.split('|')[0] && reportsTable.rows[i].twcheeseReport.defenderVillage[1] == coordinates.split('|')[1])
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
            if (reportsTableBody.rows[row].twcheeseLabel && reportsTableBody.rows[row].twcheeseReport.survivors) {
                for (var i = 0; i < 12; i++) {
                    var digits = new String(reportsTableBody.rows[row].twcheeseReport.survivors[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
            }
        }

        var totalWidth = 0;
        //66; //the extra 66pixels compensate for the cols below it that it spans across - they have padding of 3 left and 3 right. this cell has the same padding so 12*6-6= 66
        for (var i = 0; i < 12; i++) {
            var width = maxDigits[i] * 8;
            if (width < 20)
                width = 20;

            reportsTableHeader.rows[1].cells[i + 12].style.width = width + 'px';
            reportsTableBody.rows[0].cells[i + 12].style.width = width + 'px';
            totalWidth += reportsTableBody.rows[0].cells[i + 12].clientWidth;
        }
        reportsTableHeader.style.width = Number(Number(reportsTableHeader.style.width.split('px')[0]) - Number(reportsTableHeader.rows[0].cells[12].style.width.split('px')[0]) + totalWidth - 6) + 'px';
        reportsTableHeader.rows[0].cells[12].style.width = Number(totalWidth - 6) + 'px';
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
                    var digits = new String(reportsTableBody.rows[row].twcheeseReport.resources[i]).length;
                    if (digits > maxDigits[i])
                        maxDigits[i] = digits;
                }
                var digits = new String(reportsTableBody.rows[row].twcheeseReport.resourcesTotal).length;
                if (digits > maxDigits[3])
                    maxDigits[3] = digits;
            }
        }

        reportsTableHeader.style.width = Number(Number(reportsTable.style.width.split('px')[0]) - 88) + 'px';
        for (var i = 0; i < 4; i++) {
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
    reportsSelectorBarLabel.style.backgroundImage = 'url("https://uk9.tribalwars.co.uk/graphic/screen/tableheader_bg3.png")';
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

    /*==== create cells ===*/
    for (var i = 0; i < 15; i++) {
        selectorClickyTable.rows[0].insertCell(-1);
    }
    var cellIndex = 0;

    /*==== option all ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectAll()"> all </a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    selectorClickyTable.rows[0].cells[cellIndex].style.textAlign = 'center';
    cellIndex++;

    /*==== option none ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectNone()"> none </a>';
    cellIndex++;

    /*==== option new ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectNew()"> new </a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    selectorClickyTable.rows[0].cells[cellIndex].style.textAlign = 'center';
    cellIndex++;

    /*==== option old ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectOld()"> old </a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    selectorClickyTable.rows[0].cells[cellIndex].style.textAlign = 'center';
    cellIndex++;

    /*==== option green ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDotColor(\'green\');"><img style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/green.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option yellow ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDotColor(\'yellow\');"><img style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/yellow.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option red ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDotColor(\'red\');"><img style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/red.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option blue ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDotColor(\'blue\');"><img style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/blue.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option forwarded ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectForwarded();"><img style="display:block; margin-left:auto; margin-right:auto" src="/graphic/forwarded.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option loot 0 ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectLoot(0);"><img style="display:block; margin-left:auto; margin-right:auto" src="/graphic/max_loot/0.png?1"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option loot 1 ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectLoot(1);"><img style="display:block; margin-left:auto; margin-right:auto" src="/graphic/max_loot/1.png?1"/></a>';;
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option feint ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectFeint();" title="feint"><img style="display:block; margin-left:auto; margin-right:auto" src="graphic/dots/grey.png?1"></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option deadNoble ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a title="dead noble" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDeadNoble();"><img style="display:block; margin-left:auto; margin-right:auto" src="' + imagePaths['priest'] + '"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option loyalty ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectLoyalty();"><span style="display:block; margin-left:auto; margin-right:auto" class="icon ally lead" title="loyalty change"/></a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;

    /*==== option cleared ====*/
    selectorClickyTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectCleared();"> defenseless </a>';
    selectorClickyTable.rows[0].cells[cellIndex].style.width = '25px';
    cellIndex++;




    /*==== input table ====*/
    var selectorInputTable = document.createElement('table');
    reportsSelectorBar.appendChild(selectorInputTable);
    selectorInputTable.className = 'vis';
    selectorInputTable.insertRow(-1);

    /*==== create cells ===*/
    for (var i = 0; i < 5; i++) {
        selectorInputTable.rows[0].insertCell(-1);
    }
    var cellIndex = 0;

    /*==== option text ====*/
    selectorInputTable.rows[0].cells[cellIndex].innerHTML = '<input id="twcheese_select_text" type="text" size="10" value="contains text" onmousedown="if(this.value == \'contains text\')this.value=\'\'";> <a title="select text" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectText(document.getElementById(\'twcheese_select_text\').value);"><span style="display:inline-block; zoom:1; *display:inline; background:url(graphic/bbcodes/bbcodes.png?1) no-repeat -140px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></a>';
    cellIndex++;

    /*==== option attacker ====*/
    selectorInputTable.rows[0].cells[cellIndex].innerHTML = '<input id="twcheese_select_attacker" type="text" size="10" value="attacker" onmousedown="if(this.value == \'attacker\')this.value=\'\';"> <a title="select attacker" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectAttacker(document.getElementById(\'twcheese_select_attacker\').value);"><span style="display:inline-block; zoom:1; *display:inline; background:url(graphic/bbcodes/bbcodes.png?1) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></a>';
    cellIndex++;

    /*==== option defender ====*/
    selectorInputTable.rows[0].cells[cellIndex].innerHTML = '<input id="twcheese_select_defender" type="text" size="10" value="defender" onmousedown="if(this.value == \'defender\')this.value=\'\';"> <a title="select defender" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDefender(document.getElementById(\'twcheese_select_defender\').value);"><span style="display:inline-block; zoom:1; *display:inline; background:url(graphic/bbcodes/bbcodes.png?1) no-repeat -80px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></a>';
    cellIndex++;

    /*==== option attackerVillage ====*/
    selectorInputTable.rows[0].cells[cellIndex].innerHTML = '<input id="twcheese_select_attackerVillage" type="text" size="7" value="origin" onmousedown="if(this.value == \'origin\')this.value=\'x|y\';"> <a title="select attacker\'s village" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectAttackerVillage(document.getElementById(\'twcheese_select_attackerVillage\').value);"><span style="display:inline-block; zoom:1; *display:inline; background:url(graphic/bbcodes/bbcodes.png?1) no-repeat -120px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></a>';
    cellIndex++;

    /*==== option defenderVillage ====*/
    selectorInputTable.rows[0].cells[cellIndex].innerHTML = '<input id="twcheese_select_defenderVillage" type="text" size="7" value="target" onmousedown="if(this.value == \'target\')this.value=\'x|y\';"> <a title="select defender\'s village" href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').selectDefenderVillage(document.getElementById(\'twcheese_select_defenderVillage\').value);"><span style="display:inline-block; zoom:1; *display:inline; background:url(graphic/bbcodes/bbcodes.png?1) no-repeat -120px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span></a>';
    cellIndex++;

    /*==== mass rename table ===*/
    var massRenameTable = document.createElement('table');

    //var parentTable = document.getElementById('content_value').getElementsByTagName('table')[0].rows[0].cells[1];
    //var previousSibling = parentTable.getElementsByTagName('form')[1].nextSibling;
    //parentTable.insertBefore(massRenameTable,previousSibling);
    reportsFolder.appendChild(massRenameTable);
    massRenameTable.className = 'vis';


    if (!game_data.player.premium) //note: non-premium accounts cannot rename reports. no point in confusing the users
        massRenameTable.style.display = 'none';

    /*==== create cells ===*/
    massRenameTable.insertRow(-1);
    for (var i = 0; i < 5; i++) {
        massRenameTable.rows[0].insertCell(-1);
    }
    var cellIndex = 0;

    /*==== button cell ====*/
    massRenameTable.rows[0].cells[cellIndex].innerHTML = '<a href="javascript:document.getElementById(\'twcheese_reportsFolderDisplay\').massRename();">&raquo; Rename</a> <img src="/graphic/questionmark.png?1" width="13" height="13" title="rename selected reports to twCheese format"> ';
    cellIndex++;

    /*==== progressLabel cell ====*/
    massRenameTable.rows[0].cells[cellIndex].innerHTML = ' Progress: ';
    massRenameTable.rows[0].cells[cellIndex].style.textAlign = 'right';
    cellIndex++;

    /*==== progressPercent cell ====*/
    massRenameTable.rows[0].cells[cellIndex].innerHTML = ' <span id="twcheese_progress_percent">0</span>%  ';
    massRenameTable.rows[0].cells[cellIndex].style.width = '40px';
    cellIndex++;

    /*==== progressCount cell ====*/
    massRenameTable.rows[0].cells[cellIndex].innerHTML = ' (<span id="twcheese_progress_count">0</span>/<span id="twcheese_progress_count_max">0</span> reports) ';
    massRenameTable.rows[0].cells[cellIndex].style.width = '136px';
    cellIndex++;

    /*==== timeRemaining cell ====*/
    massRenameTable.rows[0].cells[cellIndex].innerHTML = 'time remaining: <span id="twcheese_time_remaining">00:00</span>';
    cellIndex++;
}

/**
 *	@param	text:String	text to be displayed inside the button
 *	@param	address:String	(optional) if included, causes the button to open a new window when clicked, directing the page to the specified address
 */
twcheese.createFooterButton = function (text, address) {
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

    twcheese_menu.style.background = 'url("https://dl.dropbox.com/u/1621643/tw/icons/help_background.png")';
    twcheese_menu.style.height = '22px';
    twcheese_menu.style.width = '49px';
    twcheese_menu.style.display = 'block';
    twcheese_menu.style.position = 'fixed';
    twcheese_menu.style.left = '100%';
    twcheese_menu.style.top = '100%';
    twcheese_menu.style.marginTop = '-24px';
    twcheese_menu.style.marginLeft = '-52px';
    twcheese_menu.style.zIndex = '99999999999';

    twcheese_menu.onmouseover = function () { this.style.background = 'url("https://dl.dropbox.com/u/1621643/tw/icons/help_background_highlight.png")' };
    twcheese_menu.onmouseout = function () { this.style.background = 'url("https://dl.dropbox.com/u/1621643/tw/icons/help_background.png")' };

    if (address) {
        twcheese_menu.style.cursor = 'pointer';
        twcheese_menu.onclick = function () { window.open(address, 'twcheese_menu_window') };
    }
    else
        twcheese_menu.style.cursor = 'default';

    return document.body.appendChild(twcheese_menu);
};

/**
 *	converts twcheese_espionage nodes within the tribal forum to tables
 */
twcheese.parseForumEspionage = function () {
    // find posts with content to be parsed

    this.parseReportText = function (reportText) {
        var report = {};
        var data = reportText.split(';');
        report.coordinates = data[0].split('|');
        report.player = data[1];
        report.troops = data[2].split(',');
        report.buildings = data[3].split(',');
        report.time = data[4].split(',');
        return report;
    };

    this.createTableHTML = function (reportList) {
        var newContent = new String();
        newContent = '<table style="max-width:2000px;"><tbody>';

        //==== header ====
        newContent += '<tr><th>village</th><th>player</th>';

        for (var i = 0; i < 12; i++) //units
            newContent += '<th><image src="' + imagePaths['units'][i] + '"/></th>';

        /*for(var i=0; i<18; i++) //buildings
            newContent+= '<th><image src="'+imagePaths['buildings'][i]+'"/></th>';*/

        newContent += '<th><image title="regular church" src="' + imagePaths['buildings'][4] + '"/></th>'; //church
        newContent += '<th><image title="first church" src="' + imagePaths['buildings'][5] + '"/></th>'; //first church
        newContent += '<th><image src="' + imagePaths['buildings'][14] + '"/></th>'; //farm
        newContent += '<th><image src="' + imagePaths['buildings'][17] + '"/></th>'; //wall

        newContent += '<th width="150px">time</th></tr>';

        //==== content ====
        for (var i = 0; i < reportList.length; i++) {
            newContent += '<tr>';
            newContent += '<td style="white-space:nowrap;"><a href=/game.php?village=' + game_data.village.id + '&screen=map#' + reportList[i].coordinates[0] + ';' + reportList[i].coordinates[1] + '">';
            newContent += reportList[i].coordinates[0] + '|' + reportList[i].coordinates[1] + '</a></td>';
            newContent += '<td>' + reportList[i].player + '</td>';
            for (var j = 0; j < 12; j++) //units
                newContent += '<td>' + reportList[i].troops[j] + '</td>';
            newContent += '<td>' + reportList[i].buildings[4] + '</td>';
            newContent += '<td>' + reportList[i].buildings[5] + '</td>';
            newContent += '<td>' + reportList[i].buildings[14] + '</td>';
            newContent += '<td>' + reportList[i].buildings[17] + '</td>';
            newContent += '<td style="white-space:nowrap;">' + twcheese_dateToString(new Date(reportList[i].time)) + '</td>';
            newContent += '</tr>';
        }

        newContent += '</tbody></table>';
        return (newContent);
    };

    var postsWithContent = new Array();
    $('#forum_box .text:contains("<twcheese_espionage>")').each(
        function (index) {
            postsWithContent[index] = $(this);
        }
    );
    //alert(postsWithContent.size()); //todo - give user message when no content is found

    for (var i = 0; i < postsWithContent.length; i++) {
        var newPost = postsWithContent[i].html();

        var pattern = /&lt;twcheese_espionage&gt;(.*?)&lt;\/twcheese_espionage&gt;/gi;
        var contentItems = postsWithContent[i].html().match(pattern);
        for (var j = 0; j < contentItems.length; j++) {
            var content = contentItems[j].toLowerCase().replace('&lt;twcheese_espionage&gt;', '').replace('&lt;/twcheese_espionage&gt;', '');
            var reportList = new Array();
            var reports = content.split('.');
            for (var k = 0; k < reports.length; k++) {
                reportList[k] = this.parseReportText(reports[k]);
            }
            var newContent = this.createTableHTML(reportList);
            newPost = newPost.replace(pattern, newContent);
            //alert(newPost);			
        }

        //==== replace former content ====
        try {
            postsWithContent[i].html(newPost);
        } catch (e) { console.error(e) }
    }
};

/*==== calculator functions ====*/

/**
 *	calculates surviving troops
 *	@param quantity:Array	an array of troops, in specific, the ones before the battle
 *	@param losses:Array	an array of troops, in specific, the ones that died
 *	@return	survivors:Array	an array of troops, in specific, the ones that survived
 */
function twcheese_calculateSurvivors(quantity, losses) {
    var survivors = new Array();
    for (var i = 0; i < quantity.length; i++)
        survivors[i] = quantity[i] - losses[i];

    return survivors;
}

/**
 *	determines if an attack was likely just a distraction
 *	@param report:twcheese_BattleReport
 *	@return isFeint:Boolean - true if it's a feint, false if it's not
 */
function twcheese_detectFeint(report) {
    var popMax = 130;

    var isFeint = false;
    var population = new Array(1, 1, 1, 1, 2, 4, 5, 6, 5, 8, 10, 100);
    var popSum = 0;
    for (var i = 0; i < 12; i++) {
        popSum += report.attackerQuantity[i] * population[i];
    }
    if (popSum <= popMax && report.attackerQuantity[12] == 0)
        isFeint = true;

    return isFeint;
}

/**
 *	calculates some population information based on a scout report
 *	@param	buildings:Array	an array of the building levels in the village
 *	@param 	troopsDefending:Array	an array of troops, in specific, the ones defending the village
 *	@param	troopsOutside:Array	an array of troops, in specific, the ones outside the village
 *	@return	population:Array(buildingPop:Number,militaryPop:Number,idlePop:Number)
 */
function twcheese_calculatePopulation(buildings, troopsDefending, troopsOutside) {
    var buildingPopBases = new Array(1.17, 1.17, 1.17, 1.17, 1.55, 1.55, 1.17, 1.17, 1.17, 1.17, 1.17, 1.155, 1.14, 1.17, 1, 1.15, 1.17, 1.17);
    var buildingPopFactors = new Array(5, 7, 8, 8, 5000, 5, 80, 20, 0, 10, 20, 5, 10, 10, 0, 0, 2, 5);
    var troopPopulation = new Array(1, 1, 1, 1, 2, 4, 5, 6, 5, 8, 10, 100);

    var buildingPopulation = 0;
    var militaryPopulation = 0;
    var maxPopulation = Math.round(240 * Math.pow(1.172103, buildings[14] - 1));
    for (var i = 0; i < 18; i++) {
        if (buildings[i] > 0) {
            buildingPopulation += Math.round(buildingPopFactors[i] * Math.pow(buildingPopBases[i], (buildings[i] - 1)));
        }
    }
    for (var i = 0; i < 12; i++) {
        militaryPopulation += troopPopulation[i] * Number(troopsDefending[i]);
        if (troopsOutside)
            militaryPopulation += troopPopulation[i] * Number(troopsOutside[i]);
    }
    return new Array(buildingPopulation, militaryPopulation, (maxPopulation - buildingPopulation - militaryPopulation));
}

/**
 *	calculate opponents defeated
 *	@param attackerLosses:Array
 *	@param defenderLosses:Array
 *	@reutrn odScore:Array(attacker:Number,defender:Number)
 */
function twcheese_calculateOd(attackerLosses, defenderLosses) {
    var offScores = new Array(4, 5, 1, 5, 1, 5, 6, 23, 4, 12, 40, 200);
    var deffScores = new Array(1, 2, 4, 2, 2, 13, 12, 15, 8, 10, 20, 200);

    var attacker = 0;
    var defender = 0;

    for (var i = 0; i < 12; i++) {
        attacker += offScores[i] * defenderLosses[i];
        if (defenderLosses)
            defender += deffScores[i] * attackerLosses[i];
    }

    return new Array(attacker, defender);
}

/**
 *	calculate loyalty
 *	@param	loyalty:Number
 *	@param	timeSent:Date
 *	@param	home:Array(x,y)
 *	@param	target:Array(x,y)
 *	@return loyaltyExtra:Array(now:Number,arrival:Number)
 */
function twcheese_calculateLoyalty(worldSpeed, unitSpeed, loyalty, timeSent, timeNow, home, target) {
    if (loyalty <= 0)
        loyalty = 25;

    var loyaltyExtra = new Array();

    /*=== calculate current loyalty ====*/
    var hoursPassed = (timeNow - timeSent) / 3600000;
    if (Number(parseInt(loyalty) + parseInt(hoursPassed * worldSpeed)) > 100)
        loyaltyExtra[0] = 100;
    else
        loyaltyExtra[0] = Math.floor(Number(parseInt(loyalty) + parseInt(hoursPassed * worldSpeed)));

    /*==== calculate loyalty at TOA ====*/
    var distance = twcheese_calculateDistance(home, target);
    var travelTime = (distance * 35 / worldSpeed / unitSpeed) / 60;
    if (loyaltyExtra[0] + travelTime * worldSpeed > 100)
        loyaltyExtra[1] = 100;
    else
        loyaltyExtra[1] = Math.floor(loyaltyExtra[0] + travelTime * worldSpeed);

    return loyaltyExtra;
}

/**
 *	@param	village1:Array(x,y)
 *	@param	village1:Array(x,y)
 *	@return	distance:Number
 */
function twcheese_calculateDistance(village1, village2) {
    return Math.sqrt((village1[0] - village2[0]) * (village1[0] - village2[0]) + (village1[1] - village2[1]) * (village1[1] - village2[1]));
}

/**
 *	@param	distance:Number
 *	@param	worldSpeed:Number
 *	@param	unitSpeed:Number
 *	@return	times:Array(spear:Date,sword:Date,axe:Date,...)
 */
twcheese.calculateTravelTimes = function (distance, worldSpeed, unitSpeed) {
    var walkingTimes = new Array(18, 22, 18, 18, 9, 10, 11, 11, 30, 30, 10, 35); //minutes to walk across a field
    var modifier = worldSpeed / unitSpeed;

    var travelTimes = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    for (var i = 0; i < 12; i++) {
        travelTimes[i] = new Date((distance * walkingTimes[i] / modifier * 60 * 1000));
        //travelTimes[i] = Math.floor(distance * walkingTimes[i] / modifier * 60 * 1000);
    }
    return travelTimes;
};

/**
 *	@param	timeOfArrival:Date
 *	@param	attackerTroops:Array	an array of troops
 *	@param	attackerVillage:Array(x:Number,y:Number)
 *	@param	defenderVillage:Array(x:Number,y:Number)
 *	@return	timingInfo:Array(launchedTime:Number,returnTime:Number)
 */
function twcheese_calculateTimingInfo(worldSpeed, unitSpeed, timeOfArrival, attackerTroops, attackerVillage, defenderVillage) {
    var timingInfo = new Array();
    var distance = twcheese_calculateDistance(attackerVillage, defenderVillage);
    var attackSpeed;

    if (attackerTroops[11] > 0)
        attackSpeed = 35 / worldSpeed / unitSpeed;
    else if (attackerTroops[8] > 0 || attackerTroops[9] > 0)
        attackSpeed = 30 / worldSpeed / unitSpeed;
    else if (attackerTroops[1] > 0)
        attackSpeed = 22 / worldSpeed / unitSpeed;
    else if (attackerTroops[0] > 0 || attackerTroops[2] > 0 || attackerTroops[3] > 0)
        attackSpeed = 18 / worldSpeed / unitSpeed;
    else if (attackerTroops[7] > 0)
        attackSpeed = 11 / worldSpeed / unitSpeed;
    else if (attackerTroops[5] > 0 || attackerTroops[6] > 0 || attackerTroops[10] > 0)
        attackSpeed = 10 / worldSpeed / unitSpeed;
    else
        attackSpeed = 9 / worldSpeed / unitSpeed;

    var travelTime = new Date();
    travelTime.setTime(attackSpeed * distance * 60000);

    timingInfo[0] = new Date(timeOfArrival.getTime() - travelTime.getTime());
    timingInfo[1] = new Date(timeOfArrival.getTime() + travelTime.getTime());
    return timingInfo;
}

/**
 *	@param	buildings:Array	an array of the building levels scouted
 *	@return smashUnits:Array(demoScouted:Array,demoBuffer:Array)	an array of arrays of #cats to downgrade each building as much as possible (and #rams for wall). demoScouted is for scouted levels, demoBuffer is for buildings 1 level higher than scouted
 */
function twcheese_calculateDemolition(buildings) {
    var demoScouted = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var demoBuffer = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var catAmounts = new Array(0, 2, 6, 10, 15, 21, 28, 36, 45, 56, 68, 82, 98, 115, 136, 159, 185, 215, 248, 286, 328, 376, 430, 490, 558, 634, 720, 815, 922, 1041, 1175, 1175);
    //var catAmountsOne = new Array(0,0,2,6,11,17,23,31,39,49,61,74,89,106,126,148,173,202,234,270,312,358,410,469,534,608,691,784,888,1005,1135);
    var catAmountsChurch = new Array(0, 400, 500, 600, 600);
    var ramAmounts = new Array(0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219);

    /*==== hq ====*/
    if (buildings[0] == '?') {
        demoScouted[0] = '?';
        demoBuffer[0] = '?';
    }
    else {
        demoScouted[0] = catAmounts[buildings[0]];
        if (buildings[0] < 30)
            demoBuffer[0] = catAmounts[buildings[0] + 1];
        else
            demoBuffer[0] = demoScouted[0];
    }

    /*==== barracks ====*/
    if (buildings[1] == '?') {
        demoScouted[1] = '?';
        demoBuffer[1] = '?';
    }
    else {
        demoScouted[1] = catAmounts[buildings[1]];
        if (buildings[1] < 30 && buildings[0] >= 3)
            demoBuffer[1] = catAmounts[buildings[1] + 1];
        else
            demoBuffer[1] = demoScouted[1];
    }

    /*==== stable ====*/
    if (buildings[2] == '?') {
        demoScouted[2] = '?';
        demoBuffer[2] = '?';
    }
    else {
        demoScouted[2] = catAmounts[buildings[2]];
        if (buildings[2] < 20 && buildings[0] >= 10 && buildings[1] >= 5 && buildings[7] >= 5)
            demoBuffer[2] = catAmounts[buildings[2] + 1];
        else
            demoBuffer[2] = demoScouted[2];
    }

    /*==== workshop ====*/
    if (buildings[3] == '?') {
        demoScouted[3] = '?';
        demoBuffer[3] = '?';
    }
    else {
        demoScouted[3] = catAmounts[buildings[3]];
        if (buildings[3] < 15 && buildings[0] >= 10 && buildings[7] >= 10)
            demoBuffer[3] = catAmounts[buildings[3] + 1];
        else
            demoBuffer[3] = demoScouted[3];
    }


    /*==== church ====*/
    if (buildings[4] == '?') {
        demoScouted[4] = '?';
        demoBuffer[4] = '?';
    }
    else {
        demoScouted[4] = catAmounts[buildings[4]];
        if (buildings[4] < 3)
            demoBuffer[4] = catAmountsChurch[buildings[4] + 1];
        else
            demoBuffer[4] = demoScouted[4];
    }

    /*==== church_f ====*/
    demoScouted[5] = 'NA';
    demoBuffer[5] = 'NA';

    /*==== academy ====*/
    if (buildings[6] == '?') {
        demoScouted[6] = '?';
        demoBuffer[6] = '?';
    }
    else {
        demoScouted[6] = catAmounts[buildings[6]];
        if (buildings[6] < 3 && buildings[0] >= 20 && buildings[7] == 20 && buildings[10] >= 10)
            demoBuffer[6] = catAmounts[buildings[6] + 1];
        else
            demoBuffer[6] = demoScouted[6];
    }

    /*==== smithy ====*/
    if (buildings[7] == '?') {
        demoScouted[7] = '?';
        demoBuffer[7] = '?';
    }
    else {
        demoScouted[7] = catAmounts[buildings[7]];
        if (buildings[7] < 20 && buildings[0] >= 5 && buildings[1] >= 1)
            demoBuffer[7] = catAmounts[buildings[7] + 1];
        else
            demoBuffer[7] = demoScouted[7];
    }

    /*==== statue and rally point====*/
    for (var i = 8; i <= 9; i++) {
        if (buildings[i] == '?') {
            demoScouted[i] = '?';
            demoBuffer[i] = '?';
        }
        else {
            demoScouted[i] = catAmounts[buildings[i]];
            if (buildings[i] < 1)
                demoBuffer[i] = catAmounts[buildings[i] + 1];
            else
                demoBuffer[i] = demoScouted[i];
        }
    }

    /*==== market ====*/
    if (buildings[10] == '?') {
        demoScouted[10] = '?';
        demoBuffer[10] = '?';
    }
    else {
        demoScouted[10] = catAmounts[buildings[10]];
        if (buildings[10] < 25 && buildings[0] >= 3 && buildings[15] >= 2)
            demoBuffer[10] = catAmounts[buildings[10] + 1];
        else
            demoBuffer[10] = demoScouted[10];
    }

    /*==== timber camp, clay pit, and iron mine ====*/
    for (var i = 11; i <= 13; i++) {
        if (buildings[i] == '?') {
            demoScouted[i] = '?';
            demoBuffer[i] = '?';
        }
        else {
            demoScouted[i] = catAmounts[buildings[i]];
            if (buildings[i] < 30)
                demoBuffer[i] = catAmounts[buildings[i] + 1];
            else
                demoBuffer[i] = demoScouted[i];
        }
    }

    /*==== farm ====*/
    if (buildings[14] == '?') {
        demoScouted[14] = '?';
        demoBuffer[14] = '?';
    }
    else {
        demoScouted[14] = catAmounts[buildings[14]];
        if (buildings[14] < 30)
            demoBuffer[14] = catAmounts[buildings[14] + 1];
        else
            demoBuffer[14] = demoScouted[14];
    }

    /*==== warehouse ====*/
    if (buildings[15] == '?') {
        demoScouted[15] = '?';
        demoBuffer[15] = '?';
    }
    else {
        demoScouted[15] = catAmounts[buildings[15]];
        if (buildings[15] < 30)
            demoBuffer[15] = catAmounts[buildings[15] + 1];
        else
            demoBuffer[15] = demoScouted[15];
    }

    /*==== hiding place ====*/
    demoScouted[16] = 'NA';
    demoBuffer[16] = 'NA';

    /*==== wall ====*/
    if (buildings[17] == '?') {
        demoScouted[17] = '?';
        demoBuffer[17] = '?';
    }
    else {
        demoScouted[17] = ramAmounts[buildings[17]];
        if (buildings[1] >= 1 && buildings[17] < 20) {
            demoBuffer[17] = ramAmounts[buildings[17] + 1];
        }
        else {
            demoBuffer[17] = demoScouted[17];
        }
    }

    return new Array(demoScouted, demoBuffer);
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
 *	@param	buildings:Array	an array of the building levels
 *	@param	home:Array(x,y)
 *	@param	target:Array(x,y)
 *	@param	timeSent:Date	the time the player received the report
 *	@param	timeNow:Date	the current time
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidPredicted(resourcesScouted, buildings, home, target, timeSent, timeNow, gameSpeed, unitSpeed, haulBonus) {
    if (!haulBonus)
        haulBonus = 0;

    var capacity = 1000 * Math.pow(1.2294934, (buildings[15] - 1));
    var hidden = new Array(0, 150, 200, 267, 356, 474, 632, 843, 1125, 1500, 2000);
    var maxHaul = capacity - hidden[buildings[16]];
    var speeds = new Array(18, 22, 18, 18, 10, 10, 11);
    var resources = resourcesScouted.slice();

    /*==== calculate production rates ====*/
    var production = new Array(0, 0, 0);
    for (i = 0; i < 3; i++) {
        if (buildings[i + 11] > 0)
            production[i] = gameSpeed * 30 * Math.pow(1.163118, (buildings[i + 11] - 1));
        else
            production[i] = gameSpeed * 5;
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
        travelTimes[i] = speeds[i] / gameSpeed / unitSpeed * twcheese_calculateDistance(home, target) / 60;

    /*==== add resources produced during travel ====*/
    var totalResources = new Array(0, 0, 0, 0, 0, 0, 0);
    for (var i = 0; i < 7; i++) {
        var resTotal = new Array(0, 0, 0);
        for (j = 0; j < 3; j++) {
            resTotal[j] = resources[j] + travelTimes[i] * production[j];
            if (resTotal[j] > maxHaul)
                resTotal[j] = maxHaul;
        }
        totalResources[i] = resTotal[0] + resTotal[1] + resTotal[2];
    }


    /*==== calculate units to take resources ====*/
    var units = new Array(0, 0, 0, 0, 0, 0, 0);
    var hauls = new Array(25, 15, 10, 10, 80, 50, 50);
    for (var i = 0; i < 7; i++) {
        hauls[i] += hauls[i] * haulBonus / 100;
        units[i] = Math.round((totalResources[i] / hauls[i]) * 10) / 10;
    }

    return units;
}

/**
 *	@param	buildings:Array	an array of the building levels
 *	@param	period:Number	the number of hours that resources have been accumulating
 *	@param	gameSpeed:Number
 *	@param	haulBonus:Number	the extra % bonus haul from flags, events, etc. Example: 30 for 30%, NOT 0.3
 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
 */
function twcheese_calculateRaidPeriodic(buildings, period, gameSpeed, haulBonus) {
    if (!haulBonus)
        haulBonus = 0;

    /*==== calculate maximum of each resource hauled ====*/
    var capacity = 1000 * Math.pow(1.2294934, (buildings[15] - 1));
    var hidden = new Array(0, 150, 200, 267, 356, 474, 632, 843, 1125, 1500, 2000);
    var maxHaul = capacity - hidden[buildings[16]];

    /*==== calculate production rates ====*/
    var production = new Array(0, 0, 0);
    for (i = 0; i < 3; i++) {
        if (buildings[i + 11] > 0)
            production[i] = gameSpeed * 30 * Math.pow(1.163118, (buildings[i + 11] - 1));
        else
            production[i] = gameSpeed * 5;
    }

    /*==== calculate resources produced */
    var resources = new Array(0, 0, 0);
    for (i = 0; i < 3; i++) {
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



/*==== cookie functions ====*/

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
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
    newName += report.attacker[1].replace(twcheese.language['report']['deletedPlayer'], '') + ' ';
    newName += '(' + report.attackerVillage[0] + '|' + report.attackerVillage[1] + ',' + report.attackerVillage[2] + ')';
    newName += report.defender[1].replace(twcheese.language['report']['deletedPlayer'], '');
    newName += '(' + report.defenderVillage[0] + '|' + report.defenderVillage[1] + ',' + report.defenderVillage[2] + ')';

    newName += '_t:' + Math.floor(new Date(report.timingInfo[0]).getTime() / 1000) + '. ';
    if (report.attackerLosses[11] > 0) //dead noble
        newName += '_x';
    if (report.loyalty)
        newName += '_l:' + report.loyalty[1] + '.';
    if (report.survivors)
        newName += '_d[' + report.survivors + '] ';
    if (report.buildingLevels)
        newName += '_b[' + report.buildingLevels + '] ';
    if (report.resources)
        newName += '_r[' + report.resources + '] ';
    if (twcheese_detectFeint(report))
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
            report.attacker = new Array(0, 0);
            var attackerString = reportName.split('(')[0];
            attackerString = attackerString.substring(0, attackerString.lastIndexOf(' '));
            report.attacker[1] = attackerString;
        }
        catch (err) {
            report.attacker = null;
        }


        report.attackerVillage = new Array();
        report.defenderVillage = new Array();
        if (report.twcheeseLabel) /* report named with twCheese format */ {
            /*==== set attacker village ====*/
            try {
                data[0] = data[0].substring(data[0].lastIndexOf('(') + 1, data[0].lastIndexOf(')'));
                report.attackerVillage = new Array();
                report.attackerVillage[0] = data[0].split(',')[0].split('|')[0];
                report.attackerVillage[1] = data[0].split(',')[0].split('|')[1];
                report.attackerVillage[2] = data[0].split(',')[1];
            }
            catch (err) {
            }

            /*==== set defender village ====*/
            try {
                data[1] = data[1].substring(data[1].lastIndexOf('(') + 1, data[1].lastIndexOf(')'));
                report.defenderVillage[0] = data[1].split(',')[0].split('|')[0];
                report.defenderVillage[1] = data[1].split(',')[0].split('|')[1];
                report.defenderVillage[2] = data[1].split(',')[1];
            }
            catch (err) {
                report.defenderVillage = null;
            }

            try {
                var text = '';
                /*==== set note ====*/
                report.note = false;
                if (reportName.search('_n:') != -1) {
                    report.note = reportName.substring(reportName.indexOf('_n:') + 3);
                    reportName = reportName.substring(0, reportName.indexOf('_n:'));
                }

                /*==== set buildings ====*/
                report.buildingLevels = false;
                if (reportName.search('_b') != -1) {
                    var text = reportName.substring(reportName.indexOf('_b') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    //if(text.search('\\?') != -1)
                    //{
                    text = text.substring(1, text.length - 1);
                    report.buildingLevels = text.split(',');
                    //}
                    //else
                    //report.buildingLevels = eval(text);
                }

                /*==== set resources ====*/
                report.resources = false;
                report.resourcesTotal = false;
                if (reportName.search('_r') != -1) {
                    text = reportName.substring(reportName.indexOf('_r') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    report.resources = eval(text);
                    report.resourcesTotal = report.resources[0] + report.resources[0] + report.resources[0];
                }

                /*==== set defense ====*/
                report.survivors = false;
                report.isCleared = false;
                if (reportName.search('_d') != -1) {
                    text = reportName.substring(reportName.indexOf('_d') + 2);
                    text = text.substring(0, text.indexOf(']') + 1);
                    report.survivors = eval(text);
                    var survivorCount = 0;
                    for (var i = 0; i < 12; i++)
                        survivorCount += report.survivors[i];
                    if (survivorCount == 0)
                        report.isCleared = true;
                }

                /*==== set loyalty ====*/
                report.loyalty = false;
                if (reportName.search('_l:') != -1) {
                    text = reportName.substring(reportName.indexOf('_l:') + 3);
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
                    text = reportName.substring(reportName.indexOf('_t:') + 3);
                    text = text.substring(0, text.indexOf('.'));
                    report.timeLaunched = new Date(Number(text) * 1000);
                }

                /*==== set defender ====*/
                report.defender = false;
                text = reportName.substring(reportName.indexOf(')') + 1);
                text = text.substring(0, text.indexOf('('));
                report.defender = [0, text];
            }
            catch (err) {

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
                report.defenderVillage[0] = data[defIndex].split(',')[0].split('|')[0];
                report.defenderVillage[1] = data[defIndex].split(',')[0].split('|')[1];
            }
            catch (err) {
                report.defenderVillage = null;
            }
        }
    }
    return report;
}

/**
 *	@param time:Date
 *	@return time:String	formatted TW style
 */
function twcheese_dateToString(time) {
    var monthText = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var timeString = '';
    timeString += monthText[time.getMonth()] + ' ';
    if (time.getDate() < 10)
        timeString += '0';
    timeString += time.getDate() + ', ';
    timeString += time.getFullYear() + '  ';
    if (time.getHours() < 10)
        timeString += '0';
    timeString += time.getHours() + ':';
    if (time.getMinutes() < 10)
        timeString += '0';
    timeString += time.getMinutes() + ':';
    if (time.getSeconds() < 10)
        timeString += '0';
    timeString += time.getSeconds();
    return timeString;
}

/**
 *	@param	date:Date
 *	@return	time:String	[H]:mm:ss
 */
twcheese.formatDateTo_timeString = function (date) {
    var time = date.getTime();
    var hours = Math.floor(time / 1000 / 60 / 60);
    var minutes = Math.floor((time - (hours * 1000 * 60 * 60)) / 1000 / 60);
    var seconds = time / 1000;

    //==== round time ====

    //==== format with leading zeroes ====*/
    if (minutes < 10)
        minutes = '0' + minutes;
    var seconds = date.getSeconds();
    if (seconds < 10)
        seconds = '0' + seconds;

    return hours + ':' + minutes + ':' + seconds;
    //return Math.floor(date.getTime()/1000/60/60) + ':' + date.getMinutes() + ':' + date.getSeconds(); //does not round
};

/**
 *	requests the xml from a page
 *	@param	targetUrl:String	the url of the page to get the document from
 *	@return	requestedXML:String
 */
function twcheese_requestXML(targetUrl) {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET", targetUrl, false);
    xmlhttp.send("");

    return xmlhttp.responseText;
}

/**
 *	requests the body from an html document and returns it as an HTML element
 *	@param	targetUrl	the url of the page to get the document body from
 *	@return	requestedDocumentBody:HTMLBodyElement
 */
function twcheese_requestDocumentBody(targetUrl) {
    var requestedDocumentBody;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET", targetUrl, false);
    xmlhttp.send("");
    requestedDocumentBody = document.createElement("body");
    requestedDocumentBody.innerHTML = xmlhttp.responseText;
    return requestedDocumentBody;
}

/**
 *	@return serverTime:Date();
 */
function twcheese_getServerTime() {
    var serverTime = new Date();
    var date = document.getElementById('serverDate').innerHTML;
    var time = document.getElementById('serverTime').innerHTML;

    serverTime.setYear(date.split('/')[2]);
    serverTime.setMonth(date.split('/')[1] - 1);
    serverTime.setDate(date.split('/')[0]);
    serverTime.setHours(time.split(':')[0]);
    serverTime.setMinutes(time.split(':')[1]);
    serverTime.setSeconds(time.split(':')[2]);

    return serverTime;
}

/*==== storage functions ====*/

/**
 *  loads the user's configuration for twcheese scripts into twcheese.userConfig
 *	@return	config:Object - the contents of twcheese.userConfig
 */
twcheese.loadConfig = function () {
    if (localStorage.getItem('twcheese.userConfig'))
        twcheese.userConfig = JSON.parse(localStorage.getItem('twcheese.userConfig'));
    else
        twcheese.userConfig = {};
    return twcheese.userConfig;
}

function twcheese_saveReportsFolderDisplaySettings(settings) {

    //localStorage.setItem('twcheese_reportsFolderDisplaySettings',escape(JSON.stringify(settings))); //old
    localStorage.setItem('twcheese_reportsFolderDisplaySettings', JSON.stringify(settings));
}

function twcheese_loadReportsFolderDisplaySettings() {
    if (!localStorage.getItem('twcheese_reportsFolderDisplaySettings')) {
        return new twcheese_reportsFolderDisplaySettings();
    }
    else {
        if (localStorage.getItem('twcheese_reportsFolderDisplaySettings').search('%') != -1)
            var settings = eval('(' + unescape(localStorage.getItem('twcheese_reportsFolderDisplaySettings')) + ')'); //old
        else
            var settings = eval('(' + localStorage.getItem('twcheese_reportsFolderDisplaySettings') + ')'); //new
        return settings;
    }
}

function twcheese_getServerSettings() {
    //TODO: use localStorage
    var gameConfig = new function () { };

    if (!getCookie('twcheese_game_config')) {
        var configXML = twcheese_requestXML('https://' + document.domain + '/interface.php?func=get_config')

        gameConfig.speed = configXML.match(/\<SPEED>.*?\<\/SPEED>/gi)[0].toLowerCase().replace('<speed>', '').replace('</speed>', '');
        gameConfig.unit_speed = configXML.match(/\<UNIT_SPEED>.*?\<\/UNIT_SPEED>/gi)[0].toLowerCase().replace('<unit_speed>', '').replace('</unit_speed>', '');
        gameConfig.archer = configXML.match(/\<ARCHER>.*?\<\/ARCHER>/gi)[0].toLowerCase().replace('<archer>', '').replace('</archer>', '');
        gameConfig.paladin = configXML.match(/\<KNIGHT>.*?\<\/KNIGHT>/gi)[0].toLowerCase().replace('<knight>', '').replace('</knight>', '');

        setCookie('twcheese_game_config', escape(JSON.stringify(gameConfig)), 30);
    }
    else
        gameConfig = JSON.parse(unescape(getCookie('game_config')));

    return gameConfig;
}


function twcheese_getBRESettings() {
    // TODO: rewrite to use localStorage
    if (!getCookie('twcheese_breSettings')) {
        var breSettings = new function () { };
        breSettings.rename1 = 'nothing';
        breSettings.rename2 = 'nothing';
        breSettings.rename3 = 'nothing';
        breSettings.rename4 = 'nothing';
        breSettings.rename5 = 'nothing';
        breSettings.rename6 = 'nothing';
        breSettings.autoRename = false;
        breSettings.period = 8;
        breSettings.haulBonus = 0;
        breSettings.raid = 'scouted';
        return breSettings;
    }
    else
        return JSON.parse(unescape(getCookie('twcheese_breSettings')));
}

function twcheese_setBRESettings(breSettings) {
    //TODO: rewrite to use localStorage
    setCookie('twcheese_breSettings', escape(JSON.stringify(breSettings)), 30);
}

/*==== main ====*/ 

function useTool() {
    if (!twcheese_BREinitialized) {
        var gameDoc = document;

        /*==== contact information ====*/
        var narcismDiv = document.createElement('div');
        document.getElementById('content_value').insertBefore(narcismDiv, document.getElementById('content_value').firstChild);
        narcismDiv.innerHTML = 'BRE created by <a href="https://forum.tribalwars.net/member.php?u=28484">cheesasaurus</a>';
        narcismDiv.style.fontSize = '8px';

        /*==== help ====*/
        twcheese.createFooterButton(twcheese.language['twcheese']['Help'], 'https://forum.tribalwars.net/showthread.php?256225-Battle-Report-Enhancer');

        /*==== get server settings ====*/
        twcheese_gameConfig = twcheese_getServerSettings();

        /*==== get user settings ====*/
        twcheese_BRESettings = twcheese_getBRESettings();
        twcheese.loadConfig();

        /*==== check for sitter mode ====*/
        twcheese.baby = false;
        twcheese.babyUriComponent = '';

        if (document.URL.search('&t=') != -1) {
            twcheese.baby = document.URL.substring(document.URL.indexOf('&t=') + 3);
        }
        else if (document.URL.search('\\?t=') != -1) {
            twcheese.baby = document.URL.substring(document.URL.indexOf('?t=') + 3);
        }
        if (twcheese.baby) {
            if (twcheese.baby.search('&') != -1)
                twcheese.baby = twcheese.baby.substring(0, twcheese.baby.indexOf('&'));
            twcheese.babyUriComponent = '&t=' + twcheese.baby;
        }

        twcheese_BREinitialized = true;
    }

    /*==== do the dew ====*/
    if (game_data.screen == 'report' && gameDoc.URL.search('&view=') != -1) /* viewing single report	*/ {
        if (!twcheese_reportEnhanced) {
            /*==== calculate additional information ===*/
            var twcheese_currentReport = new twcheese_scrapeBattleReport(gameDoc);
            if (twcheese_currentReport.defenderQuantity)
                twcheese_currentReport.attacker_survivors = twcheese_calculateSurvivors(twcheese_currentReport.attackerQuantity, twcheese_currentReport.attackerLosses);
            if (twcheese_currentReport.defenderQuantity)
                twcheese_currentReport.survivors = twcheese_calculateSurvivors(twcheese_currentReport.defenderQuantity, twcheese_currentReport.defenderLosses);
            if (twcheese_currentReport.buildingLevels)
                twcheese_currentReport.populationSummary = twcheese_calculatePopulation(twcheese_currentReport.buildingLevels, twcheese_currentReport.defenderQuantity, twcheese_currentReport.unitsOutside);
            twcheese_currentReport.opponentsDefeatedSummary = twcheese_calculateOd(twcheese_currentReport.attackerLosses, twcheese_currentReport.defenderLosses);
            if (twcheese_currentReport.loyalty)
                twcheese_currentReport.loyaltyExtra = twcheese_calculateLoyalty(twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed, twcheese_currentReport.loyalty[1], twcheese_currentReport.sent, twcheese_getServerTime(), game_data.village.coord.split('|'), twcheese_currentReport.defenderVillage);
            twcheese_currentReport.timingInfo = twcheese_calculateTimingInfo(twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed, twcheese_currentReport.sent, twcheese_currentReport.attackerQuantity, twcheese_currentReport.attackerVillage, twcheese_currentReport.defenderVillage);
            if (twcheese_currentReport.buildingLevels)
                twcheese_currentReport.demolition = twcheese_calculateDemolition(twcheese_currentReport.buildingLevels);
            if (twcheese_currentReport.espionageLevel >= 1)
                twcheese_currentReport.raidScouted = twcheese_calculateRaidScouted(twcheese_currentReport.resources);
            if (twcheese_currentReport.espionageLevel >= 2) {
                twcheese_currentReport.raidPredicted = twcheese_calculateRaidPredicted(twcheese_currentReport.resources, twcheese_currentReport.buildingLevels, game_data.village.coord.split('|'), twcheese_currentReport.defenderVillage, twcheese_currentReport.sent, twcheese_getServerTime(), twcheese_gameConfig.speed, twcheese_gameConfig.unit_speed);
                twcheese_currentReport.raidPeriodic = twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels, 8, twcheese_gameConfig.speed);
            }

            /*==== add stuff to the page ====*/
            pageMod = new twcheese_BattleReportEnhancer(gameDoc, twcheese_currentReport, twcheese_gameConfig);
            pageMod.includeExtraInformation();
            pageMod.includeReportTools();
            /*==== auto rename ====*/
            if (twcheese_BRESettings.autoRename)
                pageMod.renameReport(twcheese_nameReport(twcheese_currentReport, ''));

            /*==== set to user defaults ====*/
            if (twcheese_currentReport.espionageLevel >= 1) {
                gameDoc.getElementById('twcheese_period').value = twcheese_BRESettings.period;
                document.getElementById('twcheese_raider_haulBonus').value = twcheese_BRESettings.haulBonus;

                if (game_data.market != 'uk') {
                    if (localStorage.getItem('twcheese_report_raiderScouts'))
                        document.getElementById('twcheese_raider_scouts').value = localStorage.getItem('twcheese_report_raiderScouts');
                }

                twcheese_changeRaidMode(twcheese_BRESettings.raid);
            }

            gameDoc.getElementById('twcheese_auto_rename').checked = twcheese_BRESettings.autoRename;

            if (twcheese.userConfig.report.show_report_tools)
                $('#twcheese_show_report_tools').find('img:first').click(); //show report tools widget

            twcheese_reportEnhanced = true;
        }
    }
    else if (game_data.screen == 'report' && (game_data.mode == 'attack' || game_data.mode == 'defense')) /* viewing reports folder with 'Attacks' or "Defenses" filter on	*/ {
        if (!twcheese_reportsFolderEnhanced) {
            twcheese_reportsFolderDisplaySettings = twcheese_loadReportsFolderDisplaySettings();
            twcheese_saveReportsFolderDisplaySettings(twcheese_reportsFolderDisplaySettings);
            pageMod = new twcheese_BattleReportsFolderEnhancer(gameDoc);
            pageMod.applySettings(twcheese_reportsFolderDisplaySettings);
            twcheese_reportsFolderEnhanced = true;
        }
    }
    else if (game_data.screen == 'forum') {
        //twcheese.parseForumEspionage(); //under development
    }
    else {
        alert('try using this on:\n1) a battle report\n2) a reports folder, with the "Attacks" filter on\n3) a reports folder, with the "Defenses" filter on'); //\n4) a topic in your tribal forum');
    }
}


window.TwCheese.registerTool({
    id: 'BRE',
    use: useTool,
    getDebugProcess: function() {
        return null;
    }
});