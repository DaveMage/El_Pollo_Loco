class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    walking_sound = new Audio('audio/walk.mp3');
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    
    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.Level_end_x) {
                this.x += this.speed + 3;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -599) {
                this.x -= this.speed + 3;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = 0 -this.x + 100;
        }, 1000/ 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;  // let i = 0 % 6 - 
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100);

    }

    jump() {

    }

}


// let i = this.currentImage % this.IMAGES_WALKING.length;   Modulu besagt  let i = 0 % 6
// wenn i = 1 dann 1 % 6 . simpel reicht die 1 nicht um die 6 zu füllen mann bekommt den rest dann noch als zahl dabei. 
// 1 % 6 = 0, rest 1
// 2 % 6 = 0, rest 2
// etc.
// 6 % 6 = 1, rest 0
