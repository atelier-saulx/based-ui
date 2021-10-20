import React, { FunctionComponent } from 'react'
import { DataEventHandler } from '../../../types'
import { useColor, Color } from '@based/theme'
import { Text } from '../../Text'

export type AvatarProps = {
  src?: string
  name?: string
  onClick?: DataEventHandler
  size?: number
  color?: Color | [Color, Color]
  foregroundColor?: Color
}

const parseName = (name: string): string => {
  if (!name) {
    return ''
  }
  let str = ''
  const split = name.split(' ')
  for (const word of split) {
    if (word[0] < 'a') {
      str += word[0]
    }
  }
  if (!str) {
    for (const word of split) {
      str += word[0]
      if (str.length === 2) {
        return str
      }
    }
  }
  return str
}

const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  name = '',
  onClick,
  size = 40,
  color = { color: 'primary', tone: 2 },
  foregroundColor = { color: 'background' },
}) => {
  const isArray = Array.isArray(color)
  const parsedName = parseName(name)
  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: src
            ? `url(${src})`
            : isArray
            ? useColor(color)
            : null,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            isArray && src ? useColor(color[0]) : useColor(color),
        }}
      >
        {!src && parsedName ? (
          <Text
            weight="semibold"
            style={{
              fontSize: (size < 32 ? 10 : size < 42 ? 13 : 16) + 'px',
            }}
            noSelect
            color={foregroundColor}
          >
            {parsedName}
          </Text>
        ) : null}
      </div>
    </div>
  )
}

export default Avatar
