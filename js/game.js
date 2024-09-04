let canvas;
let world; 
let keyboard = new Keyboard();




function init() {
    canvas = document.getElementById('canvas');
}


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})

function startGame() {
    let game = document.getElementById('startLayer');
    game.classList.add("dNone");
    let canvas = document.getElementById('canvas');
    canvas.classList.add("dBlock");
    initLevel();
    world = new World(canvas, keyboard);
}

function closeImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.add('dNone');
}

function openImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.remove('dNone');
}



// const button = document.getElementById("startButton");
// const hoverSound = document.getElementById("hoverSound");

// button.addEventListener("mouseenter", () => {
//     hoverSound.currentTime = 0; // Startet den Sound von Anfang an
//     hoverSound.play();
// });