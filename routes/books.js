var express = require('express');
var router = express.Router();

/* GET home page. */
const allBooks = (req, res, next) => {
  res.render('index', { title: 'Books Home Page' })
}

const newBook = (req, res, next) => {
  res.render('index', { title: 'New Books Page' })
}

const oneBook = (req, res, next) => {
  res.render('index', { title: 'One Book\'s Page' })
}

const editBook = (req, res, next) => {
  res.render('index', { title: 'Edit Book Page' })
}

const deleteBook = (req, res, next) => {
  res.render('index', { title: 'Delete Book Page' })
}

router.get('/', allBooks)
router.get('/:id', oneBook)
router.post('/new', newBook)
router.patch('/:id/edit', editBook)
router.delete('/:id/delete', deleteBook)


module.exports = router
