export const state = {
  notes: [],
  tasks: [],
  focusSessions: 0,
  streak: 0
};

export function loadState() {
  state.notes = JSON.parse(localStorage.getItem("notes")) || [];
  state.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  state.focusSessions = Number(localStorage.getItem("focus-sessions")) || 0;
  state.streak = Number(localStorage.getItem("streak")) || 0;
}

export function saveState() {
  localStorage.setItem("notes", JSON.stringify(state.notes));
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  localStorage.setItem("focus-sessions", state.focusSessions);
  localStorage.setItem("streak", state.streak);
}