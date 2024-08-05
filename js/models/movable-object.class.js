class MovableObject {
    x = 120;
    y = 270;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < 270
    }

    // loadImage('img/test.png');  -  this.img.src = path;
    loadImage(path) {
        this.img = new Image();  // ist das selbs wie - this.img = document.getElementById('image')     <img id="image">
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;  // let i = 0 % 6 - 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
            this.x -= this.speed;
            this.otherDirection = true;
    }

    jump() {
        this.speedY = 20; 
    }
}