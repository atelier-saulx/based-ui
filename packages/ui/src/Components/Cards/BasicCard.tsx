import React, { CSSProperties, FunctionComponent } from 'react'

type BasicCardProps = {
  value?: string
  style?: CSSProperties
  imageUrl?: string
}

const BasicCard: FunctionComponent<BasicCardProps> = ({
  children,
  value = '',
  style = {},
  imageUrl = '',
}) => {
  return (
    <div
      style={{
        border: '1px solid #eaebed',
        borderRadius: '4px',
        maxWidth: '33%',
        ...style,
      }}
    >
      {imageUrl !== '' && (
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            minHeight: '220px',
          }}
        />
      )}

      <div
        style={{
          padding: '16px',
        }}
      >
        {children ?? value}
      </div>
    </div>
  )
}

export { BasicCard }
