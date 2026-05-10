const KEY = "study-analytics";

export function initAnalytics() {
  saveTodaySnapshot();
  renderWeeklyStats();
}

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function saveTodaySnapshot() {
  const data = getData();

  const today = new Date().toISOString().split("T")[0];

  const snapshot = {
    date: today,
    notes: Number(localStorage.getItem("notes-count")) || 0,
    tasks: Number(localStorage.getItem("tasks-done")) || 0,
    focus: Number(localStorage.getItem("focus-sessions")) || 0
  };

  const existingIndex = data.findIndex(d => d.date === today);

  if (existingIndex >= 0) {
    data[existingIndex] = snapshot;
  } else {
    data.push(snapshot);
  }

  saveData(data);
}

export function renderWeeklyStats() {
  const data = getData().slice(-7);

  const container = document.getElementById("analyticsContainer");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(day => {
    const div = document.createElement("div");

    div.className = "analytics-bar";

    div.innerHTML = `
      <strong>${day.date}</strong>
      <div class="bars">
        <div style="width:${day.notes * 10}px"></div>
        <div style="width:${day.tasks * 10}px"></div>
        <div style="width:${day.focus * 10}px"></div>
      </div>
    `;

    container.appendChild(div);
  });
}