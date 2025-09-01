const $ = document

const playPuaseBtn = $.querySelector("#playPuaseBtn")
const videoElem = $.querySelector("video")
const volumeLevel = $.querySelector("#volumeLevel")
const videoScreenController = $.querySelector(".video__screen-control")
const container = $.querySelector(".container")


/* ----------------------------- play and puase ----------------------------- */

playPuaseBtn.addEventListener("click", () => {
    if (playPuaseBtn.className.includes("puase")) {
        playPuaseBtn.classList.remove("puase")
        videoElem.play()
    } else {
        playPuaseBtn.classList.add("puase")
        videoElem.pause()

    }




})












/* ------------------------------ volume level ------------------------------ */

volumeLevel.addEventListener("change", () => {
    videoElem.volume = volumeLevel.value / 100
})










/* ---------------------- full screen and normal screen --------------------- */

videoScreenController.addEventListener("click", () => {
    container.requestFullscreen()


})