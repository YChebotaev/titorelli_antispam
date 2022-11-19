import { LogisticRegressionClassifierClassification } from 'natural'
import path from 'node:path'
import { Worker } from "node:worker_threads"

export class Model {
  private tenantId: number
  private modelId: number
  private worker?: Worker
  private idSequence = 0

  constructor({
    tenantId,
    modelId
  }: {
    tenantId: number,
    modelId: number
  }) {
    this.tenantId = tenantId
    this.modelId = modelId
  }

  async predict(example: string, authorId?: number) {
    return await this.invoke('predict', example, authorId) as {
      label: 'spam' | 'ham',
      confidence: number,
      classifications: LogisticRegressionClassifierClassification[]
    }
  }

  async train(example: string, label: string, authorId?: number) {
    return await this.invoke('train', example, label, authorId) as boolean
  }

  private spawn() {
    if (this.worker != null) return Promise.resolve()

    return new Promise<void>((resolve, reject) => {
      this.worker = new Worker(
        path.join(__dirname, 'worker/boot.js'),
        {
          workerData: {
            tenantId: this.tenantId,
            modelId: this.modelId
          }
        }
      )

      // TODO: May be memory leak
      this.worker.once('online', () => {
        console.log(50)

        resolve()
      })
      this.worker.once('error', (e) => {
        console.log(55, e)

        reject()
      })
    })
  }

  private invoke<R, P extends any[] = never[]>(method: string, ...params: P): Promise<R> | void {
    return this
      .spawn()
      .then(() => {
        const postedMessage = {
          id: this.idSequence++,
          method,
          params
        }

        console.log(64)
        this.worker!.postMessage(postedMessage)

        return new Promise<R>((resolve, reject) => {

          console.log(69)

          const messageHandler = (receivedMessage: {
            id: number,
            result?: R
            error?: unknown
          }) => {

            console.log(77)

            if (postedMessage.id === receivedMessage.id) {
              this.worker!.off('message', messageHandler)

              if (receivedMessage.error) {
                reject(receivedMessage.error)
              } else {
                resolve(receivedMessage.result!)
              }
            }
          }

          this.worker!.on('message', messageHandler)
        })
      })
  }
}
