import { Language } from './types'

export { Language }

let lang: Language = 'en'

type Value = undefined | (string | number) | (string | number)[]

export type TextValueSingle = Value | Partial<Record<Language, Value>>

export type TextValue = TextValueSingle | (string | number)[]

export function getTextValue(
  value: TextValue,
  language: Language = lang
): Value {
  if (Array.isArray(value)) {
    return value
  }
  if (typeof value === 'object') {
    return value[language] || value.en
  }
  return value
}

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && value !== null)
  )
}
