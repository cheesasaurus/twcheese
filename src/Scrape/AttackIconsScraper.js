import { AttackIcons } from '/twcheese/src/Models/AttackIcons.js';


class AttackIconsScraper {
    /**
     * @param {HTMLImageElement} imgElements
     * @return {AttackIcons}
     */
    scrapeIcons(imgElements) {
        let icons = new AttackIcons();

        for (let img of imgElements) {
            if (img.src.includes('command/farm.png')) {
                icons.setSentViaFa();
            }
            else if (img.src.includes('command/snob.png')) {
                icons.setContainsSnob();
            }
            else if (img.src.includes('command/spy.png')) {
                icons.setContainsSpy();
            }
            else if (img.src.includes('command/knight.png')) {
                icons.setContainsKnight();
            }
            else if (img.src.includes('command/attack_small.png')) {
                icons.setSizeSmall();
            }
            else if (img.src.includes('command/attack_medium.png')) {
                icons.setSizeMedium();
            }
            else if (img.src.includes('command/attack_large.png')) {
                icons.setSizeLarge();
            }
        }

        return icons;
    }
}

export { AttackIconsScraper };