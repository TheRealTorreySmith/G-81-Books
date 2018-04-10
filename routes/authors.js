var express = require('express');
var router = express.Router();

const allAuthors = (req, res, next) => {
  res.render('index', { title: 'Authors Home Page' })
}

const newAuthor = (req, res, next) => {
  res.render('index', { title: 'New Authors Page' })
}

const oneAuthor = (req, res, next) => {
  res.render('index', { title: 'One Author\'s Page' })
}

const editAuthor = (req, res, next) => {
  res.render('index', { title: 'Edit Author Page' })
}

const deleteAuthor = (req, res, next) => {
  res.render('index', { title: 'Delete Author Page' })
}

router.get('/', allAuthors)
router.get('/:id', oneAuthor)
router.post('/new', newAuthor)
router.patch('/:id/edit', editAuthor)
router.delete('/:id/delete', deleteAuthor)


module.exports = router
