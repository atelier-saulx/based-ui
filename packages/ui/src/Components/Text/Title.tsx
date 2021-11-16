import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '../../theme'
import { getTextValue, TextValue, isHtml } from '../../textParser'
import useDate from './useDate'
import '@compiled/react'

type TitleProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  children?: TextValue
  singleLine?: boolean
  size?: 'regular' | 'small' | 'large'
  className?: string
}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
  size,
  className,
}) => {
  useDate(children)

  const textValue = getTextValue(children)
  const html = isHtml(textValue)

  return (
    <div
      className={className}
      css={{
        strong: {
          fontWeight: 'bold',
        },
      }}
      style={{
        lineHeight: size === 'large' ? '32px' : '24px',
        fontWeight: size === 'small' ? 600 : 'bold',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        fontSize:
          size === 'large' ? '24px' : size === 'small' ? '15px' : '19px',
        ...style,
      }}
      dangerouslySetInnerHTML={html ? { __html: textValue.html } : null}
    >
      {!html ? textValue : null}
    </div>
  )
}
