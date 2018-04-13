const knex = require('../knex')
const boom = require('boom')
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
    if (title) {
      return knex(booksTable)
        .where('title', title)
    }
    throw boom.badRequest('Title is required')
  }

  getBookByGenre(genre) {
    if (genre) {
      return knex(booksTable)
        .where('genre', genre)
    }
    throw boom.badRequest('Genre is required')
  }

  getBookById(id) {
    if (id) {
      return knex(booksTable)
        .where('id', id)
        .then((rows) => {
          if (rows.length > 0) {
            return rows[0]
          }
          throw boom.notFound()
        })
    }
    throw boom.badRequest('Id is required')
  }

  getBookByAuthor(authorId) {
    if (authorId) {
      return knex(booksTable)
        .select(bookFields)
        .innerJoin(linksTable, 'books.id', 'books_authors.book_id')
        .innerJoin(authorsTable, 'authors.id', 'books_authors.author_id')
        .where('authors.id', authorId)
    }
    throw boom.badRequest('Author Id is required')
  }

  insertBook(book) {
    console.log(book)
      if (book.title && book.genre) {
        return knex(booksTable)
          .where({
            'title': book.title
          })
          .first()
          .then((data) => {
            if (data) {
              console.log("conflict")
              throw boom.conflict(`Whoops. The book "${book.title}" already exisits.`)
            } else {
              return knex(booksTable)
                .insert(book)
                .returning('*')
                .then((rows) => {
                  if (rows.length > 0) {
                    return rows[0]
                  } else {
                    throw boom.notFound()
                  }
                }).catch((err) => {
                  console.log("boom 1", err)
                  throw boom.badImplementation()
                })
            }
          })
          .catch((err) => {
            console.log("boom 2", err)
            throw err.isBoom ? err :
              boom.badImplementation()
          })
      }
      console.log("boom badRequest")
      throw boom.badRequest('Title and genre are required')
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
          throw boom.notFound()
        }
      })
      .catch((err) => {
        throw boom.badImplementation()
      })
  }

  deleteBookById(id) {
    if (id) {
      return knex(booksTable)
        .del()
        .where('id', id)
        .returning('*')
        .then((rows) => {
          if (rows.length > 0) {
            return rows[0]
          }
          else {
            throw boom.notFound()
          }
        })
        .catch((err) => {
          throw boom.badImplementation()
        })
    }
    throw boom.badRequest('Book is is required')
  }
}

module.exports = BookService
