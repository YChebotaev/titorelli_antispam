import fastify from "fastify"
import { createPool } from "../Model"
import { grantTotem, queryExamples, getAllModels, getAllTotems } from '../repositories'
import { parseJSON } from 'date-fns'

const pool = createPool()

export const server = fastify({ logger: true })

server.get<{
  Params: {
    tenant_id: number
  }
}>(
  '/tenants/:tenant_id/models',
  async ({ params: { tenant_id } }) => {
    return getAllModels(tenant_id)
  }
)

server.get<{
  Params: {
    tenant_id: number
    model_id: number
  }
  Querystring: Partial<{
    page: string
    size: string
    since: string
    author_id: string
  }>
}>(
  '/tenants/:tenant_id/models/:model_id/examples',
  async ({ params: { tenant_id, model_id }, query }) => {
    const page = 'page' in query ? Number(query.page) : 0
    const size = 'size' in query ? Number(query.size) : 100
    const since = 'since' in query ? parseJSON(query.since!) : undefined
    const author_id = 'author_id' in query ? Number(query.author_id) : undefined

    return queryExamples({
      tenant_id,
      model_id,
      author_id,
      since,
      page,
      size
    })
  }
)

server.get<{
  Params: {
    tenant_id: number
  }
}>(
  '/tenants/:tenant_id/totems',
  async ({ params: { tenant_id } }) => {
    return getAllTotems(tenant_id)
  }
)

server.post<{
  Params: {
    tenant_id: number
    model_id: number
    author_id: number
  }
}>(
  '/teants/:tenant_id/models/:model_id/authors/:author_id/grant_totem',
  async ({ params: { tenant_id, model_id, author_id } }) => {
    await grantTotem(tenant_id, model_id, author_id)

    return true
  }
)

server.post<{
  Params: {
    tenant_id: number
    model_id: number
  },
  Body: {
    text: string,
    authorId?: number
  }
  Querystring: {
    with_classifications?: 'true'
    with_confidence?: 'true'
  }
}>(
  '/tenants/:tenant_id/models/:model_id/predict',
  async ({ params: { tenant_id, model_id }, body: { text, authorId }, query }) => {
    const model = await pool.get(tenant_id, model_id)

    return model.predict(text, authorId)
  }
)

server.post<{
  Params: {
    tenant_id: number
    model_id: number
  }
  Body: {
    text: string,
    label: 'spam' | 'ham'
    authorId?: number
  }
}>(
  '/tenants/:tenant_id/models/:model_id/update',
  async ({ params: { tenant_id, model_id }, body: { text, label, authorId } }) => {
    const model = await pool.get(tenant_id, model_id)

    return model.train(text, label, authorId)
  }
)
