import { resolveColor, resolveSize } from './utils'

type ColorType = {
  type: 'color'
  config: ColorToken
}

type SizeType = {
  type: 'size'
  config: SizeToken
}

export type TokenType = ColorType | SizeType

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

export type ColorTokenConfig =
  | string
  | {
      color: string
      opacity?: number
    }

type SizeTokenConfig =
  | string
  | {
      size: string
    }

type TokenConfig = ColorTokenConfig | SizeTokenConfig

export type TokenConfiguration = {
  [key in string]: {
    [key: string]: TokenConfig
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

      'color-background': 'rgba(255, 255, 255, 0.8)',
    },

    size: {
      'size-sm': '12px',
      'size-md': { size: '16px' },
      'size-lg': { size: '20px' },
    },
  }
}

export type ColorTokenCollection = {
  [key: string]: ColorTokenConfig
}

export type SizeTokenCollection = {
  [key: string]: SizeTokenConfig
}

function useTheme(type: TokenType['type'], token: TokenType['config']): string {
  if (type === 'color') {
    return useColor(token as ColorToken)
  } else if (type === 'size') {
    return useSize(token as SizeToken)
  } else {
    console.warn(`Token-type not accepted: ${type}`)
  }
}

function useColor(token: ColorToken): string {
  try {
    const tokenConfig = tokenConfiguration()
    return resolveColor(token, tokenConfig.color as ColorTokenCollection)
  } catch (error) {
    console.warn('Color-resolve failed - error: ', error)
  }
}

function useSize(token: SizeToken): string {
  try {
    const tokenConfig = tokenConfiguration()
    return resolveSize(token, tokenConfig.size as SizeTokenCollection)
  } catch (error) {
    console.warn('Size-resolve failed - error: ', error)
  }
}

export { useTheme, useColor, useSize }
