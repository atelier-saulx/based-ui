import React, { CSSProperties, FunctionComponent } from 'react'
import { useCss } from '../../hooks'
import { useColor } from '../../theme'

type ButtonProps = {
  text?: string
  style?: CSSProperties
}

const Button: FunctionComponent<ButtonProps> = ({ text, style, children }) => {
  const className = useCss({
    alignItems: 'flex-start',
    padding: '4px 8px',
    cursor: 'pointer',
    background: useColor({ color: 'primary' }),
  })

  return (
    <div
      style={{
        ...style,
      }}
    >
      <button className={className}>{text ?? children}</button>
    </div>
  )
}

export { Button }
