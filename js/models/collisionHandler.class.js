class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkEnemyCollision();
        // Weitere Kollisionsprüfungen hier hinzufügen
    }

    checkCoinCollision() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                coin.remove(); // Münze entfernen
                this.world.level.coins.splice(index, 1); // Münze aus dem Array entfernen
                console.log('Collision with Character', coin);
            }
        });
    }

    checkBottleCollision() {
        this.world.level.bottle.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                bottle.remove(); // Münze entfernen
                this.world.level.bottle.splice(index, 1); // Münze aus dem Array entfernen
                console.log('Collision with Character', bottle);
            }
        });
    }

    checkEnemyCollision() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                this.world.character.hit();
                this.world.statusBar.setPercentage(this.world.character.energy);
                console.log('Collision with Character, energy', this.world.character.energy);
            }
        });
    }
}