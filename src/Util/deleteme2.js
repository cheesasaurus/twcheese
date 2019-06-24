

function fadeExcept(el) {
    let $el = $(el);

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
        return $('<div class="twcheese-test-fader"></div>').css(css).appendTo($('body'));
    }

    updateFaders();
    $(window).on('resize', updateFaders);
}


fadeExcept(document.getElementById('contentContainer'));