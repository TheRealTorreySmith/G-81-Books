var express = require('express');
var router = express.Router();

const allAuthors = (req, res, next) => {
  res.render('authors', { title: 'Authors Home Page' })
}
//
// 'use strict';
//
// const express = require('express');
//
// // eslint-disable-next-line new-cap
// const router = express.Router();
// var knex = require('../knex')
// var humps = require('humps')
//
// router.get('/', (req, res, next) => {
//   knex('books')
//     .select('*')
//     .then((rows) => rows.sort((title1, title2) => title1.title.toUpperCase() > title2.title.toUpperCase()))
//     .then((rows) => rows.map((data) => humps.camelizeKeys(data)))
//     .then((rows) => {
//       res.json(rows)
//     })
//     .catch((err) => console.log(err))
// })
//
// router.get('/:id', (req, res, next) => {
//   const { id } = req.params
//   knex('books')
//     .select('*')
//     .where('id', id)
//     .then(rows => {
//       if (rows.length > 0) {
//         res.json(humps.camelizeKeys(rows[0]))
//       } else {
//         res.sendStatus(404)
//       }
//     })
// })

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
