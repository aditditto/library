//inputs
const submitBtn = document.getElementById('newBook');
const titleBox = document.getElementById('title');
const authorBox = document.getElementById('author');
const pagesBox = document.getElementById('pages');
const yesRadio = document.getElementById('yes');

//table columns
const titleCol = document.getElementById('title-col');
const authorCol = document.getElementById('author-col');
const pagesCol = document.getElementById('pages-col');
const readCol = document.getElementById('read-col');

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

function clearForm() {
    [titleBox, authorBox, pagesBox].forEach(box => {
        box.value = ''
    })
}

function render() {
    myLibrary.forEach(book => {
        let pairs = zip(Object.values(book).slice(0, 3), [titleCol, authorCol, pagesCol])
        pairs.forEach(pair => {
            let val = pair[0]; let container = pair[1];
            let newP = document.createElement('p')
            newP.textContent = String(val)
            container.appendChild(newP)
        })
        let newP = document.createElement('p')
        newP.textContent = Object.values(book)[4] ? 'Yes' : 'No'
        readCol.appendChild(newP)
    })
}

function addBook() {
    createBook()
    clearForm()
    render()
}

submitBtn.addEventListener('click', addBook)

book1 = new Book('poop', 'me', 69, 'Yes')
myLibrary.push(book1)

console.log(book1.info())
console.log(myLibrary)
console.log(Object.values(book1))
