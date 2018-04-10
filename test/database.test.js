const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const AuthorService = require('../services/author_service')
const BookService = require('../services/book_service')

describe('database check', () => {
  describe('authors table check', () => {
    it('should build a authorService instance', () => {
      const authorService = new AuthorService()

      expect(authorService).to.be.ok
      expect(authorService).to.be.an.instanceof(AuthorService)
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
