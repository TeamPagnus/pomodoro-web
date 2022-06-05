const restMinutes = 15;
const workMinutes = 60;
const restPeriod = restMinutes * 60;
const workPeriod = workMinutes * 60;
const fullPeriod = restPeriod + workPeriod;

function getVolume() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var v = Number(urlParams.get('v'));
    if (isNaN(v)) {
        v = 100;
    }
    if (vol < 0) {
        v = 0;
    }
    if (vol > 100) {
        v = 100;
    }
    return v;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isWorkingState(seconds) {
    return seconds % fullPeriod < workPeriod;
}

function convertToClock(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function getTimestampSeconds() {
    timestamp = +new Date();
    return Math.floor(timestamp / 1000);
}

async function main() {
    var title = document.getElementById("title");
    var timer = document.getElementById("timer");
    var seconds;
    var secondsLeft;
    var audio = new Audio('chime.ogg');
    audio.volume = getVolume() / 100;
    var lastStateIsWorking = isWorkingState(getTimestampSeconds());

    while (true) {
        seconds = getTimestampSeconds();
        if (isWorkingState(seconds)) {
            secondsLeft = workPeriod - (seconds % fullPeriod);
            // if lastStateIsWorking is not updated, play audio and update it
            if (!lastStateIsWorking) {
                audio.play();
                lastStateIsWorking = 1;
            }
            title.innerHTML = convertToClock(secondsLeft) + " work";
            timer.innerHTML = convertToClock(secondsLeft) + " work";
        } else {
            secondsLeft = fullPeriod - (seconds % fullPeriod);
            // if lastStateIsWorking is not updated, play audio and update it
            if (lastStateIsWorking) {
                audio.play();
                lastStateIsWorking = 0;
            }
            title.innerHTML = convertToClock(secondsLeft) + " break";
            timer.innerHTML = convertToClock(secondsLeft) + " break";
        }
        await sleep(1000);
    }
}

var audio = new Audio();
audio.play();
main();
