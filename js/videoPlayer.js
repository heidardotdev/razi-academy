const $ = document;

const playPuaseBtn = $.querySelector("#playPuaseBtn");
const videoElem = $.querySelector("video");
const volumeLevel = $.querySelector("#volumeLevel");
const videoScreenController = $.querySelector(".video__screen-control");
const vidoeBox = $.querySelector(".video__box");
const videoControllersBox = $.querySelector(".video__controles-box");
const timeLineTracker = $.querySelector(".video__time-line-box");
let timeLine = $.querySelector(".video__time-line");

/* ----------------------------- play and puase ----------------------------- */

playPuaseBtn.addEventListener("click", () => {
  if (playPuaseBtn.className.includes("puase")) {
    playPuaseBtn.classList.remove("puase");
    videoElem.play();
  } else {
    playPuaseBtn.classList.add("puase");
    videoElem.pause();
  }
});

/* ------------------------------ volume level ------------------------------ */

const volumeBox = $.querySelector(".video__volume-box");
volumeLevel.addEventListener("change", () => {
  videoElem.volume = volumeLevel.value / 100;
  if (volumeLevel.value === "0") {
    volumeBox.classList.replace("video--unmute", "video--mute");
  } else if (volumeLevel.value > "0") {
    volumeBox.classList.replace("video--mute", "video--unmute");
  }
});

/* ------------------------------- volume btn ------------------------------- */

const muteElem = $.querySelector("#mute");
const unMuteElem = $.querySelector("#unmute");

muteElem.addEventListener("click", () => {
  videoElem.volume = 1;
  volumeBox.classList.replace("video--mute", "video--unmute");
  volumeLevel.value = "100";
});

unMuteElem.addEventListener("click", () => {
  videoElem.volume = 0;
  volumeBox.classList.replace("video--unmute", "video--mute");
  volumeLevel.value = "0";
});

/* ---------------------- full screen and normal screen --------------------- */

videoScreenController.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    vidoeBox.requestFullscreen();
    videoElem.classList.add("videoIsFullScreen");
    videoScreenController.classList.replace(
      "video__screen--normal",
      "video__screen--fullscreen"
    );
  } else {
    document.exitFullscreen();
    videoElem.classList.remove("videoIsFullScreen");
    videoScreenController.classList.replace(
      "video__screen--fullscreen",
      "video__screen--normal"
    );
  }
});

if (!document.fullscreenElement) {
  vidoeBox.style.cssText = `width: 100%;`;
  videoScreenController.classList.replace(
    "video__screen--fullscreen",
    "video__screen--normal"
  );
}

/* -------------------------------- time line ------------------------------- */

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    mins = Math.floor(time / 60) % 60,
    hrs = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  mins = mins < 10 ? `0${mins}` : mins;
  hrs = hrs < 10 ? `0${hrs}` : hrs;

  if (hrs == 0) {
    return `${mins}:${seconds}`;
  }
  return `${hrs}:${mins}:${seconds}`;
};

videoElem.addEventListener("timeupdate", (event) => {
  let { currentTime, duration } = event.target;
  let precent = (currentTime / duration) * 100;
  timeLine.style.width = `${precent}%`;

  const videoCurrentTimeElem = $.querySelector("#currentTime");
  videoCurrentTimeElem.innerHTML = formatTime(currentTime);

  if (videoElem.currentTime == videoElem.duration) {
    playPuaseBtn.classList.add("puase");
  }
});

/* --------------------- hide and show video controlles --------------------- */
let timer;
const hideControlles = () => {
  if (videoElem.paused) return;

  timer = setTimeout(() => {
    videoControllersBox.style.opacity = "0";
    playPuaseBtn.style.opacity = "0";
    videoControllersBox.style.display = "none";
    playPuaseBtn.style.display = "none";
  }, 3000);
};

hideControlles();
vidoeBox.addEventListener("mousemove", () => {
  videoControllersBox.style.opacity = "1";
  playPuaseBtn.style.opacity = "1";
  videoControllersBox.style.display = "flex";
  playPuaseBtn.style.display = "flex";
  clearTimeout(timer);
  hideControlles();
});

window.addEventListener("load", () => {
  const videoDurationElem = $.querySelector("#duration");
  videoDurationElem.innerHTML = formatTime(videoElem.duration);
});

timeLineTracker.addEventListener("click", (event) => {
  let timeLineWidth = timeLineTracker.clientWidth;
  videoElem.currentTime = (event.offsetX / timeLineWidth) * videoElem.duration;
});
