let canvas;
let world;
let keyboard = new Keyboard();
let mainTheme = document.getElementById('mainAudio');
let winAudio = document.getElementById('winAudio');
let loseAudio = document.getElementById('loseAudio');
mute = false;

function init() {
    canvas = document.getElementById('canvas');
    lowerVolume();
    activateTouchBtn();
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

function activateTouchBtn() {
    document.getElementById('btnLeft').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', () => {
        keyboard.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', () => {
        keyboard.D = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

function startGame() {
    let endscreen = document.getElementById('endScreenWin')
    let game = document.getElementById('start');
    endscreen.classList.add("dNone")
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
    let endscreen = document.getElementById('endScreenWin');
    let endscreenLose = document.getElementById('endScreenLose');
    let game = document.getElementById('start');
    endscreen.classList.add("dNone");
    endscreenLose.classList.add("dNone");
    game.classList.remove("dNone");
    let canvas = document.getElementById('canvas');
    canvas.classList.remove("dBlock");
    stopAudio();
    clearAllIntervals();
    loseAudio.pause();
    winAudio.pause();
}

function toggleSound() {
    let img = document.getElementById('gameSound');
    let startScreen = document.getElementById('start');

    if (img.src.includes('img/10_menu_buttons/sound_on.png')) {
        img.src = 'img/10_menu_buttons/sound_off.png';
        stopAudio();
        mute = true;
    } else {
        img.src = 'img/10_menu_buttons/sound_on.png';
        if (startScreen.classList.contains('dNone')) {
            playAudio();
            mute = false;
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
    mainTheme.currentTime = 0;
}

function showEndScreen() {
    let endscreen = document.getElementById('endScreenWin');
    endscreen.classList.remove("dNone");
    if (!mute) {
        winAudio.play();
    }
    mainTheme.pause();

}

function showLoseScreen() {
    let loseScreen = document.getElementById('endScreenLose')
    loseScreen.classList.remove("dNone");
    mainTheme.pause();
    if (!mute) {
        loseAudio.play();
    }
}

function lowerVolume() {
    let audio = document.getElementById('mainAudio');
    audio.volume = 0.3;
}

function playButtonAudio() {
    buttonSound.play();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restart() {
    clearAllIntervals();
    startGame();
}

function checkOrientation() {
    const warning = document.getElementById('landscapeWarning');
    if (window.innerWidth < 720) {
        warning.classList.add('active');
    } else {
        warning.classList.remove('active');
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);











