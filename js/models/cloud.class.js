class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 300;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 650;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}