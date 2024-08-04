class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;

    // loadImage('img/test.png');  -  this.img.src = path;
    loadImage(path) {
        this.img = new Image();  // ist das selbs wie - this.img = document.getElementById('image')     <img id="image">
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right')
    }

    moveLeft() {

    }
}