class Bottle extends MovableObject {
    static nextSpawn = 450;
    x = 50;
    y = 345;
    height = 80;
    width = 80;

    offset = {
        top: 5,
        bottom: 0,
        left: 20,
        right: 0,
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Bottle.nextSpawn;
        Bottle.nextSpawn += 300 +- Math.random() * 200; 
        // this.x = 250 + Math.random() * 1000;
    }

    remove() {
        this.x = -1000; // Flasche außerhalb des sichtbaren Bereichs verschieben
    }
}