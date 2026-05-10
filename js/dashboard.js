const NOTES_KEY =
  "student-dashboard-notes";

const TASK_KEY =
  "student-dashboard-tasks";

export function initDashboard() {

  renderDashboard();

}

export function renderDashboard() {

  const notes =
    JSON.parse(
      localStorage.getItem(NOTES_KEY)
    ) || [];

  const tasks =
    JSON.parse(
      localStorage.getItem(TASK_KEY)
    ) || [];

  updateStats(notes, tasks);

  renderRecentNote(notes);

  renderPriorityTasks(tasks);

  updateProgressRings(notes, tasks);

}

/* =========================
   TOP STATS
========================= */

function updateStats(notes, tasks) {

  const totalNotes =
    document.getElementById(
      "totalNotes"
    );

  const completedTasksCard =
    document.getElementById(
      "completedTasks"
    );

  const focusSessions =
    document.getElementById(
      "focusSessions"
    );

  totalNotes.textContent =
    notes.length;

  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length;

  completedTasksCard.textContent =
    completedTasks;

  focusSessions.textContent =
    localStorage.getItem(
      "focus-sessions"
    ) || 0;

}

/* =========================
   RECENT NOTE
========================= */

function renderRecentNote(notes) {

  const recentContainer =
    document.getElementById(
      "recentNote"
    );

  if (!recentContainer) return;

  if (notes.length === 0) {

    recentContainer.innerHTML =
      "<p>No notes yet.</p>";

    return;

  }

  const latest = notes[0];

  recentContainer.innerHTML = `
    <h3>${latest.subject}</h3>
    <p>${latest.content}</p>
  `;

}

/* =========================
   PRIORITY TASKS
========================= */

function renderPriorityTasks(tasks) {

  const container =
    document.getElementById(
      "priorityTasks"
    );

  if (!container) return;

  container.innerHTML = "";

  const highPriority =
    tasks.filter(task =>
      task.priority === "high" &&
      !task.completed
    );

  if (highPriority.length === 0) {

    container.innerHTML =
      "<p>No urgent tasks.</p>";

    return;

  }

  highPriority.forEach(task => {

    const item =
      document.createElement("div");

    item.className =
      "priority-task";

    item.textContent =
      "🔥 " + task.text;

    container.appendChild(item);

  });

}

/* =========================
   PROGRESS RINGS
========================= */

function updateProgressRings(
  notes,
  tasks
) {

  updateTaskRing(tasks);

  updateFocusRing();

  updateNotesRing(notes);

}

function updateTaskRing(tasks) {

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const total =
    tasks.length;

  const percent =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  setRing(
    "taskRing",
    "taskPercent",
    percent
  );

  document.getElementById(
    "taskStats"
  ).textContent =
    `${completed} / ${total} Completed`;

}

function updateFocusRing() {

  const sessions =
    Number(
      localStorage.getItem(
        "focus-sessions"
      )
    ) || 0;

  const goal = 2;

  const percent =
    Math.min(
      Math.round(
        (sessions / goal) * 100
      ),
      100
    );

  setRing(
    "focusRing",
    "focusPercent",
    percent
  );

  document.getElementById(
    "focusStats"
  ).textContent =
    `${sessions} / ${goal} Sessions`;

}

function updateNotesRing(notes) {

  const goal = 5;

  const percent =
    Math.min(
      Math.round(
        (notes.length / goal) * 100
      ),
      100
    );

  setRing(
    "notesRing",
    "notesPercent",
    percent
  );

  document.getElementById(
    "notesStats"
  ).textContent =
    `${notes.length} / ${goal} Notes`;

}

function setRing(
  ringId,
  textId,
  percent
) {

  const ring =
    document.getElementById(ringId);

  const text =
    document.getElementById(textId);

  if (!ring || !text) return;

  ring.style.background =
    `conic-gradient(
      #60a5fa ${percent * 3.6}deg,
      rgba(255,255,255,0.08) 0deg
    )`;

  text.textContent =
    `${percent}%`;

}