var express = require('express');
var router = express.Router();

const allAuthors = (req, res, next) => {
  res.render('authors', { title: 'Authors Home Page' })
}

const newAuthorPage = (req, res, next) => {
  res.render('index', { title: 'New Authors Page' })
}

const newAuthor = (req, res, next) => {

}

const oneAuthor = (req, res, next) => {
  res.render('index', { title: 'One Author\'s Page' })
}

const editAuthorPage = (req, res, next) => {
  res.render('index', { title: 'Edit Author Page' })
}

const editAuthor = (req, res, next) => {

}

const deleteAuthorPage = (req, res, next) => {
  res.render('index', { title: 'Delete Author Page' })
}

const deleteAuthor = (req, res, next) => {

}


router.get('/', allAuthors)
router.get('/new', newAuthorPage)
router.get('/:id', oneAuthor)
router.get('/:id/edit', editAuthorPage)
router.get('/:id/delete', deleteAuthorPage)
router.post('/new', newAuthor)
router.patch('/:id/edit', editAuthor)
router.delete('/:id/delete', deleteAuthor)


module.exports = router
