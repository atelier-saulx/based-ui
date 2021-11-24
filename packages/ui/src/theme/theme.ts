import { resolveColor } from './utils'

export type TokenType = 'color' | 'size'

export type ColorToken =
  | 'color-primary'
  | 'color-primaryAccent'
  | 'color-secondary'
  | 'color-secondaryAccent'
  | 'color-tertiary'
  | 'color-tertiaryAccent'
  | 'color-background'
  | 'color-foreground'
  | 'color-divider'
  | 'color-error'

export type SizeToken =
  | 'size-xxxxs'
  | 'size-xxxs'
  | 'size-xxs'
  | 'size-xs'
  | 'size-sm'
  | 'size-md'
  | 'size-lg'
  | 'size-xl'
  | 'size-xxl'
  | 'size-xxxl'
  | 'size-xxxxl'

export type TokenPrimitive = ColorToken | SizeToken

export type ColorTokenObject = {
  color: string
  opacity?: number
}

type SizeTokenObject = {
  size: string
}

type TokenObject = ColorTokenObject | SizeTokenObject

export type TokenConfiguration = {
  [key in string]: {
    [key: string]: TokenObject
  }
}

const tokenConfiguration: () => TokenConfiguration = () => {
  return {
    color: {
      'color-primary': {
        color: '#FFFFFF',
        opacity: 0.5,
      },

      'color-secondary': {
        color: 'rgb(0, 0, 0)',
        opacity: 0.4,
      },

      'color-tertiary': {
        color: 'rgba(0, 0, 0, 0.2)',
      },
    },

    size: {
      'size-sm': { size: '12px' },
      'size-md': { size: '16px' },
      'size-lg': { size: '20px' },
    },
  }
}

export type ColorTokenCollection = {
  [key: string]: ColorTokenObject
}

function useTheme(type: TokenType, token: TokenPrimitive): string {
  if (type === 'color') {
    return useColor(token as ColorToken)
  }

  throw new Error(`Token-type not accepted: ${type}`)
}

function useColor(token: ColorToken): string {
  const tokenConfig = tokenConfiguration()
  return resolveColor(token, tokenConfig.color as ColorTokenCollection)
}

export { useTheme, useColor }
