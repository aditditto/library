//inputs
const submitForm = document.getElementById('new-book-form');
const titleBox = document.getElementById('title');
const authorBox = document.getElementById('author');
const pagesBox = document.getElementById('pages');
const yesRadio = document.getElementById('yes');
const formShow = document.getElementById('form-show');
const formContainer = document.getElementById('form-container');

//table columns
const titleCol = document.getElementById('title-col');
const authorCol = document.getElementById('author-col');
const pagesCol = document.getElementById('pages-col');
const readCol = document.getElementById('read-col');
const delCol = document.getElementById('del-col')

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read === 'Yes' ? true : false
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`
}

Book.prototype.changeReadStatus = function() {
    this.read = this.read ? false : true
}

function zip(a, b) {
    var c = a.map(function(e, i) {
        return [e, b[i]];
      });
    return c
}

function createBook() {
    let title = titleBox.value
    let author = authorBox.value
    let pages = pagesBox.value
    let read = yesRadio.checked ? 'Yes' : 'No'
    myLibrary.push(new Book(title, author, pages, read))
}

function render() {
    myLibrary.forEach((book, index) => {
        //rendering title author and pages
        let pairs = zip([book.title, book.author, book.pages], [titleCol, authorCol, pagesCol])
        pairs.forEach(pair => {
            let val = pair[0]; let container = pair[1];
            let newP = document.createElement('p')
            newP.textContent = String(val)
            container.appendChild(newP)
        })
        //rendering read or not
        let newP = document.createElement('button')
        console.log(`${book.title} ${book.read}`)
        newP.textContent = book.read ? 'Yes' : 'No'
        newP.setAttribute('data-idx', String(index))
        newP.addEventListener('click', updateRead)
        readCol.appendChild(newP)
        //rendering delete button
        let newDel = document.createElement('button')
        newDel.textContent = 'X'
        newDel.setAttribute('data-idx', String(index))
        newDel.addEventListener('click', removeRow)
        delCol.appendChild(newDel)
    })
}

function clearCols() {
    [authorCol, titleCol, pagesCol, readCol, delCol].forEach(column => {
        column.innerHTML = ''
    })
}

function removeRow(e) {
    index = parseInt(e.target.getAttribute('data-idx'))
    myLibrary.splice(index, 1)
    clearCols()
    render()
}

function updateRead(e) {
    index = parseInt(e.target.getAttribute('data-idx'))
    book = myLibrary[index]
    book.changeReadStatus()
    e.target.textContent = book.read ? 'Yes' : 'No'
}

function addBook(e) {
    e.preventDefault();
    clearCols()
    createBook()
    submitForm.reset()
    render(myLibrary.slice(-1))
}

formContainer.style.display = 'none';
function showHideForm() {
    console.log(formContainer.style.display)
    if (formContainer.style.display !== 'none') {
        formContainer.style.display = 'none';
    }
    else {
        formContainer.style.display = 'block';
    }
}

submitForm.addEventListener('submit', addBook)

formShow.addEventListener('click', showHideForm)

book1 = new Book('poop', 'me', 69, 'Yes')
myLibrary.push(book1)

render()
console.log(Object.values(book1))
