import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('models', table => {
      table.increments('model_id')
      table.integer('tenant_id')
      table.string('lang')
      table.integer('smoothing')
      table.string('filename')
      table.string('iv')
      table.string('sk')
      table.dateTime('updated_at', { useTz: true })
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('models')
}
