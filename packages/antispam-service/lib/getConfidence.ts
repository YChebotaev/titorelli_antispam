import type { LogisticRegressionClassifierClassification } from 'natural'

export const getConfidence = (classifications: LogisticRegressionClassifierClassification[]) => {
  if (classifications.length === 2) {
    const maxValue = classifications.reduce((max, { value }) => Math.max(max, value), -Infinity)
    const minValue = classifications.reduce((min, { value }) => Math.min(min, value), +Infinity)

    return maxValue / minValue / 100
  } else {
    return Number(classifications[0].value.toFixed(2))
  }
}
