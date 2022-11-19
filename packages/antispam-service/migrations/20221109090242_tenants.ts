import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tenants', table => {
      table.increments('tenant_id')
      table.string('name')
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('tenants')
}
