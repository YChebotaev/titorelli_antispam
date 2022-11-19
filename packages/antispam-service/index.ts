import { server } from './lib'

const port = Number(process.env['PORT'] ?? 3000)
const host = process.env['HOST'] ?? '::'

server.listen({ port, host })
