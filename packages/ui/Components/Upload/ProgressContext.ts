import { createContext } from 'react'

export const ProgressContext = createContext(null)

const cache = {}

type CachedProgress = {
      service: string
      url: string
      listeners: Set<any> // Needs type
      items: any
      inProgress: boolean
    }

export const createProgress = ({
  url,
  service = '',
}: { url:string, service: string}): CachedProgress => {
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
