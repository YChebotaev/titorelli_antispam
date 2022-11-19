import { workerData, parentPort } from 'node:worker_threads'
import { ModelPredict, ModelUpdate } from '../../services'
import { hasTotem } from '../../repositories'

console.log(5)

const { tenantId, modelId } = workerData as {
  tenantId: number
  modelId: number
}

console.log(12)

const predictSrv = new ModelPredict({
  tenantId,
  modelId,
  modelDir: 'data'
})

console.log(20)

parentPort!.addListener('message', async ({
  id,
  method,
  params
}: {
  id: number,
  method: 'predict'
  params: [string, number | undefined]
} | {
  id: number,
  method: 'train'
  params: [string, 'spam' | 'ham', number | undefined]
}) => {
  console.log(29)

  switch (method) {
    case 'predict': {
      const [text, authorId] = params

      if (authorId != null && await hasTotem(tenantId, modelId, authorId)) {
        parentPort!.postMessage({
          id,
          result: {
            label: 'ham',
            confidence: 1,
            classifications: []
          }
        })

        break
      }

      try {
        await predictSrv.initialize()

        if (predictSrv.isEmpty) {
          parentPort!.postMessage({
            id,
            result: {
              label: 'ham',
              confidence: 1,
              classifications: []
            }
          })
        } else {
          const result = await predictSrv.exec({
            text,
            withClassifications: true,
            withConfidence: true
          })

          parentPort!.postMessage({
            id,
            result
          })
        }
      } catch (error) {
        parentPort!.postMessage({
          id,
          error
        })
      }

      break
    }
    case 'train': {
      const [text, label, authorId] = params

      predictSrv.addDocument(text, label)

      try {
        const result = await new ModelUpdate({
          tenantId,
          modelId,
          modelDir: 'data',
          text,
          label,
          authorId
        }).exec()

        parentPort!.postMessage({
          id,
          result
        })
      } catch (error) {
        parentPort!.postMessage({
          id,
          error
        })
      }

      break
    }
  }
})
