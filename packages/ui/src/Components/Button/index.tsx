import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor } from '../../theme'

type ButtonProps = {
  text?: string
  style?: CSSProperties
}

const Button: FunctionComponent<ButtonProps> = ({ text, style, children }) => {
  return (
    <div
      style={{
        padding: '10px',
        ...style,
      }}
    >
      <button
        style={{
          alignItems: 'flex-start',
          padding: '4px 8px',
          cursor: 'pointer',
          background: useColor({ color: 'primary' }),
        }}
      >
        {text ?? children}
      </button>
    </div>
  )
}

export { Button }
