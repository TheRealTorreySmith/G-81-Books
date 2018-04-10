'use strict'
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'data', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'data', 'seeds')
    },
    connection: 'postgres://localhost/g81_reads_dev'
  },

  test: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'data', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'data', 'seeds')
    },
    connection: 'postgres://localhost/g81_reads_test'
  },

  production: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'data', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'data', 'seeds')
    },
    connection: process.env.DATABASE_URL
  }
}
