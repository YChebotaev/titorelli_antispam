import { createClient } from '@titorelli_antispam/antispam-client'
import type { NextApiRequest, NextApiResponse } from 'next'

const apiClient = createClient(
  'http://127.0.0.1:3000',
  0,
  0,
  'yy3&sx*q5C8wKKBT'
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    label: 'spam' | 'ham'
  }>
) {

  const resp = await apiClient.predict(req.body.text)

  res.status(200).json(resp)
}
