/**
 * Class for drawable objects that can be displayed on the canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 270;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    
    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();  
        this.img.src = path;
    }
    
    /**
     * Draws the image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the given array of paths.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Determines the index of the image based on the current percentage.
     * @returns {number} - The index of the image in the Statusbar array.
     */
        resolveImageIndex() {

            if (this.percentage == 100) {
                return 5;
            } else if (this.percentage >= 80) {
                return 4;
            } else if (this.percentage >= 60) {
                return 3;
            } else if (this.percentage >= 40) {
                return 2;
            } else if (this.percentage >= 20) {
                return 1;
            } else {
                return 0;
            }
        }
}