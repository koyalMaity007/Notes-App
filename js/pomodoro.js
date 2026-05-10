import { renderDashboard } from "./dashboard.js";
import { playSound, vibrate } from "./audio.js";

let timer;
let isRunning = false;
let isFocusMode = true;

let focusTime = 25;
let breakTime = 5;

let timeLeft = focusTime * 60;

let sessions =
  Number(localStorage.getItem("focus-sessions")) || 0;

let streak =
  Number(localStorage.getItem("streak")) || 0;

export function initPomodoro() {

  const timerDisplay =
    document.getElementById("timerDisplay");

  const timerMode =
    document.getElementById("timerMode");

  const startBtn =
    document.getElementById("startTimerBtn");

  const pauseBtn =
    document.getElementById("pauseTimerBtn");

  const resetBtn =
    document.getElementById("resetTimerBtn");

  const sessionCount =
    document.getElementById("sessionCount");

  const streakCount =
    document.getElementById("streakCount");

  const focusInput =
    document.getElementById("focusTime");

  const breakInput =
    document.getElementById("breakTime");

  const circle =
    document.getElementById("progressCircle");

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  sessionCount.textContent = sessions;
  streakCount.textContent = streak;

  updateDisplay();
  updateProgress();

  focusInput.addEventListener("input", updateTimes);
  breakInput.addEventListener("input", updateTimes);

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  function updateTimes() {

    const focusVal = Number(focusInput.value);
    const breakVal = Number(breakInput.value);

    focusTime = Number.isNaN(focusVal) ? 25 : focusVal;
    breakTime = Number.isNaN(breakVal) ? 5 : breakVal;

    // prevent weird 0 or negative values
    focusTime = Math.max(1, focusTime);
    breakTime = Math.max(0, breakTime);

    if (!isRunning) {
      timeLeft = (isFocusMode ? focusTime : breakTime) * 60;
      updateDisplay();
      updateProgress();
    }
  }

  function startTimer() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

      timeLeft--;

      updateDisplay();
      updateProgress();

      if (timeLeft <= 0) {

        clearInterval(timer);
        isRunning = false;

        playSound();
        vibrate();

        switchMode();
      }

    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {

    clearInterval(timer);
    isRunning = false;

    isFocusMode = true;
    timeLeft = focusTime * 60;

    timerMode.textContent = "Focus Mode";

    updateDisplay();
    updateProgress();
  }

function switchMode() {

  isFocusMode = !isFocusMode;

  const nextTime = isFocusMode ? focusTime : breakTime;

  timeLeft = nextTime * 60;

  timerMode.textContent =
    isFocusMode ? "Focus Mode" : "Break Mode";

  updateDisplay();
  updateProgress();

  // IMPORTANT: DO NOT auto start
  isRunning = false;
  clearInterval(timer);

}
  function updateDisplay() {

    const minutes =
      Math.floor(timeLeft / 60);

    const seconds =
      timeLeft % 60;

    timerDisplay.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function updateProgress() {

    const total =
      (isFocusMode ? focusTime : breakTime) * 60;

    const progress =
      timeLeft / total;

    const offset =
      circumference * progress;

    circle.style.strokeDashoffset = offset;
  }
}