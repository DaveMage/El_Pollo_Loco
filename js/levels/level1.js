let level1;


function initLevel() {

    level1 = new Level(
        [
            new Endboss(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
        ], [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ], [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ], [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ], [
        new BackgroundObject('img/5_background/layers/air.png', -718, 0),
        new BackgroundObject('img/5_background/layers/air.png', 0, 0),                     
        new BackgroundObject('img/5_background/layers/air.png', 718, 0),
        new BackgroundObject('img/5_background/layers/air.png', 1436, 0),
        new BackgroundObject('img/5_background/layers/air.png', 718 * 3 - 1, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),        
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),        
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),          
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3 - 1, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3 - 1, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3 - 1, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 0),
    ],[
        new EndscreenWin
    ],
    );

}
