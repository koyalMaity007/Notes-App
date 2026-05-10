let notes = JSON.parse(localStorage.getItem("student-notes-pro")) || [];
let editIndex = null;

// Elements
const subjectInput = document.getElementById("subjectInput");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");

// Save or update note
document.getElementById("saveBtn").addEventListener("click", () => {
  const subject = subjectInput.value.trim();
  const content = noteInput.value.trim();

  if (!subject || !content) return;

  const note = {
    subject,
    content,
    time: new Date().toLocaleString()
  };

  if (editIndex !== null) {
    notes[editIndex] = note;
    editIndex = null;
  } else {
    notes.unshift(note);
  }

  subjectInput.value = "";
  noteInput.value = "";

  saveNotes();
  renderNotes();
});

// Save to localStorage
function saveNotes() {
  localStorage.setItem("student-notes-pro", JSON.stringify(notes));
}

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

// Edit note
function editNote(index) {
  const note = notes[index];
  subjectInput.value = note.subject;
  noteInput.value = note.content;
  editIndex = index;
}

// Render notes
function renderNotes() {
  const query = searchInput.value.toLowerCase();

  notesContainer.innerHTML = "";

  notes
    .filter(n =>
      n.subject.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query)
    )
    .forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";

      div.innerHTML = `
        <h3>${note.subject}</h3>
        <p>${note.content}</p>
        <div class="meta">🕒 ${note.time}</div>

        <div class="actions">
          <button onclick="editNote(${index})">Edit</button>
          <button class="delete" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;

      notesContainer.appendChild(div);
    });
}

// Search
searchInput.addEventListener("input", renderNotes);

// Dark mode toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Initial render
renderNotes();