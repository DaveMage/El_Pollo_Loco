/**
 * Class for background objects that inherit from MovableObject.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

     /**
     * Constructor for creating a background object.
     * @param {string} imagePath - Path to the image of the background object.
     * @param {number} x - X-coordinate of the background object.
     * @param {number} y - Y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

}