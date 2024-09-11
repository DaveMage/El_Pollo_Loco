class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 270;
    height = 150;
    width = 100;

    
    // loadImage('img/test.png');  -  this.img.src = path;
    loadImage(path) {
        this.img = new Image();  // ist das selbe wie - this.img = document.getElementById('image')     <img id="image">
        this.img.src = path;
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Coins || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}