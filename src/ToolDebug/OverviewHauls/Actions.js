import { DebugEvents } from '/twcheese/src/Models/Debug/DebugEvents.js';
import { fadeGameContentExcept, unfadeGameContent, Mousetrap } from '/twcheese/src/Util/UI.js';
import { requestDocument } from '/twcheese/src/Util/Network.js';
import { scrapeCommand, scrapeCommandUrlFromRow } from '/twcheese/src/Scrape/command.js';


let debugActions = {

    trySelectCommandFromTable: {
        async execute(na, ctrl) {
            let $commandsTable = $('#commands_table');
            let $commandRows = $commandsTable.children().children();

            fadeGameContentExcept($commandsTable);
            $(document).scrollTop($commandsTable.offset().top);
            
            let mousetrap = (new Mousetrap()).spawn()
                .on('mouseover', $commandRows, function() {
                    $(this).css({outline: '3px solid magenta'});
                })
                .on('mouseout', $commandRows, function() {
                    $(this).css({outline: 'none'})
                });

            let cleanup = function() {
                unfadeGameContent();
                mousetrap.destruct();
                $commandRows.css({outline: 'none'});
            };

            $(ctrl).on(DebugEvents.USER_REJECTED, function() {
                cleanup();
            });

            return new Promise(function(resolve, reject) {
                let handleRowSelected = function() {
                    cleanup();
                    try {
                        resolve(scrapeCommandUrlFromRow(this));
                    } catch (err) {
                        reject(err);
                    }
                }
                mousetrap.on('click', $commandRows, handleRowSelected);
            });
        }
    },

    tryScrapeCommandScreen: {
        async execute(commandUrl) {
            let commandDoc = await requestDocument(commandUrl);
            return {
                document: commandDoc,
                command: scrapeCommand(commandDoc)
            };
        },
        async summarizeResult(r) {
            let document = r.document;
            if (document instanceof window.HTMLDocument) {
                document = document.documentElement.outerHTML;
            }
            return {
                document: document,
                command: r.command
            }
        }
    }

}

export { debugActions };