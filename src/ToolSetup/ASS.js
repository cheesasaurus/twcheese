import { userConfig, ensureRemoteConfigsUpdated } from '/twcheese/src/Util/Config.js';
import { initCss } from '/twcheese/src/Util/UI.js';
import { suggestRedirect } from '/twcheese/src/Prompt/suggestRedirect.js';
import {
    scrapeScavengeModels,
    scrapeAvailableTroopCounts,
    scrapeUsableOptionIds
} from '/twcheese/src/Scrape/scavenge.js';
import { troopUtil } from '/twcheese/src/Models/Troops.js';
import { ScavengeTroopsAssigner } from '/twcheese/src/Models/ScavengeTroopsAssigner.js';
import { ScavengePreferencesWidget } from '/twcheese/src/Widget/ScavengePreferencesWidget.js';
import { ProcessFactory } from '/twcheese/src/Models/Debug/Build/ProcessFactory.js';
import { processCfg as debugCfgDefault } from '/twcheese/dist/tool/cfg/debug/ASS/Default.js';


let initialized = false;
let haulFactor, troopsAssigner, scavengeOptions;

async function useTool() {
    if (!atScavengeScreen()) {
        suggestRedirectToScavengeScreen();
        return;
    }

    if (!initialized) {
        await init();
        initialized = true;
    }

    prepareBestOption();
}


async function init() {
    await ensureRemoteConfigsUpdated();

    let models = scrapeScavengeModels(document);
    troopsAssigner = new ScavengeTroopsAssigner(models.options, models.sendableTroopTypes, troopUtil);
    haulFactor = models.haulFactor;

    let exportedPreferences = userConfig.get('ASS.troopsAssigner');
    if (exportedPreferences) {
        troopsAssigner.preferences.import(exportedPreferences);
    }
    $(troopsAssigner.preferences).on('change', function() {
        userConfig.set('ASS.troopsAssigner', troopsAssigner.preferences.export());
    });
    scavengeOptions = models.options;
    insertPreferencesLauncher();

    insertNarcissim();

    initCss(`
        .free_send_button:focus {
            color: yellow;
            box-shadow: 0 0 5px 3px yellow;
        }
    `);

    afterScavengingStarted(() => prepareBestOption(false));
}


function atScavengeScreen() {
    let here = document.location.href;
    return here.includes('screen=place') && here.includes('mode=scavenge');
}


function suggestRedirectToScavengeScreen() {
    suggestRedirect({
        message: 'To use this, you must be at the scavenging screen.',
        screen: 'place',
        screenName: 'Scavenging Screen',
        uriParams: {
            mode: 'scavenge'
        },
        skippableId: 'Tool:ASS'
    });
}


function insertPreferencesLauncher() {
    let $launcher = $(`<a href="#">&raquo; preferences</a>`)
        .css({
            fontSize: 'small',
            marginLeft: '10px'
        })
        .on('click', function(e) {
            e.preventDefault();
            openPreferencesPopup();
        });

    $('#content_value').find('h3').eq(0).append($launcher);
}


function insertNarcissim() {
    let $narcissism = $(`<span>Script created by <a href="https://forum.tribalwars.net/index.php?members/28484">cheesasaurus</a></span>`)
        .css({
            float: 'right',
            fontSize: 'xx-small',
            fontWeight: 'normal'
        });

    $('#content_value').find('h3').eq(0).append($narcissism);
}


function openPreferencesPopup() {
    let onClose = prepareBestOption;

    Dialog.show('twcheese-scavenge-preferences-popup', function($container) {        
        let widget = new ScavengePreferencesWidget(troopsAssigner.preferences, scavengeOptions, troopsAssigner.sendableTroopTypes);
        widget.appendTo($container);
    }, onClose);
}


function prepareBestOption(informUserOfIssues = true) {
    let usableOptionIds = scrapeUsableOptionIds(document);
    usableOptionIds = troopsAssigner.adjustUsableOptionIds(usableOptionIds);
    if (usableOptionIds.length < 1) {
        if (informUserOfIssues) {
            window.UI.ErrorMessage(`Can't scavenge right now because there's no usable options`);
        }        
        return;
    }

    let availableTroops = scrapeAvailableTroopCounts(document);
    if (!troopsAssigner.areTroopsSufficient(availableTroops)) {
        if (informUserOfIssues) {
            window.UI.ErrorMessage(`Not enough troops available to scavenge right now`);
        }
        return;
    }
    
    let assignedTroopsByOption = troopsAssigner.assignTroops(usableOptionIds, availableTroops, haulFactor);

    let optionId = usableOptionIds[usableOptionIds.length - 1];
    fillTroops(assignedTroopsByOption.get(optionId));
    focusStartButton(optionId);
}


function focusStartButton(optionId) {
    $('.free_send_button')[optionId - 1].focus();
}


function fillTroops(troopCounts) {
    troopCounts.each(function(troopType, count) {
        $(`.unitsInput[name='${troopType}']`)
            .val(count)
            .trigger('change');
    });
}


function afterScavengingStarted(doSomething) {
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let didScavengingStart = $(mutation.addedNodes).is('.active-view');
            if (didScavengingStart) {
                doSomething();
            }
        });
    });
    
    $('.scavenge-option').each(function() {
        observer.observe(this, {
            childList: true,
            subtree: true
        });
    });
}


// register tool ///////////////////////////////////////////////////////

let processFactory = new ProcessFactory({});

function newDebugProcess() {
    let name = 'Tool: Another Scavenging Script';
    return processFactory.create(name, debugCfgDefault, true);
}


window.TwCheese.registerTool({
    id: 'ASS',
    use: useTool,
    getDebugProcess: newDebugProcess
});