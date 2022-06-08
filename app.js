let myLibary = [];
const addButton = document.querySelector('.add-btn');
const bookForm = document.querySelector('.form-container');
const addBook = document.querySelector(`form`);


addButton.addEventListener('click', (e) => {
    formControl()

})


function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    
}


Book.prototype.isRead = function() {
    if (this.status === 'Read') {
        this.status = 'Not Read'
    } else {
        this.status = 'Read'
    }

    
}


function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    let status;

    if (document.querySelector('#status').checked) {
        status = 'Read'
    } else {
        status = 'Not Read'
    }
        
    addBook.reset()

    const book = new Book(title, author, pages, status);
    myLibary.push(book)
        
}


function displayBook() {
    
   myLibary.forEach((book, index) => {
        const bookCase = document.querySelector('.book-case');

        const div = document.createElement('div');
        div.dataset.index = `${index}`;
        div.classList.add('book');
        div.textContent = '';

        const bookTitle = document.createElement('p');
        bookTitle.textContent = `${book.title}`;
        div.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `${book.author}`;
        div.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `${book.pages} pages`;
        div.appendChild(bookPages);

        const bookStatus = document.createElement('p');
        bookStatus.textContent = `${book.status}`;
        bookStatus.classList.add('status');
        div.appendChild(bookStatus);

        if (bookStatus.textContent === 'Read') {
            bookStatus.classList.add('read');
        }

        const bookDelete = document.createElement('p');
        bookDelete.classList.add('btn')
        bookDelete.classList.add('delete')
        bookDelete.textContent = `Delete`;
        div.appendChild(bookDelete);

        bookCase.appendChild(div)

        const availabeIndices = {};
        for (const item of document.querySelectorAll('.book')) {
            if (availabeIndices[item.dataset.index]) {
                item.parentNode.removeChild(item)
            }else {
                availabeIndices[item.dataset.index] = true;
            }
        }

   })


    const deleteButton = document.querySelectorAll('.delete');
                
    deleteButton.forEach(remove => {
        remove.addEventListener('click', (e) => {
            const parent = e.target.parentElement;
                parent.remove();
                
                const parentIndex = parent.dataset.index;
                myLibary.splice(parentIndex, 1);
            
        })
    })

    const toggleButton = document.querySelectorAll('.status');
    
        toggleButton.forEach(change => {
            change.addEventListener('click', toggleStatus)

        })
        
        function toggleStatus(e) {
            let idx = e.target.parentElement.dataset.index;
            
            myLibary[idx].isRead()
            e.target.textContent = myLibary[idx].status
            e.target.classList.toggle('read')
                        
        }

            
}


function formControl() {
    bookForm.classList.add("display-form");

    const cancelButton = document.querySelector('.cancel');
    
    cancelButton.addEventListener('click', () => {
        bookForm.classList.remove("display-form");
    })

    window.addEventListener('click', (e) => {
        if (e.target.className.includes('form-container')) {
        bookForm.classList.remove("display-form");
        }
    })

   
    
}



addBook.addEventListener('submit', (e) => {
    e.preventDefault()
    addBookToLibrary()

    bookForm.classList.remove("display-form");

    displayBook()
})

