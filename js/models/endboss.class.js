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
        top: 70,
        bottom: 0,
        left: 30,
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
        this.x = 2100;      
        this.speed = 2.5;
        this.j = 0;
        this.animate();
    }

    /**
    * Animates the end boss by handling its behavior and movement.
    */
    animate() {
        let j = 0;
        let i = 0;
        setInterval(() => {            
            if (bossFirstSeen) {
                this.handleBossAnimation(i, j);
                i++;
                if (i >= 14) {
                    i = 0; 
                }
            }
        }, 250);
    
        setInterval(() => {
            if (this.isWalking) {
                this.moveLeft();
            }
        }, 1000 / 170);
    }
    
    /**
     * Handles the boss animation based on the current index and energy.
     * @param {number} i - The current index in the animation sequence.
     * @param {number} j - The current index in the defeat sequence.
     */
    handleBossAnimation(i) {
        if (this.energy > 0) {
            this.handleBossEnergy(i);
        } else {
            this.handleBossDefeat();
        }
    }
    
    /**
     * Handles the boss animation when the boss has energy.
     * @param {number} i - The current index in the animation sequence.
     */
    handleBossEnergy(i) {
        if (i < 15) {
            this.playBossAnimation(i);
        } else {
            i = 0;
        }
    }
    
    /**
     * Plays the appropriate boss animation based on the current index.
     * @param {number} i - The current index in the animation sequence.
     */
    playBossAnimation(i) {
        if (this.isHit) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (i < 3) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (i > 3 && i < 8) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (i > 8 && i < 12) {
            this.playAnimation(this.IMAGES_WALK);
            this.isWalking = true;
        } else if (i > 12) {
            i = 0;
            this.isWalking = false;
        }
    }
    
    /**
     * Handles the boss animation when the boss is defeated.
     */
    handleBossDefeat() {        
        if (this.j > 10) {
            showEndScreen();
            clearAllIntervals();
        } else if (this.j > 2) {
            this.defeat = true;
            this.isWalking = false;
            this.j++;
        } else {
            this.playAnimation(this.IMAGES_DEAD);
            this.j++;
        }
    }
}