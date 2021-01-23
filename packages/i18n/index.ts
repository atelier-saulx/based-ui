const dictionary = new Map()
import { Language } from './types'

export { Language }

let lang: Language = 'en'

type Value = string | { [key: string]: string | number }

export function getValue(
  value: Value | Value[],
  langauge: Language = lang
): any {
  if (Array.isArray(value)) {
    return value.map((v) => getValue(v))
  }
  if (typeof value === 'object' && !('$$typeof' in value)) {
    return value[langauge] || value.en
  }
  return value
}
