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

export const useConstant = (field: string, langauge: Language = lang) => {
  // add hook for hub / from a server
  const f = dictionary[field]
  if (f) {
    return f[langauge] || f.en || field
  }
  return field
}

export const updateDictionary = () => {
  // add fields to dict
  // for shared values or from server
}

export const getLanguage = () => {
  return lang
}

export const setLanguage = () => {
  // has to update the whole app
}
