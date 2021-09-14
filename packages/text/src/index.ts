import { Language } from './types'
import { useReducer, useEffect } from 'react'
import parseDate, { DateFormat } from './dateString'
import parseNumber, { NumberFormat } from './numberString'

export type TextFormat =
  | DateFormat
  | NumberFormat
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'first-word'

export type TextValueFormat = {
  value: TextValueSingle
  format: TextFormat
}

export { Language }

let fromDefault: boolean = true
let lang: Language = 'en'

type Value = undefined | (string | number) | (string | number)[]

export type TextValueSingle = Value | Partial<Record<Language, Value>>

export type TextValue =
  | (TextValueFormat | TextValueSingle)
  | (TextValueFormat | TextValueSingle)[]

const listeners: Set<(lang: Language) => void> = new Set()

// put this in saulx utils
const langRe = /^.*?([a-z]{2,4});/
const readLang = (lang: string): Language => {
  let language: Language
  if (lang) {
    const m = lang.match(langRe)
    if (m && m[1]) {
      language = <Language>m[1]
    } else {
      language = 'en'
    }
  } else {
    language = 'en'
  }
  return language
}

export const getLanguage = (): Language => {
  return lang
}

export const updateLanguage = (language: Language) => {
  fromDefault = false
  lang = language
  listeners.forEach((fn) => {
    fn(lang)
  })
}

export const useLanguage = (language?: Language) => {
  if (fromDefault) {
    if (language) {
      lang = language
    } else if (typeof window !== 'undefined') {
      const language = navigator.language
      lang = readLang(language)
    }
  }
  const [, update] = useReducer((x: number) => x + 1, 0)
  useEffect(() => {
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])
  return lang
}

export function isTextFormat(value: any): value is TextValueFormat {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' &&
      value !== null &&
      !('$$typeof' in value) &&
      'format' in value &&
      'value' in value)
  )
}

const formatText = (
  { format, value }: TextValueFormat,
  language: Language = lang
): string | number => {
  let str: string | number = ''
  if (typeof value === 'object') {
    // @ts-ignore
    str = getTextValue(value, language)
  } else {
    str = value
  }

  if (typeof str === 'string') {
    if (format === 'capitalize') {
      if (str === '') return
      return str[0].toUpperCase() + str.slice(1)
    } else if (format === 'uppercase') {
      return str.toUpperCase()
    } else if (format === 'lowercase') {
      return str.toLowerCase()
    } else if (format === 'first-word') {
      return str.split(' ')[0]
    }
  }

  if (
    format === 'date' ||
    format === 'date-time' ||
    format === 'date-time-human' ||
    format === 'date-time-text' ||
    format === 'time' ||
    format === 'time-precise'
  ) {
    return parseDate(str, format)
  } else if (
    format === 'number-human' ||
    format === 'number-short' ||
    format === 'number-ratio' ||
    format === 'number-bytes' ||
    format === 'number-euro' ||
    format === 'number-dollar' ||
    format === 'number-pound'
  ) {
    return parseNumber(str, format)
  }

  // @ts-ignore
  return str
}

export function getTextValue(
  value: TextValue,
  language: Language = lang
): Value {
  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((v: TextValueSingle) => {
      return getTextValue(v, language)
    })
  }
  if (typeof value === 'object' && value && !('$$typeof' in value)) {
    if (isTextFormat(value)) {
      return formatText(value, language)
    } else {
      return value[language] || value.en
    }
  }

  // @ts-ignore
  return value
}

export function getStringValue(
  value: TextValue,
  language: Language = lang
): string {
  const x = getTextValue(value, language)
  if (Array.isArray(x)) {
    return x.join('')
  }
  if (typeof x === 'number') {
    return String(x)
  }
  return x
}

export { parseNumber }

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && value && !('$$typeof' in value))
  )
}
