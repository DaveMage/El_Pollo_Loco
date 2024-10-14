/**
 * Class representing the game world.
 */
class World {
    character = new Character();
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
    isNoCoinsMessageVisible = false;

    /**
     * Constructor for creating the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);
        this.character.world = this;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character and end boss.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Updates the coin status bar based on the collected coins.
     */
    updateCoinStatusBar() {
        let collectedCoins = this.level.totalCoins - this.level.coins.length;
        let percentage = (collectedCoins / this.level.totalCoins) * 100;
        this.coin_statusbar.setPercentage(percentage);
    }

    /**
     * Runs the game loop, checking for collisions and other events.
     */
    run() {
        setInterval(() => {
            this.collisionHandler.checkCollisions();
            this.checkThrowObjects();
            this.checkFirstContact();
        }, 200);
    }

    /**
     * Checks if the character has made first contact with the end boss.
     */
    checkFirstContact() {
        if (this.character.x > 1200) {
            bossFirstSeen = true;
        }
    }

    /**
    * Checks if the character can throw objects and handles the throwing logic.
    */
    checkThrowObjects() {
        if (!this.canThrow) return;

        if (this.keyboard.D && this.bottle_statusbar.percentage > 0) {
            if (this.coin_statusbar.percentage > 0) {
                this.throwBottle();
            } else {
                this.showNoCoinsMessage();
            }
        }
    }

    /**
     * Handles the logic for throwing a bottle.
     */
    throwBottle() {
        let bottle;
        if (this.character.direction === 'right') {
            bottle = new ThrowableObject(this.character.x + 20, this.character.y + 20, 'right');
        } else {
            bottle = new ThrowableObject(this.character.x - 20, this.character.y + 20, 'left');
        }
        this.playThrowSound();
        this.updateBottleStatusBar(bottle);
        this.canThrow = false;
        setTimeout(() => {
            this.canThrow = true;
        }, 1000);
    }

    /**
     * Updates the bottle status bar by adding a bottle to the throwable objects,
     * decreasing the bottle and coin status bar percentages, and disabling throwing.
     */
    updateBottleStatusBar(bottle) {
        this.throwableObjects.push(bottle);
        this.bottle_statusbar.setPercentage(this.bottle_statusbar.percentage -= 20);
        this.coin_statusbar.setPercentage(this.coin_statusbar.percentage -= 20);
        this.canThrow = false;
    }

    /**
     * Plays the throwing sound if not muted.
     */
    playThrowSound() {
        if (!mute) {
            this.throw_audio.play();
        }
    }

    /**
     * Draws the game world and its objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBgAndCollectables();
        this.ctx.translate(-this.camera_x, 0);
        this.checkEndbossFirstContact();
        this.addStatusBars();
        this.checkEndbossDefeat();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Checks if the character has made first contact with the end boss and displays the end boss health bar.
    */
    checkEndbossFirstContact() {
        if (this.character.x > 1200 || this.firstContact) {
            this.addToMap(this.endboss_healthbar);
            this.firstContact = true;
        }
    }

    /**
     * Checks if the end boss is defeated and displays the win screen if true.
     */
    checkEndbossDefeat() {
        if (this.level.enemies[0].defeat) {
            this.addToMap(this.endScreenWin);
        }
    }

    /**
     * Adds the status bars (health, coin, and bottle) to the map.
    */
    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coin_statusbar);
        this.addToMap(this.bottle_statusbar);
    }

    /**
    * Adds background objects, collectables, and enemies to the map.
    */
    addBgAndCollectables() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - Array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {MovableObject} movableObject - The object to add to the map.
     */
    addToMap(movableObject) {

        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the image of an object horizontally.
     * @param {MovableObject} movableObject - The object to flip.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Flips the image of an object back to its original orientation.
     * @param {MovableObject} movableObject - The object to flip back.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Shows a message indicating that there are no coins left.
     */
    showNoCoinsMessage() {
        if (this.isNoCoinsMessageVisible) return;

        this.isNoCoinsMessageVisible = true;
        const messageElement = document.getElementById('noCoinsMessage');
        messageElement.classList.remove('dNone');
        setTimeout(() => {
            messageElement.classList.add('dNone');
            this.isNoCoinsMessageVisible = false;
        }, 2000);
    }
}