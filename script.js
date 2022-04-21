const fullPeriod = 70 * 60;
const workPeriod = 55 * 60;


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isWorkingState(seconds) {
    return seconds % fullPeriod < workPeriod;
}

function convertToClock(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

async function main() {
    var timer = document.getElementById("timer");
    var seconds;
    var secondsLeft;
    var audio = new Audio('chime.ogg');
    while (true) {
        timestamp = +new Date();
        seconds = Math.floor(timestamp / 1000);
        if (isWorkingState(seconds)) {
            secondsLeft = workPeriod - (seconds % fullPeriod);
            if (secondsLeft == 1) {
                audio.play();
            }
            timer.innerHTML = convertToClock(secondsLeft) + " Work";
        } else {
            secondsLeft = fullPeriod - (seconds % fullPeriod);
            if (secondsLeft == 1) {
                audio.play();
            }
            timer.innerHTML = convertToClock(secondsLeft) + " Break";
        }
        await sleep(1000);
    }
}

var audio = new Audio();
audio.play();
main();
