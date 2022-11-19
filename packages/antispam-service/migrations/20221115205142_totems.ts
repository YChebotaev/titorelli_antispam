import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('totems', table => {
      table.increments('totem_id')
      table.integer('tenant_id')
      table.integer('model_id')
      table.integer('author_id')
      table.dateTime('granted_at', { useTz: true })
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('totems')
}
