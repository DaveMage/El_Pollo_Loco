/**
 * Class for the end boss that inherits from MovableObject.
 */
class Endboss extends MovableObject {
    height = 300;
    width = 200;
    y = 140;
    hitCount = 3;
    isHit = false;
    toggleAnimation = false;
    firstContact = true;
    isWalking = false;
    isDead = false;
    defeat = false;

    offset = {
        top: -100,
        bottom: 0,
        left: 0,
        right: 0,
    };

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Constructor for creating an end boss.
     * @param {object} world - The game world.
     */
    constructor(world) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.world = world; 
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;  
        this.speed = 2.5;
        this.animate();
    }

    /**
     * Animates the end boss by setting up intervals for different animations and movements.
     */
    animate() {
        let j = 0
        let i = 0
        setInterval(() => {
            if (bossFirstSeen) {
            if (this.energy > 0) {
                if (this.isHit) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (i < 10) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (i > 10 && i < 20) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (i > 20 && i < 25) {
                    this.playAnimation(this.IMAGES_WALK);
                    this.isWalking = true;
                } else if (i > 25) {
                    i = 0;
                    this.isWalking = false
                }
            } else if (j > 10) {
                showEndScreen();
                clearAllIntervals();
            } else if (j > 2) {
                this.defeat = true;
                j++
            } else {
                this.playAnimation(this.IMAGES_DEAD);
                j++
            }
            i++
        }
        }, 250);

        setInterval(() => {
            if (this.isWalking) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

}