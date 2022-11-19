import { describe, it, expect, afterAll } from 'vitest'
import path from 'node:path'
import { unlinkSync } from 'node:fs'
import { readModel, writeModel } from '../modelIO'
import { nanoid } from 'nanoid'

const generateModel = () => {
  const model: Record<string, string[]> = {}

  for (let i=0; i<1000; i++) {
    const key = nanoid()

    model[key] = []

    for (let j=0; j<1000; j++) {
      model[key][j] = nanoid()
    }
  }

  return model
}

describe('modelIO', () => {
  it('should write and read model back', async () => {
    const dummyModel = generateModel()

    const { iv, sk } = await writeModel(dummyModel, 'foo', __dirname)

    const model = await readModel('foo', __dirname, iv.toString('base64'), sk.toString('base64'))

    expect(model).toEqual(dummyModel)
  })
})

afterAll(() => {
  unlinkSync(path.resolve(__dirname, 'foo'))
})
