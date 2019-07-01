import { ImageSrc } from '/twcheese/conf/ImageSrc.js';


function escapeHtml(text) {
    if (typeof text !== 'string') {
        text = String(text);
    }
    // https://stackoverflow.com/a/4835406
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };  
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

////// css //////

let cssInitd = new Set();

function initCss(css) {
    if (cssInitd.has(css)) {
        return;
    }
    $(`<style>${css}</style>`).appendTo('head');
    cssInitd.add(css);
}

initCss(`
    .twcheese-popup {
        z-index: 13000;
        display: block;
        position: fixed;
        top: 60px;
        border: 19px solid #804000;
        border-image: url(${ImageSrc.popupBorder}) 19 19 19 19 repeat;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
`);

//////// faders ///////////


function fadeGameContent () {
    $('body').append('<div id="fader" class="fader">');
};


function unfadeGameContent() {
    $('#fader').remove();
    $('.twcheese-fader').remove();
}


function fadeGameContentExcept(el) {
    let $el = $(el);

    if ($el.length < 1) {
        throw new Error('element does not exist');
    }
    if ($el.length > 1) {
        throw new Error('expected exactly one element, got more');
    }

    let $faderLeft = spawnFader();
    let $faderRight = spawnFader();
    let $faderTopMenu = spawnFader();
    let $faderTopScreen = spawnFader();
    let $faderBottomScreen = spawnFader();
    let $faderBottomMenu = spawnFader();

    var $bottomMenu = $('#footer');
    var $topMenu = $('#topContainer');
    var topMenuHeight, screenWidth, screenHeight;

    function updateMeasurements() {
        topMenuHeight = $topMenu.outerHeight() + 3;
        screenWidth = $('body').outerWidth();
        screenHeight = Math.max($('#ds_body')[0].scrollHeight, document.documentElement.clientHeight);
    }

    function updateFaders() {
        updateMeasurements();
        updateFaderLeft();
        updateFaderRight();
        updateFaderTopMenu();
        updateFaderTopScreen();
        updateFaderBottomScreen();
        updateFaderBottomMenu();
    }


    function updateFaderLeft() {
        let offset = $el.offset();
        $faderLeft.css({
            top: 0,
            left: 0,
            width: offset.left,
            height: screenHeight
        });
    }


    function updateFaderRight() {
        let offset = $el.offset();
        $faderRight.css({
            top: 0,
            right: 0,
            width: screenWidth - $el.outerWidth() - offset.left,
            height: screenHeight
        });
    }


    function updateFaderTopScreen() {
        let offset = $el.offset();
        $faderTopScreen.css({
            top: topMenuHeight,
            left: offset.left,
            height: offset.top - topMenuHeight,
            width: $el.outerWidth(),
            zIndex: $('.top_bar').zIndex() - 1
        });
    }


    function updateFaderBottomScreen() {
        let offset = $el.offset();
        $faderBottomScreen.css({
            top: offset.top + $el.outerHeight(),
            left: offset.left,
            height: screenHeight - offset.top - $el.outerHeight(),
            width: $el.outerWidth(),
            zIndex: $bottomMenu.zIndex() - 1
        });
    }


    function updateFaderTopMenu() {
        let offset = $el.offset();
        $faderTopMenu.css({
            position: 'fixed',
            top: 0,
            left: offset.left,
            height: topMenuHeight,
            width: $el.outerWidth()
        });
    }


    function updateFaderBottomMenu() {
        let offset = $el.offset();
        $faderBottomMenu.css({
            position: 'fixed',
            bottom: 0,
            left: offset.left,
            height: $bottomMenu.outerHeight(),
            width: $el.outerWidth()
        });
    }


    function spawnFader() {
        let css = {
            position: 'absolute',
            background: 'black',
            opacity: 0.5,
            zIndex: 12000
        };
        return $('<div class="twcheese-fader"></div>').css(css).appendTo($('body'));
    }

    updateFaders();
    $(window).on('resize', updateFaders);
}


// mousetrap ///////////////////////////////

let mouseEvents = ['click', 'mousemove', 'mousenter', 'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup'];
let mouseBubbleEvents = new Set(['click', 'mousemove', 'mouseover', 'mouseout', 'mousedown', 'mouseup']);
let mouseEventsNeedSpecial = new Set(['mousenter', 'mouseleave', 'mouseover', 'mouseout']);

class Mousetrap {
    constructor() {
        this.$trap = $('<div class="twcheese-mousetrap">').css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'cyan',
            opacity: 0.001,
            zIndex: 12000
        })
        this.prevIntendedTarget;

        this.watchers = {
            // example:
            // click: [{$elements, handler}, {$elements, handler}]
            mouseout: []
        }

        this.setupHandling();
    }

    spawn() {
        this.$trap.appendTo('body');
        return this;
    }

    destruct() {
        this.$trap.remove();
    }

    setupHandling() {
        let trapEvents = mouseEvents.filter(name => !mouseEventsNeedSpecial.has(name));

        this.$trap.on(trapEvents.join(' '), (e) => {
            this.$trap.hide();
            let intendedTarget = document.elementFromPoint(e.offsetX, e.offsetY);
            this.$trap.show();

            this.notifyWatchers(e.type, e, intendedTarget);

            if (e.type === 'mousemove' && intendedTarget !== this.prevIntendedTarget) {
                this.notifyWatchers('mousenter', e, intendedTarget);
                this.notifyWatchers('mouseleave', e, this.prevIntendedTarget);
                this.notifyWatchers('mouseover', e, intendedTarget);

                // mouseout
                for (let watcher of this.watchers.mouseout) {
                    watcher.$elements.each((i, el) => {
                        if (
                            this.doesElMatch(el, 'mouseover', this.prevIntendedTarget)
                            && !this.doesElMatch(el, 'mouseover', intendedTarget)
                        ) {
                            watcher.handler.call(el, e);
                        }
                    });
                }
            }

            this.prevIntendedTarget = intendedTarget;
        });
    }

    notifyWatchers(eventName, e, intendedTarget) {
        if (typeof this.watchers[eventName] === 'undefined') {
            return;
        }
        for (let watcher of this.watchers[eventName]) {
            watcher.$elements.each((i, el) => {
                if (this.doesElMatch(el, eventName, intendedTarget)) {
                    watcher.handler.call(el, e);
                }
            });
        }
    }

    doesElMatch(el, eventName, intendedTarget) {
        return el === intendedTarget
        || (mouseBubbleEvents.has(eventName) && $.contains(el, intendedTarget));
    }

    on(eventName, $elements, handler) {
        if (typeof this.watchers[eventName] === 'undefined') {
            this.watchers[eventName] = [];
        }
        this.watchers[eventName].push({$elements, handler});
        return this;
    }

}


export {
    escapeHtml,
    initCss,
    fadeGameContent,
    fadeGameContentExcept,
    unfadeGameContent,
    Mousetrap
};