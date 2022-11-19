import { AntispamClient } from './lib'

export const createClient = (baseURL: string, tenantId?: number, modelId?: number, token?: string) => {
  return new AntispamClient({ baseURL, tenantId, modelId, token })
}
