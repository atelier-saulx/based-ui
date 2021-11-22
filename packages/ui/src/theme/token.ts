type StyleToken = 'primary'

type ColorTokenPrimitive = {
  color: StyleToken
  opacity?: number
}

type TokenPrimitive = ColorTokenPrimitive

export type TokenConfiguration = {
  [key in StyleToken]: TokenPrimitive
}

const tokenConfiguration: () => TokenConfiguration = () => {
  return {
    primary: { color: 'primary' },
  }
}

interface ColorPrimitiveMap {
  [key: string]: string
}

const colorPrimitives: ColorPrimitiveMap = {
  primary: '#FFFFFF',
}

function resolveColor(
  config: ColorTokenPrimitive,
  primitive: StyleToken
): string {
  const { color, opacity: inputOpacity = 1.0 } = config
  const opacity = Math.min(Math.max(inputOpacity, 0), 1)
  const colorHex = colorPrimitives[color].replace('#', '')

  if (!colorPrimitives[color]) {
    throw new Error(`Cannot find color primitive ${primitive}`)
  }

  const r = parseInt(colorHex.slice(0, 2), 16)
  const g = parseInt(colorHex.slice(2, 4), 16)
  const b = parseInt(colorHex.slice(4, 6), 16)

  if (opacity === 1) {
    return `rgb(${r},${g},${b})`
  }

  return `rgba(${r},${g},${b},${opacity})`
}

export function useToken(token: StyleToken): string {
  const tokenConfig = tokenConfiguration()
  const matchingStyle = tokenConfig[token]

  return resolveColor(matchingStyle, token)
}
