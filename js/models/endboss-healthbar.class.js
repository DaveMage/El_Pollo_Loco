/**
 * Class for the end boss health bar that inherits from DrawableObject.
 */
class EndbossHealthBar extends DrawableObject {

    IMAGE_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',    
    ];

    percentage = 100;

    /**
     * Constructor for creating an end boss health bar.
     */
    constructor() {
        super();    
        this.loadImages(this.IMAGE_BOSS_HEALTH);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the end boss health bar and updates the image.
     * @param {number} percentage - The new percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGE_BOSS_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the current percentage.
     * @returns {number} - The index of the image in the IMAGE_BOSS_HEALTH array.
     */
    resolveImageIndex() {

        if (this.percentage == 100) {
            return 3;
        } else if (this.percentage > 50) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
