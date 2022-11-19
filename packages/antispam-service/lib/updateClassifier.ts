import type { LogisticRegressionClassifier } from 'natural'
import { getExamplesSince, getAllExamples } from './knex/examples'

export const updateClassifier = async (classifier: LogisticRegressionClassifier, tenant_id: number, since?: Date) => {
  const size = 100
  let updated = false
  let offset = 0

  for (; ;) {
    const examples = await (
      since ?
        getExamplesSince(tenant_id, since, { size, offset }) :
        getAllExamples(tenant_id, { size, offset })
    )

    if (examples.length) {
      updated = true

      for (const { text, label } of examples) {
        classifier.addDocument(text, label)
      }

      offset += size
    } else {
      return updated
    }
  }
}
