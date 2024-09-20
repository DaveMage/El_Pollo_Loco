class ThrowableObject extends MovableObject {

    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 20,
    };

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 100;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}