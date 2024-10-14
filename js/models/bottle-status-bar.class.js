/**
 * Class for the bottle status bar that inherits from DrawableObject.
 */
class BottleStatusBar extends DrawableObject {

    IMAGES_STATUSBAR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    percentage = 100;

    /**
     * Constructor for creating a bottle status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0); 
    }

    /**
     * Sets the percentage of the bottle status bar and updates the image.
     * @param {number} percentage - The new percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}