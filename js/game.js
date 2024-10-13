let canvas;
let world;
let keyboard = new Keyboard();
let mainTheme = document.getElementById('mainAudio');
let winAudio = document.getElementById('winAudio');
let loseAudio = document.getElementById('loseAudio');
bossFirstSeen = false;
mute = false;

/**
 * Initializes the game by setting up the canvas, lowering the volume, and activating touch buttons.
 */
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

/**
 * Activates touch buttons for mobile devices.
 */
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

/**
 * Starts the game by initializing the level and creating the game world.
 */
function startGame() {
    let endscreen = document.getElementById('endScreenWin')
    let game = document.getElementById('start');
    endscreen.classList.add("dNone")
    game.classList.add("dNone");
    let canvas = document.getElementById('canvas');
    canvas.classList.add("dBlock");
    initLevel();
    Coins.resetNextSpawn(); 
    Bottle.resetNextSpawn();
    world = new World(canvas, keyboard);
    checkAudioStatus();
}

/**
 * Closes the impressum (legal notice) section.
 */
function closeImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.add('dNone');
}

/**
 * Opens the impressum (legal notice) section.
 */
function openImpressum() {
    let impressum = document.getElementById('impressum');
    impressum.classList.remove('dNone');
}

/**
 * Reloads the game by resetting the game state and stopping all audio and intervals.
 */
function reload() {
    let endscreen = document.getElementById('endScreenWin');
    let endscreenLose = document.getElementById('endScreenLose');
    let game = document.getElementById('start');
    endscreen.classList.add("dNone");
    endscreenLose.classList.add("dNone");
    game.classList.remove("dNone");
    let canvas = document.getElementById('canvas');
    canvas.classList.remove("dBlock");
    reloadChanges();
}

/**
 * Reloads the game by resetting various game states and stopping all audio and intervals.
 */
function reloadChanges() {
    bossFirstSeen = false;
    stopAudio();
    clearAllIntervals();
    loseAudio.pause();
    winAudio.pause();
    Coins.resetNextSpawn(); 
    Bottle.resetNextSpawn(); 
}

/**
 * Toggles the game sound on and off.
 */
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

/**
 * Checks the audio status and plays the main theme if sound is enabled.
 */
function checkAudioStatus() {
    let audio = document.getElementById('gameSound');
    if (audio.src.includes('/img/10_menu_buttons/sound_on.png')) {
        playAudio();
    }
}

/**
 * Plays the main theme audio.
 */
function playAudio() {
    mainTheme.play();
}

/**
 * Stops the main theme audio and resets its playback position.
 */
function stopAudio() {
    mainTheme.pause();
    mainTheme.currentTime = 0;
}

/**
 * Shows the end screen when the player wins.
 */
function showEndScreen() {
    let endscreen = document.getElementById('endScreenWin');
    endscreen.classList.remove("dNone");
    if (!mute) {
        winAudio.play();
    }
    mainTheme.pause();
}

/**
 * Shows the lose screen when the player loses.
 */
function showLoseScreen() {
    let loseScreen = document.getElementById('endScreenLose')
    loseScreen.classList.remove("dNone");
    mainTheme.pause();
    if (!mute) {
        loseAudio.play();
    }
}

/**
 * Hides all end screens by adding the "dNone" class to them.
 */
function closeAllEndScreens() {
    let endscreen = document.getElementById('endScreenWin');
    let loseScreen = document.getElementById('endScreenLose');
    loseScreen.classList.add("dNone");
    endscreen.classList.add("dNone");
    winAudio.pause();
    loseAudio.pause();
}

/**
 * Lowers the volume of the main theme audio.
 */
function lowerVolume() {
    let audio = document.getElementById('mainAudio');
    audio.volume = 0.3;
}

/**
 * Plays the button click sound.
 */
function playButtonAudio() {
    buttonSound.play();
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Restarts the game by clearing all intervals and starting the game again.
 */
function restart() {
    clearAllIntervals();
    startGame();
    closeAllEndScreens();
    bossFirstSeen = false;
}

/**
 * Checks if the device is a tablet.
 * @returns {boolean} - True if the device is a tablet.
 */
function isTablet() {
    return /iPad|Android|Tablet/i.test(navigator.userAgent);
}

/**
 * Checks if the device is a mobile device.
 * @returns {boolean} - True if the device is a mobile device.
 */
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Applies mobile-specific styles to the game.
 */
function applyMobileStyles() {
    document.body.classList.add('mobile');
    document.body.classList.remove('desktop');
}

/**
 * Applies desktop-specific styles to the game.
 */
function applyDesktopStyles() {
    document.body.classList.add('desktop');
    document.body.classList.remove('mobile');
}

/**
 * Checks the device orientation and shows a warning if in portrait mode.
 */
function checkOrientation() {
    const landscapeWarning = document.querySelector('.landscape-warning');
    if (landscapeWarning) {
        if (window.orientation === 0 || window.orientation === 180) {
            landscapeWarning.classList.add('active');
        } else {
            landscapeWarning.classList.remove('active');
        }
    }
}

window.addEventListener('load', () => {
    if (isMobileDevice() || isTablet()) {
        applyMobileStyles();
        checkOrientation();
        window.addEventListener('orientationchange', checkOrientation);
    } else {
        applyDesktopStyles();
    }
});

if (isMobileDevice() || isTablet()) {
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
}

if (isTablet()) {   
    let btnLeft = document.getElementById('mobileBtnLeft');
    let btnRight = document.getElementById('mobileBtnRight');
    btnLeft.classList.add('dBlock');
    btnRight.classList.add('dBlock');
}