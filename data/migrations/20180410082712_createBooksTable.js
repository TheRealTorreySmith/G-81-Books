
exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', (table) => {
    table.increments()
    table.varchar('title', 255).notNullable().defaultTo('')
    table.varchar('genre', 255).notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
    table.varchar('cover_url', 255).notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('books')
}
