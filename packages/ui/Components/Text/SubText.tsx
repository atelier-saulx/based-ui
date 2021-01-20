import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '@based/theme'
import { getValue } from '@based/i18n'

type TitleProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  singleLine?: boolean
}

export const SubText: FunctionComponent<TitleProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
}) => {
  return (
    <div
      style={{
        fontSize: '13px',
        lineHeight: '20px',
        fontWeight: 'normal',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style,
      }}
    >
      {getValue(children)}
    </div>
  )
}
