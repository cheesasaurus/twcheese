import { ProgressMonitor } from '/twcheese/src/Models/ProgressMonitor.js';
import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { initCss, fadeGameContent, unfadeGameContent } from '/twcheese/src/Util/UI.js';


/**
 * A prompt with a progress bar.
 * It only asks confirmation and shows progress.
 * 
 * Its the responsibility of the onConfirm callback to do any loading.
 * 
 * @param {function} onConfirm - async function, will be passsed one param: a ProgressMonitor
 */
function promptLoadHauls(onConfirm) {
    $('body').append(popupHtml);
    fadeGameContent();

    let $progressBarFiller = $('#twcheese_hauls_loading_bar').find('.filler');
    let $progressText = $('#twcheese_hauls_loading_text');
    let updateProgress = function(progress, goal) {
        let percent = 100 * progress / goal;
        $progressBarFiller.css({width: `${percent}%`});
        $progressText.html(`${progress}/${goal}`);
    }
    let progressMonitor = new ProgressMonitor();
    progressMonitor.onChange((e) => updateProgress(e.progress, e.goal));

    $('#twcheese_hauls_prompt_confirm').on('click', async function(e) {
        e.preventDefault();
        document.getElementById('twcheese_servant_text').innerHTML = '<br/>May the cheese be with you.';
        $('#twcheese_servant_info_prompt').hide();
        $('#twcheese_servant_info_loading').show();
        
        await onConfirm(progressMonitor);

        $('#twcheese_showHaulsPrompt').remove();
        unfadeGameContent();
    });

    $('#twcheese_hauls_prompt_cancel').on('click', function(e) {
        e.preventDefault();
        $('#twcheese_showHaulsPrompt').remove();
        unfadeGameContent();
    });
}


let popupHtml = `
    <div id="twcheese_showHaulsPrompt" class="twcheese-popup" style="width: 500px;">
        <div style="height: 100%; width: 100%; background: url('${ImageSrc.popupBackground}')">
            <div style="background: no-repeat url('${ImageSrc.servant}');">
                <div id="twcheese_servant_text">
                    <p style="font-size: 16px;">My liege,</p>
                    <p>Dost thou wish hauls to be included on thine screen?</p>
                </div>
                <div class="quest-goal">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td id="twcheese_servant_info_prompt" class="twcheese-servant-info">
                                    <h5>Load haul information?</h5>
                                    <p>This could take a while if you have a lot of commands.</p>
                                    <div class="confirmation-buttons">
                                        <button id="twcheese_hauls_prompt_confirm" class="btn btn-confirm-yes">Yes</button>
                                        <button id="twcheese_hauls_prompt_cancel" class="btn btn-default">Cancel</button>
                                    </div>
                                </td>
                                <td id="twcheese_servant_info_loading" class="twcheese-servant-info" style="display: none;">
                                    <h5>Loading hauls</h5>
                                    <div style="margin-top: 10px;">
                                        <span id="twcheese_hauls_loading_bar">
                                            <div class="filler"></div>
                                        </span>
                                        <span id="twcheese_hauls_loading_text">999/1000</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`;


initCss(`
    #twcheese_servant_text {
        box-sizing: border-box;
        height: 100px;
        margin-left: 120px;
        padding-top: 10px;
    }
    #twcheese_hauls_loading_bar {
        display: inline-block;
        border: 2px solid black;
        background-color: darkgrey;
        width: 200px;
        height: 16px;
        vertical-align: middle;
        margin-left: 60px;
    }
    #twcheese_hauls_loading_bar .filler {
        display: block;
        width: 0;
        height: 100%;
        background-color: darkorange;
        -webkit-transition-duration: 300ms;
        -mos-transition-duration: 300ms;
        -o-transition-duration: 300ms;
        transition-duration: 300ms;
    }
    #twcheese_hauls_loading_text {
        display: inline-block;
        line-height: 16px;
        vertical-align: middle;
        font-size: 10px;
        margin: 5px;
        width: 60px;
        text-align: left;
    }
    .twcheese-servant-info {
        text-align: center;
        height: 80px;
    }
`);


export { promptLoadHauls };