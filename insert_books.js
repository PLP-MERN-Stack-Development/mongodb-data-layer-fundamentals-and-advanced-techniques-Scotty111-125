const{connectDB, mongoose } = require('./connections');
const { Books } = require('./insert_books_schema');

async function main(){
    await connectDB();

    const insert_books = await Books.insertMany([
        { title: "Atomic Habits", author: "James Clear", genre: "Self-help", year_published: 2018, price: 1500, in_stock: true, pages: 320, publisher: "Penguin" },
      { title: "The Alchemist",author: "Paulo Coelho",genre: "Fiction", year_published: 1988, price: 1200, in_stock: true, pages: 208, publisher: "HarperOne" },
      { title: "Deep Work", author: "Cal Newport", genre: "Self-help", year_published: 2016, price: 1400, in_stock: true, pages: 304, publisher: "Grand Central" },
      { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", year_published: 2014, price: 1800, in_stock: false, pages: 498, publisher: "Harvill Secker" },
      { title: "1984", author: "George Orwell", genre: "Dystopian", year_published: 1949, price: 900, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
      { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year_published: 1937, price: 1100, in_stock: true, pages: 310, publisher: "Allen & Unwin" },
      { title: "The Lean Startup", author: "Eric Ries", genre: "Business", year_published: 2011, price: 1300, in_stock: false, pages: 336, publisher: "Crown" },
      { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", year_published: 2008, price: 2000, in_stock: true, pages: 464, publisher: "Prentice Hall" },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", year_published: 1997, price: 1600, in_stock: true, pages: 309, publisher: "Bloomsbury" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", year_published: 1960, price: 1000, in_stock: false, pages: 281, publisher: "J.B. Lippincott & Co." }
    ]);

    console.log("Books inserted successfuly");
    await mongoose.disconnect();

}

main();