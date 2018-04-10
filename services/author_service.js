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
    return knex(authorsTable)
      .where({
        first_name: firstName,
        last_name: lastName
      })
  }

  getAuthorById(id) {
    return knex(authorsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length > 0) {
          return rows[0]
        }
        return boom.notFound()
      })
  }
}

module.exports = AuthorService
