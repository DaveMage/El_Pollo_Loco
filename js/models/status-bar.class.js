/**
 * Class for the status bar that inherits from DrawableObject.
 */
class StatusBar extends DrawableObject {

    IMAGES_STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', 
    ];

    percentage = 100;

    /**
     * Constructor for creating a status bar.
     */
    constructor() {
        super();    
        this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the health status bar and updates the image.
     * @param {number} percentage - The new percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}