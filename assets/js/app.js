import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'

const booksCollectionRef = collection(db, 'books');

let myLibrary = [];
const addBtn = document.getElementById("btn_add");
const clearBtn = document.getElementById("btn_clear");
const bookTableBody = document.getElementById("book_table_body");

async function getBooks(){
  const data = await getDocs(booksCollectionRef);
  const books = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  myLibrary = books.map(book => new Book(book.id, book.title, book.author, book.pages, book.read))
}

async function createBook(book) {
  await addDoc(booksCollectionRef, {
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.read,
  });
}

async function deleteBook(id) {
  const bookDoc = doc(db, 'books', id);
  await deleteDoc(bookDoc);
}

async function updateBookStatus(e, id) {
  const bookDoc = doc(db, 'books', id);
  const newFields = { read: e.target.checked };
  await updateDoc(bookDoc, newFields);
}

window.onload = () => {
  getBooks().then(() => {
    displayBooks();
  })
}

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
    console.log(`Read property toggled for book ${this.id}. Read set to ${this.read}`);
  }
}


addBtn.addEventListener("click", () => {
  setBook();
  addBookToLibrary();
  displayBooks();
})

clearBtn.addEventListener("click", () => {
  clearFields();
})

function clearFields() {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
}

function getInputValues() {
  const titleVal = document.getElementById("book-title").value;
  const authorVal = document.getElementById("book-author").value;
  const pagesVal = document.getElementById("book-pages").value;

  const inputValues = {
    title: titleVal,
    author: authorVal,
    pages: pagesVal
  }

  return inputValues;
}

// Creates a new book object and sets it to form field values
function setBook() {
  let inputVals = getInputValues();

  // Create a book object from the Book prototype
  let book = Object.create(Book.prototype);
  book.title = inputVals.title;
  book.author = inputVals.author;
  book.pages = inputVals.pages;
  book.read = false;

  return book;
}


async function addBookToLibrary() {
  let book = setBook();

  // Check if the input values are empty
  if (book.title === "" || book.author === "" || book.pages === "") return;

  createBook(book).then(() => {
    getBooks().then(() => {
      displayBooks();
    })
  })
}

document.addEventListener("click", function(event) { // Adding event listeners to all remove and toggle buttons
  const target = event.target;

  if (target.matches("[data-remove]")) {
    // Handle remove button click
    removeBook(event);
  }

  if (target.matches("[data-toggle]")) {
    // Handle read checkbox click
    toggleReadProperty(event);
  }
});

async function removeBook(e) {
  // Get the row of the corresponding remove button
  const parentRow = e.target.parentNode.parentNode;
  
  const bookId = parentRow.dataset.index;

  parentRow.remove();

  deleteBook(bookId);
}

function toggleReadProperty(e) {
  // Find book that is read toggled 
  const foundBook = myLibrary.find(book => book.id == e.target.dataset.toggle);
  // Toggle read using the constructor function for the object

  updateBookStatus(e, foundBook.id);
}

function displayBooks() {

  let content = "";

  myLibrary.forEach(book => {
    content += `<tr data-index="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>
      <input data-toggle="${book.id}" type="checkbox" name="read" ${book.read ? "checked" : ""}>
    </td>
    <td>
      <button data-remove="${book.id}" class="remove" type="button">Remove</button>
    </td>
  </tr>`
  });
  
  bookTableBody.innerHTML = content;
}