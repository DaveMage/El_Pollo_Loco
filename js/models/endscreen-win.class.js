class EndscreenWin extends MovableObject { 
    IMAGES_WIN = [ 
        { src: 'img/9_intro_outro_screens/win/win_1.png', x: 160, y: 160, width: 400, height: 190 },
        { src: 'img/9_intro_outro_screens/win/win_2.png', x: 160, y: -30, width: 400, height: 600 },
    ];

    constructor() { 
        super(); 
        this.loadImage(this.IMAGES_WIN[0].src); 
        this.loadImages(this.IMAGES_WIN.map(img => img.src)); 
        this.animate(); 
    }

    animate() { 
        setInterval(() => { 
            this.playAnimation(this.IMAGES_WIN);
        }, 400); 
    }

    playAnimation(images) { 
        let i = 0; 
        setInterval(() => {
            let img = images[i]; 
            this.loadImage(img.src); 
            this.x = img.x; 
            this.y = img.y; 
            this.width = img.width; 
            this.height = img.height;
            i = (i + 1) % images.length; 
        }, 400);
    }
}