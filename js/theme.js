import {
  loadTheme,
  saveTheme
} from "./storage.js";

const themeBtn =
  document.getElementById("themeBtn");

export function initTheme() {

  const savedTheme =
    loadTheme();

  if (savedTheme === "dark") {

    document.body.classList.add(
      "dark"
    );

    themeBtn.textContent = "☀️";

  }

  themeBtn.addEventListener(
    "click",
    toggleTheme
  );

}

function toggleTheme() {

  document.body.classList.toggle(
    "dark"
  );

  const isDark =
    document.body.classList.contains(
      "dark"
    );

  themeBtn.textContent =
    isDark ? "☀️" : "🌙";

  saveTheme(
    isDark ? "dark" : "light"
  );

}