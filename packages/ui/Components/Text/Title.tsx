import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '@based/theme'
import { getValue } from '@based/i18n'

type TitleProps = {
  style?: CSSProperties,
  color?:  Color,
  noSelect?: boolean
  singleLine?: boolean
  variant?: 'regular' | 'small'
}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  style,
  color = 'foreground',
  noSelect,
  singleLine,
  variant
} ) => {
  return (
    <div
      style={{
        fontSize: variant === 'small' ? '17px' : '19px',
        lineHeight: '24px',
        fontWeight: variant === 'small' ? 600 : 'bold',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style
      }}
    >
      {getValue(children)}
    </div>
  )
}
