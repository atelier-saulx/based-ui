const cache = {}

export type ProgressContext = {
  service: string
  url: string
  listeners?: Set<any> // Needs type
  items?: ProgressContextItem[]
  inProgress?: boolean
}

export type ProgressContextItem = {
  xhr: XMLHttpRequest
  size: number
  id: string
  name: string
  mime: string
  progress: number
  type: string
  removed?: boolean
  isComplete?: boolean
}

export const createProgressContext = ({
  url,
  service,
}: ProgressContext): ProgressContext => {
  const key = `${url}-${service}`
  if (!(key in cache)) {
    cache[key] = {
      service,
      url,
      listeners: new Set(),
      items: {},
      inProgress: false,
    }
  }
  return cache[key]
}
