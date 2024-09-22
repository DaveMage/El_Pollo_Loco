class CollisionHandler {
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
                // Weitere Kollisionsprüfungen hier hinzufügen
            }
        }, 25);
    }

    checkCoinCollision() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                coin.remove();
                this.world.level.coins.splice(index, 1);
                console.log('Collision with Character', coin);
                this.world.coin_statusbar.setPercentage(this.world.coin_statusbar.percentage += 20);
            }
        });
    }

    checkBottleCollision() {
        this.world.level.bottle.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                bottle.remove();
                this.world.level.bottle.splice(index, 1);
                console.log('Collision with Character', bottle);
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
                    this.hitTimeout();
                } else if (!enemy.isDead) {
                    this.world.character.hit();
                    this.world.statusBar.setPercentage(this.world.character.energy);
                    console.log('Collision with Character, energy', this.world.character.energy);
                    this.hitTimeout();
                }
            }
        });
    }

    isFalling() {
        return this.world.character.isAboveGround();
    }

    bottleColliding() {     // evtl auf endboss ummünzen
        this.world.level.enemies.forEach((enemy) => {
            for (let i = 0; i < this.world.throwableObjects.length; i++) {
                let bottle = this.world.throwableObjects[i];

                if (enemy.isColliding(bottle)) {
                    let collisionX = bottle.x;
                    let collisionY = bottle.y;
                    bottle.bottleSplash(collisionX, collisionY);
                    enemy.energy -= 41;
                    console.log('Getroffen, energy', enemy.energy);
                    this.world.endboss_healthbar.setPercentage(enemy.energy);
                    enemy.playHurtAnimation(); // Hier wird die Hurt-Animation abgespielt
                    this.hitTimeout(); 
                }
            }
        });
    }

    hitTimeout() {
        this.collisionDetected = true;
        setTimeout(() => {
            this.collisionDetected = false;
        }, 500); 
    }
}


