const BookService = require('../services/book_service')
const AuthorService = require('../services/author_service')
const authorService = new AuthorService()
const bookService = new BookService()
const express = require('express');
const knex = require('../knex')
const router = express.Router();
const {
  checkBookData
} = require('./validate')

/* GET ALL BOOKS */
const allBooks = (req, res, next) => {
  knex('authors')
    .select('*')
    .then((authors) => {
    knex('books')
      .then((allBooks) => {
          res.render('books', {
            title: 'All Books',
            allBooks,
            authors
          })
      })
    })
}

const newBookPage = (req, res, next) => {
  const allAuthors = authorService.getAuthors().then(result => {
    res.render('addBook', {
      title: 'New Books Page',
      authorList: result
    })
 })
}

const newBook = (req, res, next) => {
  console.log(req.body)
  const { genre, description, cover_url } = req.body
  const title = req.body.title.trim().replace(/\w\S*/g, (x) => {return x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()})
  // const authorsArray = req.body.authors.split('  ').map(x => x.trim())
  const newBook = {
    title,
    genre,
    description,
    cover_url
  }

  bookService.insertBook(newBook)
    .then((data) => {
      res.status(200).json({
        message: `${newBook.title} has been added to the Library!`
      })
    })
    .catch(err => {
      res.status(409).json({
        message: err.output.payload.message
      })
    })
}


const oneBook = (req, res, next) => {
  knex('books')
    .join('books_authors', 'books.id', 'books_authors.book_id')
    .join('authors', 'books_authors.author_id', 'authors.id')
    .where('books.id', req.params.id)
    .then((book) => {
        res.render('searchedbook', {
          title: book[0].title,
          book_title: book[0].title,
          cover_url: book[0].cover_url,
          authors: `${book[0].first_name} ${book[0].last_name}`,
          genre: book[0].genre,
          description: book[0].description
        })
    })
}

const editBookPage = (req, res, next) => {

  res.render('books', { title: 'Edit Book Page' })
}

const editBook = (req, res, next) => {

}

const deleteBookPage = (req, res, next) => {
  knex('books')
    .join('books_authors', 'books.id', 'books_authors.book_id')
    .join('authors', 'books_authors.author_id', 'authors.id')
    .where('books.id', req.params.id)
    .then((book) => {
      res.render('delete-book', {
        title: `Delete ${book[0].title}`,
        book_title: book[0].title,
        cover_url: book[0].cover_url,
        authors: `${book[0].first_name} ${book[0].last_name}`,
        genre: book[0].genre,
        description: book[0].description
      })
    })
}

const deleteBook = (req, res, next) => {
  knex('books')
    .where('books.id', req.params.id)
    .then((book) => {
      console.log(book)
    })  
}

router.get('/', allBooks)
router.get('/new', newBookPage)
router.get('/:id', oneBook)
router.get('/:id/edit', editBookPage)
router.get('/:id/delete', deleteBookPage)
router.post('/new', checkBookData, newBook)
router.patch('/:id/edit', editBook)
router.delete('/:id/delete', deleteBook)

module.exports = router
