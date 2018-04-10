
exports.up = (knex, Promise) => {
  return knex.schema.createTable('books_authors', (table) => {
    table.increments()
    table.integer('book_id').notNullable()
    table.foreign('book_id').references('id').inTable('books').onDelete('cascade')
    table.integer('author_id').notNullable()
    table.foreign('author_id').references('id').inTable('authors').onDelete('cascade')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('books_authors')
}
