class Coins extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);
        this.x = 100 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 700);
    }

    remove() {
        this.x = -1000; // Münze außerhalb des sichtbaren Bereichs verschieben
    }
}