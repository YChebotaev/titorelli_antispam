import { knex } from 'knex'
import knexfile from '../../knexfile'

declare module 'knex/types/tables' {
  type Example = {
    example_id: number
    model_id: number
    tenant_id: number
    author_id?: number
    text: string
    label: 'spam' | 'ham'
    updated_at: Date
  }

  interface Tables {
    examples: Example
  }
}

type Example = import('knex/types/tables').Example

export const getExamplesSince = async (
  tenant_id: number,
  since: Date,
  { size = 1000, offset = 0 }: Partial<{ size: number, offset: number }> = {}
) => {
  return knex(knexfile)
    .from('examples')
    .orderBy('updated_at')
    .where({ tenant_id })
    .where('updated_at', '>=', since)
    .limit(size)
    .offset(offset)
}

export const getAllExamples = async (
  tenant_id: number,
  { size = 1000, offset = 0 }: Partial<{ size: number, offset: number }> = {}) => {
  return knex(knexfile)
    .select()
    .from('examples')
    .orderBy('updated_at')
    .where({ tenant_id })
    .limit(size)
    .offset(offset)
}

export const queryExamples = async (
  {
    tenant_id,
    model_id,
    author_id,
    since,
    page = 0,
    size = 100
  }: Partial<{
    tenant_id: number
    model_id: number
    page: number
    size: number
    author_id: number
    since: Date
  }>
) => {
  let r = knex(knexfile)
    .from('examples')
  
  if (tenant_id) r = r.where('tenant_id', '=', tenant_id)
  if (model_id) r = r.where('model_id', '=', model_id)
  if (author_id) r = r.where('author_id', '=', author_id)
  if (since) r = r.where('updated_at', '>=', since)

  r = r.offset(page * size)
  r = r.limit(size)

  return r.select()
}

export const createExample = (example: Omit<Example, 'example_id' | 'updated_at'>) => {
  return knex(knexfile)
    .insert({
      ...example,
      updated_at: new Date()
    })
    .into('examples')
}

export const deleteExample = (example_id: number) => {
  return knex('examples').where({ example_id }).delete()
}
