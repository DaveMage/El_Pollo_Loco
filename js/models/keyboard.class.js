/**
 * Class for handling keyboard input.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;
    D = false;

    /**
     * Constructor for creating a Keyboard instance.
     */
    constructor() {
        this.reset();
    }

    /**
     * Resets all key flags to false.
     */
    reset() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.THROW = false;
        this.D = false;
    }
}