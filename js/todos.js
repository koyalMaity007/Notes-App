const TASK_KEY =
  "student-dashboard-tasks";

const taskInput =
  document.getElementById("taskInput");

const priorityInput =
  document.getElementById("priorityInput");

const dueDateInput =
  document.getElementById("dueDateInput");

const addTaskBtn =
  document.getElementById("addTaskBtn");

const tasksContainer =
  document.getElementById("tasksContainer");

const filterStatus =
  document.getElementById("filterStatus");

const filterPriority =
  document.getElementById("filterPriority");

const progressBar =
  document.getElementById("progressBar");

const progressText =
  document.getElementById("progressText");

let tasks =
  JSON.parse(
    localStorage.getItem(TASK_KEY)
  ) || [];

export function initTodos() {

  renderTasks();

  addTaskBtn.addEventListener(
    "click",
    createTask
  );

  filterStatus.addEventListener(
    "change",
    renderTasks
  );

  filterPriority.addEventListener(
    "change",
    renderTasks
  );

}

function createTask() {

  const text =
    taskInput.value.trim();

  if (!text) return;

  const task = {

    id: crypto.randomUUID(),

    text,

    priority:
      priorityInput.value,

    dueDate:
      dueDateInput.value,

    completed: false,

    createdAt: Date.now()

  };

  tasks.unshift(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";
  dueDateInput.value = "";

}

function saveTasks() {

  localStorage.setItem(
    TASK_KEY,
    JSON.stringify(tasks)
  );

}

function toggleTask(id) {

  tasks = tasks.map(task => {

    if (task.id === id) {

      return {
        ...task,
        completed:
          !task.completed
      };

    }

    return task;

  });

  saveTasks();

  renderTasks();

}

function deleteTask(id) {

  tasks =
    tasks.filter(
      task => task.id !== id
    );

  saveTasks();

  renderTasks();

}

function renderTasks() {

  tasksContainer.innerHTML = "";

  let filtered = [...tasks];

  const status =
    filterStatus.value;

  const priority =
    filterPriority.value;

  if (status === "completed") {

    filtered =
      filtered.filter(
        task => task.completed
      );

  }

  if (status === "pending") {

    filtered =
      filtered.filter(
        task => !task.completed
      );

  }

  if (status === "overdue") {

    filtered =
      filtered.filter(task => {

        if (!task.dueDate)
          return false;

        return (
          new Date(task.dueDate)
          < new Date() &&
          !task.completed
        );

      });

  }

  if (priority !== "all") {

    filtered =
      filtered.filter(
        task =>
          task.priority === priority
      );

  }

  if (filtered.length === 0) {

    tasksContainer.innerHTML =
      `
      <p class="empty-state">
        No tasks found.
      </p>
      `;

    updateProgress();

    return;

  }

  filtered.forEach(task => {

    const card =
      createTaskCard(task);

    tasksContainer.appendChild(card);

  });

  updateProgress();

}

function createTaskCard(task) {

  const card =
    document.createElement("div");

  card.className =
    "task-card enhanced-task";

  if (task.completed) {

    card.classList.add(
      "completed"
    );

  }

  const overdue =
    task.dueDate &&
    new Date(task.dueDate)
    < new Date() &&
    !task.completed;

  if (overdue) {

    card.classList.add(
      "overdue"
    );

  }

  card.innerHTML = `

    <div class="task-top">

      <h3>
        ${task.text}
      </h3>

      <span class="
        priority
        ${task.priority}
      ">
        ${task.priority}
      </span>

    </div>

    <div class="task-bottom">

      <p>
        📅 ${
          task.dueDate ||
          "No due date"
        }
      </p>

      ${
        overdue
          ? "<small class='overdue-text'>Overdue</small>"
          : ""
      }

    </div>

    <div class="task-actions">

      <button class="complete-btn">
        ${
          task.completed
            ? "Undo"
            : "Complete"
        }
      </button>

      <button class="delete-btn">
        Delete
      </button>

    </div>

  `;

  card
    .querySelector(".complete-btn")
    .addEventListener(
      "click",
      () => toggleTask(task.id)
    );

  card
    .querySelector(".delete-btn")
    .addEventListener(
      "click",
      () => deleteTask(task.id)
    );

  return card;

}

function updateProgress() {

  if (tasks.length === 0) {

    progressBar.style.width =
      "0%";

    progressText.textContent =
      "0%";

    return;

  }

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const percent =
    Math.round(
      (completed / tasks.length)
      * 100
    );

  progressBar.style.width =
    percent + "%";

  progressText.textContent =
    percent + "%";

}