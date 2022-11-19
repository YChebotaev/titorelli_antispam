import { knex } from 'knex'
import knexfile from '../knexfile'

declare module 'knex/types/tables' {
  type UserSettings = {
    user_id: number
    is_sidebar_open: boolean
    updated_at: Date
  }

  interface Tables {
    user_settings: UserSettings
  }
}

type UserSettings = import('knex/types/tables').UserSettings

export const getUserSettings = async (user_id: number) => {
  return knex(knexfile)
    .from('user_settings')
    .where({ user_id })
    .first()
}

export const updateUserSettings = async (user_id: number, { is_sidebar_open }: { is_sidebar_open: boolean }) => {
  return knex(knexfile)
    .from('user_settings')
    .where({ user_id })
    .update({
      is_sidebar_open,
      updated_at: new Date()
    })
}
