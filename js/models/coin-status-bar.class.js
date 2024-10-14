/**
 * Class for the coin status bar that inherits from DrawableObject.
 */
class CoinStatusBar extends DrawableObject {
    
    IMAGES_STATUSBAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percentage = 100;

    /**
     * Constructor for creating a coin status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COINS);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0); 
    }

    /**
     * Sets the percentage of the coin status bar and updates the image.
     * @param {number} percentage - The new percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}