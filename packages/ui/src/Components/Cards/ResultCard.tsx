import React, { CSSProperties, FunctionComponent } from 'react'

type ResultCardProps = {
  value?: string
  style?: CSSProperties
}

const ResultCard: FunctionComponent<ResultCardProps> = ({
  children,
  value = '',
  style = {},
}) => {
  return (
    <div
      style={{
        alignItems: 'center',
        border: '1px solid #eaebed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '24%',
        margin: '1%',
        padding: '32px 16px',
        textAlign: 'center',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}

export { ResultCard }
