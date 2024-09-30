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
    
    loadImage(path) {
        this.img = new Image();  
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

    // drawFrame(ctx) {         // rectangle dev tool
    //     if (this) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '0';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
    //         ctx.stroke();
    //     }
    // }
}