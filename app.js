const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookYear = document.getElementById('year');
const bookStatus = document.getElementById('status');
const booksTable = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const form = document.getElementById('theForm');
let radioNodeList = document.querySelectorAll('input[name="read-status"]');

let checkedstatus = false;
let invalidStatus = false;

// Book Constructor
function Book(title, author, pages, year, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.pages = pages;
    this.year = year;
    //this.info = function() { return `${title} by ${author},${pages} pages, ${read}` };
}
// let add a function to toggle read status in Book prototype instance 
Book.prototype.toggleStatus = function() {
    if (this.status === 'Read') {
        this.status = 'Not Read Yet';
    } else {
        this.status = 'Read';
    }
};
let exempleBook = new Book("Java script the Good Part", "Douglas Crokford", 172, 2008, "Read");
const myLibrary = [];
const inputsNameArray = [bookTitle, bookAuthor, bookPages, bookYear];

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
        let status;

        radioNodeList.forEach((radioButton) => {
            if (radioButton.checked) {
                checkedstatus = true
            }
        });
        if (checkedstatus) {
            let radioValue = document.querySelector('input[name="read-status"]:checked').value;
            status = `${radioValue}`;
            checkedstatus = false;
        } else {
            status = 'Read';
        }

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
    displayBooksOnPage();
    clearInputs();
}
//
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
        let toggleDiv = document.createElement('span');
        toggleDiv.setAttribute('title', ' Click to change status');
        toggleDiv.className = 'toggleDivContainer';
        let statusContainer = document.createElement('span');
        statusContainer.innerHTML = book['status'];
        readStatus.appendChild(statusContainer);
        readStatus.appendChild(toggleDiv);
        // readStatus.innerHTML = book['status'];
        bookRow.appendChild(readStatus);

        let buttonToDeleteContainer = document.createElement('td');
        let buttonToDelete = document.createElement('button');
        buttonToDelete.className = 'delete';

        buttonToDelete.innerHTML = "Delete book";
        buttonToDeleteContainer.appendChild(buttonToDelete);
        bookRow.appendChild(buttonToDeleteContainer);



        tableBody.appendChild(bookRow);

    })
    addDeleteEventsOnButtons();
    addToggleStatusEvent();
    clickToDeleteEvent();
    clickToToggleStatus();
}
// 
function displayForm() {
    chekInvalidStatus();
    form.style.display = 'block';
}

function closeForm() {
    form.style.display = 'none';
}

//  this to dispay books on load
updateLibrary();

function addDeleteEventsOnButtons() {

    let buttonToDeleteNodeList = document.querySelectorAll('.delete');

    buttonToDeleteNodeList.forEach((buttonNode, nodeIndex) => {
        buttonNode.addEventListener('click', () => {
            myLibrary.splice(nodeIndex, 1);

        });
    })
}

// let create a function to reset delete event on buttons 
function clickToDeleteEvent() {
    let buttonToDeleteNodeList = document.querySelectorAll('.delete');
    buttonToDeleteNodeList.forEach((buttonNode) => {
        buttonNode.addEventListener('click', () => {

            clearTableBody();
            displayBooksOnPage();

        });
    })

}
// a function to toggle status on click

function addToggleStatusEvent() {
    let buttonToToggleNodeList = document.querySelectorAll('.toggleDivContainer');
    buttonToToggleNodeList.forEach((toggleButton, buttonIndex) => {
        toggleButton.addEventListener('click', () => {
            myLibrary[buttonIndex].toggleStatus();
            // alert('hello')
        })
    })
}

function clickToToggleStatus() {
    let buttonToToggleNodeList = document.querySelectorAll('.toggleDivContainer');
    buttonToToggleNodeList.forEach((toggleButton) => {
        toggleButton.addEventListener('click', () => {
            clearTableBody();
            displayBooksOnPage();
        })
    })
}
clickToToggleStatus();
clickToDeleteEvent();