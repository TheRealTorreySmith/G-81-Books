'use strict'

module.exports = {
  development: {
    client: 'pg',
    directory: 'data',
    connection: 'postgres://localhost/g81_reads_dev'
  },

  test: {
    client: 'pg',
    directory: 'data',
    connection: 'postgres://localhost/g81_reads_test'
  },

  production: {
    client: 'pg',
    directory: 'data',
    connection: process.env.DATABASE_URL
  }
}
