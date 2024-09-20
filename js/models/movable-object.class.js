class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // throable objects should always fall
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

    // isColliding(movableObject) {
    //     return this.x + this.width > movableObject.x &&
    //         this.y + this.height > movableObject.y &&
    //         this.x < movableObject.x &&
    //         this.y < movableObject.y + movableObject.height;
    // }

    isColliding(movableObject) {    // mit offset
        return this.x + this.width -this.offset.right > movableObject.x + movableObject.offset.left &&  // R -> L
            this.y + this.height -this.offset.bottom > movableObject.y + movableObject.offset.top &&     // top -> bottom
            this.x + this.offset.left < movableObject.x + movableObject.width -movableObject.offset.right && // L -> R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom; // bottom -> top
    }

    // isColliding(obj) {       // tobi
    //     return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
    //         this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
    //         this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
    //         this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    // }


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



    // killEnemy(enemy) {       //test
    //     let index = this.world.level.enemies.indexOf(enemy);
    //     this.enemyDies(enemy);

    //     setTimeout(() => {
    //         if (index > -1) {
    //             this.world.level.enemies.splice(index, 1);
    //         }
    //     }, 400);
    // }


    // enemyDies(enemy) {   //test
    //     enemy.isDead = true;
    //     enemy.animate();
    //     enemy.speed = 0;
    //     if (enemy.type == 'Chicken') {
    //         this.world.audioHandler.toggleSound(this.chicken_sound);
    //         this.world.audioHandler.toggleVolume(this.chicken_sound, 0.2);
    //     } else if (enemy.type == 'SmallChicken') {
    //         this.world.audioHandler.toggleSound(this.small_chicken_sound);
    //         this.world.audioHandler.toggleVolume(this.small_chicken_sound, 0.2);
    //     }
    // }


}




// isColliding(movableObject) {
//     return (this.X + this.width) >= movableObject.X && this.X <= (movableObject.X + movableObject.width) &&
//         (this.Y + this.offsetY + this.height) >= movableObject.Y &&
//         (this.Y + this.offsetY) <= (movableObject.Y + movableObject.height) &&
//         movableObject.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

// }

















//     // Bessere Formel zur Kollisionsberechnung (Genauer)
//     isColliding(obj) {
//         return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
//             (this.Y + this.offsetY + this.height) >= obj.Y &&
//             (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
//             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

//     }