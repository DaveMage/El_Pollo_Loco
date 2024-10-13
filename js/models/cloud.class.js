/**
 * Class for cloud objects that inherit from MovableObject.
 */
class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 300;

    /**
     * Constructor for creating a cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 1500;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at a constant interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(); 
         }, 1000/ 60);
    }
}