const restMinutes = 15;
const workMinutes = 45  ;
const restPeriod = restMinutes * 60;
const workPeriod = workMinutes * 60;
const fullPeriod = restPeriod + workPeriod;

const WORK_STATE = "work"
const BREAK_STATE = "break"
const SILENCE_AUDIO_PATH = "silence.mp3"
const CHIME_AUDIO_PATH = "chime.mp3"

const PLAY_DOM_ID = "triangulo"
const CLOCK_DOM_ID = "timer"
const TITLE_DOM_ID = "title"

const HIDE_DOM_CLASS = "hide"

async function isAutoplayEnabled() {
    var audiotest = new Audio(SILENCE_AUDIO_PATH);
    return audiotest.play()
    .then(_ => {
        return true;
    }).catch(_ => {
        return false
    });
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function getStateAndSecondsLeft(seconds) {
    if (seconds % fullPeriod < workPeriod) {
        return [WORK_STATE, workPeriod - (seconds % fullPeriod)]
    }
    return [BREAK_STATE, fullPeriod - (seconds % fullPeriod)];
}

function isStateChange(state) {
    var timer = document.getElementById(CLOCK_DOM_ID);
    if (timer.innerHTML.includes(WORK_STATE)){
        return state != WORK_STATE;
    } else if (timer.innerHTML.includes(BREAK_STATE)){
        return state != BREAK_STATE;
    }
    return false
}

function playSound() {
    var audio = new Audio(CHIME_AUDIO_PATH);
    audio.play();
}

function updateClockString(secondsLeft, state) {
    var title = document.getElementById(TITLE_DOM_ID);
    var timer = document.getElementById(CLOCK_DOM_ID);
    timeFormated = new Date(secondsLeft * 1000).toISOString().slice(14, 19);
    formatedString = timeFormated + " " + state
    title.innerHTML = formatedString;
    timer.innerHTML = formatedString;
}

function renderTimer() {
    seconds = getTimestamp();
    stateAndSecondsLeft = getStateAndSecondsLeft(seconds);
    state = stateAndSecondsLeft[0];
    secondsLeft = stateAndSecondsLeft[1];
    if (isStateChange(state)) {
        playSound();
    }
    updateClockString(secondsLeft, state)
}

function showTimer() {
    renderTimer()
    window.setInterval(renderTimer, 1000);
}

function showPlayButton() {
    var triangulo = document.getElementById(PLAY_DOM_ID);
    triangulo.onclick = function (_) {
        triangulo.classList.add(HIDE_DOM_CLASS);
        showTimer();
    }
    triangulo.classList.remove(HIDE_DOM_CLASS);
}

// Main
isAutoplayEnabled().then( result => {
    console.log("Autoplay enabled:", result)
    if (result){
        showTimer();
    } else {
        showPlayButton();
    }
})
