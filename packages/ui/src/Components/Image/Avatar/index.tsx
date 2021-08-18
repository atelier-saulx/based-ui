import React, { FunctionComponent } from 'react'
import { DataEventHandler } from '../../../types'
import { useColor } from '@based/theme'
import { Text } from '../../Text'

export type AvatarProps = {
  src?: string
  name?: string
  onClick?: DataEventHandler
  size?: number
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
}) => {
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
          backgroundImage: `url(${src})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: useColor({ color: 'primary', tone: 2 }),
        }}
      >
        {!src && parsedName ? (
          <Text
            weight="semibold"
            style={{
              fontSize: (size < 32 ? 10 : size < 42 ? 13 : 16) + 'px',
            }}
            noSelect
            color={{ color: 'background' }}
          >
            {parsedName}
          </Text>
        ) : null}
      </div>
    </div>
  )
}

export default Avatar
