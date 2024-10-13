/**
 * Class for movable objects that inherit from DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    collisionDetected = false;
    endbossIsDeafeat = false;
    deathTime = null;
    static nextSpawn = 0;

    /**
     * Applies gravity to the object by adjusting its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this instanceof Character && !this.isAboveGround()) {
                this.y = 170;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 165   // hier ändert man wie tief pepe fällt
        }
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @param {Array} images - Array of image paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting the vertical speed.
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} movableObject - The other movable object.
     * @returns {boolean} - True if the objects are colliding.
     */
    isColliding(movableObject) {   
        return this.x + this.width -this.offset.right > movableObject.x + movableObject.offset.left && 
            this.y + this.height -this.offset.bottom > movableObject.y + movableObject.offset.top &&     
            this.x + this.offset.left < movableObject.x + movableObject.width -movableObject.offset.right && 
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom; 
    }

    /**
     * Reduces the object's energy when it is hit.
     */
    hit() {
        this.energy -= 26;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - True if the object's energy is 0.
     */
    isDead() {
        return this.energy == 0
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} - True if the object was hit within the last 2 seconds.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 2;
    }

    /**
     * Removes the object after a certain time has passed since its death.
     */
    removeAfterDeath() {
        if (this.isDead && this.deathTime && (new Date().getTime() - this.deathTime) > 1500) {
            this.remove();
        }
    }

    /**
     * Removes the object by setting its X-coordinate far outside the visible area.
     */
    remove() {
        this.x = -1000;
    }

    /**
     * Resets the next spawn position to a base value.
     */
    static resetNextSpawn() {
        this.nextSpawn = 300;
    }

    /**
     * Updates the next spawn position by adding a base value and a random range.
     * @param {number} baseValue - The base value to add.
     * @param {number} randomRange - The range for the random value to subtract.
     */
    static updateNextSpawn(baseValue, randomRange) {
        this.nextSpawn += baseValue - Math.random() * randomRange;
    }
}





















