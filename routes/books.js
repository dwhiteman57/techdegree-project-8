const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* */
/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}



/* GET - show full list of books */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("books/index", { books, title: "Our Current Catalog" });
}));



/* GET /books/new: Shows the create new book form */
router.get('/new', (req, res) => {
  res.render("books/new-book", { book: {}, title: "Add a new book" });
});



/* POST /books/new: Posts a new book to the database */

/* GET /books/:id - Shows book in detail form*/
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/update-book", { book, title: "Book Details" });
}));

/* POST /books/:id - Updates book info in the database */

/* POST /books/:id/delete - Deletes a book */




module.exports = router;
