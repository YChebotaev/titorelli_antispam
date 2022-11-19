import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tokens', table => {
      table.increments('token_id')
      table.integer('tenant_id').defaultTo(null /* for root token */)
      table.string('token')
      table.enum('kind', ['access', 'refresh', 'root', 'become'])
      table.dateTime('issued_at', { useTz: true })
      table.dateTime('valid_until').defaultTo(null /* for root token */)
      table.boolean('revoked')
      table.dateTime('revoked_at', { useTz: true }).defaultTo(null /* for root token */)
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('tokens')
}
