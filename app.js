const songs = [
  {
    group: "Scorpions",
    name: "Wind of Change",
    src: "./assets/wind.mp3",
    album: "./assets/album.jpeg",
  },
  {
    group: "Scorpions",
    name: "Wind of Change second version",
    src: "./assets/change.mp3",
    album: "./assets/album3.jpeg",
  },
];

const mainControl = document.getElementById("main-control");
const pauseControl = document.getElementById("pause-control");
const prev = document.getElementById("previous");
const next = document.getElementById("next");
const albumImage = document.getElementById("album-image");
const title = document.getElementById("title");
const fulltime = document.querySelector(".fulltime");
const startTime = document.querySelector(".start");
const bar = document.querySelector(".bar");
const barWrapper = document.querySelector(".bar-wrapper");
const modal = document.querySelector(".modal");
const signIn = document.querySelector(".signin");
const submitBtn = document.querySelector(".submit");
const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");

window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("authdata"));
  data.name ? (signIn.innerText = data.name) : (signIn.innerText = "Sign in");
  const audio = new Audio();
  let index = 0;

  audio.src = songs[index].src;
  title.innerText = songs[index].name;
  albumImage.src = songs[index].album;

  audio.addEventListener("loadedmetadata", () => {
    fulltime.innerHTML = getTime(audio.duration);
  });

  setInterval(() => {
    startTime.innerText = getTime(audio.currentTime);
    bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    // localStorage.setItem("current", audio.currentTime);
  }, 1000);

  barWrapper.addEventListener(
    "click",
    (event) => {
      const timeline = window.getComputedStyle(barWrapper).width;
      const timeToSeek = (event.offsetX / parseInt(timeline)) * audio.duration;
      audio.currentTime = timeToSeek;
    },
    false
  );

  function getTime(duration) {
    let sec = Math.floor(duration);
    let min = Math.floor(sec / 60);
    sec -= min * 60;
    return `${min}:${String(sec % 60).padStart(2, 0)}`;
  }

  function changeDisplayValue(main, pause) {
    mainControl.style.display = main;
    pauseControl.style.display = pause;
  }

  function playSongByIndex(songIndex) {
    audio.src = songs[songIndex].src;
    albumImage.src = songs[songIndex].album;
    title.innerText = songs[songIndex].name;
    audio.play();
    changeDisplayValue("none", "block");
    changeCurrentTimeSong();
  }

  mainControl.addEventListener("click", () => {
    audio.play();
    changeDisplayValue("none", "block");
  });

  pauseControl.addEventListener("click", () => {
    audio.pause();
    changeDisplayValue("block", "none");
  });

  next.addEventListener("click", () => {
    index += 1;
    if (index < songs.length) {
      playSongByIndex(index);
    } else if (index >= songs.length) {
      playSongByIndex(0);
      index = 0;
    }
  });

  prev.addEventListener("click", () => {
    index > 0 ? (index -= 1) : index;
    if (index < songs.length) {
      playSongByIndex(index);
    }
  });

  signIn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  submitBtn.addEventListener("click", () => {
    localStorage.setItem(
      "authdata",
      JSON.stringify({
        name: username.value,
        pass: password.value,
      })
    );
    modal.style.display = "none";
  });
});
