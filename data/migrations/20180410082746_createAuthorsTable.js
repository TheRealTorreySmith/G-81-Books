
exports.up = (knex, Promise) => {
  knex.schema.createTable('authors', (table) => {
    table.increments()
    table.varchar('first_name', 255).notNullable().defaultTo('')
    table.varchar('last_name', 255).notNullable().defaultTo('')
    table.text('biography').notNullable().defaultTo('')
    table.varchar('portrait_url', 255).notNullable().defaultTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('authors')
};
