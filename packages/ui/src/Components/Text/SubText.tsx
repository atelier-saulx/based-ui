import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '../../theme'
import { getTextValue, TextValue, isHtml } from '@based/text'
import useDate from './useDate'
import '@compiled/react'

type TitleProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  singleLine?: boolean
  children?: TextValue
}

export const SubText: FunctionComponent<TitleProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
}) => {
  useDate(children)
  const v = getTextValue(children)
  const html = isHtml(v)
  return (
    <div
      css={{
        strong: {
          fontWeight: 600,
        },
      }}
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
      dangerouslySetInnerHTML={html ? { __html: v.html } : null}
    >
      {!html ? v : null}
    </div>
  )
}
