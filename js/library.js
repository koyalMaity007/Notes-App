const LIBRARY_KEY = "studydash-library";

export function initLibrary() {
  const titleInput = document.getElementById("bookTitle");
  const authorInput = document.getElementById("bookAuthor");
  const coverInput = document.getElementById("bookCover");
  const addBtn = document.getElementById("addBookBtn");

  const container = document.getElementById("libraryContainer");
  const emptyState = document.getElementById("libraryEmpty");

  let books = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

  renderBooks();

  addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const cover = coverInput.value.trim();

    if (!title) return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      cover: cover || "https://via.placeholder.com/150x220?text=Book"
    };

    books.unshift(newBook);
    save();
    renderBooks();

    titleInput.value = "";
    authorInput.value = "";
    coverInput.value = "";
  });

  function deleteBook(id) {
    books = books.filter(b => b.id !== id);
    save();
    renderBooks();
  }

  function save() {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(books));
  }

  function renderBooks() {
    container.innerHTML = "";

    if (books.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <img src="${book.cover}" alt="cover" />
        <h3>${book.title}</h3>
        <p>${book.author || "Unknown author"}</p>
        <button class="delete-btn">Delete</button>
      `;

      card.querySelector(".delete-btn").addEventListener("click", () => {
        deleteBook(book.id);
      });

      container.appendChild(card);
    });
  }
}