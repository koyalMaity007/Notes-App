import {
  loadNotes,
  saveNotes
} from "./storage.js";

import {
  formatDate,
  generateID
} from "./utils.js";

import {
  renderDashboard
} from "./dashboard.js";

const subjectInput =
  document.getElementById("subjectInput");

const noteInput =
  document.getElementById("noteInput");

const saveBtn =
  document.getElementById("saveBtn");

const notesContainer =
  document.getElementById("notesContainer");

const searchInput =
  document.getElementById("searchInput");

let notes = loadNotes();

let editID = null;

export function initNotes() {

  renderNotes();

  saveBtn.addEventListener(
    "click",
    handleSave
  );

  searchInput.addEventListener(
    "input",
    renderNotes
  );

  subjectInput.addEventListener(
    "keydown",
    e => {

      if (e.key === "Enter") {
        handleSave();
      }

    }
  );

}

function handleSave() {

  const subject =
    subjectInput.value.trim();

  const content =
    noteInput.value.trim();

  if (!subject || !content) return;

  if (content.length > 2000) {

    alert("Note is too long.");

    return;

  }

  if (editID) {

    updateNote(
      editID,
      subject,
      content
    );

  } else {

    createNote(
      subject,
      content
    );

  }

  clearInputs();

  saveNotes(notes);

  renderNotes();

  renderDashboard();

}

function createNote(subject, content) {

  const note = {

    id: generateID(),

    subject,

    content,

    createdAt: Date.now(),

    updatedAt: Date.now(),

    pinned: false

  };

  notes.unshift(note);

}

function updateNote(
  id,
  subject,
  content
) {

  notes = notes.map(note => {

    if (note.id === id) {

      return {

        ...note,

        subject,

        content,

        updatedAt: Date.now()

      };

    }

    return note;

  });

  editID = null;

}

function deleteNote(id) {

  const confirmed =
    confirm(
      "Delete this note?"
    );

  if (!confirmed) return;

  notes = notes.filter(
    note => note.id !== id
  );

  saveNotes(notes);

  renderNotes();

  renderDashboard();

}

function editNote(id) {

  const note =
    notes.find(
      note => note.id === id
    );

  if (!note) return;

  subjectInput.value =
    note.subject;

  noteInput.value =
    note.content;

  editID = id;

}

function clearInputs() {

  subjectInput.value = "";

  noteInput.value = "";

}

function renderNotes() {

  const query =
    searchInput?.value
      .toLowerCase() || "";

  const filteredNotes =
    notes.filter(note =>

      note.subject
        .toLowerCase()
        .includes(query)

      ||

      note.content
        .toLowerCase()
        .includes(query)

    );

  notesContainer.innerHTML = "";

  if (filteredNotes.length === 0) {

    const empty =
      document.createElement("div");

    empty.className =
      "empty-state";

    empty.innerHTML = `
      <h3>No Notes Found</h3>
      <p>Create your first note.</p>
    `;

    notesContainer.appendChild(empty);

    return;

  }

  const fragment =
    document.createDocumentFragment();

  filteredNotes.forEach(note => {

    fragment.appendChild(
      createNoteElement(note)
    );

  });

  notesContainer.appendChild(
    fragment
  );

}

function createNoteElement(note) {

  const div =
    document.createElement("div");

  div.className = "note";

  const title =
    document.createElement("h3");

  title.textContent =
    note.subject;

  const content =
    document.createElement("p");

  content.textContent =
    note.content;

  const meta =
    document.createElement("div");

  meta.className =
    "note-meta";

  meta.textContent =
    `Updated: ${formatDate(note.updatedAt)}`;

  const actions =
    document.createElement("div");

  actions.className =
    "note-actions";

  const editBtn =
    document.createElement("button");

  editBtn.className =
    "edit-btn";

  editBtn.textContent =
    "Edit";

  editBtn.addEventListener(
    "click",
    () => editNote(note.id)
  );

  const deleteBtn =
    document.createElement("button");

  deleteBtn.className =
    "delete-btn";

  deleteBtn.textContent =
    "Delete";

  deleteBtn.addEventListener(
    "click",
    () => deleteNote(note.id)
  );

  actions.append(
    editBtn,
    deleteBtn
  );

  div.append(
    title,
    content,
    meta,
    actions
  );

  return div;

}