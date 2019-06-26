import { AbstractWidget } from '/twcheese/src/Widget/AbstractWidget.js';
import { DebuggerWidget } from '/twcheese/src/Widget/Debug/DebuggerWidget.js';
import { initCss } from '/twcheese/src/Util/UI.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';


class SidebarWidget extends AbstractWidget {
    constructor() {
        super();
        this.initStructure();
        this.watchSelf();
        this.isExpandedVert = false;
        this.activeMenuItem = null;

        this.contents = {
            bugReporter: (new DebuggerWidget()).appendTo(this.$content)
        };
        this.watchContents();
    }

    initStructure() {
        this.$el = $(this.createHtml().trim());
        this.$menuMain = this.$el.find('.menu-item.main');
        this.$mainIcon = this.$menuMain.find('.icon');
        this.$menuBug = this.$el.find('.menu-item.bug');
        this.$menuGithub = this.$el.find('.menu-item.github');
        this.$content = this.$el.find('.twcheese-sidebar-content');
    }

    createHtml() {
        return `
            <div id="twcheese-sidebar">
                <div class="twcheese-sidebar-menu">
                    <div class="menu-item main"><div class="icon"></div></div>
                    <div class="menu-item bug"><div class="icon"></div></div>
                    <a class="menu-item github"
                      href="https://github.com/cheesasaurus/twcheese/releases"
                      target="_blank"
                    ><div class="icon"></div></a>
                </div>
                <div class="twcheese-sidebar-content"></div>
            </div>
        `;
    }

    watchSelf() {
        this.$menuMain.on('click', () => this.toggleExpand());

        this.$menuBug.on('click', () => {
            if (this.$menuBug.hasClass('active')) {
                this.$menuBug.removeClass('active');
                this.activeMenuItem = null;
                this.shrinkHoriz();
            } else {
                this.contents.bugReporter.startProcessForLastUsedToolIfSensible();
                this.$menuBug.addClass('active');
                this.activeMenuItem = 'bug';
                this.expandHoriz();
            }
        });
    }

    watchContents() {
        $.each(this.contents, (key, content) => {
            $(content).on('change', () => {
                if (this.activeMenuItem) {
                    this.$el.width(this.$el[0].scrollWidth);
                }                
            })
        });
    }

    async toggleExpand() {
        let durationVert = 200;
        let durationHoriz = this.activeMenuItem ? 200 : 0;
        let durationSpin = durationVert + durationHoriz;
        this.spinMainIcon(durationSpin);
        
        if (this.isExpandedVert) {
            if (this.activeMenuItem) {
                await this.shrinkHoriz(durationHoriz);
            }
            this.shrinkVert(durationVert);
        } else {
            await this.expandVert(durationVert);
            if (this.activeMenuItem) {
                this.expandHoriz(durationHoriz);
            }
        }        
    }

    spinMainIcon(durationMs) {
        $({deg: 0}).animate({deg: 180}, {
            duration: durationMs,
            step: (angle) => {
                this.$mainIcon.css({
                    transform: 'rotate(' + angle + 'deg)'
                });
            }
        });
    }

    async expandVert(durationMs) {
        this.isExpandedVert = true;
        return new Promise((resolve, reject) => {
            let options = {
                duration: durationMs,
                complete: () => {
                    this.$menuGithub.show();
                    resolve();
                }
            };
            this.$el.animate({
                height: '100%',
                easing: 'linear'
            }, options);
        });
    }

    shrinkVert(durationMs) {
        this.$menuGithub.hide();
        this.isExpandedVert = false;
        this.$el.animate({
            height: '50px'
        }, durationMs);
    }

    expandHoriz(durationMs) {
        let options = {
            duration: durationMs,
        };
        this.$el.animate({
            width: this.$el[0].scrollWidth
        }, options);
    }

    async shrinkHoriz(durationMs) {
        return new Promise((resolve, reject) => {
            let options = {
                duration: durationMs,
                complete: resolve
            };
            this.$el.animate({
                width: '50px'
            }, options);
        });
    }


}


initCss(`
    #twcheese-sidebar {
        position: fixed;
        display: inline-block;
        z-index: 20000;
        top: 0;
        left: 0;
        height: 50px;
        max-height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        width: 50px;
        max-width: 100%;
    }

    /* menu **************************************************/

    .twcheese-sidebar-menu {
        position: relative;
        display: block;
        width: 50px;
        height: 100%;
        background-color: rgb(51, 51, 51);
    }

    .twcheese-sidebar-menu.expanded {
        height: 100%;
    }

    .twcheese-sidebar-menu .menu-item {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    .twcheese-sidebar-menu .menu-item .icon {
        position: absolute;
        box-sizing: border-box;
        position: absolute;
        width: 50px;
        height: 50px;
        
        background-size: 36px 36px;
        background-repeat: no-repeat;
        background-position: center;
    }
    

    .twcheese-sidebar-menu .menu-item.main {
        background-color: darkOrange;
    }

    .twcheese-sidebar-menu .menu-item.main .icon {
        background-image: url('${ImageSrc.sidebarMain}');
    }
    .twcheese-sidebar-menu .menu-item.main:hover .icon {
        -webkit-filter: brightness(2);
        filter: brightness(2);
    }

    .twcheese-sidebar-menu .menu-item.bug .icon {
        background-image: url('${ImageSrc.sidebarBug}');
        -webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-sidebar-menu .menu-item.github {
        position: absolute;
        display: none;
        bottom: 0;
        margin-top: 50px;
    }

    .twcheese-sidebar-menu .menu-item.github .icon {
        background-image: url('${ImageSrc.sidebarGithub}');
        -webkit-filter: brightness(0.7);
        filter: brightness(0.7);
    }

    .twcheese-sidebar-menu .menu-item:hover .icon,
    .twcheese-sidebar-menu .menu-item.active .icon {
        -webkit-filter: brightness(1);
        filter: brightness(1);
    }

    /* content  **************************************************/

    .twcheese-sidebar-content {
        position: absolute;
        display: block;
        left: 50px;
        height: 100%;
        top: 0;
        background-color: rgb(37, 37, 37);
        color: rgb(187, 187, 187);
    }


`);


export { SidebarWidget };