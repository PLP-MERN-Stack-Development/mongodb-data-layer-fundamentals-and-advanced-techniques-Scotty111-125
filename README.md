#  PLP Bookstore – MongoDB Assignment

##  Overview
This project demonstrates basic and advanced MongoDB operations using **Node.js** and **Mongoose**.  
It includes database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing — all applied to a sample bookstore system.

---

##  Task 1: MongoDB Setup

###  Steps Completed
1. Installed **MongoDB** locally and connected via **MongoDB Compass**.
2. Created a database called **`plp_bookstore`**.
3. Created a collection called **`books`**.

###  Connection Setup
- The connection was configured using **Mongoose** and an `.env` file.

**connections.js**
```js
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MONGODB !');
}

module.exports = { connectDB, mongoose };
```

**.env**
```
MONGODB_URI=mongodb://localhost:27017/plp_bookstore
```

---

##  Task 2: Basic CRUD Operations

###  Insert Documents
Books were inserted using the file `insert_books.js`:
```js
const { connectDB, mongoose } = require('./connections');
const { Books } = require('./insert_books_schema');

async function main() {
  await connectDB();

  await Books.insertMany([
    { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 1500, in_stock: true, pages: 320, publisher: "Penguin" },
    { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988, price: 1200, in_stock: true, pages: 208, publisher: "HarperOne" },
    { title: "Deep Work", author: "Cal Newport", genre: "Self-help", published_year: 2016, price: 1400, in_stock: true, pages: 304, publisher: "Grand Central" },
    { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2014, price: 1800, in_stock: false, pages: 498, publisher: "Harvill Secker" },
    { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 900, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 1100, in_stock: true, pages: 310, publisher: "Allen & Unwin" },
    { title: "The Lean Startup", author: "Eric Ries", genre: "Business", published_year: 2011, price: 1300, in_stock: false, pages: 336, publisher: "Crown" },
    { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", published_year: 2008, price: 2000, in_stock: true, pages: 464, publisher: "Prentice Hall" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, price: 1600, in_stock: true, pages: 309, publisher: "Bloomsbury" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", published_year: 1960, price: 1000, in_stock: false, pages: 281, publisher: "J.B. Lippincott & Co." }
  ]);

  console.log("Books inserted successfully");
  await mongoose.disconnect();
}

main();
```

---

###  CRUD Queries (Run in MongoDB Shell or Compass)

**1️ Find all books in a specific genre**
```js
db.books.find({ genre: "Fantasy" });
```

**2️ Find books published after a certain year**
```js
db.books.find({ published_year: { $gt: 2010 } });
```

**3️ Find books by a specific author**
```js
db.books.find({ author: "James Clear" });
```

**4️ Update the price of a specific book**
```js
db.books.updateOne({ title: "1984" }, { $set: { price: 950 } });
```

**5️ Delete a book by its title**
```js
db.books.deleteOne({ title: "The Lean Startup" });
```

---

##  Task 3: Advanced Queries

**1️ Find books that are in stock and published after 2010**
```js
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
```

**2️ Projection (show only title, author, and price)**
```js
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
```

**3️ Sort by price ascending**
```js
db.books.find().sort({ price: 1 });
```

**4️ Sort by price descending**
```js
db.books.find().sort({ price: -1 });
```

**5️ Pagination (5 books per page)**
```js
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2
```

---

##  Task 4: Aggregation Pipelines

**1️ Average price of books by genre**
```js
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
]);
```

**2️ Author with the most books**
```js
db.books.aggregate([
  { $group: { _id: "$author", total_books: { $sum: 1 } } },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
]);
```

**3️ Group books by publication decade**
```js
db.books.aggregate([
  { $group: {
      _id: { $subtract: [ { $divide: [ "$published_year", 10 ] }, { $mod: [ { $divide: [ "$published_year", 10 ] }, 1 ] } ] },
      total_books: { $sum: 1 }
  }}
]);
```

---

##  Task 5: Indexing

**1️ Create an index on the title field**
```js
db.books.createIndex({ title: 1 });
```

**2️ Create a compound index on author and published_year**
```js
db.books.createIndex({ author: 1, published_year: -1 });
```

**3️ Use `explain()` to compare performance**
```js
db.books.find({ title: "Sapiens" }).explain("executionStats");
```

---

##  Results
- All connections and inserts verified via **MongoDB Compass**.
- Successfully inserted and queried 10 book documents.
- Aggregation and indexing performed as required.

---

