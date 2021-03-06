const normalize = require('../normalize-data')

exports.seed = (knex, Promise) => {
  const { authors } = normalize('./data/galvanize_reads_sample_data.csv')
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(() => {
      return Promise.all(authors.map((author) => {
        return knex('authors').insert(author)
      }))
    })
    .then(() => {
      return knex.raw(`SELECT setval('authors_id_seq', (SELECT MAX(id) FROM authors));`)
    })
}
