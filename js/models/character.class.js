class Character extends MovableObject {
    y = 50;
    speed = 3;
    speedX = 0;
    height = 250;
    collectedCoins = 0;
    collectedBottle = 0;
    characterIntervalIds = [];
    idleTimeout = 5000;
    lastActionTime = Date.now();
    direction = 'right';

    offset = {
        top: 120,
        bottom: 10,
        left: 20,
        right: 23,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;

    walking_sound = new Audio('audio/walk.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    /**
     * Constructor for creating a character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the character by setting up intervals for movement and animation.
     */
    animate() {
        let interval1 = setInterval(() => {
            this.characterMoveKit();
        }, 1000 / 60);

        let interval2 = setInterval(() => {
            this.characterCollisionKit();
        }, 100);
        this.characterIntervalIds.push(interval1);
        this.characterIntervalIds.push(interval2);

        setInterval(() => {
            this.characterStopActing()
        }, 100);
    }

    /**
     * Moves the character to the right and updates relevant properties.
    */
    characerMovesRight() {
        this.moveRight();
        this.direction = 'right';
        this.otherDirection = false;
        this.playWalkingSound();
        this.resetIdleTimer();
    }

    /**
     * Moves the character to the left and updates relevant properties.
    */
    characerMovesLeft() {
        this.moveLeft();
        this.direction = 'left';
        this.otherDirection = true;
        this.playWalkingSound();
        this.resetIdleTimer();
    }

    /**
     * Applies a knockback effect to the character by adjusting its position and speed.
     */
    characterKnockBack() {
        this.x += this.speedX;
        this.reduceSpeedX();
        this.world.camera_x = 0 - this.x + 100;
    }

    /**
     * Handles the character's movement and actions based on keyboard input.
    */
    characterMoveKit() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.Level_end_x) {
            this.characerMovesRight();
        }
        if (this.world.keyboard.LEFT && this.x > -620) {
            this.characerMovesLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.resetIdleTimer();
        }
        this.characterKnockBack();
    }

    /**
    * Handles the character's collision states and plays the appropriate animations.
    */
    characterCollisionKit() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            showLoseScreen()
            this.clearAllIntervals()
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.characterIdleanimation();
        }
    }

    /**
    * Handles the character's idle animation based on keyboard input and idle time.
    */
    characterIdleanimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (Date.now() - this.lastActionTime > this.idleTimeout) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Resets the idle timer to the current time.
     */
    resetIdleTimer() {
        this.lastActionTime = Date.now();
    }

    /**
     * Makes the character jump by setting the vertical speed.
     */
    jump() {
        this.speedY = 20;
        this.playJumpSound();
        this.resetIdleTimer();
    }

    /**
     * Stops the character's actions if the first enemy is defeated.
     */
    characterStopActing() {
        if (this.world.level.enemies[0].defeat) {
            for (let i = 0; i < this.characterIntervalIds.length; i++) {
                const id = this.characterIntervalIds[i];
                clearInterval(id);
                this.walking_sound.pause();
                this.walking_sound.currentTime = 0;
            }
        }
    }

    /**
     * Clears all intervals and stops the walking sound.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
    }

    /**
     * Plays the walking sound if not muted.
     */
    playWalkingSound() {
        if (!mute) {
            this.walking_sound.play();
        }
    }

    /**
     * Plays the jump sound if not muted.
     */
    playJumpSound() {
        if (!mute) {
            this.jump_sound.play();
        }
    }

    /**
     * Reduces the horizontal speed gradually to simulate friction.
     */
    reduceSpeedX() {
        if (this.speedX > 0) {
            this.speedX -= 1;
        } else if (this.speedX < 0) {
            this.speedX += 1;
        }
        if (Math.abs(this.speedX) < 1) {
            this.speedX = 0;
        }
    }

    /**
     * Handles the jump action for mobile controls.
     */
    mobileJump() {
        if (!this.isAboveGround()) {
            this.jump();
        }
    }
}