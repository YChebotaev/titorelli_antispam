import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tenants").del();

    // Inserts seed entries
    await knex("tenants").insert([
        {
            tenant_id: 0,
            name: 'Jacob'
        }
    ]);
};
