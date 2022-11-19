import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("examples").del();

    // Inserts seed entries
    await knex("examples").insert([
        {
            example_id: 0,
            model_id: 0,
            tenant_id: 0,
            text: 'Привет',
            label: 'ham',
            updated_at: new Date()
        },
        {
            example_id: 1,
            model_id: 0,
            tenant_id: 0,
            text: 'Андрей',
            label: 'spam',
            updated_at: new Date()
        }
    ]);
};
