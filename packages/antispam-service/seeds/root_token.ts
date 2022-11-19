import process from 'node:process'
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tokens").del();

    // Inserts seed entries
    await knex("tokens").insert([
        {
            token_id: 0,
            token: process.env['SEED_ROOT_TOKEN'],
            kind: 'root',
            issued_at: new Date(),
            revoked: false
        }
    ]);
};
