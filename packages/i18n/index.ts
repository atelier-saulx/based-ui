import { Language } from './types'

export { Language }

let lang: Language = 'en'

type Value = undefined | (string | number)

export type TextValue = Value | Partial<Record<Language, Value>>

export function getTextValue(
  value: TextValue,
  language: Language = lang
): Value {
  if (typeof value === 'object') {
    return value[language] || value.en
  }
  return value
}

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && !Array.isArray(value) && value !== null)
  )
}
