import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from './misc/utils'

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export { useIsomorphicLayoutEffect }
