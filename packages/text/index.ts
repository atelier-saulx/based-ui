import { Language } from './types'
import { useReducer, useEffect } from 'react'

export { Language }

let fromDefault: boolean = true
let lang: Language = 'en'

type Value = undefined | (string | number) | (string | number)[]

export type TextValueSingle = Value | Partial<Record<Language, Value>>

export type TextValue = TextValueSingle | TextValueSingle[]

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

export const updateLanguage = (language: Language) => {
  fromDefault = false
  lang = language
  listeners.forEach((fn) => {
    fn(lang)
  })
}

// my need to swap the app against deeper contexts...
// make a util for that (force update component)

// for example
// useForceUpdate(App, [lang, theme])

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
  if (typeof value === 'object' && !('$$typeof' in value)) {
    // dont include react children

    return value[language] || value.en
  }
  return value
}

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && !('$$typeof' in value))
  )
}
