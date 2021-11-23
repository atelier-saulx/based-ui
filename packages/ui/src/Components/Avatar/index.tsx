import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor } from '../../theme'

type AvatarProps = {
  value?: string
  style?: CSSProperties
  imageUrl?: string
  size?: 'small' | 'medium' | 'large'
  // bgColor? :
}

const Avatar: FunctionComponent<AvatarProps> = ({
  children,
  value = '',
  style = {},
  imageUrl = '',
  size = 'small',
}) => {
  const avatarSize =
    size === 'small'
      ? '64px'
      : size === 'medium'
      ? '128px'
      : size === 'large'
      ? '256px'
      : 'small'

  const avatarFontSize =
    size === 'small'
      ? '16px'
      : size === 'medium'
      ? '24px'
      : size === 'large'
      ? '42px'
      : 'small'

  return (
    <div
      style={{
        background: useColor({ color: 'primary' }),
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        borderRadius: '50%',
        color: useColor({ color: 'background' }),
        fontSize: avatarFontSize,
        width: avatarSize,
        height: avatarSize,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'text',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}

export { Avatar }
