const NOTES_KEY =
  "student-dashboard-notes";

const TASKS_KEY =
  "student-dashboard-tasks";

const THEME_KEY =
  "theme";

export function loadNotes() {

  return JSON.parse(
    localStorage.getItem(NOTES_KEY)
  ) || [];

}

export function saveNotes(notes) {

  localStorage.setItem(
    NOTES_KEY,
    JSON.stringify(notes)
  );

}

export function loadTasks() {

  return JSON.parse(
    localStorage.getItem(TASKS_KEY)
  ) || [];

}

export function saveTasks(tasks) {

  localStorage.setItem(
    TASKS_KEY,
    JSON.stringify(tasks)
  );

}

export function loadTheme() {

  return localStorage.getItem(
    THEME_KEY
  );

}

export function saveTheme(theme) {

  localStorage.setItem(
    THEME_KEY,
    theme
  );

}