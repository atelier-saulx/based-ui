import { resolveColor } from './utils'

type TokenType = 'color' | 'size'

export type ColorToken =
  | 'color-primary'
  | 'color-primaryAccent'
  | 'color-secondary'
  | 'color-secondaryAccent'
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
  [key in TokenType]: {
    [key: string]: TokenObject
  }
}

const tokenConfiguration: () => TokenConfiguration = () => {
  return {
    color: {
      'color-primary': {
        color: '#FFFFFF',
        opacity: 0.2,
      },

      'color-secondary': {
        color: 'rgb(0, 0, 0)',
        opacity: 0.2,
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

type ThemeProps = {
  type: TokenType
  token: TokenPrimitive
}

export function useTheme({ type, token }: ThemeProps): string {
  const isColorToken = type === 'color'

  if (isColorToken) {
    return resolveColor(
      token as ColorToken,
      tokenConfiguration().color as ColorTokenCollection
    )
  }

  throw new Error(`Token-type not accepted: ${type}`)
}
