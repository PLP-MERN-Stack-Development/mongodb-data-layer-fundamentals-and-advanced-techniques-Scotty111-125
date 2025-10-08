const { connectDB, mongoose } = require('./connections');
const { Books } = require('./insert_books_schema');

async function main() {
  await connectDB();

  // 1️ Find all books in a specific genre
  const fictionBooks = await Books.find({ genre: "Fiction" });
  console.log("Fiction books:", fictionBooks);

  // 2️ Find books published after a certain year
  const recentBooks = await Books.find({ published_year: { $gt: 2015 } });
  console.log("Books published after 2015:", recentBooks);

  // 3️ Find books by a specific author
  const authorBooks = await Books.find({ author: "James Clear" });
  console.log("Books by James Clear:", authorBooks);

  // 4️ Update the price of a specific book
  await Books.updateOne({ title: "Atomic Habits" }, { $set: { price: 1800 } });
  console.log("Updated price for Atomic Habits");

  // 5️ Delete a book by its title
  await Books.deleteOne({ title: "1984" });
  console.log("Deleted book 1984");

  await mongoose.disconnect();
}

//ADVANCED QUERIES

async function main() {
  await connectDB();

  // 1️ Books in stock and published after 2010
  const availableRecentBooks = await Books.find({ in_stock: true, published_year: { $gt: 2010 } });
  console.log("Books in stock & published after 2010:", availableRecentBooks);

  // 2️ Projection (only title, author, price)
  const projectedBooks = await Books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
  console.log("Projected fields:", projectedBooks);

  // 3️ Sort by price ascending
  const sortedAsc = await Books.find().sort({ price: 1 });
  console.log("Books sorted by price (asc):", sortedAsc);

  // 4️ Sort by price descending
  const sortedDesc = await Books.find().sort({ price: -1 });
  console.log("Books sorted by price (desc):", sortedDesc);

  // 5️ Pagination (5 books per page)
  const page = 1; // change this to 2, 3, etc.
  const limit = 5;
  const skip = (page - 1) * limit;
  const paginatedBooks = await Books.find().skip(skip).limit(limit);
  console.log(`Page ${page} books:`, paginatedBooks);

  await mongoose.disconnect();
}

//AGGREGATION PIPELINES



async function main() {
  await connectDB();

  // 1️ Average price of books by genre
  const avgPriceByGenre = await Books.aggregate([
    { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
  ]);
  console.log("Average price by genre:", avgPriceByGenre);

  // 2️ Author with the most books
  const topAuthor = await Books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  console.log("Author with the most books:", topAuthor);

  // 3️ Group books by publication decade
  const booksByDecade = await Books.aggregate([
    {
      $group: {
        _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
        count: { $sum: 1 }
      }
    }
  ]);
  console.log("Books grouped by decade:", booksByDecade);

  await mongoose.disconnect();
}




main();
