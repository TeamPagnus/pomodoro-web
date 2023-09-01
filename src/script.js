const restMinutes = 15;
const workMinutes = 45;
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
    if (v < 0) {
        v = 0;
    }
    if (v > 100) {
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
    var audio = new Audio('chime.mp3');
    var lastStateIsWorking = isWorkingState(getTimestampSeconds());

    while (true) {
        seconds = getTimestampSeconds();
        if (isWorkingState(seconds)) {
            secondsLeft = workPeriod - (seconds % fullPeriod);
            // if lastStateIsWorking is not updated, play audio and update it
            if (!lastStateIsWorking) {
                var promise = audio.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        console.log('play good')
                    }).catch(error => {
                
                        console.log('error')
                        console.log(error)
                    });
                }
                
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

async function pedir_interaccion() {
    var timer = document.getElementById("timer");
    timer.onclick = function (ev) {
        console.log("click")
        main()
    }
}

var audiotest = new Audio('silence.mp3');
var promise = audiotest.play();
if (promise !== undefined) {
    promise.then(_ => {
        console.log('autoplay enabled')
        main()

    }).catch(error => {

        console.log('error')
        console.log(error)

        pedir_interaccion()

    });
}
