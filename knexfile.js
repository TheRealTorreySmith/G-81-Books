'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/g81_reads_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/g81_reads_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
