const knex = require('../knex')
const boom = require('boom')

const {
  authorsTable,
  booksTable,
  linksTable
} = require('./utils')

class AuthorService {
  getAuthors() {
    return knex(authorsTable)
  }

  getAuthorByName(firstName, lastName) {
    if (firstName && lastName) {
      return knex(authorsTable)
        .where({
          first_name: firstName,
          last_name: lastName
        })
    }
    throw boom.badRequest('First and last names are required')
  }

  getAuthorById(id) {
    if (id) {
      return knex(authorsTable)
        .where('id', id)
        .then((rows) => {
          if (rows.length > 0) {
            return rows[0]
          }
          throw boom.notFound()
        })
    }
    throw boom.badRequest('Author id is not required')
  }

  getAuthorByBook(bookId) {
    if (id) {
      return knex(authorsTable)
        .select(bookFields)
        .innerJoin(linksTable, 'authors.id', 'books_authors.author_id')
        .innerJoin(booksTable, 'books.id', 'books_authors.book_id')
        .where('books.id', bookId)
    }
    throw boom.badRequest('Book id is not required')
  }

  insertAuthor(author) {
    if (author.first_name && author.last_name) {
      return knex(authorsTable)
        .where({
          'first_name': author.first_name,
          'last_name': author.last_name
        })
        .first()
        .then((data) => {
          if (data) {
            console.log("conflict")
            throw boom.conflict(
              'Author "' + author.first_name + ' ' +
              author.last_name + '" already exists')
          } else {
            return knex(authorsTable)
              .insert(author)
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
    throw boom.badRequest('First and last names are required')
  }

  updateAuthor(author) {
    return knex(authorsTable)
      .update(author)
      .returning('*')
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        } else {
          throw boom.notFound()
        }
      })
      .catch((err) => {
        throw boom.badImplementation()
      })
  }

  deleteAuthorById(id) {
    if (id) {
      return knex(authorsTable)
        .del()
        .where('id', id)
        .returning('*')
        .then((rows) => {
          if (rows.length > 0) {
            return rows[0]
          } else {
            throw boom.notFound()
          }
        })
        .catch((err) => {
          throw boom.badImplementation()
        })
    }
    throw boom.badRequest('Author id is required')
  }


deleteAuthorByFirstLastName(firstName, lastName) {
  if (firstName && lastName) {
    return knex(authorsTable)
      .where({'first_name': firstName, 'last_name': lastName})
      .del()
      .returning('*')
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        } else {
          throw boom.notFound()
        }
      })
      .catch((err) => {
        throw boom.badImplementation()
      })
  }
  throw boom.badRequest('Author first and last names are required')
}
}
module.exports = AuthorService
