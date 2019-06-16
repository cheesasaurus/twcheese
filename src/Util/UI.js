let ImageSrc = {
    plus: 'graphic/plus.png',
    minus: 'graphic/minus.png',
    timber: 'graphic/holz.png',
    clay: 'graphic/lehm.png',
    iron: 'graphic/eisen.png',
    popupBackground: 'graphic/popup/content_background.png',
    popupBorder: 'graphic/popup/border.png',
    servant: 'graphic/paladin_new.png',
    loadingSpinner: 'graphic/throbber.gif'
};


function fadeGameContent () {
    $('body').append('<div id="fader" class="fader">');
};

function unfadeGameContent() {
    $('#fader').remove();
}


////// css //////

let cssInitd = [];

function initCss(css) {
    if (cssInitd.includes(css)) {
        return;
    }
    $(`<style>${css}</style>`).appendTo('head');
    cssInitd.push(css);
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


export { ImageSrc, initCss, fadeGameContent, unfadeGameContent };