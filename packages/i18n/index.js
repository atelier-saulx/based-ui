const dictionary = new Map()

let lang = 'en'

export const getValue = (value, langauge = lang) => {
  if (Array.isArray(value)) {
    return value.map(getValue)
  }

  if (typeof value === 'object' && !('$$typeof' in value)) {
    return value[langauge] || value.en
  }

  return value
}

export const useConstant = (field, langauge = lang) => {
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
