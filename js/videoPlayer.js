const $ = document



/* ------------------------------- play puase ------------------------------- */
const videoElem = $.querySelector("video")
const playPuaseBtn = $.querySelector("#playPuaseBtn")
playPuaseBtn.addEventListener("click", () => {
    playPuaseBtn.classList.toggle("puase")

    playPuaseBtn.className.includes("puase") ? videoElem.pause() : videoElem.play()

})


/* ---------------------------- video volum level --------------------------- */

const volumeLevel = $.querySelector("#volumeLevel")

volumeLevel.addEventListener("change", () => {
    videoElem.volume = (volumeLevel.value) / 100

})

/* ---------------------------- video full screen --------------------------- */
const videoScreenController = $.querySelector(".video__screen-control")
const container = $.querySelector(".container")

videoScreenController.addEventListener("click", () => {
    if (document.fullscreenElement) {
        videoScreenController.classList.replace("video__screen--normal", "video__screen--fullscreen")
        return document.exitFullscreen;
    } else {
        videoScreenController.classList.replace("video__screen--fullscreen", "video__screen--normal")
        videoElem.requestFullscreen();




    }
})


/* -------------------------------- timeline -------------------------------- */

const timeLine = $.querySelector(".video__time-line")
const currentTimeElem = $.querySelector("#currentTime")


const formatTime = time => {
    let seconds = Math.floor(time % 60);
    mins = Math.floor(time / 60) % 60;
    hrs = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds
    mins = mins < 10 ? `0${mins}` : mins
    hrs = hrs < 10 ? `0${hrs}` : hrs


    if (hrs == 0) {
        return `${mins}:${seconds}`

    } else {

        return `${hrs}:${mins}:${seconds}`
    }


}

videoElem.addEventListener("timeupdate", event => {
    let { currentTime, duration } = event.target;
    let precent = (currentTime / duration) * 100;
    timeLine.style.width = `${precent}%`
    currentTimeElem.textContent = formatTime(currentTime)



})




/* ---------------------------- timeline tracker ---------------------------- */

const timeLineTracker = $.querySelector(".video__time-line-box")

timeLineTracker.addEventListener("click", event => {
    let timeLineTrackerWidth = event.target.clientWidth;
    videoElem.currentTime = (event.offsetX / timeLineTrackerWidth) * videoElem.duration;
})


/* ------------------------------ progress time ----------------------------- */

const videoElemDuration = $.querySelector("#duration")
videoElem.addEventListener("loadeddata", event => {
    videoElemDuration.innerHTML = formatTime(event.target.duration);

})