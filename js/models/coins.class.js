class Coins extends MovableObject {
    static nextSpawn = 300; 
    x = 100;
    y = 150;
    height = 200;
    width = 200;

    offset = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60,
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);
        this.x = Coins.nextSpawn;
        Coins.nextSpawn += 300 +- Math.random() * 200; 
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 700);
    }

    remove() {
        this.x = -1000; 
    }
}