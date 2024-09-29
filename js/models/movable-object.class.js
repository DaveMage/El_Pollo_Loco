class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    collisionDetected = false;
    endbossIsDeafeat = false;
    deathTime = null; // Neue Variable für die Todeszeit


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 270
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;  // let i = 0 % 6 - 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }

    isColliding(movableObject) {    // mit offset
        return this.x + this.width -this.offset.right > movableObject.x + movableObject.offset.left &&  // R -> L
            this.y + this.height -this.offset.bottom > movableObject.y + movableObject.offset.top &&     // top -> bottom
            this.x + this.offset.left < movableObject.x + movableObject.width -movableObject.offset.right && // L -> R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom; // bottom -> top
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 2;
    }

    removeAfterDeath() {
        if (this.isDead && this.deathTime && (new Date().getTime() - this.deathTime) > 1500) {
            this.remove();
        }
    }

    remove() {
        this.x = -1000;
    }
}





















