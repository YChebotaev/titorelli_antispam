import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('examples', table => {
      table.increments('example_id')
      table.integer('model_id')
      table.integer('tenant_id')
      table.integer('author_id')
      table.text('text')
      table.string('label')
      table.dateTime('updated_at')
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('examples')
}
