let canvas;
let world; 
let keyboard = new Keyboard();
let mainTheme = document.getElementById('mainAudio');
// let fullscreen = document.getElementById('fullscreen');




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
    let game = document.getElementById('start');
    game.classList.add("dNone");
    let canvas = document.getElementById('canvas');
    canvas.classList.add("dBlock");
    initLevel();
    world = new World(canvas, keyboard);
    checkAudioStatus();
}

function closeImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.add('dNone');
}

function openImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.remove('dNone');
}

function reload() {
    window.location.reload();
}

function toggleSound() {
    let img = document.getElementById('gameSound');
    let startScreen = document.getElementById('start');

    if (img.src.includes('/img/10_menu_buttons/sound_on.png')) {
        img.src = '/img/10_menu_buttons/sound_off.png';
        stopAudio();
    } else {
        img.src ='/img/10_menu_buttons/sound_on.png';
        if (startScreen.classList.contains('dNone')) {
            playAudio();
        }
    }
}

function checkAudioStatus() {
    let audio = document.getElementById('gameSound');
    if (audio.src.includes('/img/10_menu_buttons/sound_on.png')) {
        playAudio();
    }
}

function playAudio() {
    mainTheme.play();
}

function stopAudio() {
    mainTheme.pause();
}


  



//   function exitFullscreen() {
//     if(document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if(document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   }
  
//   exitFullscreen();


// const button = document.getElementById("startButton");
// const hoverSound = document.getElementById("hoverSound");

// button.addEventListener("mouseenter", () => {
//     hoverSound.currentTime = 0; // Startet den Sound von Anfang an
//     hoverSound.play();
// });