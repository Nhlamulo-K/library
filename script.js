function Book(title, author, pages, read=false) {
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

    // User management system
const userSystem = {
    users: {},
    currentUser: null,
    
    login: function(username) {
        if (!username.trim()) return false;
        
        if (!this.users[username]) {
            this.users[username] = { books: [] };
        }
        
        this.currentUser = username;
        this.showAppContent();
        document.getElementById('currentUser').textContent = username;
        library.displayBooks();
        
        console.log(`Welcome ${username}!`);
        return true;
    },
    
    logout: function() {
        this.currentUser = null;
        this.showLoginSection();
        console.log('Signed out successfully');
    },
    
    showLoginSection: function() {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('appContent').style.display = 'none';
    },
    
    showAppContent: function() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('appContent').style.display = 'block';
    },
    
    getCurrentUserBooks: function() {
        if (!this.currentUser) return [];
        return this.users[this.currentUser].books;
    }
};

    // Library management
const library = {
    books: [],
    
    addBook: function(title, author, pages, read = false) {
        if (!userSystem.currentUser) return;

        const newBook = new Book(title, author, pages, read);
        userSystem.users[userSystem.currentUser].books.push(newBook);
        this.displayBooks();
        console.log(`Added: ${newBook.info()}`);
    },
    
    removeBook: function(title) {
        if (!userSystem.currentUser) return;
        
        const books = userSystem.users[userSystem.currentUser].books;
        const index = books.findIndex(book => book.title === title);
        if (index !== -1) {
            const removedBook = books.splice(index, 1)[0];
            this.displayBooks();
            console.log(`Removed: ${removedBook.title}`);
        } else {
            console.log(`Book "${title}" not found in library`);
        }
    },
    
    toggleBookRead: function(title) {
        if (!userSystem.currentUser) return;

        const books = userSystem.users[userSystem.currentUser].books;
        const book = books.find(book => book.title === title);
        if (book) {
            book.toggleRead();
            this.displayBooks();
            const status = book.read ? "read" : "unread";
            console.log(`Toggled "${title}" to ${status}`);
        }
    },
    
    displayBooks: function() {
        const bookList = document.getElementById('bookList');
        const books = userSystem.getCurrentUserBooks();
        
        if (this.books.length === 0) {
            bookList.innerHTML = '<div class="empty-library">No books in your library yet. Add one above!</div>';
            return;
        }
        
        bookList.innerHTML = books.map(book => `
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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        if (userSystem.login(username)) {
            document.getElementById('usernameInput').value = '';
        }
    });
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        userSystem.logout();
    });

    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const pages = parseInt(document.getElementById('pages').value);
        const read = document.getElementById('read').checked;
        
        if (title && author && pages > 0) {
            library.addBook(title, author, pages, read);
            this.reset();
            document.getElementById('title').focus();
        }
    });

    document.getElementById('usernameInput').focus();
});