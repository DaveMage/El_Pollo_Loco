class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        setInterval(() => {
            this.checkCoinCollision();
            this.checkBottleCollision();
            this.checkEnemyCollision();
            // Weitere Kollisionsprüfungen hier hinzufügen
        }, 25);
    }

    checkCoinCollision() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                coin.remove(); // Münze entfernen
                this.world.level.coins.splice(index, 1); // Münze aus dem Array entfert
                console.log('Collision with Character', coin);
                this.world.coin_statusbar.setPercentage(this.world.coin_statusbar.percentage += 20);

            }
        });
    }

    checkBottleCollision() {
        this.world.level.bottle.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                bottle.remove(); // Münze entfernen
                this.world.level.bottle.splice(index, 1); // Münze aus dem Array entfernen
                console.log('Collision with Character', bottle);
                this.world.bottle_statusbar.setPercentage(this.world.bottle_statusbar.percentage += 20);

            }
        });
    }

    checkEnemyCollision() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.isFalling() && this.world.character.isColliding(enemy) && this.world.character.speedY < 0 && !enemy.isDead) {
                    this.world.character.speedY = 20;
                    enemy.die(); // Huhn stirbt
                } else if(!enemy.isDead) {
                    console.log('doch getroffen')
                    this.world.character.hit();
                    this.world.statusBar.setPercentage(this.world.character.energy);
                    console.log('Collision with Character, energy', this.world.character.energy);
                    console.log(Boolean, this.isFalling())
                }
            }
        });
    }

    isFalling() {
        return this.world.character.isAboveGround();
    }
}

    // checkEnemyCollision() {      original
    //     this.world.level.enemies.forEach((enemy) => {
    //         if (this.world.character.isColliding(enemy)) {
    //             this.world.character.hit();
    //             this.world.statusBar.setPercentage(this.world.character.energy);
    //             console.log('Collision with Character, energy', this.world.character.energy);
    //         }
    //     });
    // }