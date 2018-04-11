const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')

const allAuthors = (req, res, next) => {
  res.render('authors', { title: 'Authors Home Page' })
}


const newAuthorPage = (req, res, next) => {
  res.render('authors', { title: 'New Authors Page' })
}

const newAuthor = (req, res, next) => {
  const body = req.body
  const author = {
    first_name: body.firstName,
    last_name: body.lastName,
    biography: body.biography,
    portrait_url: body.portraitUrl
  }
  const errors = {
    first_name: boom.badRequest('First name must not be blank'),
    last_name: boom.badRequest('Last Name must not be blank'),
    biography:  boom.badRequest('Biography must not be blank'),
    portrait_url: boom.badRequest('Portrait URL must not be blank')
  }
  for (let key in author) {
    if (!author[key]) {
      next(errors[key])
    }
  }
  knex ('authors')
    .where({first_name: body.firstName, last_name:body.lastName})
    .first()
    .then(([result]) => {
      if(result) {
        next(Boom.conflict('Author already exists'))
      } else {
        knex('authors')
          .insert(decamelizeKeys(author), '*')
          .then(([data]) => {
            //should render success status message
            res.render('authors', { title: 'New Authors Page' })
          })
          .catch(err => {
            next(err)
          })
      }

    })
    .catch(err => {
      next(err)
    })
}

const oneAuthor = (req, res, next) => {
  res.render('authors', { title: 'One Author\'s Page' })
}

const editAuthorPage = (req, res, next) => {
  res.render('authors', { title: 'Edit Author Page' })
}

const editAuthor = (req, res, next) => {
  const body = req.body
  const { id } = req.params
  if(isNaN(id)) next(boom.notFound())
  const editedAuthor = {
    first_name: body.firstName,
    last_name: body.lastName,
    biography: body.biography,
    portrait_url: body.portraitUrl
  }
  knex('authors')
  .where('id', id)
  .then(author => {
    if(author.length <= 0) next(boom.notFound())
    knex('author')
      .where('id', id)
      .limit(1)
      .update(editedAuthor)
      .returning('*')
      .then(([data]) => {
        res.status(200).send(camelizeKeys(data))
      })
      .catch(err => {
        next(boom.notFound())
      })
    })
  .catch(err => {
    next(boom.notFound())
  })
}

const deleteAuthorPage = (req, res, next) => {
  res.render('authors', { title: 'Delete Author Page' })
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
