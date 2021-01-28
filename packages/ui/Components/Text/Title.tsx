import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '@based/theme'
import { getTextValue, TextValue } from '@based/i18n'

type TitleProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  children?: TextValue
  singleLine?: boolean
  size?: 'regular' | 'small'
}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
  size,
}) => {
  return (
    <div
      style={{
        fontSize: size === 'small' ? '17px' : '19px',
        lineHeight: '24px',
        fontWeight: size === 'small' ? 600 : 'bold',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style,
      }}
    >
      {getTextValue(children)}
    </div>
  )
}
