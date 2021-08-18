export type Validator = (str: string | number) => boolean

const emailValidator: Validator = (v) => {
  if (typeof v !== 'string') {
    return false
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(v.toLowerCase())
}

export { emailValidator }
