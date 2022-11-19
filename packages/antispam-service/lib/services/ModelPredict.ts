import { LogisticRegressionClassifier } from 'natural'
import { getClassifier } from '../getClassifier'
import { getModel } from '../repositories'
import { readModel } from "../modelIO"
import { getConfidence } from '../getConfidence'

export class ModelPredict {
  public readonly classifier?: LogisticRegressionClassifier
  public readonly isEmpty?: boolean
  private tenantId: number
  private modelId: number
  private modelDir: string

  constructor({
    tenantId,
    modelId,
    modelDir,
  }: {
    tenantId: number,
    modelId: number,
    modelDir: string
  }) {
    this.tenantId = tenantId
    this.modelId = modelId
    this.modelDir = modelDir
  }

  async initialize() {
    if (this.classifier != null) return

    const { filename, iv, sk, lang, smoothing, updated_at } = await getModel(this.tenantId, this.modelId)
    const model = await readModel(filename, this.modelDir, iv, sk)
    const [classifier, isEmpty] = await getClassifier(
      model,
      {
        autoUpdate: {
          tenant_id: this.tenantId,
          since: updated_at
        },
        lang,
        smoothing
      }
    )

    Object.assign(this, { classifier, isEmpty })
  }

  async exec({
    text,
    withClassifications = false,
    withConfidence = false
  }: {
    text: string
    withClassifications?: boolean
    withConfidence?: boolean
  }) {
    const classifications = this.classifier!.getClassifications(text)
    const confidence = getConfidence(classifications)

    return {
      label: classifications[0].label,
      ...(
        withConfidence ? { confidence } : {}
      ),
      ...(
        withClassifications ? { classifications } : {}
      )
    }
  }

  addDocument(text: string, label: 'spam' | 'ham') {
    this.classifier!.addDocument(text, label)
    this.classifier!.train()
    Object.assign(this, { isEmpty: false })
  }
}
