const fullPeriod = 75 * 60;
const workPeriod = 60 * 60;

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
    var currentIsWorking = isWorkingState(getTimestampSeconds());

    while (true) {
        seconds = getTimestampSeconds();
        if (isWorkingState(seconds)) {
            secondsLeft = workPeriod - (seconds % fullPeriod);
            // if currentIsWorking is not updated, play audio and update it
            if (!currentIsWorking) {
                audio.play();
                currentIsWorking = 1;
            }
            title.innerHTML = convertToClock(secondsLeft) + " work";
            timer.innerHTML = convertToClock(secondsLeft) + " work";
        } else {
            secondsLeft = fullPeriod - (seconds % fullPeriod);
            // if currentIsWorking is not updated, play audio and update it
            if (currentIsWorking) {
                audio.play();
                currentIsWorking = 0;
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
