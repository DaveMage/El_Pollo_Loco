class ThrowableObject extends MovableObject {

    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 20,
    };

    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 100;
        this.throw()
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            this.playAnimation(this.IMAGES_BOTTLE_THROW)
        }, 25);
    }

    remove() {
        this.x = -1000; 
    }

    bottleSplash(x, y) {       
        this.x = x;
        this.y = y;
        this.speedY = 0; 
        this.speedX = 0; 
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        setTimeout(() => {
            this.remove();
        }, 25); 
    }
}