class CollisionHandler {
    hit_audio = new Audio('audio/hurt.mp3');
    bottle_break = new Audio('audio/bottle_break.mp3');
    collecting_sound = new Audio('audio/collected_item.mp3');

    constructor(world) {
        this.world = world;
        this.collisionDetected = false;
    }

    checkCollisions() {
        setInterval(() => {
            if (!this.collisionDetected) {
                this.checkCoinCollision();
                this.checkBottleCollision();
                this.checkEnemyCollision();
                this.bottleColliding();
            }
        }, 25);
    }

    playCollectingSound() {
        if (!mute) {
           this.collecting_sound.play();
        }
    }

    playHitSound() {
        if (!mute) {
            this.hit_audio.play();
        }
    }

    checkCoinCollision() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                coin.remove();
                this.playCollectingSound();
                this.world.level.coins.splice(index, 1);
                this.world.coin_statusbar.setPercentage(this.world.coin_statusbar.percentage += 20);
            }
        });
    }

    checkBottleCollision() {
        this.world.level.bottle.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                bottle.remove();
                this.playCollectingSound();
                this.world.level.bottle.splice(index, 1);
                this.world.bottle_statusbar.setPercentage(this.world.bottle_statusbar.percentage += 20);
            }
        });
    }

    checkEnemyCollision() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && !this.collisionDetected) {
                if (this.isFalling() && this.world.character.isColliding(enemy) && this.world.character.speedY < 0 && !enemy.isDead) {
                    this.world.character.speedY = 20;
                    enemy.die();
                    this.world.character.playJumpSound();                  
                    this.hitTimeout();
                } else if (!enemy.isDead) {
                    this.world.character.speedY = 10;
                    this.world.character.speedX = this.world.character.direction === 'right' ? -20 : 20;
                    this.world.character.hit();
                    this.playHitSound();
                    this.world.statusBar.setPercentage(this.world.character.energy);
                    this.hitTimeout();
                }
            }
        });
    }

    isFalling() {
        return this.world.character.isAboveGround();
    }

    bottleColliding() {     
        this.world.level.enemies.forEach((enemy) => {
            for (let i = 0; i < this.world.throwableObjects.length; i++) {
                let bottle = this.world.throwableObjects[i];

                if (enemy.isColliding(bottle)) {
                    let collisionX = bottle.x;
                    let collisionY = bottle.y;
                    bottle.bottleSplash(collisionX, collisionY);
                    this.bottleBreakSound();
                    enemy.energy -= 41;
                    this.world.endboss_healthbar.setPercentage(enemy.energy);
                    enemy.isHit = true;
                    this.hitTimeout(); 
                    setTimeout(() => {
                        enemy.isHit = false;
                    }, 2000);
                }
            }
        });
    }

    bottleBreakSound() {
        if (!mute) {
            this.bottle_break.play();
        }
    }

    hitTimeout() {
        this.collisionDetected = true;
        setTimeout(() => {
            this.collisionDetected = false;
        }, 500); 
    }
}


