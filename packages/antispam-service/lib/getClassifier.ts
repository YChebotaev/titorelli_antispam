import {
  LogisticRegressionClassifier,
  PorterStemmer,
  PorterStemmerEs,
  PorterStemmerFa,
  PorterStemmerFr,
  PorterStemmerIt,
  PorterStemmerNl,
  PorterStemmerNo,
  PorterStemmerPt,
  PorterStemmerRu,
  PorterStemmerSv,
} from 'natural'
import type { ModelLang } from './types'
import { updateClassifier } from './updateClassifier'

const getStemmer = (lang?: ModelLang) => {
  switch (lang) {
    case 'es': return PorterStemmerEs
    case 'fa': return PorterStemmerFa
    case 'fr': return PorterStemmerFr
    case 'it': return PorterStemmerIt
    case 'nl': return PorterStemmerNl
    case 'no': return PorterStemmerNo
    case 'pt': return PorterStemmerPt
    case 'ru': return PorterStemmerRu
    case 'sv': return PorterStemmerSv
    default: return PorterStemmer
  }
}

export const getClassifier = async (
  rawModel: string | object | null,
  {
    autoUpdate,
    lang,
  }: {
    autoUpdate?: {
      tenant_id: number,
      since?: Date
    },
    lang: ModelLang,
    smoothing: number,
  }
): Promise<[LogisticRegressionClassifier, boolean]> => {
  const stemmer = getStemmer(lang)
  const model = typeof rawModel === 'string' ? JSON.parse(rawModel) as object : rawModel
  let isCreated = model == null

  const classifier = model
    ? LogisticRegressionClassifier.restore(model, stemmer)
    : Reflect.construct(LogisticRegressionClassifier, [stemmer]) as LogisticRegressionClassifier

  if (autoUpdate) {
    const { tenant_id, since } = autoUpdate

    const updated = await updateClassifier(classifier, tenant_id, since)

    if (updated) classifier.train()
  }

  return [classifier, isCreated]
}
