import { initTheme } from "./theme.js";
import { initNavigation } from "./navigation.js";
import { initNotes } from "./notes.js";
import { initTodos } from "./todos.js";
import { initDashboard } from "./dashboard.js";
import { initPomodoro } from "./pomodoro.js";
import { initAmbient } from "./ambient.js";
import { initAnalytics } from "./analytics.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initNotes();
  initTodos();
  initDashboard();
  initPomodoro();
  initAmbient();
  initAnalytics();
});