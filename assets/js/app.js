let myLibrary = [];
let indexCount = 1;
const addBtn = document.getElementById("btn_add");
const clearBtn = document.getElementById("btn_clear");
const bookTableBody = document.getElementById("book_table_body");

function Book(read, index, title, author, pages) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  const titleVal = document.getElementById("book-title").value = "";
  const authorVal = document.getElementById("book-author").value = "";
  const pagesVal = document.getElementById("book-pages").value = "";
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
  myLibrary.push(book);
  console.log(myLibrary)

  indexCount++;
}

function displayBooks() {
  let content = "";

  myLibrary.forEach(book => {
    content += `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>
      <input type="checkbox" name="read">
    </td>
    <td>
      <button class="remove" type="button">Remove</button>
    </td>
  </tr>`
  });
  
  bookTableBody.innerHTML = content;
}
