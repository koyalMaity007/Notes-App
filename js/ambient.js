const sounds = {
  rain: new Audio("assets/rain.mp3"),
  forest: new Audio("assets/forest.mp3"),
  lofi: new Audio("assets/lofi.mp3"),
  cafe: new Audio("assets/cafe.mp3")
};

let current = null;

export function initAmbient() {
  const playBtn = document.getElementById("playMusicBtn");
  const pauseBtn = document.getElementById("pauseMusicBtn");
  const select = document.getElementById("soundSelect");
  const volume = document.getElementById("volumeControl");

  if (!playBtn) return;

  volume.value = localStorage.getItem("ambient-volume") || 0.5;

  volume.addEventListener("input", () => {
    if (current) current.volume = volume.value;
    localStorage.setItem("ambient-volume", volume.value);
  });

  playBtn.addEventListener("click", () => {
    playSound(select.value);
  });

  pauseBtn.addEventListener("click", stopSound);
}

function playSound(type) {
  stopSound();

  current = sounds[type];

  if (!current) return;

  current.loop = true;
  current.volume = localStorage.getItem("ambient-volume") || 0.5;

  current.play();
}

function stopSound() {
  if (current) {
    current.pause();
    current.currentTime = 0;
  }
}