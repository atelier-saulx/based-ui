import { createContext } from 'react'


const cache = {}

export type ProgressContext= {
      service: string
      url: string
      listeners?: Set<any> // Needs type
      items?: any
      inProgress?: boolean
    }

export const createProgressContext = ({url, service}: ProgressContext): ProgressContext => {
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

