import { Knex } from "knex";
// import { readJSONSync } from 'fs-extra'
// import { writeModel } from '../lib/modelIO'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("models").del();

    // const model = readJSONSync('data/classifiers/react_ru.classifier.json');
    // const modelJSON = JSON.parse(JSON.stringify(model));
    // const { iv, sk } = await writeModel(modelJSON, 'react_ru.classifier.emp', 'data');

    // Inserts seed entries
    await knex("models").insert([
        {
            model_id: 0,
            tenant_id: 0,
            lang: 'ru',
            smoothing: 1.0,
            // filename: 'react_ru.classifier.emp',
            // iv: iv.toString('base64'),
            // sk: sk.toString('base64'),
            updated_at: new Date()
        }
    ]);
};
