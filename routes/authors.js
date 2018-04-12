const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')
const AuthorService = require('../services/author_service')

const allAuthors = (req, res, next) => {
  const authorService = new AuthorService()
  authorService.getAuthors()
  .then((results) => {
    res.render('authors', {
      title: 'Authors Home Page',
      authorList: results
    })
  })
}

const newAuthorPage = (req, res, next) => {
  res.render('addAuthor', { title: 'New Author\'s Page' })
}

const newAuthor = (req, res, next) => {
  const authorService = new AuthorService()
  const body = req.body
  const author = {
    first_name: body.firstName,
    last_name: body.lastName,
    biography: body.biography,
    portrait_url: body.portraitUrl
  }
  authorService.insertAuthor(author)
    .then((data) => {
      res.render('addAuthor', {
        title: 'New Author\'s Page',
        status: 'New author has been added'
      })
    })
    .catch(err => {
      res.render('addAuthor', {
        title: 'New Authors Page',
        status : err
      })
    })
}

const editAuthorPage = (req, res, next) => {
  res.render('authors', { title: 'Edit Author Page' })
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
  res.render('delete', { title: 'Delete Author Page' })
}

const deleteAuthor = (req, res, next) => {
  const authorService = new AuthorService()
  authorService.deleteAuthorById(req.params.id)
  .then((data) => {
    res.render('deleteAuthorPage', {
      title: 'Delete Author Page'
    })
  })
}


router.get('/', allAuthors)
router.get('/new', newAuthorPage)
// router.get('/:id', oneAuthor)
router.get('/:id/edit', editAuthorPage)
router.get('/:id/delete', deleteAuthorPage)
router.post('/new', newAuthor)
router.patch('/:id/edit', editAuthor)
router.delete('/:id/delete', deleteAuthor)


module.exports = router
