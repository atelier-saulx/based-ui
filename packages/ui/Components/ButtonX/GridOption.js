import React from 'react'
import { S1 } from '../Text/Subtitle'
import { useColor } from '@based/theme'
import useHover from '../../hooks/useHover'
import { iconFromString } from '@based/icons'
import { Order } from '../Label'
import { Caption } from '../Text/Caption'

export const GridOption = ({
  onClick,
  children = '',
  label = '',
  onHover,
  width,
  icon,
  Icon = iconFromString(icon),
}) => {
  const [hover, isHover] = useHover(onHover)

  return (
    <div
      {...hover}
      onClick={onClick}
      style={{
        width,
        padding: 20,
        border: isHover
          ? '1px solid ' + useColor('primary')
          : '1px solid ' + useColor('outline'),
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'hover 0.15s, background-color 0.15s',
        backgroundColor: isHover ? useColor('primary', 0.05) : null,
      }}
    >
      {Icon ? (
        <div
          style={{
            backgroundColor: useColor('primary'),
            width: 28,
            height: 28,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: 17,
          }}
        >
          <Icon color={{ on: 'primary' }} />
        </div>
      ) : null}

      <S1>{label}</S1>

      <Caption
        style={{
          marginTop: 5,
        }}
      >
        {children}
      </Caption>
    </div>
  )
}
