const BookService = require('../services/book_service')
const AuthorService = require('../services/author_service')
const authorService = new AuthorService()
const bookService = new BookService()
const express = require('express');
const knex = require('../knex')
const router = express.Router();

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
  const { title, genre, description, cover_url } = req.body
  const authorsArray = req.body.authors.split('  ').map(x => x.trim())

  bookService.insertBook({
    title,
    genre,
    description,
    cover_url
  }).then(result => {
    res.send(result)
  })

  authorService.getAuthors().then(result => {
  res.render('addBook', {
    title: 'New Books Page',
    authorList: result
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
          title: 'Book Lookup',
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
  res.render('books', { title: 'Delete Book Page' })
}

const deleteBook = (req, res, next) => {

}

router.get('/', allBooks)
router.get('/new', newBookPage)
router.get('/:id', oneBook)
router.get('/:id/edit', editBookPage)
router.get('/:id/delete', deleteBookPage)
router.post('/new', newBook)
router.patch('/:id/edit', editBook)
router.delete('/:id/delete', deleteBook)

module.exports = router
