import React, { CSSProperties, FunctionComponent } from 'react'
// import { useColor } from '../../theme'

type ButtonProps = {
  text?: string
  style?: CSSProperties
}

// const StyledButton = styled.button({
//   alignItems: 'flex-start',
//   background: useColor({ color: 'secondary' }),
//   borderRadius: '4px',
//   cursor: 'pointer',
//   fontSize: '15px',
//   fontWeight: '500',
//   letterSpacing: '-0.015em',
//   lineHeight: '24px',
//   margin: '6px',
//   padding: '4px 8px',
// })

const Button: FunctionComponent<ButtonProps> = ({ text, style, children }) => {
  return (
    <div
      style={{
        ...style,
      }}
    >
      {/* <StyledButton>{text ?? children}</StyledButton> */}
      <button>{text ?? children}</button>
    </div>
  )
}

export { Button }
