import React from 'react'
import { S2 } from '../Text/Subtitle'
import { useColor } from '@based/theme'
import useHover from '../../hooks/useHover'
import useMultiple from '../../hooks/useMultiple'
import graphicString from '../../util/graphicString'
import { Caption } from '../Text/Caption'

export const UserLabel = ({
  color = 'light',
  image,
  name = '',
  onMouseEnter,
  onClick,
  size = 46
}) => {
  const [hover, isHover] = useHover()
  return (
    <div
      {...useMultiple(hover, { onMouseEnter })}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border:
          size < 40
            ? '2px solid ' + useColor(isHover ? 'primary' : color)
            : '2px solid ' + useColor(isHover ? 'primary' : color),
        borderRadius: '50%',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          borderRadius: '50%',
          backgroundColor: useColor(color),
          width: size - 10,
          height: size - 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: image ? `url(${image})` : null,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {image ? null : size < 40 ? (
          <Caption color={{ on: color }}>{graphicString(name)}</Caption>
        ) : (
          <S2 color={{ on: color }}>{graphicString(name)}</S2>
        )}
      </div>
    </div>
  )
}
