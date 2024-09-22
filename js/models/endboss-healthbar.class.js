class EndbossHealthBar extends DrawableObject {

    IMAGE_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',    // 3
    ];

    percentage = 100;



    constructor() {
        super();    // hiermit werden die Methoden vom übergeordneten objeckt initialisiert.
        this.loadImages(this.IMAGE_BOSS_HEALTH);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGE_BOSS_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {

        if (this.percentage == 100) {
            return 3;
        } else if (this.percentage > 50) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
