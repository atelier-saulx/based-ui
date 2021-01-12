import { useReducer, useEffect } from 'react'
import hexRgb from 'hex-rgb'
// import fnva from '@sindresorhus/fnv1a'
import './style.css'

let cache = {}

const theme = {
  light: {
    default: 'rgb(0,0,0)',
    light: 'rgb(234,234,235)',
    medium: 'rgba(0,0,0,0.6)',
    disabled: 'rgba(0,0,0,0.38)',
    background: 'rgb(255,255,255)',
    background2: 'rgb(255,255,255)',
    primary: 'rgb(110,0,238)',
    secondary: 'rgb(3,218,197)',
    outline: 'rgb(234,234,235)',
    error: 'rgb(253,42,42)',
    shadow: 'rgba(0,0,0,0.05)'
  },
  dark: {
    default: 'rgb(255,255,255)',
    light: 'rgba(255,255,255,0.12)',
    medium: 'rgba(255,255,255,0.6)',
    disabled: 'rgba(255,255,255,0.38)',
    background: 'rgb(18,18,18)',
    background2: 'rgb(23,23,23)',
    shadow: 'rgba(0,0,0,0.9)',
    primary: 'rgb(187,134,252)',
    secondary: 'rgb(3,218,197)',
    outline: 'rgba(255,255,255,0.15)',
    error: 'rgb(255,109,109)'
  },
  listeners: []
}

const isHex = value => value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)

const toRgb = value => {
  if (value && isHex(value)) {
    const x = hexRgb(value)
    if (x) {
      return `rgb(${x.red},${x.green},${x.blue})`
    }
  }
  return value
}

export const hashTheme = theme => {
  const v = JSON.stringify(theme.light) + JSON.stringify(theme.dark)
  return v // fnva(v) (crashes browser (safari))
}

let themeVersion = hashTheme(theme)

const createCache = () => {
  const tones = ['dark', 'light']
  // if nessecary we can add saturation
  // const saturateColors = ['primary', 'secondary']
  cache = {}
  for (const tone of tones) {
    cache[tone] = {}
    for (const color in theme[tone]) {
      const value = toRgb(theme[tone][color])
      const match = value.match(
        /^rgba\(/.test(value)
          ? /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1}.\d{1,5})\)/
          : /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/
      )
      cache[tone][color] = match
        ? [match[1], match[2], match[3], match[4] === undefined ? 1 : match[4]]
        : value
    }
  }
}

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

export const getDocumentStyle = t => {
  const background = t.backgroundImage
    ? `url(${t.backgroundImage}) ${
        /^linear-gradient\(/.test(t.background) ? 'black' : t.background
      }`
    : t.background

  const color = t.color || t.text || t.default
  const styles = {
    width: '100%',
    height: '100%'
  }

  if (background) {
    styles.background = `${background} center / cover fixed`
  }

  if (color) {
    styles.color = color
  }

  return styles
}

const setDocumentStyle = () => {
  const t = theme[theme.active]
  const styles = getDocumentStyle(t)
  const htmlStyle = document.documentElement.style

  for (const i in styles) {
    if (!htmlStyle[i]) {
      htmlStyle[i] = styles[i]
    }
  }
}

export const useTheme = active => {
  if (active === undefined) {
    if (typeof window !== 'undefined') {
      const isDark = global.matchMedia('(prefers-color-scheme: dark)').matches
      active = isDark ? 'dark' : 'light'
    } else {
      active = 'dark'
    }
  }

  const [, update] = useReducer(x => x + 1, 0)
  if (!theme.active) {
    theme.active = active
  }
  useEffect(() => {
    theme.listeners.push(update)
    return () => {
      theme.listeners = theme.listeners.filter(s => s !== update)
    }
  }, [])

  setDocumentStyle()

  return theme[active]
}

export const useColor = (color, weight) => {
  let select = theme.active
  let colorSelect
  if (typeof color === 'object') {
    if (color.alpha) {
      weight = color.alpha
    }
    if (color.theme) {
      select = color.theme
    }
    if (color.on) {
      if (
        color.on === 'primary' ||
        color.on === 'secondary' ||
        color.on === 'default'
      ) {
        select = 'inverse'
      }
      if (!color.color) {
        color.color = 'default'
      }
    }
    if (select) {
      if (select === 'inverse') {
        select = inverseTheme()
      }
      colorSelect = color.color
    }
  } else {
    colorSelect = color
  }
  if (weight) {
    const c = cache[select][colorSelect]
    return typeof c === 'string' ? c : `rgba(${c[0]},${c[1]},${c[2]},${weight})`
  } else {
    return theme[select][colorSelect] || color
  }
}

export const getTheme = label => {
  return (label ? theme[label] : theme[theme.active]) || {}
}

export const getTone = () => {
  return theme.active
}

export const updateTheme = update => {
  for (const key in update) {
    theme[key] = update[key]
  }
  createCache()
  const newVersion = hashTheme(theme)
  if (newVersion !== themeVersion) {
    themeVersion = newVersion
    theme.listeners.forEach(update => {
      update()
    })
  }
}

export const switchTheme = label => {
  if (!label) {
    theme.active = inverseTheme()
  } else {
    theme.active = label
  }
  theme.listeners.forEach(update => {
    update()
  })
}

createCache()

export default theme
