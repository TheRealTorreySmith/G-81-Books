const normalize = require('../normalize-data')

exports.seed = function(knex, Promise) {
  const { mapping } = normalize('./data/galvanize_reads_sample_data.csv')
  // Deletes ALL existing entries
  return knex('books_authors').del()
    .then(() => {
      return Promise.all(mapping.map((row) => {
        return knex('books_authors').insert(row)
      }))
    })
}
