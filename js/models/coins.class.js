/**
 * Class for coin objects that inherit from MovableObject.
 */
class Coins extends MovableObject {
    static nextSpawn = 300; 
    x = 100;
    y = 150;
    height = 200;
    width = 200;

    offset = {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Constructor for creating a coin.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);
        this.x = Coins.nextSpawn;
        Coins.updateNextSpawn(300, 200); 
        this.animate();
    }

    /**
     * Animates the coin by playing the coin animation at a constant interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 700);
    }

    /**
     * Removes the coin by setting the X-coordinate far outside the visible area.
     */
    remove() {
        this.x = -1000; 
    }
}