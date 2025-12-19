const books = document.getElementById("books");
const myLibrary = [];

function Book(title, author, pages, read)
{
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    display();
}

function display()
{
    books.innerHTML = "";

    for(let book of myLibrary) {
        const div = document.createElement("div");
        const titles = document.createElement("h2");
        const author_name = document.createElement("p");
        const total_pages = document.createElement("p");
        const read_ornot = document.createElement("button");
        const remove = document.createElement("button");
        
        titles.textContent = `Title: ${book.title}`;
        author_name.textContent = `Author: ${book.author}`;
        total_pages.textContent = `Total Pages: ${book.pages}`;
        
        read_ornot.classList.add("toggle-btn");
        remove.classList.add("remove-btn");

        if(book.read) {
            read_ornot.textContent = "read"
            read_ornot.classList.add(`read-btn`);
        }
        else {
            read_ornot.textContent = "not read";
            read_ornot.classList.add(`not-read-btn`);
        }

        remove.textContent = "remove";

        div.dataset.id = book.id;
        div.append(titles,author_name,total_pages,read_ornot,remove);
        books.appendChild(div); 

        read_ornot.addEventListener("click", () => {
            book.toggleRead();
            display();
        });

        remove.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            display();
        });
    }   
}

function setupForm() {
    const dialog = document.getElementById("book-dialog");
    const openBtn = document.getElementById("new-book-btn");
    const form = dialog.querySelector("form");  
    const cancelBtn = document.getElementById("cancel");

    openBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        addBookToLibrary(title, author, pages, read);
        form.reset();
        dialog.close();
    });

    cancelBtn.addEventListener("click", () => {
        dialog.close();
        form.reset();
    });
}

function defaultBooks() {
    myLibrary.push(
        new Book("The Hobbit", "J.R.R. Tolkien", 295, false),
        new Book("1984", "George Orwell", 328, true)
    );
    display();
}

defaultBooks();
setupForm();