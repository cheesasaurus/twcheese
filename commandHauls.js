/*	twcheese_commandHauls.js
 *	Commands Overview - show returning hauls
 *	market: uk, us, en, {all}
 *	author Nick Toby (cheesasaurus@gmail.com)

 *	use script on: game.php?screen=overview_villages&mode=commands&type=return (the commands overview, with the return filter on)
 *	effect: includes 'haul' as part of the information for the listed commands. Also shows statistics about the incoming resources
 
 *	Copyright (C) 2011  Nick Toby

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/
 */

if (!twcheese)
    var twcheese = {};

/*==== graphics ====*/
twcheese.images = {
    plus: 'graphic/plus.png',
    minus: 'graphic/minus.png',
    timber: 'graphic/holz.png',
    clay: 'graphic/lehm.png',
    iron: 'graphic/eisen.png',
    popupBackground: 'graphic/popup/content_background.png',
    popupBorder: 'graphic/popup/border.png',
    servant: 'graphic/paladin_new.png',
    tableHeaderBackground: 'graphic/screen/tableheader_bg3.png',
    loadingSpinner: 'graphic/throbber.gif'
};

// avoid flooding the server with requests
(function () {

    class RateLimiter {
        constructor(maxBurstsPerSecond) {
            this.maxBurstsPerSecond = maxBurstsPerSecond;
            this.recentRequests = new Array(maxBurstsPerSecond);
        }

        requestWasMade() {
            this.recentRequests.unshift(performance.now());
            this.recentRequests.pop();
        }

        async sleepIfNeeded() {
            let anchorTimestamp = this.recentRequests[this.maxBurstsPerSecond - 1];
            if (typeof anchorTimestamp === 'undefined') {
                return;
            }
            let delayMs = anchorTimestamp + 1000 - performance.now();
            if (delayMs <= 0) {
                return;
            }
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, delayMs);
            });
        }
    }

    twcheese.rateLimiter = new RateLimiter(5);

    let oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        twcheese.rateLimiter.requestWasMade();
        oldSend.apply(this, arguments);
    }

})();

/*==== cache functions ====*/

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
};

/*==== timing ====*/

(function() {
    'use strict';

    let serverOffsetFromUtc = window.server_utc_diff * 1000;
    let localOffsetFromUtc = new Date().getTimezoneOffset() * 60000;

    class TwCheeseDate extends Date {
        constructor() {
            if (arguments.length === 0) {
                super(Timing.getCurrentServerTime());
            } else {
                super(...arguments);
            }
        }

        clone() {
            return new TwCheeseDate(this.getTime());
        }

        addDays(days) {
            let ret = this.clone();
            ret.setUTCDate(this.getUTCDate() + days);
            return ret;
        }

        addHours(hours) {
            let ret = this.clone();
            ret.setUTCHours(this.getUTCHours() + hours);
            return ret;
        }

        addSeconds(seconds) {
            let ret = this.clone();
            ret.setUTCSeconds(this.getUTCSeconds() + seconds);
            return ret;
        }

        addMilliseconds(milliseconds) {
            let ret = this.clone();
            ret.setUTCMilliseconds(this.getUTCMilliseconds() + milliseconds);
            return ret;
        }

        getServerHours() {
            return this.addMilliseconds(serverOffsetFromUtc).getUTCHours();
        }

        isTodayOnServer() {
            let dateAdjusted = this.addMilliseconds(serverOffsetFromUtc);
            let nowAdjusted = new TwCheeseDate().addMilliseconds(serverOffsetFromUtc);
            return dateAdjusted.isSameDayInUtc(nowAdjusted);
        }

        isTomorrowOnServer() {
            let dateAdjusted = this.addMilliseconds(serverOffsetFromUtc);
            let nowAdjusted = new TwCheeseDate().addMilliseconds(serverOffsetFromUtc);
            let tomorrow = nowAdjusted.addDays(1);    
            return dateAdjusted.isSameDayInUtc(tomorrow);
        }

        isSameDayInUtc(otherDate) {
            return this.getUTCFullYear() === otherDate.getUTCFullYear()
                && this.getUTCMonth() === otherDate.getUTCMonth()
                && this.getUTCDate() === otherDate.getUTCDate();
        }

        dateAtHourStart() {
            let ret = this.clone();
            ret.setUTCMinutes(0);
            ret.setUTCSeconds(0);
            ret.setUTCMilliseconds(0);
            return ret;
        }
    }


    twcheese.Timing = {
        newServerDate() {
            let ret = new TwCheeseDate(...arguments);
            if (arguments.length > 1) {
                ret = ret.addMilliseconds(0 - serverOffsetFromUtc - localOffsetFromUtc);
            }
            return ret;
        },

        monthNumber(monthName) {
            return (new Date(monthName + ' 1 1970')).getMonth();
        }
    };

})();


(function () {

    class Command {
        constructor() {
            this.command_id;
            this.arrival = twcheese.Timing.newServerDate();
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
            var sum = new Command();

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

    twcheese.Command = Command;

})();

/*==== scraper functions ====*/

/**
 *	scrapes a command page for the command info and returns it as a twcheese_Command object
 *	@param	gameDoc:HTMLDocument	the page generated by game.php?screen=command_info&id=x&type=own
 *	@return command:twcheese_Command	an object representing the command.
 */
twcheese.scrapeCommand = function (gameDoc) {
    var command = new twcheese.Command();

    try {//note: being lazy - catching exception thrown for returning scouts and outgoing troops instead of checking for them
        var content = $(gameDoc).find('#content_value').get()[0];

        var arrivalCell = content.getElementsByTagName('table')[0].rows[6].cells[1];
        command.arrival = twcheese.parseArrival($(arrivalCell).text());

        var resCell = content.getElementsByTagName('table')[2].rows[0].cells[1];
        var haul = twcheese.resElementToNumbers(resCell);
        command.timber = haul[0];
        command.clay = haul[1];
        command.iron = haul[2];

        var haulText = resCell.innerHTML;
        if (haulText.search('\\|') !== -1) {
            haulText = haulText.substring(haulText.search('\\|') + 7);
            let performance = haulText.split('/');
            command.haulCapacity = parseInt(performance[1]);
        }
    }
    catch (e) {
    }

    return command;
};

/**
 * @param {string} text formatted the way tw does it
 * @return {TwCheeseDate}
 */
twcheese.parseArrival = function (text) {
    let expr = /(\D{3}) (\d{1,2}), (\d{4})  (\d{2}):(\d{2}):(\d{2}):?(\d{3})?/;
    [, monthName, day, year, hours, minutes, seconds, millis] = text.match(expr);
    let month = twcheese.Timing.monthNumber(monthName);
    return twcheese.Timing.newServerDate(year, month, day, hours, minutes, seconds, millis || 0);
};

/**
 *	requests the body from an html document and returns it as an HTML element
 *	@param	{string} targetUrl	the url of the page to get the document body from
 *  @return {Promise}
 *	@resolve {HTMLBodyElement}
 */
twcheese.requestDocumentBody = async function (targetUrl) {
    await twcheese.rateLimiter.sleepIfNeeded();

    return new Promise(function(resolve, reject) {
        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", targetUrl);
        xmlhttp.onload = function() {
            let requestedDocumentBody = document.createElement("body");
            requestedDocumentBody.innerHTML = xmlhttp.responseText;
            resolve(requestedDocumentBody);
        };
        xmlhttp.onerror = function() {
            reject('failed to load ' + targetUrl);
        }
        xmlhttp.send("");
    });
};

/**
 * reads a HTMLElement with the timber count, clay count, and iron count, and converts it to an array of Numbers
 * @param	resElement:HTMLElement	the html of the resources
 * @return	resources:Array(timber:int, clay:int, iron:int)
 */
twcheese.resElementToNumbers = function (resElement) {
    var resElementBackupHTML = resElement.innerHTML;
    var resIconNames = new Array('icon header wood', 'icon header stone', 'icon header iron');
    var resources = new Array(0, 0, 0);

    /*==== remove the grey periods ====*/
    $(resElement).children('.grey').remove();

    /*==== remove haul performance ====*/
    if (resElement.innerHTML.search('\\|') != -1)
        resElement.innerHTML = resElement.innerHTML.substring(0, resElement.innerHTML.indexOf('|') - 1);

    /*==== set resources ====*/
    var icons = resElement.getElementsByTagName('span');

    if (navigator.appName == 'Microsoft Internet Explorer') /* internet explorer */ {
        for (var i = 0; i < icons.length; i++) {
            /*==== if timber icon is found, set timber ====*/
            if (icons[i].className == resIconNames[0])
                resources[0] = parseInt(icons[i].nextSibling.data);


            /*==== if clay icon is found, set clay ====*/
            if (icons[i].className == resIconNames[1])
                resources[1] = parseInt(icons[i].nextSibling.data);


            /*==== if iron icon is found, set iron ====*/
            if (icons[i].className == resIconNames[2])
                resources[2] = parseInt(icons[i].nextSibling.data);

        }
    }
    else /* if(navigator.appName == 'Opera' || navigator.appName == 'Netscape') //opera, netscape */ {
        for (var i = 0; i < icons.length; i++) {
            /*==== if timber icon is found, set timber ====*/
            if (icons[i].className == resIconNames[0]) {
                resources[0] = parseInt(icons[i].nextSibling.wholeText);
            }

            /*==== if clay icon is found, set clay ====*/
            if (icons[i].className == resIconNames[1]) {
                resources[1] = parseInt(icons[i].nextSibling.wholeText);
            }

            /*==== if iron icon is found, set iron ====*/
            if (icons[i].className == resIconNames[2]) {
                resources[2] = parseInt(icons[i].nextSibling.wholeText);
            }
        }
    }

    resElement.innerHTML = resElementBackupHTML;
    return resources;
};

/*==== widgets ====*/

twcheese.popupShowHaulsPrompt = function () {
    var container = document.createElement('div');
    container.id = 'twcheese_showHaulsPrompt';
    container.style.width = '500px';
    //container.style.height = '300px';
    twcheese.style.popup(container);

    var content = document.createElement('div');
    content.style.background = 'url("' + twcheese.images.popupBackground + '")';
    content.style.height = '100%';
    content.style.width = '100%';

    var servantDivStr = '';
    servantDivStr += "<a id=\"popup_box_close\" href=\"#\" onclick=\"$( '#fader,#twcheese_showHaulsPrompt' ).remove(); return false;\"> <\/a>";
    servantDivStr += "<div style=\"background: no-repeat url('" + twcheese.images.servant + "');\">";
    servantDivStr += "<h3 style=\"margin: 0 3px 5px 120px;\">My liege,<\/h3>";
    servantDivStr += "<div id=\"twcheese_servant_text\" style=\"margin-left:120px;height:50px;margin-top:30px\">Dost thou wish hauls to be included on thine screen?<\/div>";
    servantDivStr += "";
    servantDivStr += "<div class=\"quest-goal\">";
    servantDivStr += "";
    servantDivStr += "<table width=\"100%\">";
    servantDivStr += "<tbody>";
    servantDivStr += "<tr>";
    servantDivStr += "<td style=\"width: 120px; height: 80px;\"> <\/td>";
    servantDivStr += "<td id=\"twcheese_servant_info\" style=\"padding-right: 70px;\">";
    servantDivStr += "<h5>Load haul information?<\/h5>";
    servantDivStr += "<p>This could take a while if you have a lot of commands.<\/p>";
    servantDivStr += "<div class=\"confirmation-buttons\">";
    servantDivStr += "<button class=\"btn btn-confirm-yes\" aria-label'ok'=\"\" onclick=\"twcheese.loadHaulInfo()\">Yes<\/button>";
    servantDivStr += "<button class=\"btn-default evt-cancel-btn\" aria-label'cancel'=\"\" onclick=\"$( '#fader,#twcheese_showHaulsPrompt' ).remove(); return false;\">Cancel<\/button>";
    servantDivStr += "<\/div>";
    servantDivStr += "<\/td>";
    servantDivStr += "<\/tr>";
    servantDivStr += "<\/tbody>";
    servantDivStr += "<\/table>";
    servantDivStr += "<\/div>";

    content.innerHTML = servantDivStr;

    container.appendChild(content);
    document.body.appendChild(container);
    twcheese.fadeGameContent();
};

twcheese.toggleWidget = function (widgetId, icon) {
    var content = $('#' + widgetId).children('div:first');

    var toggleState;
    if (icon.src.search('plus') != -1) {
        icon.src = twcheese.images.minus;
        content.show(200);
        toggleState = 1;
    }
    else {
        icon.src = twcheese.images.plus;
        content.hide(200);
        toggleState = 0;
    }

    /*==== save settings ====*/
    eval('if(!twcheese.userConfig.' + game_data.mode + ')twcheese.userConfig.' + game_data.mode + '={}');
    eval('twcheese.userConfig.' + game_data.mode + '.' + widgetId.substring(9) + '=' + toggleState);
    localStorage.setItem('twcheese.userConfig', JSON.stringify(twcheese.userConfig));
};

/**
 *	creates a widget with statistics about the returning hauls
 *	@param commandsList:Array(command1:twcheese.Command,command2:twcheese.Command ...)	- an array of commands to use for the stats
 */
twcheese.createPillagingStatsWidget = function (commandsList) {
    var container = document.createElement('div');
    container.className = 'vis widget';
    container.id = 'twcheese_show_pillaging_statistics';

    var startTime = twcheese.Timing.newServerDate();
    var endTime = commandsList[commandsList.length - 1].arrival;

    function dayHint(date) {
        if (date.isTodayOnServer()) {
            return '';
        }
        else if (date.isTomorrowOnServer()) {
            return ' (tomorrow)';
        }
        return ' (' + optionStartTime.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) + ')';
    }

    /**
     *	changes the results displayed in the summation section of the pillaging stats widget
     */
    container.showResults = function () {
        var startTime = twcheese.Timing.newServerDate(Number(document.getElementById('twcheese_pillaging_stats_from').value));
        var endTime = twcheese.Timing.newServerDate(Number(document.getElementById('twcheese_pillaging_stats_to').value));
        if (startTime > endTime) {
            tmpTime = startTime;
            startTime = endTime;
            endTime = tmpTime;
        }
        var results = twcheese.Command.sumPropsFromTimeframe(commandsList, startTime, endTime);

        var resultsContainer = document.getElementById('twcheese_pillaging_results');
        resultsContainer.innerHTML = '<img src="' + twcheese.images.timber + '"></img>' + results.timber + ' ';
        resultsContainer.innerHTML += '<img src="' + twcheese.images.clay + '"></img>' + results.clay + ' ';
        resultsContainer.innerHTML += '<img src="' + twcheese.images.iron + '"></img>' + results.iron + ' &nbsp&nbsp| ';
        resultsContainer.innerHTML += results.sumLoot() + '/' + results.haulCapacity + ' (';
        resultsContainer.innerHTML += results.calcHaulPercent() + '%)';
    };

    var titleBar = document.createElement('h4');
    titleBar.innerHTML = 'Pillaging Statistics';

    var toggleButton = document.createElement('img');
    toggleButton.src = 'graphic/plus.png';
    toggleButton.style.cssFloat = 'right';
    toggleButton.style.cursor = 'pointer';
    //toggleButton.onclick = "twcheese.toggleWidget( 'twcheese_show_pillaging_statistics',this)";
    toggleButton.onclick = function () { twcheese.toggleWidget('twcheese_show_pillaging_statistics', this) };
    titleBar.appendChild(toggleButton);


    var narcismElement = document.createElement('span');
    narcismElement.innerHTML = 'created by <a href="http://forum.tribalwars.net/member.php?u=28484">cheesasaurus</a>';
    narcismElement.style.fontSize = '8px';
    narcismElement.style.fontStyle = 'normal';
    narcismElement.style.fontWeight = 'normal';
    narcismElement.style.marginRight = '25px';
    narcismElement.style.cssFloat = 'right';
    titleBar.appendChild(narcismElement);

    container.appendChild(titleBar);

    var widgetContent = document.createElement('div');
    widgetContent.className = 'widget_content';
    widgetContent.style.display = 'none';

    var summationContainer = document.createElement('div');
    var selectionContainer = document.createElement('div');
    selectionContainer.style.textAlign = 'center';
    selectionContainer.style.width = '100%';
    selectionContainer.style.marginTop = '5px';
    selectionContainer.style.marginBottom = '5px';
    selectionContainer.innerHTML = 'From ';
    var summationFrom = document.createElement('select');
    summationFrom.id = 'twcheese_pillaging_stats_from';

    /*==== create options for From menu ====*/
    summationFrom.innerHTML = '';
    var optionsNeeded = endTime.getTime() / 3600000 - Math.floor(startTime.getTime() / 3600000); //number of hours between the start of the current hour and the latest incoming haul
    var optionStartTime = startTime.dateAtHourStart();

    for (var i = 0; i <= optionsNeeded; i++) {
        var option = document.createElement('option');
        option.value = optionStartTime.getTime();
        option.innerHTML = optionStartTime.getServerHours() + ':00 ' + dayHint(optionStartTime);
        summationFrom.appendChild(option);

        optionStartTime = optionStartTime.addHours(1);
    }

    selectionContainer.appendChild(summationFrom);

    selectionContainer.innerHTML += ' to ';
    var summationTo = document.createElement('select');
    summationTo.id = 'twcheese_pillaging_stats_to';

    /*==== create options for To menu ====*/
    summationTo.innerHTML = '';
    var optionsNeeded = endTime.getTime() / 3600000 - Math.floor(startTime.getTime() / 3600000); //number of hours between the start of the current hour and the latest incoming haul
    var optionStartTime = startTime.dateAtHourStart();

    for (var i = 0; i <= optionsNeeded; i++) {
        var option = document.createElement('option');
        option.value = optionStartTime.getTime() + 3599999;
        option.innerHTML = optionStartTime.getServerHours() + ':59 ' + dayHint(optionStartTime);
        summationTo.appendChild(option);

        optionStartTime = optionStartTime.addHours(1);
    }

    selectionContainer.appendChild(summationTo);
    summationContainer.appendChild(selectionContainer);

    var summationResults = document.createElement('div');
    summationResults.id = 'twcheese_pillaging_results';
    summationResults.style.textAlign = 'center';
    summationResults.innerHTML = 'Results displayed here';
    summationContainer.appendChild(summationResults);
    summationContainer.innerHTML += '<br/>';


    widgetContent.appendChild(summationContainer);

    var summaryTable = document.createElement('table');
    summaryTable.width = '100%';

    /*==== table title ====*/
    summaryTable.insertRow(-1);
    summaryTable.rows[0].insertCell(-1);
    summaryTable.rows[0].cells[0].colSpan = 6;
    summaryTable.rows[0].cells[0].innerHTML = 'Incoming Resources';
    summaryTable.rows[0].cells[0].style.textAlign = 'center';
    summaryTable.rows[0].cells[0].style.fontSize = '16px';

    /*==== get page information ===*/
    var currentPage = $('#paged_view_content').children('table:eq(0)').find('strong').html();
    if (currentPage) {
        if (currentPage.search('all') == -1)
            summaryTable.rows[0].cells[0].innerHTML += ' from Page ' + currentPage.match('[0-9]{1,}');
    }

    /*==== table headers ====*/
    summaryTable.insertRow(-1);
    for (var i = 0; i < 5; i++) {
        summaryTable.rows[1].insertCell(-1);
        summaryTable.rows[1].cells[i].style.backgroundImage = 'url("' + twcheese.images.tableHeaderBackground + '")';
        summaryTable.rows[1].cells[i].style.backgroundRepeat = 'repeat-x';
        summaryTable.rows[1].cells[i].style.fontSize = '9pt';
        summaryTable.rows[1].cells[i].style.fontWeight = 700;
    }
    summaryTable.rows[1].cells[0].innerHTML = '<b>Arrival</b>';
    summaryTable.rows[1].cells[1].innerHTML = '<img src=' + twcheese.images.timber + '></img>';
    summaryTable.rows[1].cells[2].innerHTML = '<img src=' + twcheese.images.clay + '></img>';
    summaryTable.rows[1].cells[3].innerHTML = '<img src=' + twcheese.images.iron + '></img>';
    summaryTable.rows[1].cells[4].innerHTML = '<b>Performance</b>';
    summaryTable.rows[1].cells[4].colSpan = 2;

    /*==== table contents ====*/
    var startTime = twcheese.Timing.newServerDate();

    var rowsNeeded = endTime.getTime() / 3600000 - Math.floor(startTime.getTime() / 3600000); //number of hours between the start of the current hour and the latest incoming haul
    var rowStartTime = startTime.dateAtHourStart();

    for (var row = 2; row <= rowsNeeded + 2; row++) {
        summaryTable.insertRow(-1);
        for (var col = 0; col < 6; col++) {
            summaryTable.rows[row].insertCell(-1);
            if (row % 2 > 0)
                summaryTable.rows[row].cells[col].style.background = '#FFE0A2';
        }

        var result = twcheese.Command.sumPropsFromTimeframe(commandsList, rowStartTime, rowStartTime.addHours(1).addSeconds(-1));

        summaryTable.rows[row].cells[0].innerHTML = rowStartTime.getServerHours() + ':00' + '-' + rowStartTime.getServerHours() + ':59 ' + dayHint(rowStartTime);
        summaryTable.rows[row].cells[1].innerHTML = result.timber;
        summaryTable.rows[row].cells[2].innerHTML = result.clay;
        summaryTable.rows[row].cells[3].innerHTML = result.iron;
        summaryTable.rows[row].cells[4].innerHTML = result.sumLoot() + '/' + result.haulCapacity;
        summaryTable.rows[row].cells[5].innerHTML = result.calcHaulPercent() + '%';

        rowStartTime = rowStartTime.addHours(1);
    }
    widgetContent.appendChild(summaryTable);

    container.appendChild(widgetContent);

    /*==== place the widget into the document tree ====*/
    $('.modemenu:eq(1)').after(container);

    /*==== initialize interactive components ====*/
    document.getElementById('twcheese_pillaging_stats_from').onchange = container.showResults;
    document.getElementById('twcheese_pillaging_stats_to').onchange = container.showResults;
    document.getElementById('twcheese_pillaging_stats_to').childNodes[document.getElementById('twcheese_pillaging_stats_to').childNodes.length - 1].selected = "selected";
    container.showResults();

};

/*==== enhancement functions ====*/

/**
 *	includes haul information in the commands table
 *	@param	gameDoc:HTMLDocument	the page generated by game.php?screen=overview_villages&mode=commands&type=return
 */
twcheese.includeHaulInfo = async function (gameDoc) {
    var commandsTable = gameDoc.getElementById('commands_table');
    var fillerSpan = commandsTable.rows[0].cells.length;

    /*==== add haul headers to the commands table ====*/
    var timberHeader = document.createElement('th');
    commandsTable.rows[0].appendChild(timberHeader);
    timberHeader.innerHTML = '<img src="' + twcheese.images.timber + '" title="Wood" alt="Timber" />';

    var clayHeader = document.createElement('th');
    commandsTable.rows[0].appendChild(clayHeader);
    clayHeader.innerHTML = '<img src="' + twcheese.images.clay + '" title="Clay" alt="Clay" />';

    var ironHeader = document.createElement('th');
    commandsTable.rows[0].appendChild(ironHeader);
    ironHeader.innerHTML = '<img src="' + twcheese.images.iron + '" title="Iron" alt="Iron" />';

    var performanceHeader = document.createElement('th');
    commandsTable.rows[0].appendChild(performanceHeader);
    performanceHeader.innerHTML = 'Performance';


    /*==== append resources hauled to each row in the commands table ====*/
    var selectorRow = 1;
    if (document.URL.search('return') != -1)
        selectorRow = 0;    

    for (var i = 1; i < commandsTable.rows.length - selectorRow; i++) {
        var commandUrl = commandsTable.rows[i].cells[0].getElementsByTagName('a')[0].href;
        var command = twcheese.scrapeCommand(await twcheese.requestDocumentBody(commandUrl));

        /*==== add command to list if it is returning ====*/
        var command_type = $(commandsTable.rows[i].cells[0]).find('.own_command').data('command-type');
        if (command_type === 'return') {
            twcheese.commands.commandsList.push(command);
        }    

        var timberCell = commandsTable.rows[i].insertCell(-1);
        timberCell.innerHTML = command.timber;

        var clayCell = commandsTable.rows[i].insertCell(-1);
        clayCell.innerHTML = command.clay;

        var ironCell = commandsTable.rows[i].insertCell(-1);
        ironCell.innerHTML = command.iron;

        var performanceCell = commandsTable.rows[i].insertCell(-1);
        performanceCell.innerHTML = command.sumLoot() + '/' + command.haulCapacity + ' (' + command.calcHaulPercent() + '%)';
    }
    if (selectorRow) {
        commandsTable.rows[commandsTable.rows.length - 1].cells[0].colSpan = 19;
    }

    twcheese.haulsIncluded = true;
};

twcheese.fadeGameContent = function () {
    var fader = document.createElement('div');
    fader.id = 'fader';
    fader.style.position = 'fixed';
    fader.style.height = '100%';
    fader.style.width = '100%';
    fader.style.backgroundColor = 'black';
    fader.style.top = '0px';
    fader.style.left = '0px';
    fader.style.opacity = '0.6';
    fader.style.zIndex = '12000';
    document.body.appendChild(fader);
};

/*==== styles ====*/
if (!twcheese.style)
    twcheese.style = {};

twcheese.style.popup = function (element) {
    element.style.zIndex = 13000;
    element.style.display = 'block';
    element.style.position = 'fixed';
    element.style.top = '60px';

    var browser = '';
    if (/AppleWebKit/.test(navigator.userAgent))
        browser = '-webkit-';
    else if (window.opera)
        browser = '-o-';

    element.style.border = '19px solid #804000';
    $(element).css(browser + 'border-image', 'url("' + twcheese.images.popupBorder + '") 19 19 19 19 repeat');

    //center
    element.style.marginLeft = (window.innerWidth - $(element).width()) / 2 + 'px';
    window.onresize = function () {
        element.style.marginLeft = (window.innerWidth - $(element).width()) / 2 + 'px';
    };
};

twcheese.loadHaulInfo = function () {
    document.getElementById('twcheese_servant_text').innerHTML = 'May the cheese be with you.';
    document.getElementById('twcheese_servant_info').innerHTML = 'loading... <img src="' + twcheese.images.loadingSpinner + '"></img>';
    setTimeout(
        async function () {
            await twcheese.includeHaulInfo((window.frames.length > 0) ? window.main.document : document);

            /*==== stats ====*/
            twcheese.createPillagingStatsWidget(twcheese.commands.commandsList);

            /*==== apply user configuration ====*/
            try {
                if (twcheese.userConfig.commands.show_pillaging_statistics)
                    $('#twcheese_show_pillaging_statistics').find('img:first').click(); //show pillaging statistics widget
            } catch (e) { };

            $('#fader,#twcheese_showHaulsPrompt').remove();
        }
        , 1);
};

/*==== main ====*/

twcheese.loadConfig();
if (!twcheese.commands)
    twcheese.commands = {};

twcheese.commands.commandsList = new Array();

if (!twcheese.haulsIncluded) {
    if (game_data.screen == 'overview_villages' && game_data.mode == 'commands') {
        twcheese.popupShowHaulsPrompt();
    }
    else
        alert('To use this, you must be on the commands overview. It\'s recommended to use the \'return\' filter, since outgoing troops don\'t carry resources :)');
}
else {
    UI.InfoMessage('This is already active.', 3000, 'error');
}
