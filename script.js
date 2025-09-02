function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        const readStatus = this.read ? "Already read!" : "Not read yet!"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
    };

    this.toggleRead = function() {
                this.read = !this.read;
            };
        }

        // Library management
        const library = {
            books: [],
            
            addBook: function(title, author, pages, read = false) {
                const newBook = new Book(title, author, pages, read);
                this.books.push(newBook);
                this.displayBooks();
                console.log(`Added: ${newBook.info()}`);
            },
            
            removeBook: function(title) {
                const index = this.books.findIndex(book => book.title === title);
                if (index !== -1) {
                    const removedBook = this.books.splice(index, 1)[0];
                    this.displayBooks();
                    console.log(`Removed: ${removedBook.title}`);
                } else {
                    console.log(`Book "${title}" not found in library`);
                }
            },
            
            toggleBookRead: function(title) {
                const book = this.books.find(book => book.title === title);
                if (book) {
                    book.toggleRead();
                    this.displayBooks();
                    const status = book.read ? "read" : "unread";
                    console.log(`Toggled "${title}" to ${status}`);
                }
            },
            
            displayBooks: function() {
                const bookList = document.getElementById('bookList');
                
                if (this.books.length === 0) {
                    bookList.innerHTML = '<div class="empty-library">No books in your library yet. Add one above!</div>';
                    return;
                }
                
                bookList.innerHTML = this.books.map(book => `
                    <div class="book-item">
                        <div class="book-info">
                            <strong>${book.title}</strong> by ${book.author}<br>
                            <small>${book.pages} pages • 
                                <span class="${book.read ? 'read-status' : 'unread-status'}">
                                    ${book.read ? 'Read' : 'Not read yet'}
                                </span>
                            </small>
                        </div>
                        <div class="book-actions">
                            <button class="btn-small btn-toggle" onclick="library.toggleBookRead('${book.title}')">
                                ${book.read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                            <button class="btn-small btn-remove" onclick="library.removeBook('${book.title}')">
                                Remove
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        };

        // Form handling
        document.getElementById('bookForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const pages = parseInt(document.getElementById('pages').value);
            const read = document.getElementById('read').checked;
            
            if (title && author && pages > 0) {
                library.addBook(title, author, pages, read);
                
                // Clear the form
                this.reset();
                
                // Focus back on title field for easy next entry
                document.getElementById('title').focus();
            }
        });

        // Initial focus on title field
        document.getElementById('title').focus();
