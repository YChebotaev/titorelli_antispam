import path from 'node:path'
import { unlink } from 'node:fs/promises'
import { getClassifier } from '../getClassifier'
import { getModel, updateModel, createExample } from '../repositories'
import { readModel, writeModel } from '../modelIO'

export class ModelUpdate {
  private tenantId: number
  private modelId: number
  private text: string
  private label: 'spam' | 'ham'
  private authorId?: number
  private modelDir: string

  constructor({
    tenantId,
    modelId,
    text,
    label,
    authorId,
    modelDir
  }: {
    tenantId: number
    modelId: number
    text: string
    label: 'spam' | 'ham'
    authorId?: number
    modelDir: string
  }) {
    this.tenantId = tenantId
    this.modelId = modelId
    this.text = text
    this.label = label
    this.authorId = authorId
    this.modelDir = modelDir
  }

  async exec() {
    await createExample({
      model_id: this.modelId,
      tenant_id: this.tenantId,
      text: this.text,
      label: this.label,
      author_id: this.authorId,
    })

    const { filename, sk, iv, lang, smoothing } = await getModel(this.tenantId, this.modelId)
    const nextFilename = `${Date.now()}.emp`
    const model = await readModel(filename, this.modelDir, iv, sk)
    const [classifier, isCreated] = await getClassifier(model, { lang, smoothing })

    classifier.addDocument(this.text, this.label)
    classifier.train()

    const {
      iv: nextIv,
      sk: nextSk,
    } = await writeModel(
      classifier,
      nextFilename,
      this.modelDir
    )

    await updateModel({
      model_id: this.modelId,
      tenant_id: this.modelId,
      iv: nextIv.toString('base64'),
      sk: nextSk.toString('base64'),
      filename: nextFilename
    })

    if (!isCreated) {
      await unlink(path.join(this.modelDir, filename))
    }

    return true
  }
}
