/**
 * Class for small chicken enemies that inherit from MovableObject.
 */
class ChickenSmall extends MovableObject {
    static nextSpawn = 900; 
    y = 370;
    height = 50; 
    width = 50;
    isDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructor for creating a small chicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = ChickenSmall.nextSpawn;
        ChickenSmall.nextSpawn += 700 +- Math.random() * 700; 
        this.x = 700 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animates the small chicken by setting up intervals for movement and animation.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            let i = 0;
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.removeAfterDeath(); 
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    /**
     * Marks the small chicken as dead and records the death time.
     */
    die() {
        this.isDead = true;
        this.deathTime = new Date().getTime(); 
    }
}