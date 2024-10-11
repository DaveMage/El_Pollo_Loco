class World {
    character = new Character();
    // endboss; // Endboss wird später initialisiert
    endboss = new Endboss(this);
    level = level1;
    canvas;
    ctx;
    keyboard;
    throw_audio = new Audio('audio/throw.mp3');
    camera_x = -100;
    statusBar = new StatusBar();
    coin_statusbar = new CoinStatusBar();
    bottle_statusbar = new BottleStatusBar();
    endboss_healthbar = new EndbossHealthBar();
    endScreenWin = new EndscreenWin();
    throwableObjects = [];
    collisionHandler;
    canThrow = true;
    firstContact = false;
    // characterPassedThreshold = false; // Neuer boolescher Wert

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);
        
        this.character.world = this; // Setze die world-Eigenschaft des Charakters
        // this.endboss = new Endboss(this); // Übergibt die world-Instanz an den Endboss
        this.draw();

        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    updateCoinStatusBar() {
        let collectedCoins = this.level.totalCoins - this.level.coins.length;
        let percentage = (collectedCoins / this.level.totalCoins) * 100;
        this.coin_statusbar.setPercentage(percentage);
    }

    // checkCharacterPosition() {
    //     if (this.character.x > 1500 || this.characterPassedThreshold) { // Passe den Wert 500 nach Bedarf an
    //         this.characterPassedThreshold = true;
    //     }
    // }

    run() {
        setInterval(() => {
            this.collisionHandler.checkCollisions();
            this.checkThrowObjects();
            this.checkFirstContact();
        }, 200);
    }

    checkFirstContact() {
        if (this.character.x > 2000) {
            bossFirstSeen = true;    
        }
        console.log('Boss first seen is', bossFirstSeen);
    }

    checkThrowObjects() {
        if (!this.canThrow) return;

        if (this.keyboard.D && this.bottle_statusbar.percentage > 0 && this.coin_statusbar.percentage > 0) {
            let bottle;
            if (this.character.direction === 'right') {
                bottle = new ThrowableObject(this.character.x + 20, this.character.y + 20, 'right');
                this.playThrowSound();
            } else {
                bottle = new ThrowableObject(this.character.x - 20, this.character.y + 20, 'left');
                this.playThrowSound();
            }
            this.throwableObjects.push(bottle);
            this.bottle_statusbar.setPercentage(this.bottle_statusbar.percentage -= 20);
            this.coin_statusbar.setPercentage(this.coin_statusbar.percentage -= 20);

            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 1000);
        }
    }

    playThrowSound() {
        if (!mute) {
            this.throw_audio.play();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        if (this.character.x > 2000 || this.firstContact) {
            this.addToMap(this.endboss_healthbar);
            this.firstContact = true;
        }
        this.addToMap(this.statusBar);
        this.addToMap(this.coin_statusbar);
        this.addToMap(this.bottle_statusbar);
        if (this.level.enemies[0].defeat) {
            this.addToMap(this.endScreenWin);
        }

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
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
