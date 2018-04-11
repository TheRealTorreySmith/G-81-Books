const knex = require('../knex')
const {
  authorsTable,
  booksTable,
  linksTable,
  bookFields
} = require('./utils')

class BookService {
  getBooks() {
    return knex(booksTable)
  }

  getBookByTitle(title) {
    return knex(booksTable)
      .where('title', title)
  }

  getBookByGenre(genre) {
    return knex(booksTable)
      .where('genre', genre)
  }

  getBookById(id) {
    return knex(booksTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        }
        return boom.notFound()
      })
  }

  getBookByAuthor(authorId) {
    return knex(booksTable)
      .select(bookFields)
      .innerJoin(linksTable, 'books.id', 'books_authors.book_id')
      .innerJoin(authorsTable, 'authors.id', 'books_authors.author_id')
      .where('authors.id', authorId)
  }

  insertBook(book) {
    return knex(booksTable)
      .insert(book)
      .returning('*')
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        }
        else {
          return boom.notFound()
        }
      })
      .catch((err) => {
        return boom.badImplementation()
      })
  }

  updateBook(book) {
    return knex(booksTable)
      .update(book)
      .returning('*')
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        }
        else {
          return boom.notFound()
        }
      })
      .catch((err) => {
        return boom.badImplementation()
      })
  }

  deleteBookById(id) {
    return knex(booksTable)
      .del()
      .where('id', id)
      .returning('*')
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        }
        else {
          return boom.notFound()
        }
      })
      .catch((err) => {
        return boom.badImplementation()
      })
  }
}

module.exports = BookService