const normalize = require('../normalize-data')

exports.seed = (knex, Promise) => {
  const { books } = normalize('./data/galvanize_reads_sample_data.csv')
  // Deletes ALL existing entries
  return knex('books').del()
    .then(() => {
      const promises = books.map((book) => {
        return knex('books').insert(book)
      })
      return Promise.all(promises)
    })
    .then(() => {
      return knex.raw(`SELECT setval('books_id_seq', (SELECT MAX(id) FROM books));`)
    })
}
