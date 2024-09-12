class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusBar = new StatusBar();
    coin_statusbar = new CoinStatusBar();
    bottle_statusbar = new BottleStatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
            this.checkCoinCollision();
            this.checkBottleCollision();
        }, 200);
    }

    checkBottleCollision() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                console.log('Collision with Character' , bottle);
            }
        })
    }

    checkCoinCollision() {
        this.level.coins.forEach((coins) => {
            if(this.character.isColliding(coins)){
                console.log('Collision with Character ', coins);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 20);
            this.throwableObjects.push(bottle)
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
                console.log('Collision with Character, energy', this.character.energy)
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);  // back
        // ------------- space for fix objects -----------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coin_statusbar);
        this.addToMap(this.bottle_statusbar);         
        this.ctx.translate(this.camera_x, 0);   // forwards
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);


        this.ctx.translate(-this.camera_x, 0);
        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {     // in dieser function erkennt er das this. nicht mehr. deswegen wird es vorher mit let self definiert.
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(movableObject) {

        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);


        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}
