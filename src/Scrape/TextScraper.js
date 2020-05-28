import { getProp } from '/twcheese/src/Util/Object.js';

var language = { "buildings": {}, "report": {}, "twcheese": {} };
switch (game_data.market) {
    default:
        /*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
        language['buildings']['main'] = 'Headquarters';
        language['buildings']['barracks'] = 'Barracks';
        language['buildings']['stable'] = 'Stable';
        language['buildings']['garage'] = 'Workshop';
        language['buildings']['church'] = 'Church';
        language['buildings']['church_f'] = 'First church';
        language['buildings']['snob'] = 'Academy';
        language['buildings']['smith'] = 'Smithy';
        language['buildings']['place'] = 'Rally point';
        language['buildings']['statue'] = 'Statue';
        language['buildings']['market'] = 'Market';
        language['buildings']['wood'] = 'Timber camp';
        language['buildings']['stone'] = 'Clay pit';
        language['buildings']['iron'] = 'Iron mine';
        language['buildings']['farm'] = 'Farm';
        language['buildings']['storage'] = 'Warehouse';
        language['buildings']['hide'] = 'Hiding place';
        language['buildings']['wall'] = 'Wall';
        language['buildings']['watchtower'] = 'Watchtower';

        language['report']['catDamage'] = 'Damage by catapults:';
        language['report']['ramDamage'] = 'Damage by rams:';
        language['report']['haul'] = 'Haul:';
        language['report']['loyalty'] = 'Loyalty:';
        language['report']['unitsInTransit'] = 'Defender\'s troops, that were in transit';
        language['report']['deletedPlayer'] = '(deleted)';
        language['report']['unread'] = '(new)';
        break;

    case 'cz':
        /*==== divokekmeny.cz/ ====*/
        language['buildings']['main'] = 'Hlavní budova';
        language['buildings']['barracks'] = 'Kasárna';
        language['buildings']['stable'] = 'Stáj';
        language['buildings']['garage'] = 'Dílna';
        language['buildings']['church'] = 'Kostel';
        language['buildings']['church_f'] = 'První kostel';
        language['buildings']['snob'] = 'Panský dvůr';
        language['buildings']['smith'] = 'Kovárna';
        language['buildings']['place'] = 'Nádvoří';
        language['buildings']['statue'] = 'Socha';
        language['buildings']['market'] = 'Tržiště';
        language['buildings']['wood'] = 'Dřevorubec';
        language['buildings']['stone'] = 'Lom na těžbu hlíny';
        language['buildings']['iron'] = 'Železný důl';
        language['buildings']['farm'] = 'Selský dvůr';
        language['buildings']['storage'] = 'Skladiště';
        language['buildings']['hide'] = 'Skrýš';
        language['buildings']['wall'] = 'Hradby';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate

        language['report']['catDamage'] = 'Škoda vzniklá střelbou z katapultu:';
        language['report']['ramDamage'] = 'Škoda vzniklá beranidlem:';
        language['report']['haul'] = 'Kořist:';
        language['report']['loyalty'] = 'Oddanost:';
        language['report']['unitsInTransit'] = 'Vojsko obránce, které bylo na cestě';
        language['report']['deletedPlayer'] = '(deleted)'; //todo: translate
        language['report']['unread'] = '(new)'; //todo: translate
        break;

    case 'se':
        language['buildings']['main'] = 'Högkvarter';
        language['buildings']['barracks'] = 'Barack';
        language['buildings']['stable'] = 'Stall';
        language['buildings']['garage'] = 'Verkstad';
        language['buildings']['church'] = 'Kyrka';
        language['buildings']['church_f'] = 'Första Kyrkan';
        language['buildings']['snob'] = 'Akademi';
        language['buildings']['smith'] = 'Smedja';
        language['buildings']['place'] = 'Samlingsplats';
        language['buildings']['statue'] = 'Staty';
        language['buildings']['market'] = 'Marknad';
        language['buildings']['wood'] = 'Sågverk';
        language['buildings']['stone'] = 'Lergrop';
        language['buildings']['iron'] = 'Järngruva';
        language['buildings']['farm'] = 'Farm';
        language['buildings']['storage'] = 'Förråd';
        language['buildings']['hide'] = 'Gömställe';
        language['buildings']['wall'] = 'Mur';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate

        language['report']['catDamage'] = 'Skada gjord av katapulter:';
        language['report']['ramDamage'] = 'Skada gjorda av Murbräckan:';
        language['report']['haul'] = 'Byte:';
        language['report']['loyalty'] = 'Lojalitet:';
        language['report']['unitsInTransit'] = 'Enheter utanför byn';
        language['report']['deletedPlayer'] = '(borttaget)';
        language['report']['unread'] = '(new)'; //todo: translate
        break;

    /*==== fyletikesmaxes.gr/ ====*/
    case 'gr':
        language['buildings']['main'] = 'Επιτελείο';
        language['buildings']['barracks'] = 'Στρατώνας';
        language['buildings']['stable'] = 'Στάβλος';
        language['buildings']['garage'] = 'Εργαστήριο';
        language['buildings']['church'] = 'Εκκλησία';
        language['buildings']['church_f'] = 'ΠρώτηΕκκλησία';
        language['buildings']['snob'] = 'Ακαδημία';
        language['buildings']['smith'] = 'Οπλοποιείο';
        language['buildings']['place'] = 'ΜέροςΣυγκέντρωσης';
        language['buildings']['statue'] = 'Άγαλμα';
        language['buildings']['market'] = 'Αγορά';
        language['buildings']['wood'] = 'Ξυλουργείο';
        language['buildings']['stone'] = 'Λατομείο';
        language['buildings']['iron'] = 'Σιδηρωρυχείο';
        language['buildings']['farm'] = 'Αγρόκτημα';
        language['buildings']['storage'] = 'Αποθήκη';
        language['buildings']['hide'] = 'Κρυψώνα';
        language['buildings']['wall'] = 'Τείχος';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate

        language['report']['catDamage'] = 'Ζημία που έκαναν οι καταπέλτες:';
        language['report']['ramDamage'] = 'Ζημιά που προκλήθηκε από τον πολιορκητικό κριό:';
        language['report']['haul'] = 'Αλλαγή:';
        language['report']['loyalty'] = 'Πίστη:';
        language['report']['unitsInTransit'] = 'Στρατεύματα αμυνόμενου που ήταν σε μεταφορά';
        language['report']['deletedPlayer'] = '(διεγραμμένο)';
        language['report']['unread'] = '(νέο)';
        break;

    /* the market where Arma plays :D */
    case 'hr':
        language['buildings']['main'] = 'Sjedište';
        language['buildings']['barracks'] = 'Vojarna';
        language['buildings']['stable'] = 'Štala';
        language['buildings']['garage'] = 'Radionica';
        language['buildings']['church'] = 'Crkva';
        language['buildings']['church_f'] = 'Prva crkva';
        language['buildings']['snob'] = 'Akademija';
        language['buildings']['smith'] = 'Kovačnica';
        language['buildings']['place'] = 'Okupljalište';
        language['buildings']['statue'] = 'Spomenik';
        language['buildings']['market'] = 'Tržnica';
        language['buildings']['wood'] = 'Drvosječa';
        language['buildings']['stone'] = 'Glinokop';
        language['buildings']['iron'] = 'Rudnik željeza';
        language['buildings']['farm'] = 'Farma';
        language['buildings']['storage'] = 'Spremište';
        language['buildings']['hide'] = 'Skrovište';
        language['buildings']['wall'] = 'Zid';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate

        language['report']['catDamage'] = 'Šteta nanešena katapultima:	';
        language['report']['ramDamage'] = 'Šteta nanešena ovnovima:';
        language['report']['haul'] = 'Nosivost:';
        language['report']['loyalty'] = 'Odanost:';
        language['report']['unitsInTransit'] = 'Obrambene postrojbe koje su bile na putu';
        language['report']['deletedPlayer'] = '(obrisano)';
        break;

    /* Norwegian */
    case 'no':
        language['buildings']['main'] = 'Hovedkvarter';
        language['buildings']['barracks'] = 'Brakker';
        language['buildings']['stable'] = 'Stall';
        language['buildings']['garage'] = 'Verksted';
        language['buildings']['church'] = 'Kirke';
        language['buildings']['church_f'] = 'Første Kirke';
        language['buildings']['snob'] = 'Akademi';
        language['buildings']['smith'] = 'Smie';
        language['buildings']['place'] = 'Samlingsplass';
        language['buildings']['statue'] = 'Statue';
        language['buildings']['market'] = 'Marked';
        language['buildings']['wood'] = 'Hogstfelt';
        language['buildings']['stone'] = 'Leirgrav';
        language['buildings']['iron'] = 'Jerngruve';
        language['buildings']['farm'] = 'Gård';
        language['buildings']['storage'] = 'Varehus';
        language['buildings']['hide'] = 'Skjulested';
        language['buildings']['wall'] = 'Mur';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate

        language['report']['catDamage'] = 'Skade forårsaket av katapulter:';
        language['report']['ramDamage'] = 'Skade forårsaket av rambukker:';
        language['report']['haul'] = 'Bytte';
        language['report']['loyalty'] = 'Lojalitet:';
        language['report']['unitsInTransit'] = 'Forsvarer';
        language['report']['unitsInTransit'] = 'Antall';
        language['report']['deletedPlayer'] = '(slettet)';
        language['report']['unread'] = '(ny)';
        break;

    // Portugal
    case 'pt':
        language['buildings']['main'] = 'Edifício Principal';
        language['buildings']['barracks'] = 'Quartel';
        language['buildings']['stable'] = 'Estábulo';
        language['buildings']['garage'] = 'Oficina';
        language['buildings']['church'] = 'Igreja';
        language['buildings']['church_f'] = 'Primeira Igreja';
        language['buildings']['snob'] = 'Academia';
        language['buildings']['smith'] = 'Ferreiro';
        language['buildings']['place'] = 'Praça de Reuniões';
        language['buildings']['statue'] = 'Estátua';
        language['buildings']['market'] = 'Mercado';
        language['buildings']['wood'] = 'Bosque';
        language['buildings']['stone'] = 'Poço de Argila';
        language['buildings']['iron'] = 'Mina de Ferro';
        language['buildings']['farm'] = 'Fazenda';
        language['buildings']['storage'] = 'Armazém';
        language['buildings']['hide'] = 'Esconderijo';
        language['buildings']['wall'] = 'Muralha';
        language['buildings']['watchtower'] = 'Watchtower'; // todo: translate
    
        language['report']['catDamage'] = 'Dano provocado por catapultas:';
        language['report']['ramDamage'] = 'Dano provocado por aríetes:';
        language['report']['haul'] = 'Busca minuciosa:';
        language['report']['loyalty'] = 'Lealdade:';
        language['report']['unitsInTransit'] = 'Unidades fora da aldeia';
        language['report']['deletedPlayer'] = '(eliminado)';
        language['report']['unread'] = '(novo)';
        break;

    // Brazil
    case 'br':        
        language['buildings']['main'] = 'Edifício principal';
        language['buildings']['barracks'] = 'Quartel';
        language['buildings']['stable'] = 'Estábulo';
        language['buildings']['garage'] = 'Oficina';
        language['buildings']['church'] = 'Igreja';
        language['buildings']['church_f'] = 'Primeira igreja';
        language['buildings']['snob'] = 'Academia';
        language['buildings']['smith'] = 'Ferreiro';
        language['buildings']['place'] = 'Praça de reunião';
        language['buildings']['statue'] = 'Estátua';
        language['buildings']['market'] = 'Mercado';
        language['buildings']['wood'] = 'Bosque';
        language['buildings']['stone'] = 'Poço de argila';
        language['buildings']['iron'] = 'Mina de ferro';
        language['buildings']['farm'] = 'Fazenda';
        language['buildings']['storage'] = 'Armazém';
        language['buildings']['hide'] = 'Esconderijo';
        language['buildings']['wall'] = 'Muralha';
        language['buildings']['watchtower'] = 'Torre de vigia';

        language['report']['catDamage'] = 'Dano - catapultas:';
        language['report']['ramDamage'] = 'Dano - aríetes:';
        language['report']['haul'] = 'Saque:';
        language['report']['loyalty'] = 'Lealdade:';
        language['report']['unitsInTransit'] = 'Tropas defensivas em trânsito';
        language['report']['deletedPlayer'] = '(apagado)';
        language['report']['unread'] = '(novo)';
        break;

}

function escapeSingleQuotes(str) {
    return str.replace(/'/g, "\\'");
}

class TextScraper {
    constructor(gameTexts) {
        this.gameTexts = gameTexts;
    }

    t(textId) {
        return getProp(this.gameTexts, textId);
    }

    /**
     * @param {HTMLElement|jQuery|string} haystack
     * @param {string} textId
     * @return {boolean}
     */
    includes(haystack, textId) {
        let needle = this.t(textId);
        if (typeof haystack === 'string') {
            return haystack.includes(needle);
        }
        return $(haystack).html().includes(needle);
    }

    /**
     * @param {HTMLElement[] | jQuery} elements
     * @param {string} textId 
     * @return {HTMLElement|undefined}
     */
    first(elements, textId) {
        let searchFor = this.t(textId);
        return $(elements).filter(`:contains('${escapeSingleQuotes(searchFor)}')`)[0];
    }

    /**
     * @param {HTMLElment|jQuery} el
     * @return {string}
     */
    buildingType(el) {
        let text = $(el).text();
        for (let [buildingType, buildingName] of Object.entries(this.gameTexts.buildings)) {
            if (text.includes(buildingName)) {
                return buildingType;
            }
        }
    }

}


let textScraper = new TextScraper(language);


export { textScraper };