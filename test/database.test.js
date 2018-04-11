const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const AuthorService = require('../services/author_service')
const BookService = require('../services/book_service')
const knex = require('../knex')

beforeEach((done) => {
  knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex.seed.run()
    })
    .finally(() => {
      done()
    })
})

afterEach((done) => {
  knex.migrate.rollback()
    .finally(() => {
      done()
    })
})

after(() => {
  knex.destroy()
})

describe('database check', () => {
  describe('authors table', () => {
    it('should build a authorService instance', (done) => {
      const authorService = new AuthorService()
      expect(authorService).to.be.ok
      expect(authorService).to.be.an.instanceof(AuthorService)
      authorService.getAuthors()
        .then((rows) => {
          expect(rows.length).to.equal(8)
          return done()
        })
        .catch((err) => {
          return done()
        })
    })
    it('delete existing author', (done) => {
      const authorService = new AuthorService()
      authorService.deleteAuthorById(1)
        .then((row) => {
          expect(row.id).to.equal(1)
          return done()
        })
        .catch((err) => {
          return done()
        })
    })
    it('delete non-existing author', (done) => {
      const authorService = new AuthorService()
      authorService.deleteAuthorById(100)
        .then((row) => {
          expect(true).to.equal(false)
          return done()
        })
        .catch((err) => {
          expect(true).to.equal(true)
          return done()
        })
    })
  })

  describe('books table check', () => {
    it('should build a bookService instance', () => {
      const bookService = new BookService()

      expect(bookService).to.be.ok
      expect(bookService).to.be.an.instanceof(BookService)
    })
  })
})
