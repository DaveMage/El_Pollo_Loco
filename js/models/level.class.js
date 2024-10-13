/**
 * Class representing a game level.
 */
class Level {
    enemies;
    clouds;
    coins;
    bottle;
    backgroundObjects;

    Level_end_x = 2250;

    /**
     * Constructor for creating a level.
     * @param {Array} enemies - Array of enemy objects.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} coins - Array of coin objects.
     * @param {Array} bottle - Array of bottle objects.
     * @param {Array} backgroundObjects - Array of background objects.
     */
    constructor(enemies, clouds, coins, bottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;

    }
}