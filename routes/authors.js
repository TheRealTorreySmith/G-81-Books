const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')
const AuthorService = require('../services/author_service')
const BookService = require('../services/book_service')

const allAuthors = (req, res, next) => {
  const authorService = new AuthorService()
  authorService.getAuthors()
    .then((allAuthors) => {
      res.render('authors', {
        title: 'Authors Home Page',
        allAuthors
      })
    })
}

const newAuthorPage = (req, res, next) => {
  res.render('addAuthor', {
    title: 'New Author\'s Page'
  })
}

const newAuthor = (req, res, next) => {
  const authorService = new AuthorService()
  const body = req.body
  const author = {
    first_name: body.first_name,
    last_name: body.last_name,
    biography: body.biography,
    portrait_url: body.portrait_url
  }
  authorService.insertAuthor(author)
    .then((data) => {
      // res.render('addAuthor', {
      // title: 'New Author\'s Page',
      // status: 'New author has been added'
      // res.status(200).json({status: 'New author has been added'})
      console.log(data);
      res.status(200).json({
        message: 'New author has been added',
        instructions: 'In "Add a book" page you can add books for this author or in "Authors" page you can see your new author'
      })
    })
    .catch(err => {
      console.log(err);

      res.status(409).json({
        message: err.output.payload.message
      })
    })
}

const oneAuthor = (req, res, next) => {
  res.render('authors', {
    title: 'One Author\'s Page'
  })
  return knex('authors')
    .where('id', req.params.id)
    .first()
}

const editAuthorPage = (req, res, next) => {
  res.render('authors', {
    title: 'Edit Author Page'
  })
}

const editAuthor = (req, res, next) => {
  const authorService = new AuthorService()
  authorService.getAuthorById(req.params.id)
  const body = req.body
  const editedAuthor = {
    first_name: body.firstName,
    last_name: body.lastName,
    biography: body.biography,
    portrait_url: body.portraitUrl
  }
  authorService.updateAuthor(editedAuthor)
    .then((data) => {
      res.status(200).send(camelizeKeys(data))
    })
    .catch(err => {
      next(boom.notFound())
    })

}

const deleteAuthorPage = (req, res, next) => {
  console.log('id',req.params.id)
  const bookService = new BookService()
  bookService.getBookByAuthor(req.params.id)
  .then(entries => {
    // TODO: Add check if entries is empty.
    res.render('delete-author', {
      title: `Delete Author # ${req.params.id}`,
      first_name: entries[0].first_name,
      last_name: entries[0].last_name,
      biography: entries[0].biography,
      portrait_url: entries[0].portrait_url,
      book_titles: entries.map(entry => entry.book_title)
    })
  })
  .catch(err => {
    console.log('err',err)
  })
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
router.delete('/', deleteAuthor)


module.exports = router
