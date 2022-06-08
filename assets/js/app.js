let myLibrary = [];
let indexCount = 1;
const addBtn = document.getElementById("btn_add");
const clearBtn = document.getElementById("btn_clear");
const bookTableBody = document.getElementById("book_table_body");
const feedbackMsg = document.querySelector(".feedback-msg");

function Book(read, index, title, author, pages) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
  console.log(`Read property toggled for book ${this.index}. Read set to ${this.read}`);
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
  book.index = indexCount;
  book.title = inputVals.title;
  book.author = inputVals.author;
  book.pages = inputVals.pages;
  book.read = false;

  return book;
}

function addBookToLibrary() {
  let book = setBook();

  // Check if the input values are empty
  if (book.title === "" || book.author === "" || book.pages === "") return;
  
  myLibrary.push(book);

  indexCount++;
}

function displayBooks() {

  let content = "";

  myLibrary.forEach(book => {
    content += `<tr data-index="${book.index}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>
      <input type="checkbox" name="read" data-index="${book.index}" onclick=toggleReadProperty(this)>
    </td>
    <td>
      <button class="remove" type="button" onclick="removeBook(this)">Remove</button>
    </td>
  </tr>`
  });
  
  bookTableBody.innerHTML = content;
}

function removeBook(obj) {
  // Get the row of the corresponding remove button
  const parentRow = obj.parentNode.parentNode;
  
  let parentRowIndex = parentRow.dataset.index;

  parentRow.remove();

  // Find index of book that matches parentRowIndex and remove it from the library array
  const foundBookIndex = myLibrary.find(book => book.index == parentRowIndex);
  myLibrary.splice(foundBookIndex, 1);
}

function toggleReadProperty(obj) {
  // Find book that is read toggled 
  const foundBook = myLibrary.find(book => book.index == obj.dataset.index);
  // Toggle read using the constructor function for the object
  foundBook.toggleRead();
}