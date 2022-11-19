import { knex } from 'knex'
import knexfile from '../../knexfile'

declare module 'knex/types/tables' {
  type Token = {
    token_id: number
    tenant_id: number
    become_tenant_id: number
    token: string
    kind: 'access' | 'refresh' | 'root' | 'become'
    issued_at: Date
    valid_until: Date
    revoked: boolean
    revoked_at: Date
  }

  interface Tables {
    tokens: Token
  }
}

type Token = import('knex/types/tables').Token
