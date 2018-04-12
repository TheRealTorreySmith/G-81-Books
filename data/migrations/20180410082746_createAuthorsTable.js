
exports.up = (knex, Promise) => {
  return knex.schema.createTable('authors', (table) => {
    table.increments()
    table.varchar('first_name', 255).notNullable()
    table.varchar('last_name', 255).notNullable()
    table.text('biography').notNullable().defaultTo('')
    table.varchar('portrait_url', 255).notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('authors')
}
