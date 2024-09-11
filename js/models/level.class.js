class Level {
    enemies;
    clouds;
    coins;
    bottle;
    backgroundObjects;
    Level_end_x = 2250;


    constructor(enemies, clouds, coins, bottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;
    }
}