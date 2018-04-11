const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const AuthorService = require('../services/author_service')
const BookService = require('../services/book_service')

describe('database check', () => {
  describe('authors table check', () => {
    xit('should build a authorService instance', () => {
      const authorService = new AuthorService()
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
    it('delete author', (done) => {
      const authorService = new AuthorService()
      authorService.deleteAuthorById(1)
        .then((row) => {
          console.log(row)
          expect(row.id).to.equal(1)
        })
      done()
    })
  })

  xdescribe('books table check', () => {
    it('should build a bookService instance', () => {
      const bookService = new BookService()

      expect(bookService).to.be.ok
      expect(bookService).to.be.an.instanceof(BookService)
    })
  })
})
