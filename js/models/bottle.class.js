/**
 * Class for bottle objects that inherit from MovableObject.
 */
class Bottle extends MovableObject {
    static nextSpawn = 450;
    x = 50;
    y = 345;
    height = 80;
    width = 80;

    offset = {
        top: 15,
        bottom: 0,
        left: 35,
        right: 15,
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructor for creating a bottle.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Bottle.nextSpawn;
        Bottle.updateNextSpawn(300, 200); 
    }

    /**
     * Removes the bottle by setting the X-coordinate far outside the visible area.
     */
    remove() {
        this.x = -1000; 
    }
}