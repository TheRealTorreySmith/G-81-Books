const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const AuthorService = require('../services/author_service')
const BookService = require('../services/book_service')

describe('database check', () => {
  describe('authors table check', () => {
    let authorService;
    beforeEach((done) => {
      authorService = new AuthorService()
    })

    it('should build a authorService instance', () => {
      expect(authorService).to.be.ok
      expect(authorService).to.be.an.instanceof(AuthorService)

      authorService.getAuthors()
        .then((rows) => {
          //console.log(rows);
          done()
        })
        .catch((err) => {
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
