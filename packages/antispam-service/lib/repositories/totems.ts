import { knex } from 'knex'
import knexfile from '../../knexfile'

declare module 'knex/types/tables' {
  type Totem = {
    totem_id: number
    author_id: number
    tenant_id: number
    model_id: number
    granted_at: Date
  }

  interface Tables {
    totems: Totem
  }
}

type Totem = import('knex/types/tables').Totem

export const grantTotem = (
  tenant_id: number,
  model_id: number,
  author_id: number
) => {
  return knex(knexfile)
    .insert({
      author_id,
      tenant_id,
      model_id,
      granted_at: new Date()
    })
    .into('totems')
}

export const hasTotem = async (
  tenant_id: number,
  model_id: number,
  author_id: number
) => {
  const result = await knex(knexfile)
    .select()
    .from('totems')
    .where({
      author_id,
      tenant_id,
      model_id,
    })
    .first()

  return Boolean(result)
}

export const getAllTotems = async (tenant_id: number) => {
  return knex(knexfile).from('totems').where({ tenant_id }).select()
}
