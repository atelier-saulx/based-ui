import { useReducer, useEffect } from 'react'
import { hash } from '@saulx/utils'
import './style.css'

export type Rgb = [number, number, number]

export type Colors = {
  primary: Rgb[]
  primaryAccent: Rgb[]
  seconday: Rgb[]
  secondayAccent: Rgb[]
  background: Rgb[]
  foreground: Rgb[]
}

export type Theme = {
  light: Colors
  dark: Colors
}

export type Listener = () => void

export type ThemeWrapper = {
  theme: Theme
  listeners: Listener[]
  active: string
}

const theme: ThemeWrapper = {
  theme: {
    light: {
      primary: [[255, 0, 0]],
      primaryAccent: [[255, 200, 200]],
      seconday: [[0, 0, 255]],
      secondayAccent: [[200, 200, 255]],
      background: [[255, 255, 255]],
      foreground: [[0, 0, 0]],
    },
    dark: {
      primary: [[255, 0, 0]],
      primaryAccent: [[255, 200, 200]],
      seconday: [[0, 0, 255]],
      secondayAccent: [[200, 200, 255]],
      background: [[255, 255, 255]],
      foreground: [[0, 0, 0]],
    },
  },
  active: 'light',
  listeners: [],
}

export const hashTheme = (theme: ThemeWrapper): string => {
  return hash(theme.theme.light) + '' + hash(theme.theme.dark)
}

// initial theme version
let themeVersion = hashTheme(theme)

const inverseTheme = () => {
  return theme.active === 'dark' ? 'light' : 'dark'
}

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.msMaxTouchPoints)

if (isTouch) {
  const htmlStyle = document.documentElement.style
  const updateBg = () => {
    if (global.innerWidth < global.innerHeight) {
      htmlStyle.backgroundSize = 'auto 100vh'
    } else {
      htmlStyle.backgroundSize = '100vw auto'
    }
  }
  htmlStyle.backgroundPosition = 'center top'
  global.addEventListener('resize', updateBg)
  updateBg()
}

export const useTheme = (active?: string) => {
  if (active === undefined) {
    if (typeof window !== 'undefined') {
      const isDark = global.matchMedia('(prefers-color-scheme: dark)').matches
      active = isDark ? 'dark' : 'light'
    } else {
      active = 'dark'
    }
  }

  const [, update] = useReducer((x: number) => x + 1, 0)

  theme.active = active

  useEffect(() => {
    theme.listeners.push(update)
    return () => {
      theme.listeners = theme.listeners.filter((s) => s !== update)
    }
  }, [])

  return theme[active]
}

export type Color =
  | string
  | {
      color: string
      intensity?: number
      alpha?: number
    }

export const useColor = (color: Color): string => {
  if (typeof color === 'object') {
    const { intensity = 1, alpha = 1, color: c } = color
    const selector = theme.theme[theme.active][c]
    const rgb = selector[intensity - 1] || selector[selector.length - 1]
    if (alpha !== 1) {
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${alpha})`
    } else {
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    }
  } else {
    const rgb = theme.theme[theme.active][color][0]
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
  }
}

export const getTheme = (label: string) => {
  return (label ? theme[label] : theme[theme.active]) || {}
}

export const getTone = (): string => {
  return theme.active
}

export const updateTheme = (update: { dark?: Colors; light?: Colors }) => {
  for (const key in update) {
    theme.theme[key] = update[key]
  }
  const newVersion = hashTheme(theme)
  if (newVersion !== themeVersion) {
    themeVersion = newVersion
    theme.listeners.forEach((update) => {
      update()
    })
  }
}

export const switchTheme = (label: string) => {
  if (!label) {
    theme.active = inverseTheme()
  } else {
    theme.active = label
  }
  theme.listeners.forEach((update) => {
    update()
  })
}

export default theme
