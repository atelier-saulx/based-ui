import { Language } from './types'

export { Language }

const lang: Language = 'en'

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

// so what we do it allow an array to be returned by do parse it

// text value will also allow an array

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && value !== null)
  )
}
