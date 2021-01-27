import React, { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { useColor, Color } from '@based/theme'
import escape from 'escape-html'

type CodeProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  lineNumbers?: boolean
  lines?: { start: number; end: number }
}

export const Code: FunctionComponent<CodeProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
}) => {
  const lines = typeof children === 'string' ? children.split('\n') : []

  const parsedLines = []
  for (let i = 0; i < lines.length; i++) {
    parsedLines.push(
      <div
        key={i}
        style={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div
          style={{
            userSelect: 'none',
            fontWeight: 'normal',
            opacity: 0.5,
            width: 30,
            fontSize: 12,
            marginRight: 24,
          }}
        >
          {i + 1}
        </div>
        <pre
          style={{
            userSelect: 'all',
            lineHeight: '24px',
            fontSize: '15px',
            margin: 0,
            fontFamily:
              'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
          }}
        >
          {lines[i] || ' '}
        </pre>
      </div>
    )
  }

  return (
    <div
      style={{
        color: useColor(color),
        display: 'flex',
        ...style,
      }}
    >
      <pre
        style={{
          userSelect: 'text',
          lineHeight: '24px',
          fontSize: '13px',
          margin: 0,
          fontFamily:
            'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
        }}
      >
        {children}
      </pre>
      {/* {parsedLines} */}
    </div>
  )
}
