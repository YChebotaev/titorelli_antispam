import { knex } from 'knex'
import knexfile from '../../knexfile'

declare module 'knex/types/tables' {
  type Model = {
    model_id: number
    tenant_id: number
    lang: 'es' | 'fa' | 'fr' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv'
    smoothing: number
    filename: string
    iv: string
    sk: string
    updated_at: Date
  }

  interface Tables {
    models: Model
  }
}

type Model = import('knex/types/tables').Model

export const getAllModels = async (tenant_id: number) => {
  return knex(knexfile).from('models').where({ tenant_id }).select()
}

export const getModel = async (tenant_id: number, model_id: number) => {
  return knex(knexfile).from('models').where({ model_id, tenant_id }).first<Model>()
}

export const createModel = async (model: Partial<Omit<Model, 'model_id' | 'updated_at'>>) => {
  return knex(knexfile)
    .from('models')
    .insert({
      ...model,
      updated_at: new Date()
    })
    .returning('*')
}

export const updateModel = async (
  {
    model_id,
    tenant_id,
    iv,
    sk,
    filename
  }: {
    model_id: number,
    tenant_id: number,
    iv: string,
    sk: string,
    filename: string
  }
) => {
  return knex(knexfile)
    .from('models')
    .where({
      model_id,
      tenant_id
    })
    .update({
      iv,
      sk,
      filename,
      updated_at: new Date()
    })
}

export const deleteModel = async (model_id: number) => {
  return knex(knexfile).from('models').where({ model_id }).delete()
}
