class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0, 0),                      // air
        new BackgroundObject('img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('img/5_background/layers/air.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),          // 3te schicht rosa
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),         //dahinter rot
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),          // ganz vorne kaktus
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438, 0),
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(movableObject) {

        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }
        
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);

        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}
