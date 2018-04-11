const express = require('express');
const knex = require('../knex')
const router = express.Router();

/* GET home page. */
const allBooks = (req, res, next) => {
  // knex('authors')
  knex('books')
    .then((allBooks) => {
        res.render('books', {
          title: 'New Books Page',
          allBooks
        })
    })
}

const newBookPage = (req, res, next) => {
  res.render('books', { title: 'New Books Page' })
}

const newBook = (req, res, next) => {

}

const oneBook = (req, res, next) => {
  res.render('books', { title: 'One Book\'s Page' })
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
