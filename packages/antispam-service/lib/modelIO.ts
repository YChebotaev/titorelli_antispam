import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { pathExists } from 'fs-extra'
import { pack, unpack } from 'msgpackr'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

export const readModel = async (
  filename: string | null,
  dirname: string,
  ivBase64: string | null,
  skBase64: string | null,
) => {
  if (!filename || !ivBase64 || !skBase64) return null

  const filePath = path.resolve(dirname, filename)

  if (await pathExists(filePath)) {
    const iv = Buffer.from(ivBase64, 'base64')
    const sk = Buffer.from(skBase64, 'base64')
    const fileBuffer = await readFile(filePath)
    const d = createDecipheriv('aes-256-cbc', sk, iv)
    const decryptedFileBuffer = Buffer.concat([d.update(fileBuffer), d.final()])

    return unpack(decryptedFileBuffer) as object
  }

  return null
}

export const writeModel = async (
  model: object,
  filename: string,
  dirname: string,
  iv = randomBytes(16),
  sk = randomBytes(32)
) => {
  const filePath = path.resolve(dirname, filename)
  const fileBuffer = pack(model)
  const c = createCipheriv('aes-256-cbc', sk, iv)
  const encryptedFileBuffer = Buffer.concat([c.update(fileBuffer), c.final()])

  await writeFile(filePath, encryptedFileBuffer)

  return {
    iv,
    sk
  }
}
