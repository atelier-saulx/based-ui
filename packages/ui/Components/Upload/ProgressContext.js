import { createContext } from 'react'

export const ProgressContext = createContext()

const cache = {}

export const createProgress = ({
  url,
  service = '',
  path = '',
  authentication = () => {}
}) => {
  if (!url && !service) {
    throw new Error('Upload context needs an url or service ')
  }
  const key = `${url}-${service}`
  if (!(key in cache)) {
    cache[key] = {
      service,
      url,
      listeners: new Set(),
      items: {},
      inProgress: false
    }
  }
  return cache[key]
}
