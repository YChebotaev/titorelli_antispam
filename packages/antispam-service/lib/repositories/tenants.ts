import { knex } from 'knex'
import knexfile from '../../knexfile'

declare module 'knex/types/tables' {
  type Tenant = {
    tenant_id: number
    name: string
  }

  interface Tables {
    tenants: Tenant
  }
}

type Tenant = import('knex/types/tables').Tenant

export const createTenant = (tenant: Omit<Tenant, 'tenant_id'>) => {
  return knex(knexfile).insert(tenant).into('tenants').returning('*')
}
