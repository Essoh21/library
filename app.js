const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookYear = document.getElementById('year');
const bookStatus = document.getElementById('status');
const booksTable = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const form = document.getElementById('theForm');
let invalidStatus = false;
// Book Constructor
function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
    this.year = year;
    this.info = function() { return `${title} by ${author},${pages} pages, ${read}` };
}
//const brian = new book("compound effect", "Brian Tracy", 200, "already read");
//brian.info();
let exempleBook = new Book("Java script the Good Part", "Douglas Crokford", 172, 2008, "already Read");
const myLibrary = [];
const inputsNameArray = [bookTitle, bookAuthor, bookPages, bookYear, bookStatus];

function chekInvalidStatus() {
    inputsNameArray.forEach((inputElement) => {
        inputElement.addEventListener('invalid', () => {
            invalidStatus = true;
        })
    })
    inputsNameArray.forEach((inputElement) => {
        if (!(inputElement.value == '')) {
            invalidStatus = false;
        } else {
            invalidStatus = true;
        }
    })
}

inputsNameArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        chekInvalidStatus()
    })
    inputElement.addEventListener('change', () => {
        chekInvalidStatus()
    })
})

function addBookToLibrary() {

    if (invalidStatus) {
        alert("fill all fields correctly");
        return;
    } else {
        let title = bookTitle.value;
        let author = bookAuthor.value;
        let pages = bookPages.value;
        let year = bookYear.value;
        let status = bookStatus.value;
        let newBook = new Book(title, author, pages, year, status);

        myLibrary.push(newBook);
    }

    return;
}


function updateLibrary() {
    myLibrary.push(exempleBook);
    displayBooksOnPage();
}
// a function to clear inputs after submit
function clearInputs() {
    inputsNameArray.forEach((inputElement) => {
        inputElement.value = '';
    })
}

function updateDisplay() {
    addBookToLibrary();
    clearTableBody();
    displayBooksOnPage(); {

    }
    //  addDeleteEventsOnButtons();
    clearInputs();
}

function updateDisplayAndAddDeleteEvents() {
    updateDisplay();
    addDeleteEventsOnButtons();
}

function clearTableBody() {
    tableBody.innerHTML = '';
}

function displayBooksOnPage() {
    myLibrary.forEach((book, index) => {
        let bookRow = document.createElement('tr');

        let bookId = document.createElement('th');
        bookId.setAttribute('scope', 'row');
        bookId.innerHTML = `BK${index}`;
        bookRow.appendChild(bookId);

        let titleData = document.createElement('td');
        titleData.innerHTML = book['title'];
        bookRow.appendChild(titleData);

        let authorData = document.createElement('td');
        authorData.innerHTML = book['author'];
        bookRow.appendChild(authorData);

        let bookPages = document.createElement('td');
        bookPages.innerHTML = book['pages'];
        bookRow.appendChild(bookPages);

        let bookYear = document.createElement('td');
        bookYear.innerHTML = book['year'];
        bookRow.appendChild(bookYear);

        let readStatus = document.createElement('td');
        readStatus.innerHTML = 'Default';
        bookRow.appendChild(readStatus);

        let buttonToDeleteContainer = document.createElement('td');
        let buttonToDelete = document.createElement('button');
        buttonToDelete.className = 'delete';

        buttonToDelete.innerHTML = "Delete book";
        buttonToDeleteContainer.appendChild(buttonToDelete);
        bookRow.appendChild(buttonToDeleteContainer);



        tableBody.appendChild(bookRow);

    })


}
// a function to delete a book fom the library

function deleteBook(library, indexOfTheBook) {
    library.splice(indexOfTheBook, 1);
    return library;
}

function deleteBookAndDisplayLibrary(library, indexOfTheBook) {
    deleteBook(library, indexOfTheBook);
    displayBooksOnPage();
}

function displayForm() {
    chekInvalidStatus();
    form.style.display = 'block';
}

function closeForm() {
    form.style.display = 'none';
}

//  this to dispay books on load
updateLibrary();
// lets add some event listeners  to delete buttons
function addDeleteEventsOnButtons() {

    let buttonToDeleteNodeList = document.querySelectorAll('.delete');

    buttonToDeleteNodeList.forEach((buttonNode, nodeIndex) => {
        buttonNode.addEventListener('click', () => {
            myLibrary.splice(nodeIndex, 1);
            clearTableBody();
            displayBooksOnPage();
            // alert('done');
        });
    })
}
addDeleteEventsOnButtons();